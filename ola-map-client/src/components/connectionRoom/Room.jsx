import React, { useEffect } from 'react'
import { reconnectAfterReferesh } from '../../utils/wss';

export const Room = () => {
    const hostConnectionId = localStorage.getItem("hostConnectionId");
    const hostSocketId = localStorage.getItem("hostSocketId");
    useEffect(() => {
        if (hostConnectionId && hostSocketId) {
            console.log(hostConnectionId, hostSocketId);
            reconnectAfterReferesh(hostSocketId, hostConnectionId, true);
        }
    })
    return (
        <div>
            <h3>Connected to room of connectionId: {hostConnectionId}</h3>
        </div>
    )
}
