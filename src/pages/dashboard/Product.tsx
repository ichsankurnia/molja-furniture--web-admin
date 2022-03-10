import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductAPI, { ProductPayload } from '../../api/product-api';
import CategoryAPI, { CategoryPayload } from '../../api/product-category-api';
import DetailProduct from '../../components/modals/DetailProduct';
import ProductForm from '../../components/modals/ProductForm';
import SearchField from '../../components/SearchField';

type Props = {};

const Product: React.FC<Props> = () => {
    const [loader, showLoader] = useState(false)
    const [dataProduct, setDataProduct] = useState([])
    const [filterData, setFilterData] = useState([])
    const [selectedData, setSelectedData] = useState<ProductPayload>({})
    const [isUpdate, setIsUpdate] = useState(false)
    const [modal, showModal] = useState(false)
    const [detailProduct, showDetailProduct] = useState(false)
    const [dataCategories, setDataCategories] = useState<CategoryPayload[]>([])
    const [category, setCategory] = useState('')


    const navigate = useNavigate()

    const fetchCategories = useCallback( async () => {
        showLoader(true)
        const res = await CategoryAPI.getAll()

        showLoader(false)
        console.log('Fetch Product :', res)
        if(res.data){
            if(res.data.code === 0){
                setDataCategories(res.data.data)
            } else if(res.data.code === 99){
                navigate('/auth')
            }else{
                toast.error(res.data.message)
            }
        }else{
            fetchCategories()
        }
    }, [navigate])

    const fetchData = useCallback( async () => {
        showLoader(true)
        const res = await ProductAPI.getAll()

        showLoader(false)
        console.log('Fetch Product :', res)
        if(res.data){
            if(res.data.code === 0){
                setDataProduct(res.data.data)
                setFilterData(res.data.data)
            } else if(res.data.code === 99){
                navigate('/auth')
            }else{
                toast.error(res.data.message)
            }
        }else{
            fetchData()
        }
    }, [navigate])


    useEffect(() => {
        fetchData()
        fetchCategories()
    }, [fetchData, fetchCategories])

    const handleDetailProduct =  (selectedData: ProductPayload) => {
        setSelectedData(selectedData)
        showDetailProduct(true)
    }

    const handleEditData =  (selectedData: ProductPayload) => {
        setSelectedData(selectedData)
        setIsUpdate(true)
        showModal(true)
    }

    const handleReceiveDataForm = async (data: ProductPayload) => {
        showLoader(true)
        
        let res = null
        if(!isUpdate){
            res = await ProductAPI.new(data)
        }else{
            res = await ProductAPI.update(selectedData.id || 1, data)
        }

        console.log('Create/Update Product :', res)
        
        if(res.data){
            if(res.data.code === 0){
                toast.success('Success')
                fetchData()
                resetForm()
            }else{
                toast.error(res.data.message)
                showLoader(false)
            }
        }else{
            alert(`${res.config?.url} ${res.message}`)
        }
    }

    const handleDeleteItem = async (data: ProductPayload) => {
        const res = await ProductAPI.delete(data.id || 1)

        console.log("Delete Product :", res)
        if(res.data){
            if(res.data.code === 0){
                toast.success('Success')
                fetchData()
            }else{
                toast.error(res.data.message)
            }
        }else{
            alert(`${res.config?.url} ${res.message}`)
        }
    }

    
    const resetForm = () => {
        setSelectedData({})
        setIsUpdate(false)
        showModal(false)
        showDetailProduct(false)
        showLoader(false)
    }

    const handleSearch = (event: any) => {
        event.preventDefault()

        const newData = [...dataProduct]
        if(event.target.value){
            const filtered = newData.filter((item: ProductPayload) => {
                return (
                    item.name?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.dimention?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.button?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.description?.toLowerCase().includes(event.target.value.toLowerCase())
                )
            });

            setFilterData(filtered)
        }else{
            setFilterData(dataProduct)
        }
    }

    const handleChangeCategory = (e: any) => {
        const newData = [...dataProduct]

        setCategory(e.target.value)
        if(e.target.value){
            const a = newData.filter((data: any) => parseInt(data.category_id) === parseInt(e.target.value))
            setFilterData(a)
        }else{
            setFilterData(dataProduct)
        }
    }

    return (
        <>
            <div className='flex item-center flex-col px-6 md:px-10 py-5 md:py-10'>

                <div className='w-full bg-white rounded-lg shadow-xl p-6 mt-12'>
                    <div className='mb-5'>
                        <h1 className='font-bold'>Product List</h1>
                    </div>

                    <div className='flex md:flex-row flex-col justify-between md:items-center mb-3'>
                        <button className='btn-primary' onClick={() => showModal(true)}>Create New</button>
                        <div className='flex item-center space-x-2 md:space-x-5 mt-3 md:mt-0'>
                            <select id="category_id" name='category_id' className="border border-gray-300 rounded-xl py-2 px-3 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-1" onChange={handleChangeCategory} value={category}>
                                <option value=''>- Filter Category -</option>
                                {dataCategories.map((item, key) =>
                                    <option key={key} value={item.id}>{item.category_name}</option>
                                )}
                            </select>
                            <SearchField placeholder='Search product...' onChange={handleSearch} />
                        </div>
                    </div>

                    {filterData.length > 0 ?
                        <div className='md:grid md:grid-cols-3 gap-6'>
                            {filterData.map((data: ProductPayload, key) =>
                                <div key={key} className='shadow-lg p-6 rounded-xl mt-6 flex flex-col items-center'>
                                    <LazyLoadImage effect='blur' src={data?.images[0]} alt='' className='h-44 mb-8' />
                                    <h3>{data.name}</h3>
                                    <div className='flex items-center justify-between mt-5 w-full'>
                                        <button className="btn-secondary flex items-center bg-dark text-white" onClick={() => handleDetailProduct(data)}>
                                            <i className="ri-picture-in-picture-exit-line scale-125"></i>
                                        </button>
                                        <div className='flex items-center space-x-2'>
                                            <button className="btn-primary flex items-center" onClick={() => handleEditData(data)}>
                                                <i className="ri-edit-box-line scale-125"></i>
                                            </button>
                                            <button className="btn-danger" onClick={() => handleDeleteItem(data)}>
                                                <i className="ri-delete-bin-2-line scale-125"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        :
                        <div className='h-44 flex justify-center items-center text-gray-500'>Product doesnt exist</div>
                    }
                </div>
            </div>

            {modal && <ProductForm data={selectedData} onSubmit={handleReceiveDataForm} onClose={resetForm} categories={dataCategories} />}
            {detailProduct && <DetailProduct productID={selectedData.id} categories={dataCategories} onClose={resetForm} />}
        </>
    );
}

export default Product;