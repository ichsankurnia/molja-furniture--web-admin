import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ClientPayload } from '../../api/home-api';

type Props = {
    data?: any,
    onSubmit: (data: ClientPayload) => void,
    onClose: (e: React.MouseEvent<HTMLElement>) => void
};

const ClientForm: React.FC<Props> = ({ data, onSubmit, onClose }) => {
        
        const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const { client_desc, client_name, image } = e.target as any

            const formData = new FormData()
            formData.append('client_name', client_name?.value)
            formData.append('client_desc', client_desc?.value)
            if(image?.value){
                formData.append('image', image?.files[0])
            }

            onSubmit(formData as ClientPayload)
        }
    
        return <>
            <div className="modal-form">
                <div className="modal-form-outside" onClick={onClose} />
                {/* <!-- Modal content --> */}
                <div className="w-11/12 md:w-3/5 bg-white rounded-lg shadow dark:bg-gray-700 z-50 overflow-y-auto" style={{ maxHeight: '90vh' }}>
    
                    <div className="flex justify-end p-2">
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
    
                    <form onSubmit={onSubmitForm} className="px-6 pb-4 space-y-5 lg:px-8 sm:pb-6 xl:pb-8">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white pb-4">{Object.keys(data).length > 0? "Form Update Client" : "Form Create Client"}</h3>
    
                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="client_name" className="label-form">Client Name</label>
                                <input type="text" defaultValue={data?.client_name} id="client_name" name='client_name' className="input-form" placeholder="Client Name" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="client_desc" className="label-form">Description</label>
                                <textarea defaultValue={data?.client_desc} id="client_desc" name="client_desc" className="input-form" placeholder="Client Description" />
                            </div>
                        </div>
                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="image" className="label-form">Image</label>
                                <input type="file" id="image" name='image' className="input-form" accept='image/jpeg,image/jpg,image/png'/>
                                {
                                    Object.keys(data).length > 0 &&
                                    <div className='flex flex-col mt-5 text-white'>
                                        <label>Old Image</label>
                                        <LazyLoadImage effect='blur' src={data?.image} alt='' className='h-32 mt-2' />
                                    </div>
                                }
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

export default ClientForm;