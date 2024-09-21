
import './App.css';
import React,{useEffect, useState} from 'react';
import{MdDeleteSweep} from 'react-icons/md';
import { FaCheck } from "react-icons/fa";


function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setNewDescription]=useState("");
  const [CompletedTodos,setCompletedTodos]=useState([]);

const handleAddtodo=()=>{
  let newTodoItem={
    title:newTitle,
    description:newDescription
  }
  let updatedTodoARR=[...allTodos];
  updatedTodoARR.push(newTodoItem);
setTodos(updatedTodoARR);
localStorage.setItem('todolist',JSON.stringify(updatedTodoARR) );
};
const handleDeletetodo=(index)=>{
let reducedTodo=[...allTodos];
reducedTodo.splice(index);

localStorage.setItem('todolist',JSON.stringify(reducedTodo) )
setTodos(reducedTodo);
};
const handleComplete=(index)=>{
  let now= new Date();
  let dd=now.getDate();
  let mm= now.getMonth() +1 ;
  let yyy=now.getFullYear();
  let h= now.getHours();
  let m= now.getMinutes();
  let s=now.getSeconds();
  let CompletedOn= dd+'-'+mm+'-'+yyy+'at'+h+':'+m+':'+s;
  let filteredItem ={
    ...allTodos[index],
    CompletedOn:CompletedOn
  }
  let updatedCompletedARR=[...CompletedTodos];
  updatedCompletedARR.push(filteredItem);
  setCompletedTodos(updatedCompletedARR);
  handleDeletetodo(index);
};
useEffect(()=>{
  let savedTodo=JSON.parse(localStorage.getItem('todolist'));
  if(savedTodo){
    setTodos(savedTodo);
  }
},[]);

  return (
    <div className="App">
<h1>my todos</h1>
<div className='todo-wrapper'>
  <div className='todo-input'>
      <div className='todo-input-item'>
          <label>Title</label>
          <input type="text"  value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="what’s the task title ?"/>
      </div>
      <div className='todo-input-item'>
          <label>Discription</label>
          <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="what’s the task discription?"/>
      </div>
      <div className='todo-input-item'>
          <button type='button'onClick={handleAddtodo} className='primaryBtn'>Add</button>
      </div>
  </div>
  <div className='btn-area'>
    <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={()=> setIsCompleteScreen(false)}> Todo </button>
    <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=> setIsCompleteScreen(true)}>Completed</button>

  </div>
  <div className='todo-list'>
    {isCompleteScreen===false && allTodos.map((item,index)=>{
      return(
      <div className='todo-list-item'key={index}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div>
      <MdDeleteSweep className='icon' onClick={()=>handleDeletetodo(index)} title='Delete'/>
      <FaCheck className='checkicon' onClick={()=>handleComplete(index)} />
    </div>
    </div>
      );
    })}
    {isCompleteScreen===true && CompletedTodos.map((item,index)=>{
      return(
      <div className='todo-list-item'key={index}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p><small>Completed On:{item.CompletedOn}</small></p>

      <div>
      <MdDeleteSweep className='icon' onClick={()=>handleDeletetodo(index)} title='Delete'/>
    </div>
    </div>
      );
    })}
    
  
  </div>
</div>
    </div>
  );
}

export default App;
