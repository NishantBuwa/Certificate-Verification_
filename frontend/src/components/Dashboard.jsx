import React from 'react'
import { useState, useEffect } from 'react'
import search from '../assets/search.png'
import { toast } from 'react-toastify'

function Dashboard({admin}) {
    const small_div='xl:h-[250px] xl:w-[280px] sm:w-[210px] w-[170px] sm:h-[220px] h-[140px] xl:px-5 px-4 rounded-xl py-3 bg-black shadow-2xl flex flex-col'
    const [cerId, setCerId] = useState('')

    const [responseData, setResponseData]=useState({
        totalByInstitute:'',
        totalByYou:''
    })

    const handleApi = async () => {
        const dataToSend = {
            name: admin.name,
            iname: admin.iname
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/dashboard/data`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            const data = await res.json()
            console.log(data)
            if(data.success){
                setResponseData({
                    totalByInstitute:data.data.totalByInstitute,
                    totalByYou:data.data.totalByYou
                })
            }
        } catch (err) {
            console.log("Error Occured during api: ", err)
        }
    }

    const searchApi=async ()=>{
        try{
            const dataToSend={
                certificateID:cerId
            }
            console.log(dataToSend)
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/dashboard/search`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(dataToSend)
            })
            const data = await res.json()
            if(data.valid){
                toast.info(`Student Name: ${data.data.studentName}`)
            }else{
                toast.error(`${data.message}`)
            }
             setCerId('')
        }catch(err){
            setCerId('')
            toast.error("Error occured during searching the Certificate")
        }
    }
    
    useEffect(()=>{
        handleApi();
    },[])

    return (
        <div className='h-full w-auto flex items-center bg-red-500'>
            <div className="sm:mx-auto big-card xl:h-[350px] xl:w-[1000px] w-[auto] xl:bg-slate-400 rounded-2xl flex lg:gap-8 gap-7 items-center justify-center flex-wrap text-white">
                <div className={`${small_div} items-center gap-5`}>
                    <h1 className='font-bold xl:text-xl sm:text-base text-[12px]'>Total Certificate Issued By Your Institute :</h1>
                    <p className='text-center xl:text-6xl sm:text-4xl text-2xl h-full'>{responseData.totalByInstitute}</p>
                </div>
                <div className={`${small_div} items-center gap-5`}>
                    <h1 className='font-bold xl:text-xl sm:text-base text-[12px]'>Total Certificate Issued By Nishant :</h1>
                    <p className='text-center xl:text-6xl sm:text-4xl text-2xl h-full'>{responseData.totalByYou}</p>
                </div>
                <div className={`${small_div} sm:gap-9 gap-6`}>
                    <h1 className='font-bold xl:text-xl sm:text-base text-[12px]'><label htmlFor="cerid">Search Certificate By ID: </label></h1>
                    <label htmlFor="" className='xl:text-[20px] sm:text-[15px] text-[12px]'>Enter Certificate ID:</label>
                    <div className="mt-[-20px] flex items-center justify-between">
                        <input type="text" className='outline-none border border-black sm:px-2 px-1 xl:py-1 text-black xl:w-auto w-[100px]' value={cerId} onChange={(e)=>setCerId(e.target.value)}/>
                        <button type="button" onClick={searchApi}><img src={search} className='invert' height="20px" width="20px"  alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
