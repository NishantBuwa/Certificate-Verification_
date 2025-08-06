import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

function Login({setAdmin}) {

    const input='sm:w-[250px] w-[130px] border border-black outline-none rounded-[4px] sm:p-1 px-1 sm:text-[16px] text-[13px]'

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        iemail: '',
        password: '',
    })

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data: ", formData);
        handleApi();
        setFormData({
            iemail: '',
            password: '',
        })
    }

    const handleApi=async ()=>{
        try{
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json();
            console.log(data);
            if(data.success){
                setAdmin({
                    name:data.user.name,
                    iname:data.user.iname,
                    id:data.user.id
                })
                toast.success('Logged In Successfully')
                navigate('/admin')
            }else{
                toast.error('Invalid Credentials')
                navigate('/')
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='w-full flex justify-center items-center '>
            <div className=" h-full">
                <form onSubmit={onSubmit}>

                    <div className="flex flex-row mt-6 items-center">
                        <label className='w-[150px]'>Email:</label>
                        <input
                            type="email"
                            name="iemail"
                            value={formData.iemail}
                            onChange={onChange}
                            className={`${input}`}
                            required
                        ></input>
                    </div>

                    <div className="flex flex-row mt-6 items-center">
                        <label className='w-[150px]'>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            className={`${input}`}
                            required
                        />
                    </div>

                    <div className="w-full flex flex-col mt-6 sm:text-[16px] text-[13px]">
                        <button type="submit" className='mx-auto sm:w-[180px] w-[120px] bg-green-400 mt-5 text-center py-1 rounded-md border border-black'>Submit</button>
                        <Link to='/signup' className='mx-auto sm:w-[180px] w-[120px] bg-blue-600 mt-5 text-center py-1 rounded-md border border-black'>
                            Signup
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
