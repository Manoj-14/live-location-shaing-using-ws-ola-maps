import React from 'react'
import { useState } from "react"
import MapLibreGlDirections, {
    BearingsControl,
    LoadingIndicatorControl,
} from "@maplibre/maplibre-gl-directions";

import { useEffect } from "react";
import { Map as MapLibreMap, NavigationControl, Marker, GeolocateControl } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import { connectWithSockerIOServer, createNewConnection, reconnectAfterReferesh } from "../../utils/wss";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../store/store";

export const OlaMap = () => {
    const [mapReady, setMapReady] = useState(false);
    const { hostConnectionId, hostSocketId } = useSelector((data) => data.user);
    var directions = null;

    useEffect(() => {
        console.log(hostConnectionId, hostSocketId);

        if (hostConnectionId && hostSocketId) {
            console.log(hostConnectionId, hostSocketId);
            reconnectAfterReferesh(hostSocketId, hostConnectionId, true);
        }
    })

    useEffect(() => {
        connectWithSockerIOServer();
        if (!mapReady) return;

        const map = new MapLibreMap({
            container: "central-map",
            center: [0, 0],
            zoom: 0,
            style:
                "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
            transformRequest: (url, resourceType) => {
                // Replace the wrong URL with the correct one
                url = url.replace("app.olamaps.io", "api.olamaps.io");

                // Add the API key to the URL based on existing parameters
                if (url.includes("?")) {
                    url = url + "&api_key=DfQxSJ5LNfezPHkKXDcAsknSNcG5z3QSIVHzg96e";
                } else {
                    url = url + "?api_key=DfQxSJ5LNfezPHkKXDcAsknSNcG5z3QSIVHzg96e";
                }
                return { url, resourceType };
            },
        });

        const nav = new NavigationControl({
            visualizePitch: false,
            showCompass: true,
        });
        const geolocationControl = new GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })

        map.addControl(nav, "top-left");
        map.addControl(geolocationControl, "top-left");

        geolocationControl.on('geolocate', ({ coords }) => {
            const marker = new Marker();
            marker.remove();
            const { latitude, longitude } = coords;
            directions.setWaypoints([
                [longitude, latitude],
                [longitude + 0.001, latitude + 0.001],
            ]);
            // new Marker().setLngLat([longitude, latitude]).addTo(map);
        });

        map.on("click", "symbols", (e) => {
            console.log(e.features[0].geometry.coordinates);

            map.flyTo({
                center: e.features[0].geometry.coordinates,
            });
        });

        map.on("load", () => {
            // Create an instance of the default class
            directions = new MapLibreGlDirections(map);

            // Enable interactivity (if needed)
            directions.interactive = true;

            // Optionally add the standard loading-indicator control
            map.addControl(new LoadingIndicatorControl(directions));

            // Set the waypoints programmatically
            // directions.setWaypoints([
            //   [77.5353394, 13.03106],
            //   [77.5353394, 15.03106],
            // ]);

            // Remove waypoints
            // directions.removeWaypoint(0);

            // Add waypoints
            // directions.addWaypoint([-73.8671258, 40.82234996], 0);

            // Remove everything plugin-related from the map
            // directions.clear();
        });
    }, [mapReady]);

    return (
        <>
            <div
                style={{ height: "100vh", overflow: "hidden" }}
                ref={() => setMapReady(true)}
                id="central-map"
            >
            </div>
        </>
    );
}
