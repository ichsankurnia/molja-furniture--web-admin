import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ProductPayload } from '../../api/product-api';
import { CategoryPayload } from '../../api/product-category-api';

type Props = {
    data: any,
    categories: CategoryPayload[],
    onSubmit: (data: ProductPayload) => void,
    onClose: (e: React.MouseEvent<HTMLElement>) => void
};

const ProductForm: React.FC<Props> = ({ data, categories, onSubmit, onClose }) => {
        
        const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const { name, description, images, dimention, button, category_id } = e.target as any

            const formData = new FormData()
            formData.append('name', name?.value)
            formData.append('description', description?.value)
            formData.append('dimention', dimention?.value)
            formData.append('button', button?.value)
            formData.append('category_id', category_id?.value)
            if(images?.value){
                for (let i = 0; i < images.files.length; i++) {
                    await formData.append('images', images.files[i])
                }
            }

            onSubmit(formData as ProductPayload)
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
                                <label htmlFor="name" className="label-form">Title</label>
                                <input type="text" defaultValue={data?.name} id="name" name='name' className="input-form" placeholder="Title" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="description" className="label-form">Description</label>
                                <textarea defaultValue={data?.description} id="description" name="description" className="input-form" placeholder="Description" />
                            </div>
                        </div>
                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="dimention" className="label-form">Dimention</label>
                                <input type="text" defaultValue={data?.dimention} id="dimention" name='dimention' className="input-form" placeholder="Dimention" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="button" className="label-form">Button</label>
                                <input defaultValue={data?.button} id="button" name="button" className="input-form" placeholder="Button Title" />
                            </div>
                        </div>
                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="images" className="label-form">Images</label>
                                <input type="file" id="images" name='images' className="input-form" accept='image/jpeg,image/jpg,image/png' multiple />
                            </div>
                            <div className="w-full">
                                <label htmlFor="category_id" className="label-form">Category</label>
                                <select id="category_id" name='category_id' className="input-form" defaultValue={data?.category_id}>
                                    <option value=''>- Select Category -</option>
                                    {categories.map((item, key) =>
                                        <option key={key} value={item.id}>{item.category_name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                {
                                    Object.keys(data).length > 0?
                                    data?.images?.length > 0?
                                    <div className='flex flex-col mt-5 text-white'>
                                        <label>Old Image</label>
                                        <div className='md:space-x-10 space-y-5'>
                                            {data.images.map((image: any, key: number) =>
                                                <LazyLoadImage key={key} src={image} alt='' effect='blur' className='mx-1 md:m-0 h-24 border border-gray-100 rounded-md'  />
                                            )}
                                        </div>
                                    </div>
                                    :
                                    <div>Image doesnt exist</div>
                                    : null
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

export default ProductForm;