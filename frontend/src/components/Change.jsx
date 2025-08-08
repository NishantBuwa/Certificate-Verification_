import React from 'react'
import { useState } from 'react'

function Change() {

    const [formData, setFormData] = useState({
        previousPassword: '',
        newPassword: '',
    })
    
    // const handleApi = async () => {
    //     try {
    //         const res = await fetch('https://localhost/3000/api/certificate/upload', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             data: JSON.stringify(formData)
    //         })
    //         const data = await res.json()
    //         alert(data.message)
    //     } catch (err) {
    //             console.log("Error Occured during uplaod: ", err)
    //     }
    // }
    
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
        alert('Previous password is wrong')
        setFormData({
            previousPassword: '',
            newPassword: '',
        })
    }

    return (
       <div className="sm:h-full h-auto sm:mt-0 mt-10 flex justify-center sm:items-center">
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-slate-400 sm:p-10 p-5 rounded-xl justify-center items-center'>

                <div className="flex items-center sm:gap-0 gap-2">
                    <label className={`${label}`}>Enter Previous Password: </label>
                    <input type="password" name='previousPassword' onChange={onChangeHandler} value={formData.previousPassword} className={`${input}`} required />
                </div>

                <div className="flex items-center sm:gap-0 gap-2">
                    <label className={`${label}`}>Enter New Password: </label>
                    <input type="password" name='newPassword' onChange={onChangeHandler} value={formData.newPassword} className={`${input}`} required />
                </div>

                <button type="submit" className='w-[130px] bg-green-600 text-white py-[3px] rounded-lg'>Submit</button>
            </form>
        </div>
    )
}
export default Change