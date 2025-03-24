import React,{useState,useEffect} from 'react'
import axios from "axios"

function TodoList() {
 const[todos,setTodos]=useState([]);
 const[newTodo,setNewTodo]=useState("");

useEffect(()=>{
    axios.get("http://localhost:5000/todos").then((response)=>{
        setTodos(response.data);
    });
},[]);

const addTodo =() =>{
    if(newTodo.trim()==="")return;
    axios.post("http://localhost:5000/todos",{title:newTodo}).then((response)=>{
        setTodos([...todos,response.data]);
        setNewTodo("");
    });
};

const toggleComplete =(id,completed)=>{
    axios.put(`http://localhost:5000/todos/${id}`,{completed:!completed}).then(()=>{
        setTodos((prevTodo)=>
            prevTodo.map((todo)=>
            todo.id===id?{...todo,completed:!completed}:todo
            )
        );
    });
};

const deleteTodo =(id)=>{
    axios.delete(`http://localhost:5000/todos/${id}`).then(()=>{
        setTodos(todos.filter((todo)=>todo.id!==id));
    });

};


 
    return (
    <div style={{textAlign:'center',marginTop:'20px'}}>
        <h1>To Do List</h1>
        <input type="text" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}
        placeholder='Add a new task' 
        />
        <button onClick={addTodo}>Add</button>
         <ul>
         {todos.map((todo)=>(
            <li key={todo.id} style={{textDecoration:todo.completed?"line-through":"none"}}>
                {todo.title}
                <button onClick={()=>toggleComplete(todo.id,todo.completed)}>
                    {todo.completed?"Undo":"Complete"}
                </button>
                <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
            </li>
         ))}    
            
        </ul>   

    </div>
  )};

export default TodoList
