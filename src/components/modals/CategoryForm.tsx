import React, { MouseEvent, useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CategoryPayload } from '../../api/product-category-api';
import ErrorField from '../ErrorField';

type Props = {
    data?: any,
    onSubmit: (data: CategoryPayload) => void,
    onClose: (e: MouseEvent<HTMLElement>) => void
};

const CategoryForm: React.FC<Props> = ({ data, onSubmit, onClose }) => {
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
            if(Object.keys(data).length !== 0){
                setdefaultValue(data)
            }
        }, [data, setdefaultValue])
        
        const onSubmitForm: SubmitHandler<CategoryPayload> = ({category_name, category_desc}) => {

            onSubmit({category_name, category_desc} as CategoryPayload )
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
                        <h3 className="text-xl font-medium text-white pb-4">{Object.keys(data).length !== 0? "Form Update Category" : "Form Create Category"}</h3>
    
                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="category_name" className="label-form">Name</label>
                                <input type="text" id="category_name" className="input-form" placeholder="Category Name" 
                                    {...register('category_name', {
                                        required: 'Category Name is required',
                                        maxLength: {value: 25, message: 'Category Name is too long'}
                                    })}
                                />
                                <ErrorField errors={errors} name='category_name' />
                            </div>
                            <div className="w-full">
                                <label htmlFor="category_desc" className="label-form">Description</label>
                                <input type="text" id="category_desc" className="input-form" placeholder="Category Description" 
                                    {...register('category_desc')}
                                />
                                <ErrorField errors={errors} name='category_desc' />
                            </div>
                        </div>
    
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

export default CategoryForm;