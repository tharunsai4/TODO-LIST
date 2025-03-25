import React, { useEffect, useState } from 'react'

const App = () => {
  
  const [inputField,setInputField] = useState("");
  const[todos,setTodos] = useState(()=>{
    const savedList = localStorage.getItem("todos");
    return savedList ? JSON.parse(savedList) : []
  });

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  
  const deleteHandle = (index) =>{
    setTodos(todos.filter((_,i) => index !==i))
  };

  const addHandle = () =>{
    if(inputField.trim()){
      setTodos([...todos,inputField])
      setInputField("")
    }
    ///event working
  }

 const handleKeyPress = (event) =>{
  if(event.key === "Enter"){
    addHandle()
  }
 };

 const handleUp = (index) =>{
  if(index > 0){
    const update = [...todos];
    [update[index],update[index-1]] = [update[index-1],update[index]]
    setTodos(update)
  }
 };

 const downHandle = (index) =>{
  if(index < todos.length -1){
    const update = [...todos];
    [update[index],update[index+1]] = [update[index+1],update[index]]
    setTodos(update)
  }
 }
  
  return (
    <div className='grid items-center justify-center w-screen px-2 py-2'>
    <div className='bg-cyan-700 rounded '>
      <h1 className='font-bold m-3'>TO-DO LIST</h1>
      <input className='border m-2 border-black' value={inputField} placeholder='enter' onChange={(e)=>setInputField(e.target.value)} onKeyDown={handleKeyPress}></input>
      <button  className="bg-green-500 m-2 rounded text-white" onClick={addHandle} >ADD</button>
      <div className='bg-white rounded p-3 border border-black'>
      {todos.map((list,index) =>(
        <li key={index}>{list}
        <button className='bg-red-500 m-3 rounded px-1' onClick={() =>deleteHandle(index)}>DELETE</button>
        <button onClick={()=>handleUp(index)} className='border rounded m-1 px-1 py-1'>UP</button>
        <button onClick={()=>downHandle(index)} className='border rounded px-1 py-1'>Down</button>
        </li>
      ))}
      </div>
    </div>
    </div>
  )
}

export default App
