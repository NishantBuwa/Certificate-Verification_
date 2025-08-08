import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};


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
        plan: 'basic',
    })

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        // Match Password
        if (formData.password !== formData.cpassword) {
            toast.warn("Passwords Do Not Match");
            return;
        }

        // Use Institution Mail
        if (formData.iemail.includes("@gmail.com")) {
            toast.warn("Use Your Institution Email Address");
            return;
        }

        // Load Razorpay script
        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
            toast.error("Failed to load Razorpay");
            return;
        }

        await startPayment();
    };

    const startPayment = async () => {

        const amount = (formData.plan === 'basic') ? 5000 : ((formData.plan === 'standard') ? 7499 : 10000)
        try {
            
            const orderRes = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount })
            });

            const orderData = await orderRes.json();
            const options = {
                key: process.env.REACT_APP_TEST_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                order_id: orderData.id,
                name: "Certificate Verification",
                description: "Admin Registration",
                prefill: {
                    name: formData.name,
                    email: formData.iemail,
                },
                theme: {
                    color: "#3399cc",
                },
                handler: async function (response) {
                    await handleSignupAfterPayment(response);
                },
                modal: {
                    ondismiss: function () {
                        toast.error("Payment Cancelled");
                        navigate("/");
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            // console.log("Payment Init Error:", error);
            // toast.error("Something went wrong with payment.");
        }
    };


    const handleSignupAfterPayment = async (paymentResponse) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success) {
                setAdmin({
                    name: data.user.name,
                    iname: data.user.iname,
                    id: data.user.id
                });

                toast.success("Account Created Successfully!");
                navigate("/admin");
            } else {
                toast.error("Account Creation Failed!");
                navigate("/");
            }

        } catch (error) {
            // console.log("Signup Error After Payment:", error);
            toast.error("Something went wrong.");
        }
    };


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
                        <select className={`${input}`}
                            type="test"
                            name="plan"
                            value={formData.plan}
                            onChange={onChange}
                        >
                        <option value="basic"> Basic</option>
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
            </div >
        </div >
    )
}

export default Signup
