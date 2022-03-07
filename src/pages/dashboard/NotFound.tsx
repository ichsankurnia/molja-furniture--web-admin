import React from 'react';

type Props = {};

const NotFound: React.FC<Props> = () => {
    return (
        <>
            <div className='h-full flex flex-col text-center justify-center font-medium'>
                <h1 className='font-semibold'>Oops. Page not found</h1>
                <p>Looks like the page you were looking for does not exist</p>
            </div>
        </>
    );
}

export default NotFound;