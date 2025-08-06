import React, { useState } from 'react'
import upload from '../assets/upload.png'
import change from '../assets/change.png'
import dashboard from '../assets/dashboard.png'
import logout from '../assets/logout.png'
import profile from '../assets/admin.png'
import Dashboard from '../components/Dashboard'
import Upload from '../components/Upload'
import Change from '../components/Change'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function Admin({ admin, setAdmin }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('');

    const tabContent = {
        dashboard: <Dashboard admin={admin} />,
        upload: <Upload admin={admin} />,
        change: <Change admin={admin} />,
    }

    const handleLogout = () => {
        setAdmin({
            name: '',
            iname: '',
        })
        navigate('/')
    }

    useEffect(() => {
        if (admin.name === '') {
            navigate('/');
        }
    }, [])

    return (
        <div className='flex w-full'>
            <div className="sidebar pt-3 h-full bg-slate-900 text-white sm:w-[300px] w-[120px]">
                {/* <ul>    
                    <div className="flex gap-10 flex-col mt-10 mx-4">
                        <div className="flex gap-2 font-bold">
                            <img src={dashboard} alt=""/>
                            <li><button>Dashboard</button></li>
                        </div>

                        <div className="flex gap-2 font-bold">
                            <img src={upload} alt=""/>
                            <li><button>Upload Certificate</button></li>
                        </div>

                        <div className="flex gap-2 font-bold">
                            <img src={change} alt=""/>
                            <li><button>Change Password</button></li>
                        </div>

                        <div className="flex gap-2 font-bold">
                            <img src={logout} alt=""/>
                            <li><button>Logout</button></li>
                        </div>
                    </div>
                    
                </ul> */}
                <div className="lg:flex lg:gap-4 sm:justify-center items-center sm:mx-4 mx-2 h-full font-bold text-[8px] sm:text-[16px]">
                    <div className='hidden lg:block'>
                        <ul className="flex flex-col gap-16 bg-slate-400 rounded-full py-4 px-2">
                            <li><img src={dashboard} alt="" /></li>
                            <li><img src={upload} alt="" /></li>
                            <li><img src={change} alt="" /></li>
                            <li><img src={logout} alt="" /></li>
                            <li><img src={profile} alt="" /></li>
                        </ul>
                    </div>
                    <div className=''>
                        <ul className="flex flex-col lg:gap-16 gap-5 py-4" >
                            <li><button onClick={() => setActiveTab('dashboard')}>Dashboard</button></li>
                            <li><button onClick={() => setActiveTab('upload')}>Upload Certificate</button></li>
                            <li><button onClick={() => setActiveTab('change')}>Change Password</button></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                            <li><button onClick={() => setActiveTab('admin')}>Admin</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-full">
                {tabContent[activeTab] || <Dashboard admin={admin}/>}
            </div>
        </div>
    )
}

export default Admin
