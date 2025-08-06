import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Signup({ setAdmin }) {

    const input = 'sm:w-[250px] w-[130px] border border-black outline-none rounded-[4px] p-1 sm:text-[16px] text-[13px]'

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        iname: '',
        iemail: '',
        employeeid: '',
        password: '',
        cpassword: '',
        plan: 'free',
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
        if (formData.password !== formData.cpassword) {
            toast.warn("Passwords Do Not Match");
            return
        }
        const email = formData.iemail
        if (email.includes("@gmail.com")) {
            toast.warn("Use Your Institution Email Address")
            return
        }

        handleApi();

        setFormData({
            name: '',
            iname: '',
            iemail: '',
            employeeid: '',
            password: '',
            cpassword: '',
            plan: 'free',
        })
    }

    const handleApi = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if (data.success) {
                console.log("data: ", data)
                console.log("Successfully Created Account");
                setAdmin({
                    name: data.user.name,
                    iname: data.user.iname,
                    id: data.user.id
                })
                toast.success('Account Created')
                navigate('/admin')
            } else {
                toast.error('Account Not Created')
                navigate('/')
            }
        } catch (err) {
            console.log("Error Occured: ", err)
        }
    }

    return (
        <div className='w-full flex justify-center items-center sm:text-[16px] text-[12px]'>
            <div className=" h-full">
                <form onSubmit={onSubmit}>

                    <div className="flex flex-row mt-6 items-center">
                        <label className='w-[150px]'>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            required
                            className={`${input}`}
                        />
                    </div>

                    <div className="flex flex-row mt-6 items-center">
                        <label className='w-[150px]'>Employee Email Address:</label>
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
                        <label className='w-[150px]'>Institution Name: </label>
                        <input
                            type="text"
                            name="iname"
                            value={formData.iname}
                            onChange={onChange}
                            className={`${input}`}
                            required
                        />
                    </div>

                    <div className="flex flex-row mt-6 items-center">
                        <label className='w-[150px]'>Employee-ID: </label>
                        <input
                            type="text"
                            name="employeeid"
                            value={formData.employeeid}
                            onChange={onChange}
                            className={`${input}`}
                            required
                        />
                    </div>

                    <div className="flex flex-row mt-6 items-center">
                        <label className='w-[150px]'>Password: </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            className={`${input}`}
                            required
                        />
                    </div>

                    <div className="flex flex-row mt-6 items-center">
                        <label className='w-[150px]'>Confirm Password: </label>
                        <input
                            type="password"
                            name="cpassword"
                            value={formData.cpassword}
                            onChange={onChange}
                            className={`${input}`}
                            required
                        />
                    </div>

                    <div className="flex flex-row mt-6 items-center">
                        <label className='w-[150px]'>Plan</label>
                        <select className={`${input}`}>
                            <option value="free"> Free</option>
                            <option value="standard">Standard</option>
                            <option value="premium">Premium</option>
                        </select>

                    </div>

                    <div className="w-full flex flex-col mt-6">
                        <button type="submit" className='mx-auto sm:w-[180px] w-[120px] bg-green-400 mt-3 text-center py-1 rounded-md border border-black'>Submit</button>
                        <Link to='/login' className='mx-auto sm:w-[180px] w-[120px] bg-blue-600 mt-5 text-center py-1 rounded-md border border-black'>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
