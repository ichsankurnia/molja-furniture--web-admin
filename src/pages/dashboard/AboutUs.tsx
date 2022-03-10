import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AboutUsAPI, { AboutUsPayload } from '../../api/aboutus-api';

type Props = {};

const AboutUs: React.FC<Props> = () => {
    const [loader, showLoader] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [dataAbout, setDataAbout] = useState<AboutUsPayload>({})

    const navigate = useNavigate()

    const fetchData = useCallback( async () => {
        showLoader(true)
        const res = await AboutUsAPI.get()

        showLoader(false)
        console.log('Fetch AboutUs :', res)
        if(res.data){
            if(res.data.code === 0){
                setDataAbout(res.data.data)
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

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { company_name, company_desc, images } = e.target as any

        const formData = new FormData()
        formData.append('company_name', company_name?.value)
        formData.append('company_desc', company_desc?.value)
        if(images?.value){
            for (let i = 0; i < images.files.length; i++) {
                await formData.append('images', images.files[i])
            }
        }

        showLoader(true)
        const res = await AboutUsAPI.update(formData as AboutUsPayload)

        showLoader(false)
        console.log('Fetch AboutUs :', res)
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
            <div className='flex item-center flex-col px-5 md:px-10 py-10'>

                <div className='w-full bg-gray-700 rounded-lg shadow-xl p-5 md:p-6'>
                    <div className='flex items-center justify-between text-white md:px-8 pt-3 pb-8'>
                        <h2 className='font-semibold w-[75%] md:w-max'>Manage Company Profile (About Us)</h2>
                        <i className="ri-edit-box-line text-2xl hover:text-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer" onClick={() => setIsUpdate(true)}></i>
                    </div>
                    <form onSubmit={onSubmitForm}>
                        <fieldset disabled={!isUpdate} className="pb-4 space-y-5 lg:px-8 sm:pb-6 xl:pb-8">

                            <div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
                                <div className="w-full">
                                    <label htmlFor="company_name" className="label-form">Company Name</label>
                                    <input type="text" id="company_name" name='company_name' className="input-form" placeholder="Company Name" defaultValue={dataAbout?.company_name} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="company_desc" className="label-form">Description</label>
                                    <textarea id="company_desc" name='company_desc' className="input-form" placeholder="This company......" rows={3} defaultValue={dataAbout?.company_desc} />
                                </div>
                            </div>

                            <div className="md:flex md:space-x-10 space-y-5 md:space-y-0 text-center mt-10">
                                <div className="w-full">
                                    <label htmlFor="images" className="label-form">Images</label>
                                    {isUpdate?
                                    <input type="file" id="images" name='images' className="input-form" accept='image/jpeg,image/jpg,image/png' multiple  />
                                    :
                                    dataAbout?.images?.length > 0?
                                    <div className='md:space-x-10 space-y-5'>
                                        {dataAbout.images.map((image: any, key: number) =>
                                            <LazyLoadImage key={key} src={image} alt='' effect='blur' className='mx-1 md:m-0 h-44 border border-gray-100 rounded-md'  />
                                        )}
                                    </div>
                                    :
                                    <div>Image doesnt exist</div>
                                    }
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

export default AboutUs;