import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HomeAPI, { ArticlePayload, ClientPayload } from '../../api/home-api';
import ErrorField from '../../components/ErrorField';
import ClientForm from '../../components/modals/ClientForm';
import SearchField from '../../components/SearchField';

type Props = {};

const HomeContent: React.FC<Props> = () => {
    const [loader, showLoader] = useState(false)
    const [isUpdateArticle, setIsUpdateArticle] = useState(false)
    const [dataClient, setDataClient] = useState([])
    const [filterData, setFilterData] = useState([])
    const [selectedClient, setSelectedClient] = useState<ClientPayload>({})
    const [isUpdateClient, setIsUpdateClient] = useState(false)
    const [modalClient, showModalClient] = useState(false)


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


    const fetchDataArticle = useCallback( async () => {
        showLoader(true)
        const res = await HomeAPI.articleGet()

        showLoader(false)
        console.log('Fetch Article :', res)
        if(res.data){
            if(res.data.code === 0){
                setdefaultValue(res.data.data)
            } else if(res.data.code === 99){
                navigate('/auth')
            }else{
                toast.error(res.data.message)
            }
        }else{
            fetchDataArticle()
        }
    }, [navigate, setdefaultValue])

    const fetchDataClient = useCallback( async () => {
        showLoader(true)
        const res = await HomeAPI.clientGetAll()

        showLoader(false)
        console.log('Fetch Client :', res)
        if(res.data){
            if(res.data.code === 0){
                setDataClient(res.data.data)
                setFilterData(res.data.data)
            } else if(res.data.code === 99){
                navigate('/auth')
            }else{
                toast.error(res.data.message)
            }
        }else{
            fetchDataClient()
        }
    }, [navigate])

    useEffect(() => {
        fetchDataArticle()
        fetchDataClient()
    }, [fetchDataArticle, fetchDataClient])

    const onSubmitForm: SubmitHandler<ArticlePayload> = async ({title, body}) => {
        showLoader(true)
        const res = await HomeAPI.articleUpdate({title, body } as ArticlePayload)

        showLoader(false)
        console.log('Fetch Article :', res)
        if(res.data){
            if(res.data.code === 0){
                resetForm()
            } else if(res.data.code === 99){
                navigate('/auth')
            }else{
                toast.error(res.data.message)
            }
        }else{
            fetchDataArticle()
        }
    }

    
    const handleEditData =  (selectedData: ClientPayload) => {
        setSelectedClient(selectedData)
        setIsUpdateClient(true)
        showModalClient(true)
    }

    const handleReceiveDataForm = async (data: ClientPayload) => {
        showLoader(true)
        
        let res = null
        if(!isUpdateClient){
            res = await HomeAPI.clientNew(data)
        }else{
            res = await HomeAPI.clientUpdate(selectedClient.id || 1, data)
        }

        console.log('Create/Update Client :', res)
        
        if(res.data){
            if(res.data.code === 0){
                toast.success('Success')
                resetForm()
            }else{
                toast.error(res.data.message)
                showLoader(false)
            }
        }else{
            alert(`${res.config?.url} ${res.message}`)
        }
    }

    const handleDeleteItem = async (data: ClientPayload) => {
        const res = await HomeAPI.clientDelete(data.id || 1)

        console.log("Delete Client :", res)
        if(res.data){
            if(res.data.code === 0){
                toast.success('Success')
                fetchDataClient()
            }else{
                toast.error(res.data.message)
            }
        }else{
            alert(`${res.config?.url} ${res.message}`)
        }
    }


    const resetForm = () => {
        fetchDataArticle()
        fetchDataClient()
        setIsUpdateArticle(false)
        setIsUpdateClient(false)
        setSelectedClient({})
        showModalClient(false)
        showLoader(false)
    }
    
    const handleSearch = (event: any) => {
        event.preventDefault()

        const newData = [...dataClient]
        if(event.target.value){
            const filtered = newData.filter((item: ClientPayload) => {
                return (
                    item.client_name?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.client_desc?.toLowerCase().includes(event.target.value.toLowerCase())
                )
            });

            setFilterData(filtered)
        }else{
            setFilterData(dataClient)
        }
    }

    return (
        <>
            <div className='flex item-center flex-col px-6 md:px-10 py-10'>

                <div className='w-full bg-gray-700 rounded-lg shadow-xl p-6'>
                    <div className='flex items-center justify-between text-white md:px-8 pt-3 pb-8'>
                        <h2 className='font-semibold'>Manage Article</h2>
                        <i className="ri-edit-box-line text-2xl hover:text-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer" onClick={()=>setIsUpdateArticle(true)}></i>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <fieldset disabled={!isUpdateArticle} className="pb-4 space-y-5 lg:px-8 sm:pb-6 xl:pb-8">

                        <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                            <div className="w-full">
                                <label htmlFor="title" className="label-form">Title</label>
                                <input type="text" id="title" className="input-form" placeholder="Article Title"
                                    {...register('title', {
                                        required: 'title is required'
                                    })}
                                />
                                <ErrorField errors={errors} name='title' />
                            </div>
                            <div className="w-full">
                                <label htmlFor="body" className="label-form">Body</label>
                                <textarea id="body" placeholder="Jl. aaa no 123 cc ..." className="input-form" rows={3} {...register('body')} />
                                <ErrorField errors={errors} name='body' />
                            </div>
                        </div>

                        {/* <!-- Modal footer --> */}
                        {isUpdateArticle &&
                        <div className="flex items-center pt-8 space-x-4">
                            <button type='submit' className="btn-primary px-7">Save</button>
                            <button type='reset' className="btn-secondary" onClick={resetForm}>Cancel</button>
                        </div>
                        }

                    </fieldset>
                    </form>
                </div>

                <div className='w-full bg-white rounded-lg shadow-xl p-6 mt-12'>
                    <div className='mb-5'>
                        <h1 className='font-bold'>Client List</h1>
                    </div>

                    <div className='flex justify-between flex-col md:flex-row space-y-2 md:space-y-0 md:items-center mb-3'>
                        <button className='btn-primary' onClick={()=>showModalClient(true)}>Create New</button>
                        <SearchField placeholder='Search client...' onChange={handleSearch} />
                    </div>

                    {filterData.length>0?
                        <div className='md:grid md:grid-cols-2 gap-6'>
                            {filterData.map((data: ClientPayload, key) => 
                            <div key={key} className='shadow-lg p-6 rounded-xl mt-6'>
                                <table>
                                    <tbody>
                                        <tr className='font-semibold'>
                                            <td>Client Name</td>
                                            <td>: {data?.client_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Description</td>
                                            <td>: {data?.client_desc}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <h3 className='font-semibold'>{data.client_name}</h3>
                                <p>{data.client_desc}</p> */}
                                <LazyLoadImage effect='blur' src={data.image} alt='' className='h-44 mt-8' />
                                <div className='flex items-center justify-end space-x-2 mt-5'>
                                    <button className="btn-primary flex items-center" onClick={() =>handleEditData(data)}>
                                        <i className="ri-edit-box-line mr-1.5"></i>
                                        <p>Edit</p>
                                    </button>
                                    <button className="btn-danger" onClick={()=>handleDeleteItem(data)}>
                                        <i className="ri-delete-bin-2-line mr-1.5"></i>
                                        <p>Hapus</p>
                                    </button>
                                </div>
                            </div>
                            )}
                        </div>
                    :
                    <div className='h-44 flex justify-center items-center text-gray-500'>Client doesnt exist</div>
                    }
                </div>
            </div>

            {modalClient && <ClientForm data={selectedClient} onSubmit={handleReceiveDataForm} onClose={resetForm} />}
        </>
    );
}

export default HomeContent;