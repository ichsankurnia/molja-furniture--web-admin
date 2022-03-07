import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createNewUser, deleteUser, getAllUser, updateUser, UserPayload } from '../../api/user-api';
import UserForm from '../../components/modals/UserForm';
import SearchField from '../../components/SearchField';
import TableFull from '../../components/Table';

type Props = {};

const User: React.FC<Props> = () => {
    const [loader, showLoader] = useState(false)
    const [modalUser, showModalUser] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [dataUser, setDataUser] = useState([])
    const [filterData, setFilterData] = useState([])
    const [selectedUser, setSelectedUser] = useState<UserPayload>({})

    const userLocal = localStorage.getItem('dataUser')
    const user = userLocal? JSON.parse(userLocal || '') : null

    const navigate = useNavigate()

    const fetchUser = useCallback( async () => {
        showLoader(true)
        const res = await getAllUser()

        showLoader(false)
        console.log('Fetch User :', res)
        if(res.data){
            if(res.data.code === 0){
                setDataUser(res.data.data)
                setFilterData(res.data.data)
            } else if(res.data.code === 99){
                navigate('/auth')
            }else{
                toast.error(res.data.message)
            }
        }else{
            fetchUser()
        }
    }, [navigate])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])


    const handleEditData =  (selectedData: UserPayload) => {
        setSelectedUser(selectedData)
        setIsUpdate(true)
        showModalUser(true)
    }

    const handleReceiveDataForm = async (data: UserPayload) => {
        showLoader(true)
        
        let res = null
        if(!isUpdate){
            res = await createNewUser(data)
        }else{
            res = await updateUser(selectedUser.id || 1, data)
        }

        console.log('Create/Update User :', res)
        
        if(res.data){
            if(res.data.code === 0){
                toast.success('Success')
                fetchUser()
                resetForm()
            }else{
                toast.error(res.data.message)
                showLoader(false)
            }
        }else{
            alert(`${res.config?.url} ${res.message}`)
        }
    }

    const handleDeleteItem = async (data: UserPayload) => {
        const res = await deleteUser(data.id || 1)

        console.log("DELETE USER :", res)
        if(res.data){
            if(res.data.code === 0){
                toast.success('Success')
                fetchUser()
            }else{
                toast.error(res.data.message)
            }
        }else{
            alert(`${res.config?.url} ${res.message}`)
        }
    }

    const resetForm = () => {
        setSelectedUser({})
        setIsUpdate(false)
        showModalUser(false)
        showLoader(false)
    }

    const columns = [
        {
            Header: () => <span className='p-4'>Name</span>,
            Footer: 'Fullname',
            accessor: 'fullname',
            Cell: ({ value }: any) =>  <div className='text-left pl-4'>{value}</div>,
        },
        {
            Header: 'Username',
            Footer: 'Username',
            accessor: 'username',
        },
        {
            Header: 'Email',
            Footer: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Role',
            Footer: 'Role',
            accessor: 'role_name'
        },
        {
            Header: 'Last Login',
            Footer: 'Last Login',
            accessor: 'last_login_on',
            Cell: ({value}: any) => <p>{value? moment(value).format('yyyy-MM-DD HH:mm:ss') : ''}</p>
        },
        {
            Header: 'Action',
            Footer: 'Action',
            Cell: ({row}: any) => {
                const data = row.original
                if(parseInt(user?.role_id) === 99){
                    return (
                        <div className='text-xl scale-110 space-x-1 2xl:space-x-1.5'>
                            <i className="ri-edit-box-line text-primary hover:text-green-400 cursor-pointer" onClick={() =>handleEditData(data)}></i>
                            <i className="ri-delete-bin-2-line text-red-500 hover:text-red-400 cursor-pointer" onClick={()=>handleDeleteItem(data)}></i>
                        </div>
                    )
                }

                return <></>
            }
        }
    ]

    const handleSearch = (event: any) => {
        event.preventDefault()

        const newData = [...dataUser]
        if(event.target.value){
            const filtered = newData.filter((item: any) => {
                return (
                    item.fullname?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.username?.toLowerCase().includes(event.target.value.toLowerCase()) || 
                    item.email?.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.role_name?.toLowerCase().includes(event.target.value.toLowerCase())
                )
            });

            setFilterData(filtered)
        }else{
            setFilterData(dataUser)
        }
    }

    return (
        <>
            <div className='flex item-center flex-col p-6'>

                <div className='w-full bg-white rounded-lg shadow-xl p-6'>
                    <div className='mb-5'>
                        <h1 className='font-bold'>User List</h1>
                    </div>

                    {/* TABLE */}
                    <div className='flex justify-between md:items-center flex-col md:flex-row space-y-2 md:space-y-0 mb-3'>
                        <button className='btn-primary' onClick={()=>showModalUser(true)}>Create New</button>
                        <SearchField placeholder='Search user...' onChange={handleSearch} />
                    </div>
                    <TableFull dataTable={filterData} columnTable={columns} />

                </div>
            </div>
            {modalUser && <UserForm data={selectedUser} onClose={resetForm} onSubmit={handleReceiveDataForm} />}
        </>
    );
}

export default User;