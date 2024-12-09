import React, { useEffect } from 'react'
import { sendLocationDataToServer } from '../utils/wss';
import { useNavigate } from 'react-router-dom';

export const LocationSharing = () => {
    const history = useNavigate();

    const pushToCreateConnection = () => {
        history("/createConnection")
    }
    const pushToJoinConnection = () => {
        history("/joinConnection")
    }
    return (
        <div>
            <button onClick={pushToCreateConnection}>Create Connection</button>
            <button onClick={pushToJoinConnection}>Join Connection</button>
        </div>
    )
}
