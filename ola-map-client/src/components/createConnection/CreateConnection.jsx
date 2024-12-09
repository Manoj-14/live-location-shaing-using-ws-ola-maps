import React, { useState } from 'react'
import { createNewConnection } from '../../utils/wss';
import { useNavigate } from 'react-router-dom';

export const CreateConnection = () => {
    const history = useNavigate();
    const [identity, setIdentity] = useState('');
    const handleIdentityChange = (e) => {
        setIdentity((p) => p = e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        createNewConnection(identity);
        console.log(identity);
        history("/room")
    }
    return (
        <div>
            <form onSubmit={(e) => onSubmitHandler(e)}>
                <input type='text' name='identity' onChange={(e) => handleIdentityChange(e)} placeholder='Enter name' />
                <input type="submit" value="Create Connection" />
            </form>
        </div>
    )
}
