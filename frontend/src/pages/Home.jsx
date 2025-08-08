import React, { useState, useEffect } from 'react'
import cer1 from '../assets/cer1.png'
import cer2 from '../assets/cer2.png'
import Data from '../assets/Data.json'
import { Link } from 'react-router-dom'
import bg from '../assets/bg.png'
import { toast } from 'react-toastify'

function Home() {

    const input = 'sm:w-[250px] w-[130px] border border-black outline-none rounded-[4px] sm:p-1 px-2 sm:text-[16px] text-[13px] '

    const [data, setData] = useState({
        studentName: '',
        certificateID: '',
        course: '',
        issueDate: ''
    })

    useEffect(() => {
        const startServer = async () => {
            try {
                const data = await fetch(`${REACT_APP_API_URL}/start`);
                const res = await data.json();
                if (res) {
                    // toast.success('Server Started');
                }
            } catch (err) {
                // console.log(err);
            }
        }
        startServer()
    }, [])

    const handleApi = async () => {
        const dataToSend = {
            ...data
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/certificate/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            const resData = await res.json();
            if (resData.valid === true) {
                // console.log(resData.details.issuedBy, resData.details.issuedFrom)
                toast.success(`${resData.message}. Issued By: ${resData.details.issuedBy} (${resData.details.issuedFrom})`)
            } else if (resData.valid === false) {
                toast.error(`${resData.message}, Original Holder: ${resData.details.studentName}`)
            } else {
                toast.error(`${resData.message}`)
            }
        } catch (err) {
            // console.log("Error occured during verification: ", err)
        }
    }

    const handleOnChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Form Data: ", data);
        await handleApi()
        setData({
            studentName: '',
            certificateID: '',
            course: '',
            issueDate: ''
        })
    }

    return (

        <div className='h-full w-full'>

            {/* SECTION-1 */}

            <div className="w-full bg-fixed" style={{ backgroundImage: `url(https://www.shutterstock.com/image-vector/white-polygon-background-vector-square-600nw-2240811909.jpg)` }}>
                <div className=" content h-[100%] xl:w-[100%] lg:w-[1000px] md:w-[700px] w-full m-3 mt-0 mx-auto flex md:flex-row flex-col items-center justify-evenly">
                    <div className="md:mt-[13px] mt-5">
                        <img src={cer1} alt="Dummy Certificate-1" className="md:max-w-[400px] md:w-full w-[280px] rotate-[350deg] mt-2" />
                        <img src={cer2} alt="Dummy Certificate-2" className="md:max-w-[400px] md:w-full w-[260px] rotate-[10deg] mb-10" />
                    </div>
                    <div className="p-3 lg:w-[615px] md:w-[400px] w-full md:mt-0 mt-10 ">
                        <h1 className='sm:text-4xl text-2xl font-bold text-center underline text-blue-600'>BLOCKCHAIN CERTIFICATE<br />VERIFICATION</h1>
                        <p className='sm:mt-8 mt-3 lg:w-[550px] md:w-[350px] w-[full]'>A system to issue, store, and verify educational or professional certificates digitally using blockchain, so they cannot be faked or tampered with.</p>

                        <h1 className='text-2xl font-bold ml-[40px] mt-7'>Key Features : </h1>
                        <ol className='list-disc ml-[40px]'>
                            <li>Tamper-proof certificates: Stored securely on blockchain.</li>
                            <li>Instant verification: Anyone can check the validity online.</li>
                            <li>Transparency: Easy tracking of issuing and verification.</li>
                        </ol>

                        <h1 className='text-2xl font-bold ml-[40px] mt-7'>How It Works</h1>
                        <ol className='list-disc ml-[40px]'>
                            <li className='lg:w-[570px] md:w-[350px] w-[full]'>The institution issues a certificate with a unique verification ID.</li>
                            <li className='lg:w-[570px] md:w-[350px] w-[full]'>The certificate's details are recorded on a secure blockchain.</li>
                            <li className='lg:w-[570px] md:w-[350px] w-[full]'>Anyone can enter the verification ID below to instantly confirm the certificate's validity—simple, secure, and tamper-proof.</li>
                        </ol>

                    </div>
                </div>
            </div>

            {/* SECTION-2 */}



            <div className="bg-slate-900 h-auto sm:pb-16 pb-10">
                <h1 className='sm:text-4xl text-2xl font-bold text-center underline text-blue-600 sm:pt-24 pt-16'>PRICING PLANS FOR INSTITUTIONS</h1>
                <div className="mx-auto flex flex-wrap gap-y-10 justify-around flex-row lg:flex-row mt-10 xl:w-[1280px] w-full gap-x-4 text-white p-6">
                    {Data.map((item, index) => (
                        <div key={index} className="h-[400px] w-[300px] rounded-md shadow-md shadow-white bg-slate-700 flex flex-col justify-between overflow-hidden">
                            <div className="py-3 px-1">
                                <h2 className='text-2xl text-center font-bold'>{item.heading}</h2>
                                <p className='text-2xl text-center font-bold text-emerald-400'>{item.price}</p>
                                <h3 className='mt-4 italic ml-2'>{item.subheading}</h3>
                                <ul className='mt-3 pl-4 space-y-2 ml-2'>
                                    {item.points.map((point, idx) => (
                                        <li key={idx} className='list-disc list-outside'>{point}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="px-0">
                                <Link to='/signup'>
                                    <button type='button' className='w-full bg-black mb-0 py-2 text-blue-600'>Check Out ➡️</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SCECTION-3 */}

            <div className="sm:h-full sm:pb-0 pb-20 bg-cover sm:bg-center bg-fixed text-black" style={{ backgroundImage: `url(${bg})` }}>
                <h1 className='text-3xl text-center sm:pt-20 pt-10 font-bold text-blue-600'>CHECK CERTIFICATE AUTHENTICITY</h1>
                <p className='text-center font-bold mt-2 sm:p-0 px-8 py-2'>Just Enter the Verification ID and check your certificate is Valid or Not</p>

                <div >
                    <form className="flex flex-col items-center mt-6 gap-5" onSubmit={handleSubmit}>

                        <div className="flex flex-row">
                            <label className='w-[150px] sm:text-[16px] text-[13px] '>Name: </label>
                            <input
                                type='text'
                                name='studentName'
                                value={data.studentName}
                                onChange={handleOnChange}
                                className={`${input}`}
                                required
                            />
                        </div>

                        <div className="flex flex-row">
                            <label className='w-[150px] sm:text-[16px] text-[13px] '>Course: </label>
                            <input
                                type='text'
                                name='course'
                                value={data.course}
                                onChange={handleOnChange}
                                className={`${input}`}
                                required
                            />
                        </div>

                        <div className="flex flex-row">
                            <label className='w-[150px] sm:text-[16px] text-[13px] '>Issue Date: </label>
                            <input
                                type='date'
                                name='issueDate'
                                value={data.issueDate}
                                onChange={handleOnChange}
                                className={`${input}`}
                                required
                            />
                        </div>

                        <div className="flex flex-row">
                            <label className='w-[150px] sm:text-[16px] text-[13px] '>Certificate ID: </label>
                            <input
                                type='text'
                                name='certificateID'
                                value={data.certificateID}
                                onChange={handleOnChange}
                                className={`${input}`}
                                required
                            />
                        </div>

                        <button type="submit" className='mx-auto sm:w-[180px] w-[120px] bg-green-400 mt-6 text-center py-1 rounded-md border border-black' >Submit</button>
                    </form>
                </div>
                {/* <div className="w-full flex flex-col items-center mt-7 ">
                    <div className="flex gap-2 items-center">
                        <h1 className='w-[120px] font-bold text-[13px]'>Student Name: </h1>
                        <p className='w-[120px] text-[14px]'>Vijay</p>
                    </div>
                    <div className="flex gap-2">
                        <h1 className='w-[120px] font-bold text-[13px]'>Issued By: </h1>
                        <p className='w-[120px] text-[14px]'>Nishant</p>
                    </div>
                    <div className="flex gap-2">
                        <h1 className='w-[120px] font-bold text-[13px]'>Issued From: </h1>
                        <p className='w-[120px] text-[14px]'>GEC Ajmer</p>
                    </div>
                    <div className="flex gap-2">
                        <h1 className='w-[120px] font-bold text-[13px]'>Issued Date: </h1>
                        <p className='w-[120px] text-[14px]'>2025-08-05</p>
                    </div>

                </div> */}
            </div>
        </div>
    )
}

export default Home