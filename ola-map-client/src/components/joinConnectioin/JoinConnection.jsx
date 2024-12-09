import React, { useState } from 'react'
import { joinRoom, sendLocationInfo } from '../../utils/wss';
import { useNavigate } from 'react-router-dom';

export const JoinConnection = () => {
    const [connectionId, setconnectionId] = useState('');
    const [identity, setIdentity] = useState('');

    const history = useNavigate();



    const handleConnectionChange = (e) => {
        setconnectionId(p => p = e.target.value);
    }

    const handleIdentityChange = (e) => {
        setIdentity((p) => p = e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        joinRoom(identity, connectionId, false);
        history("/joinedRoom")
    }


    return (
        <div><form onSubmit={(e) => onSubmitHandler(e)}>
            <input type='text' name='connectionId' onChange={(e) => handleConnectionChange(e)} placeholder='Enter connection id' />
            <input type='text' name='identity' onChange={(e) => handleIdentityChange(e)} placeholder='Enter name' />
            <input type="submit" value="Join Connection" />
        </form></div>
    )
}
