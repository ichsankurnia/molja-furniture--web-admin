import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProfileMenu from '../components/ProfileMenu';
import Sidebar from '../components/Sidebar';
import NotFound from '../pages/dashboard/NotFound';
import { dashboardRoutes } from '../routes';
import Helper from '../utils/Helper';

// MAIN ROUTE
const getRoutes = () => {
	return dashboardRoutes.map((data, key) => {
		return <Route path={data.path} element={data.component} key={key} />
	})
}

type Props = {};

const Dashboard: React.FC<Props> = () => {
	const token = localStorage.getItem('authToken')

	const { pathname } = useLocation()
	const navigate = useNavigate()

	// useEffect(() => {
	// 	if(Helper.expiredSession(token||'')) navigate('/auth', {replace: true})
	// }, [navigate, token])

	if (!token) {
		return <Navigate to='/auth' replace />
	}

	return (
		<>
			<div className='flex flex-col md:flex-row w-full h-screen overflow-hidden font-poppins bg-soft text-dark font-medium'>
				<Sidebar />
				<div className='w-full overflow-x-hidden overflow-y-auto h-screen flex flex-col'>

					{/* HEADER */}
					<div className='hidden md:flex items-center h-[5.5rem] min-h-[5.5rem] bg-white pl-10 pr-5 sticky top-0 z-10'>
						<div className='flex w-full justify-between items-center z-40'>
							<h1 className='font-bold text-2xl'>{Helper.getTitleBar(pathname)}</h1>
							{/* <h1 className='font-bold text-2xl'>daskdgash</h1> */}
							<ProfileMenu />
						</div>
					</div>

					{/* DASHBOARD CONTENT */}
					<Routes>
						{getRoutes()}

						<Route path='*' element={<NotFound />} />
						<Route path='/' element={<Navigate replace to='/dashboard' />} />

					</Routes>


					{/* FOOTER */}
					<div className='flex items-center justify-between bg-white p-5 px-3 md:px-5 mt-auto text-xs md:text-base'>
						<p>Design & Develop by Ories</p>
						<p>{new Date().getFullYear()} © Molja Furniture v1.0</p>
					</div>

				</div>

				<div className='text-sm'>
					<ToastContainer
						position='bottom-left'
						theme='dark'
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover />
				</div>
			</div>
		</>
	);
}

export default Dashboard;