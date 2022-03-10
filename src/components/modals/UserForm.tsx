import React, { MouseEvent, useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserPayload } from '../../api/user-api';
import ErrorField from '../ErrorField';


const LIST_ROLE = [
	{ id: 99, name: 'Super Admin' },
	{ id: 1, name: 'Administrator' }
]

interface UserFormExtend extends UserPayload {
    confirm_password: string
}

type Props = {
    data?: any,
    onSubmit: (data: UserPayload) => void,
    onClose: (e: MouseEvent<HTMLElement>) => void
};

const UserForm: React.FC<Props> = ({ data, onSubmit, onClose }) => {
        const {
            register,
            formState: { errors },
            handleSubmit,
            setValue
        } = useForm<any>({ criteriaMode: "all" });

        const setdefaultValue = useCallback ((obj: any) => {
            Object.keys(obj).map(key => {
                return setValue(key, obj[key], { shouldValidate: true })
            })
        }, [setValue])

        useEffect(() => {
            console.log(data)
            if(Object.keys(data).length !== 0){
                setdefaultValue(data)
            }
        }, [data, setdefaultValue])
    
        
        const onSubmitForm: SubmitHandler<UserFormExtend> = ({fullname, username, password, confirm_password, email, role_id}) => {
            if(Object.keys(data).length === 0){
                if(password !== confirm_password){
                    toast.warning("Password not match")
                    return
                }
            }

            const payload = {
                fullname, username, password, email, role_id
            } as UserPayload

            if(Object.keys(data).length !== 0){
                delete payload.password
            }

            onSubmit(payload)
        }
    
        return <>
            <div className="modal-form">
                <div className="modal-form-outside" onClick={onClose} />
                {/* <!-- Modal content --> */}
                <div className="w-11/12 md:w-3/5 rounded-lg shadow bg-gray-700 z-50 overflow-y-auto" style={{ maxHeight: '90vh' }}>
    
                    <div className="flex justify-end p-2">
                        <button type="button" className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
                            onClick={onClose}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
    
                    <form onSubmit={handleSubmit(onSubmitForm)} className="px-6 pb-4 space-y-5 lg:px-8 sm:pb-6 xl:pb-8">
                        <h3 className="text-xl font-medium text-white pb-4">{Object.keys(data).length > 0? "Form Update User" : "Form Create User"}</h3>
    
                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="fullname" className="label-form">Fullname</label>
                                <input type="text" id="fullname" className="input-form" placeholder="Full Name" 
                                    {...register('fullname', {
                                        required: 'Fullname is required',
                                        maxLength: {value: 25, message: 'Fullname is too long'}
                                    })}
                                />
                                <ErrorField errors={errors} name='fullname' />
                            </div>
                            <div className="w-full">
                                <label htmlFor="username" className="label-form">Username</label>
                                <input type="text" id="username" className="input-form" placeholder="Username" 
                                    {...register('username', {
                                        required: 'Username is required',
                                    })}
                                />
                                <ErrorField errors={errors} name='username' />
                            </div>
                        </div>

                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="email-address" className="label-form">Email</label>
                                <input id="email-address" type="text" autoComplete="email" className="input-form" placeholder='Email Address'
                                {...register("email", {
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address."
                                    }
                                })} />
                                <ErrorField errors={errors} name='email' />
                            </div>
                            <div className="w-full">
                                <label htmlFor="role" className="label-form">Role</label>
                                <select id="role" className="input-form" {...register('role_id', {required: 'Role is required'})}>
                                    <option value=''>- Select Role -</option>
                                    {LIST_ROLE.map((item, key) =>
                                        <option key={key} value={item.id}>{item.name.toUpperCase()}</option>
                                    )}
                                </select>
                                <ErrorField errors={errors} name='role_id' />
                            </div>
                        </div>
    
                        {Object.keys(data).length===0 &&
                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="password" className="label-form">Passsword</label>
                                <input type="password" id="password" placeholder="••••••••" className="input-form" 
                                    {...register("password", {
                                            required: "Password is required.",
                                            minLength: { value: 5, message: "Password must exceed 4 characters."}
                                    })}
                                    />
                                <ErrorField errors={errors} name='password' />
                            </div>
                            <div className="w-full">
                                <label htmlFor="confirm_password" className="label-form">Confirm Password</label>
                                <input type="password" id="confirm_password" className="input-form" placeholder="••••••••" 
                                    {...register("confirm_password", { required: "Confirm password is required." })} />
                                <ErrorField errors={errors} name='confirm_password' />
                            </div>
                        </div>
                        }
    
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center pt-4 space-x-4">
                            <button type='submit' className="btn-primary px-7">Save</button>
                            <button type='reset' className="btn-secondary" onClick={onClose}>Cancel</button>
                        </div>
    
                    </form>
                </div>
            </div>
        </>
}

export default UserForm;