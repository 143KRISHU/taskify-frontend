import React, { useState } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import backendRoutesAPI from '../BackendAPiEndPoints/Api';

function CreateBoardForm({onClose,refresh}) {
    const[boardName,setBoardName]=useState("")
    // data to send to backend
    const data = {
      boardName : boardName,
    }

  // For creatinng board 
  const handleSubmit = async()=>{
        if(boardName !== ''){
          const backendResponse = await fetch(backendRoutesAPI.board.create_board.url,{
            method:backendRoutesAPI.board.create_board.method,
            credentials:"include",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(data)
          })
          const finalResponse = await backendResponse.json()
          console.log(finalResponse)
          if(finalResponse.success){
            alert(finalResponse.message)
            onClose()
            refresh()
          }
          else{
            alert(finalResponse.message)
            onClose()
            refresh()
          }
        }
        else{
          alert('Board Name is required')
        }
        
  }
  return (
    <div className='absolute bg-slate-500 bg-opacity-40 top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
      <div className='bg-[#caf0f8] shadow-2xl p-10 rounded-2xl'>
        <form className='flex flex-col' >
          <div className="grid gap-4 mt-2 mb-2">
            <label className="text-xl text-center font-semibold" htmlFor='boardName'>Board Name:&nbsp;&nbsp;  </label>
            <div className='bg-slate-100 p-2'>
              <input type='text' id='boardName' placeholder='Enter Board Name' value={boardName} onChange={(e)=>setBoardName(e.target.value)}
                className='w-full h-full outline-none  bg-transparent' name='boardName' />
            </div>
            <div className="btns flex justify-between items-center px-6">
              <IoCloseCircle className='text-5xl text-[red]  cursor-pointer' onClick={()=>onClose()} />
              <FaCircleCheck className='text-4xl text-[green] cursor-pointer' onClick={()=>handleSubmit()} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBoardForm

