import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryAPI, { CategoryPayload } from '../../api/product-category-api';
import CategoryForm from '../../components/modals/CategoryForm';
import SearchField from '../../components/SearchField';
import TableFull from '../../components/Table';

type Props = {};

const Category: React.FC<Props> = () => {
    const [loader, showLoader] = useState(false)
    const [modal, showModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [dataCategory, setDataCategory] = useState([])
    const [filterData, setFilterData] = useState([])
    const [selectedData, setSelectedData] = useState<CategoryPayload>({})
    

    const navigate = useNavigate()

    const fetchData = useCallback( async () => {
        showLoader(true)
        const res = await CategoryAPI.getAll()

        showLoader(false)
        console.log('Fetch Category :', res)
        if(res.data){
            if(res.data.code === 0){
                setDataCategory(res.data.data)
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
    }, [fetchData])


    const handleEditData =  (selectedData: CategoryPayload) => {
        setSelectedData(selectedData)
        setIsUpdate(true)
        showModal(true)
    }

    const handleReceiveDataForm = async (data: CategoryPayload) => {
        showLoader(true)
        
        let res = null
        if(!isUpdate){
            res = await CategoryAPI.new(data)
        }else{
            res = await CategoryAPI.update(selectedData.id || 1, data)
        }

        console.log('Create/Update Category :', res)
        
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

    const handleDeleteItem = async (data: CategoryPayload) => {
        const res = await CategoryAPI.delete(data.id || 1)

        console.log("Delete Category :", res)
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
        showLoader(false)
    }

    const columns = [
        {
            Header: () => <span className='p-4'>Name</span>,
            Footer: 'Name',
            accessor: 'category_name',
            Cell: ({ value }: any) =>  <div className='text-left pl-4'>{value}</div>,
        },
        {
            Header: 'Description',
            Footer: 'Description',
            accessor: 'category_desc',
        },
        {
            Header: 'Created On',
            Footer: 'Created On',
            accessor: 'created_on',
            Cell: ({value}: any) => <p>{value? moment(value).format('yyyy-MM-DD HH:mm:ss') : ''}</p>
        },
        {
            Header: 'Action',
            Footer: 'Action',
            Cell: ({row}: any) => {
                const data = row.original
                return (
                    <div className='text-xl scale-110 space-x-1 2xl:space-x-1.5'>
                        <i className="ri-edit-box-line text-primary hover:text-green-400 cursor-pointer" onClick={() =>handleEditData(data)}></i>
                        <i className="ri-delete-bin-2-line text-red-500 hover:text-red-400 cursor-pointer" onClick={()=>handleDeleteItem(data)}></i>
                    </div>
                )
            }
        }
    ]

    const handleSearch = (event: any) => {
        event.preventDefault()

        const newData = [...dataCategory]
        if(event.target.value){
            const filtered = newData.filter((item: CategoryPayload) => {
                return (
                    item.category_name?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.category_desc?.toLowerCase().includes(event.target.value.toLowerCase())
                )
            });

            setFilterData(filtered)
        }else{
            setFilterData(dataCategory)
        }
    }

    return (
        <>
            <div className='flex item-center flex-col p-6'>

                <div className='w-full bg-white rounded-lg shadow-xl p-6'>
                    <div className='mb-5'>
                        <h1 className='font-bold'>Category List</h1>
                    </div>

                    {/* TABLE */}
                    <div className='flex justify-between flex-col md:flex-row space-y-2 md:space-y-0 md:items-center mb-3'>
                        <button className='btn-primary' onClick={()=>showModal(true)}>Create New</button>
                        <SearchField placeholder='Search category...' onChange={handleSearch} />
                    </div>
                    <TableFull dataTable={filterData} columnTable={columns} />

                </div>
            </div>
            {modal && <CategoryForm data={selectedData} onClose={resetForm} onSubmit={handleReceiveDataForm} />}
        </>
    );
}

export default Category;