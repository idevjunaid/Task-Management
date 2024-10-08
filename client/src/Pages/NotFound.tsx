import React from 'react';

interface NotFoundProps {
    name: string;
}

const NotFound: React.FC<NotFoundProps> = ({ name }): JSX.Element => {
    return (
        <>
            <h1 className='text-white font-[1.5rem]'>404 No {name} Found</h1>
        </>
    );
}

export default NotFound;
