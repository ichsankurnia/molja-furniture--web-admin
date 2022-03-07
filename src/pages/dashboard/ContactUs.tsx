import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContactUsAPI, { ContactUsPayload } from '../../api/contactus-api';
import ErrorField from '../../components/ErrorField';

type Props = {};

const ContactUs: React.FC<Props> = () => {
    const [loader, showLoader] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)

    const navigate = useNavigate()

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm<any>({ criteriaMode: "all" });

    const setdefaultValue = useCallback((obj: any) => {
        Object.keys(obj).map(key => {
            return setValue(key, obj[key], { shouldValidate: true })
        })
    }, [setValue])


    const fetchData = useCallback( async () => {
        showLoader(true)
        const res = await ContactUsAPI.get()

        showLoader(false)
        console.log('Fetch ContactUs :', res)
        if(res.data){
            if(res.data.code === 0){
                setdefaultValue(res.data.data)
            } else if(res.data.code === 99){
                navigate('/auth')
            }else{
                toast.error(res.data.message)
            }
        }else{
            fetchData()
        }
    }, [navigate, setdefaultValue])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const onSubmitForm: SubmitHandler<ContactUsPayload> = async ({address, telp, email, whatsapp_number}) => {
        showLoader(true)
        const res = await ContactUsAPI.update({address, telp, email, whatsapp_number } as ContactUsPayload)

        showLoader(false)
        console.log('Fetch ContactUs :', res)
        if(res.data){
            if(res.data.code === 0){
                resetForm()
            } else if(res.data.code === 99){
                navigate('/auth')
            }else{
                toast.error(res.data.message)
            }
        }else{
            fetchData()
        }
    }

    const resetForm = () => {
        fetchData()
        setIsUpdate(false)
        showLoader(false)
    }

    return (
        <>
            <div className='flex item-center flex-col px-6 md:px-10 pt-10'>

                <div className='w-full bg-gray-700 rounded-lg shadow-xl pt-3 pb-5 md:p-6'>
                    <div className='flex items-center justify-between text-white px-8 pt-3 pb-8'>
                        <h2 className='font-semibold'>Manage Contact Us</h2>
                        <i className="ri-edit-box-line text-2xl hover:text-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer" onClick={()=>setIsUpdate(true)}></i>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <fieldset disabled={!isUpdate} className="px-6 pb-4 space-y-5 lg:px-8 sm:pb-6 xl:pb-8">

                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="address" className="label-form">Address</label>
                                <textarea id="address" placeholder="Jl. aaa no 123 cc ..." className="input-form" rows={3} {...register('address')} />
                                <ErrorField errors={errors} name='address' />
                            </div>
                            <div className="w-full">
                                <label htmlFor="telp" className="label-form">Telp</label>
                                <input type="text" id="telp" className="input-form" placeholder="021-123-xxxxx"
                                    {...register('telp', {
                                        required: 'Telp is required',
                                        pattern: { value: /^\d+$/, message: "Telp is number only." },
                                        minLength: { value: 7, message: "Telp must exceed 6 characters." },
                                        maxLength: { value: 14, message: "Telp too long." }
                                    })}
                                />
                                <ErrorField errors={errors} name='telp' />
                            </div>
                        </div>
                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="whatsapp_number" className="label-form">Whatsapp Number</label>
                                <input type="text" id="whatsapp_number" className="input-form" placeholder="0812345xxxxx"
                                    {...register('whatsapp_number', {
                                        pattern: { value: /^\d+$/, message: "Whatsapp Number is number only." },
                                        minLength: { value: 10, message: "Whatsapp Number must exceed 9 characters." },
                                        maxLength: { value: 14, message: "Whatsapp Number too long." }
                                    })}
                                />
                                <ErrorField errors={errors} name='whatsapp_number' />
                            </div>
                            <div className="w-full">
                                <label htmlFor="email-address" className="label-form">Email Address</label>
                                <input id="email-address" type="text" autoComplete="email" className="input-form" placeholder='purchasing@info.com'
                                    {...register("email", {
                                        required: 'Email Address is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address."
                                        }
                                    })} />
                                <ErrorField errors={errors} name='email' />
                            </div>
                        </div>


                        {/* <!-- Modal footer --> */}
                        {isUpdate &&
                        <div className="flex items-center pt-8 space-x-4">
                            <button type='submit' className="btn-primary px-7">Save</button>
                            <button type='reset' className="btn-secondary" onClick={resetForm}>Cancel</button>
                        </div>
                        }

                    </fieldset>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ContactUs;