import React from "react";
import {firebase} from './firebase'

function App() {
  const [nombre, setNombre] = React.useState('')
  const [apellido, setApellido] = React.useState('')
  const [id, setId] = React.useState('')
  const [lista, setLista] = React.useState([])
  const [error, setError] = React.useState(null)
  const [modoEdicion, setModoEdicion] = React.useState(false)

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('usuarios').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setLista(arrayData);
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  }, [])

  const guardarDatos = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('Falta el nombre')
      return
    }
    if (!apellido.trim()) {
      setError('Falta el apellido')
      return
    }
    try {
      const db = firebase.firestore()
      const nuevoUsuario = {
        nombre, apellido
      }
      const data = await db.collection('usuarios').add(nuevoUsuario)
      setLista([
        ...lista,
        { ...nuevoUsuario, id: data.id }
      ])
    } catch (error) {
      console.log(error);
    }
    setNombre('')
    setApellido('')
    setError(null)
  }

  const eliminarDato = async(id) => {
    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).delete()
      const listaFiltrada = lista.filter((elemento)=>elemento.id!==id)
      setLista(listaFiltrada)
    } catch (error) {
      console.log(error)      
    }
  }

  const editar = (elemento) => {
    setModoEdicion(true)
    setNombre(elemento.nombre)
    setApellido(elemento.apellido)
    setId(elemento.id)
  }

  const editarDatos = (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('Falta el nombre')
      return
    }
    if (!apellido.trim()) {
      setError('Falta el apellido')
      return
    }
    const listaEditada = lista.map(
      (elemento) => elemento.id === id ? { id: id, nombre: nombre, apellido: apellido } : elemento
    )

    setLista(listaEditada)
    setModoEdicion(false)
    setNombre('')
    setApellido('')
    setId('')
    setError(null)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mt-2 mb-5">{modoEdicion ? 'Edición de usuario' : 'Registro de usuarios'}</h1>
          <form className="mb-3" onSubmit={modoEdicion ? editarDatos : guardarDatos}>
            {
              error ? (
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : null
            }
            <input type="text"
              placeholder="Ingrese el nombre"
              className="form-control mb-2 fs-4"
              onChange={(e) => { setNombre(e.target.value) }}
              value={nombre}
            />
            <input type="text"
              placeholder="Ingrese el apellido"
              className="form-control mb-4 fs-4"
              onChange={(e) => { setApellido(e.target.value) }}
              value={apellido}
            />
            <div className="d-grid gap-2">
              {
                modoEdicion ? <button className="btn btn-dark fs-4" type="submit">Editar</button> : <button className="btn btn-dark fs-4" type="submit">Agregar</button>
              }
            </div>
          </form>
        </div>
      </div>
      <hr />
      <div className="row mb-2">
        <div className="col-12">
          <h1 className="text-center mt-2 mb-5">Lista de usuarios</h1>
          <ul className="list-group fs-4">
            {lista.map(
              (elemento) => (
                <li className="list-group-item" key={elemento.id}>{elemento.nombre} {elemento.apellido}
                  <button className="btn btn-success float-end mx-2"
                    onClick={() => editar(elemento)}
                  >Editar</button>
                  <button className="btn btn-danger float-end mx-2"
                    onClick={() => eliminarDato(elemento.id)}
                  >Eliminar</button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
