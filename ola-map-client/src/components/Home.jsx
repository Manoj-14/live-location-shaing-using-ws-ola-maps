import React, { useEffect } from 'react'
import { OlaMap } from './ola-map/OlaMap'
import { createNewConnection } from '../utils/wss';
import { useSelector } from 'react-redux';

export const Home = () => {
    const { location } = useSelector((data) => data);

    useEffect(() => {
        console.log(location.coords);
        if (location.coords != null) {
            updateLocationHistory(location.coords);
        }

    }, [location])

    const updateLocationHistory = (data) => {
        const { latitude, longitude } = data;
        const documentDetails = document.querySelector(".location-details");
        const locList = document.createElement('li');
        const locText = document.createTextNode(`Getting location detalis from --> {${latitude},${longitude}}`)
        locList.appendChild(locText);
        documentDetails.appendChild(locList);
    }

    const onClickHandler = () => {
        createNewConnection("Host");
    }
    return (
        <div className='home-div'>
            <div className="map-div">
                <OlaMap />
            </div>
            <div className="history-div">
                <h1>Location Sharing Data</h1>
                <div>
                    {!location.coords && <button onClick={onClickHandler}>Click to Start Connection</button>}
                </div>
                <ul className='location-details'>

                </ul>

            </div>
        </div>
    )
}
