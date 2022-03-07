import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';
import ProductAPI, { ProductPayload } from '../../api/product-api';
import { CategoryPayload } from '../../api/product-category-api';

type Props = {
    productID: any,
    categories: CategoryPayload[],
    onClose: (e: React.MouseEvent<HTMLElement>) => void
};

interface ProductPayloadExtend extends ProductPayload {
    created_on: string,
    updated_on: string
}

const DetailProduct: React.FC<Props> = ({ productID, categories, onClose }) => {
    const [dataProduct, setDataProduct] = useState<ProductPayloadExtend>()

    useEffect(() => {

        async function fetchData() {
            const res = await ProductAPI.getOne(productID)

            console.log('Fetch Product :', res)
            if (res.data) {
                if (res.data.code === 0) {
                    setDataProduct(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            } else {
                toast.error('Connection timeout...')
            }
        }

        fetchData()

    }, [productID])

    return (
        <>
            <div className="modal-form">
                <div className="modal-form-outside" onClick={onClose} />
                {/* <!-- Modal content --> */}
                <div className="w-11/12 md:w-8/12 bg-white text-white rounded-lg shadow dark:bg-gray-700 z-50 overflow-y-auto" style={{ maxHeight: '90vh' }}>

                    <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                            Detail of Product
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>

                    <div className='p-6 md:p-10'>
                        <div className='text-lg'>
                            <table>
                                <tbody>
                                    <tr className='font-semibold mb-5'>
                                        <td>Product Name</td>
                                        <td>: {dataProduct?.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>: {dataProduct?.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Category</td>
                                        <td>: {categories.find((data) => data.id === dataProduct?.category_id)?.category_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Dimention</td>
                                        <td>: {dataProduct?.dimention}</td>
                                    </tr>
                                    <tr>
                                        <td>Title Button</td>
                                        <td>: {dataProduct?.button}</td>
                                    </tr>
                                    <tr>
                                        <td>Created On</td>
                                        <td>: {moment(dataProduct?.created_on).format('yyyy-MM-DD HH:mm:ss')}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>Images</p>
                            <div className='mt-6'>
                                {

                                    dataProduct?.images?.length > 0 ?
                                        <div className='md:space-x-10 space-y-5'>
                                            {dataProduct?.images.map((image: any, key: number) =>
                                                <LazyLoadImage key={key} src={image} alt='' effect='blur' className='mx-1 md:m-0 h-44 border border-gray-100 rounded-md' />
                                            )}
                                        </div>
                                        :
                                        <div>Image doesnt exist</div>
                                }
                            </div>
                        </div>


                    </div>
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button type='reset' className="btn-primary" onClick={onClose}>Close</button>
                        </div>

                </div>
            </div>
        </>
    );
}

export default DetailProduct;