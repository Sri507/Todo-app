import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Todo = () => {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [editTitle,setEditTitle] = useState('');
  const [editDescription,setEditDescription] = useState('');
  const [task,setTask] = useState([]);
  const [editId,setEditId] = useState(-1);
  const url = 'https://todo-app-backend-m6di.onrender.com';
  
  function handleSubmit(){
    axios.post(`${url}/todos`,{
      title:title,
      description:description,
    })
    .then(res=>{
      console.log(res.status);
    })
    .catch(err=>{
      console.log(err);
    })
    setTimeout(()=>{
      setTitle('');
      setDescription('');
    },500)
  }
  useEffect(()=>{
    getItems();
  },[task])
  function getItems(){
    axios.get(`${url}/todos`)
    .then(res=>setTask(res.data))
    .catch(err=>{
      console.log(err);
    })
  }

  function handleEditId(item){
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  }
  

  function handleUpdate(){
    const id = editId;
    console.log(id);
    axios.put(`${url}/update/`+id,{
      title:editTitle,
      description:editDescription
    })
    .then(res=>{
      console.log(res.status)
    })
    .catch(err=>{
      console.log(err);
    })
    setTimeout(()=>{
      setEditId(-1);
      setEditTitle('');
      setEditDescription('');
    },500);
  }
  
  function handleDelete(id){
    if(window.confirm('Are you sure you want to delete?')){
      axios.delete(`${url}/delete/`+id)
      .then(res=>{
        console.log(res.status);
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
  

  return (
    <>
      <div className='bg-danger p-2'>
        <h1 className='text-white p-2 m-5'>Todo List</h1>
          {
            editId === -1 ?
            task.length > 9 ? 
            <div className='text-dark fs-2 p-2 m-5'>Limit reached,Delete before adding.</div> : 
            <div className="d-flex gap-4 p-2 m-5">
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="form-control w-25" placeholder="title"/>
              <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className="form-control w-25" placeholder="description"/>
              <button className="btn btn-primary" type="button" onClick={()=>{handleSubmit()}}>Submit</button>
            </div>
            :
            <div className="d-flex gap-4 p-2 m-5">
              <input type="text" value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} className="form-control w-25" placeholder="title"/>
              <input type="text" value={editDescription} onChange={(e)=>setEditDescription(e.target.value)} className="form-control w-25" placeholder="description"/>
              <button className="btn btn-primary" type="button" onClick={()=>{handleUpdate()}}>Update</button>
              <button className="btn btn-primary" type="button" onClick={()=>{setEditId(-1)}}>Cancel</button>
            </div>
          }
      </div >
        <div className='p-2 m-5'>
          {
            task.length > 0 ?
            <div>
                {
                  task.map((item,index)=>(
                    <div className="accordion accordion-flush w-50"  key={index}>
                      <div className="accordion-item p-2">
                        <h2 className="accordion-header d-flex">
                          <button className="accordion-button collapsed border-bottom" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapseOne"+index.toString()} aria-expanded="false" aria-controls="flush-collapseOne">
                            {item.title}
                          </button>
                          <button onClick={()=>{handleEditId(item)}} type="button" className="btn btn-outline-secondary mx-2">Edit</button>
                          <button onClick={()=>{handleDelete(item._id)}} type="button" className="btn btn-outline-danger">Delete</button>
                        </h2>
                        <div id={"flush-collapseOne"+index.toString()} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                          <div className="accordion-body">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
            </div>
            :
            <div className='fs-2'>No task</div>
          }
        </div>
    </>
  )
}

export default Todo
