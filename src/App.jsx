import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showF, setShowF] = useState(true)

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
    let todos= JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleF=(params) => {
    setShowF(!showF)
  }
  

  const handleEdit = (e, id) => {
    let t=todos.filter(item=>item.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id != id
    });
    setTodos(newTodos);
    saveToLS();
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id != id
    });
    setTodos(newTodos);
    saveToLS();
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("");
    saveToLS();
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
      saveToLS();
  }



  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className='l'>CheckMate - Manage your ToDos </h1>
        <div className="addTodo">
          <h1>Add your ToDo</h1>
          <input onChange={handleChange} value={todo} className='t' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className='b'>Save</button>
        </div>
        <input onChange={toggleF} type="checkbox" className='ch' checked={showF}/> Show Finished
        <h2>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='no'>No Todos to display</div>}
          {todos.map(item => {


            return (showF || !item.isCompleted) && <div className="todo" key={item.id}>
              <div className='box'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className='check' />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button onClick={(e)=>handleEdit(e, item.id)} className='b'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='b'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
