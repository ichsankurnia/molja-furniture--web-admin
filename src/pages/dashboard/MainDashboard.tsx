import moment from 'moment';
import React from 'react';

type Props = {};

const MainDashboard: React.FC<Props> = () => {
    const userLocal = localStorage.getItem('dataUser')
    const user = userLocal? JSON.parse(userLocal || '') : null

    return (
        <div className='flex item-center flex-col p-5 md:p-6 mb-auto'>
            <h1 className='text-base font-semibold'>Dashboard</h1>

            <div className="border-2 border-dark rounded-lg mt-5">
                <div className="bg-dark p-5 text-white rounded-tl-md rounded-tr-md">
                    <p>Welcome Back! <span className="font-semibold">{user?.fullname || user?.username}</span></p>
                </div>
                <div className="bg-white px-5 py-6 rounded-bl-lg rounded-br-lg flex flex-col md:flex-row justify-between">
                    <p>You are logged in!</p>
                    <div className='mt-5 md:mt-0'>
                        <p>Login time:</p>
                        <p>{moment(user?.last_login_on).format('yyyy-MM-DD HH:mm:ss')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainDashboard;