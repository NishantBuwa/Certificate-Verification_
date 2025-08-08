import React from 'react'
import logo from '../assets/logo.png'
import { useState } from 'react'
import { toast } from 'react-toastify'

function Upload({admin}) {
    
    const [formData, setFormData] = useState({
        studentName: '',
        course: '',
        issueDate: '',
        certificateID: '',
    })

    const handleApi = async () => {
        try {
            const dataToSend={
                ...formData,
                issuedBy:admin.id
            }
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/certificate/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            const data = await res.json()
            // console.log(data)
            if(data.uploaded){
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error("Error Occured during uplaod: ")
        }
    }

    const label = 'sm:w-[150px] w-[50px] font-bold sm:text-[18px] text-[11px]'
    const input = 'sm:w-[200px] w-[120px] outline-none border border-black px-2 sm:py-[3px] py-0 sm:text-[15px] text-[10px]'


    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(formData);
        handleApi();
        setFormData({
            studentName: '',
            course: '',
            issueDate: '',
            certificateID: ''
        })
    }



    return (
        <div className="sm:h-full h-auto sm:mt-0 mt-10 flex justify-center sm:items-center">
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-slate-400 sm:p-10 p-5 rounded-xl justify-center items-center'>

                <div className="flex items-center sm:gap-0 gap-2">
                    <label className={`${label}`}>Student Name: </label>
                    <input type="text" name='studentName' onChange={onChangeHandler} value={formData.studentName} className={`${input}`} required />
                </div>

                <div className="flex items-center sm:gap-0 gap-2">
                    <label className={`${label}`}>Course: </label>
                    <input type="text" name='course' onChange={onChangeHandler} value={formData.course} className={`${input}`} required />
                </div>

                <div className="flex items-center sm:gap-0 gap-2">
                    <label className={`${label}`}>Issue Date: </label>
                    <input type="date" name='issueDate' onChange={onChangeHandler} value={formData.issueDate} className={`${input}`} required />
                </div>

                <div className="flex items-center sm:gap-0 gap-2">
                    <label className={`${label}`}>Certificate ID: </label>
                    <input type="text" name='certificateID' onChange={onChangeHandler} value={formData.certificateID} className={`${input}`} required />
                </div>
                <button type="submit" className='w-[130px] bg-green-600 text-white py-[3px] rounded-lg'>Submit</button>
            </form>
        </div>
    )
}

export default Upload