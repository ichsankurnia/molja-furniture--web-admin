import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './layouts/Auth';
import Dashboard from './layouts/Dashboard';
import Helper from './utils/Helper';

type Props = {};

const App: React.FC<Props> = () => {
    const token = localStorage.getItem('authToken')

  return (
		<div className='font-poppins'>
			<Router>
				<Routes>
					<Route path='/auth/*' element={<Auth />} />
					<Route path='/dashboard/*' element={<Dashboard />} />
					{token?
					Helper.expiredSession(token)?
					<Route path='*' element={<Navigate replace to='/auth' />} />
					:
					<Route path='*' element={<Navigate replace to='/dashboard' />} />
					:
					<Route path='*' element={<Navigate replace to='/auth' />} />
					}
					{/* <Route path='*' element={<Navigate replace to='/' />} /> */}
				</Routes>
			</Router>
		</div>
	)
}

export default App;