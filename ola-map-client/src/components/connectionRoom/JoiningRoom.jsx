import React, { useEffect } from 'react'
import { reconnectAfterReferesh, signalhost } from '../../utils/wss';
import { useSelector } from 'react-redux';

export const JoiningRoom = () => {
    const { userConnectionId, userSocketId } = useSelector((data) => data.user);
    useEffect(() => {
        if (userConnectionId && userSocketId) {
            reconnectAfterReferesh(userSocketId, userConnectionId, false);
        }
    })

    const getUserLocation = async () => {
        if (navigator.geolocation) {
            // navigator.geolocation.getCurrentPosition(
            //     async (position) => {
            //         const { latitude, longitude } = position.coords;
            //         console.log({ latitude, longitude });
            //         signalhost({ latitude, longitude });
            //     },
            //     (error) => {
            //         // display an error if we cant get the users position
            //         console.log("Error getting user location:", error);
            //         signalhost(error.message);
            //     },
            //     {
            //         maximumAge: 60000,
            //         timeout: 5000,
            //         enableHighAccuracy: true,
            //     }
            // );
            navigator.geolocation.watchPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(position.coords);
                signalhost({ latitude, longitude });
            }, (error) => {
                console.log("Error getting user location:", error);
                signalhost(error.message);
            }, {
                maximumAge: 60000,
                timeout: 5000,
                enableHighAccuracy: true,
            })
        } else {
            // display an error if not supported
            console.error("Geolocation is not supported by this browser.");
        }
    };

    const signalHostHandler = async () => {
        getUserLocation();
    }

    return (
        <div>
            <h3>Connected to room of connectionId: {userConnectionId}</h3>
            <div>
                <button onClick={signalHostHandler} >Signal host</button>
            </div>
        </div>
    )

}
