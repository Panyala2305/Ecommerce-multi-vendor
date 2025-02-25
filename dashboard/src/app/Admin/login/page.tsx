"use client";
import { admin_login, messageClear } from "@/app/store/Reducers/authReducer";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '@/app/store';
import { PropagateLoader } from 'react-spinners';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Type for the login form state
interface LoginState {
    email: string;
    password: string;
}

const AdminLogin = () => {
    //const dispatch = useDispatch();
    const dispatch = useDispatch<AppDispatch>();
    //const {loader} = useSelector((state:any)=>state.auth)
    const { loader, errorMessage, successMessage } = useSelector((state: any) => state.auth)
    const router = useRouter()


    const [state, setState] = useState<LoginState>({
        email: "",
        password: ""
    });

    const overrideStyle = {
        display: 'flex',
        margin: '0 auto',
        height: '24px',
        justifyContent: 'center',
        alignItem: 'center'
    }


    const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(admin_login(state));
    };

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
           
               
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
           // router.push('/')
           router.push('/signup');
        }
    }, [errorMessage,successMessage])


    return (
        <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
            <div className="w-[350px] text-[#ffffff] p-2">
                <div className="bg-[#6f68d1] p-4 rounded-md">
                    <div className="h-[70px] flex justify-center items-center">
                        <div className="w-[180px] h-[50px]">
                            <img className="w-full h-full" src="/images/logo.png" alt="image" />
                        </div>
                    </div>

                    <form onSubmit={submit}>
                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={inputHandle}
                                value={state.email}
                                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                                type="email"
                                name="email"
                                placeholder="Email"
                                id="email"
                                required
                            />
                        </div>

                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={inputHandle}
                                value={state.password}
                                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                                type="password"
                                name="password"
                                placeholder="Password"
                                id="password"
                                required
                            />
                        </div>

                        {/* <button className="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
                            Login
                        </button> */}
                        <button disabled={loader ? true : false} className='bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                            {
                                loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Login'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
