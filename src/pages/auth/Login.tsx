import React, { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import ErrorField from '../../components/ErrorField';
import appLogo from '../../assets/img/applogo.png'
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginAPI, LoginPayload } from '../../api/common-api';
import { toast } from 'react-toastify';

type Props = {};

const Login: React.FC<Props> = () => {

    const navigate = useNavigate()

    const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<LoginPayload>({ criteriaMode: "all" });

    useEffect(() => {
        localStorage.clear()
    }, [])

	const onSubmitForm: SubmitHandler<LoginPayload> = async (data) => {

        const res = await loginAPI(data as LoginPayload )
        console.log("Login :", res)
        if(res.data){
            if(res.data.code === 0){
                const data = res.data.data
                const dataUser = {
                    id: data.role_id,
                    username: data.username,
                    fullname: data.fullname,
                    email: data.email,
                    role_id: data.role_id,
                    last_login_on: data.last_login_on
                }

                localStorage.setItem('dataUser', JSON.stringify(dataUser))
                localStorage.setItem('authToken', data.token)
                navigate('/dashboard', {replace: true})
            }else{
                toast.error(res.data.message)
            }
        }else{
            toast.error('Connection timeout..')
        }
	}


    return (
        <>
            <div className="h-full flex flex-col justify-center items-center space-y-8">

                <LazyLoadImage effect='blur' src={appLogo} className='w-20 h-20 mx-auto' />

                <div className='text-center'>
                    <h1 className="text-2xl md:text-3xl font-extrabold">Sign in to your account</h1>
                    <p className="mt-5">Molja Furniture admin dashboard</p>
                </div>

                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-7 px-3 md:px-0 w-11/12 md:w-7/12">
                    <div>
                        <label className="font-semibold" htmlFor="username">Username</label>
                        <input id="username" type="text" autoComplete="username" className="text-input"
                            {...register("username", {
                                required: "username is required."
                            })} />
                        <ErrorField errors={errors} name='username' />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="password">Password</label>
                        <input id="password" type="password" autoComplete="current-password" className="text-input"
                            {...register("password", {
                                required: "Password is required.",
                                minLength: { value: 5, message: "Password must exceed 4 characters." }
                            })} />
                        <ErrorField errors={errors} name='password' />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block font-medium cursor-pointer">Remember me</label>
                        </div>
                    </div>

                    <button type='submit' className="btn-submit" >
                        Sign In
                    </button>

                </form>

                <div className='font-medium text-sm flex items-center justify-center text-dark'>
                    © Molja Furniture v1.0
                </div>

            </div>
        </>
    );
}

export default Login;