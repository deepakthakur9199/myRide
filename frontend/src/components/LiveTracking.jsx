import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom icons using Leaflet DivIcon
const createCustomIcon = (color, text) => {
    return L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;">${text}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
};

const userIcon = createCustomIcon('#10b981', 'P'); // Green for Pickup
const destIcon = createCustomIcon('#ef4444', 'D'); // Red for Destination
const driverIcon = L.divIcon({
    className: 'custom-driver-marker',
    html: `<div style="background-color: #2563eb; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 16px;">🚗</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

function MapRecenter({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
}

const LiveTracking = ({ pickupCoords, destCoords, driverLocation }) => {
    const defaultCenter = [28.6139, 77.2090]; // Default New Delhi coordinates
    const [center, setCenter] = useState(defaultCenter);

    const [userPos, setUserPos] = useState(null);
    const [destPos, setDestPos] = useState(null);
    const [driverPos, setDriverPos] = useState(null);

    useEffect(() => {
        if (pickupCoords && pickupCoords.ltd && pickupCoords.lng) {
            const pos = [pickupCoords.ltd, pickupCoords.lng];
            setUserPos(pos);
            setCenter(pos);
        }
    }, [pickupCoords]);

    useEffect(() => {
        if (destCoords && destCoords.ltd && destCoords.lng) {
            setDestPos([destCoords.ltd, destCoords.lng]);
        }
    }, [destCoords]);

    useEffect(() => {
        if (driverLocation && driverLocation.ltd && driverLocation.lng) {
            const pos = [driverLocation.ltd, driverLocation.lng];
            setDriverPos(pos);
            setCenter(pos);
        }
    }, [driverLocation]);

    // Fallback geolocation if no props provided
    useEffect(() => {
        if (!pickupCoords && !driverLocation && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const current = [position.coords.latitude, position.coords.longitude];
                    setUserPos(current);
                    setCenter(current);
                },
                () => {
                    // Geolocation denied, fallback to default
                }
            );
        }
    }, [pickupCoords, driverLocation]);

    const polylinePositions = userPos && destPos ? [userPos, destPos] : null;

    return (
        <div className="w-full h-full min-h-[300px] relative rounded-xl overflow-hidden shadow-inner border border-gray-200">
            <MapContainer
                center={center}
                zoom={14}
                scrollWheelZoom={true}
                className="w-full h-full min-h-[300px]"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapRecenter center={center} />

                {userPos && (
                    <Marker position={userPos} icon={userIcon}>
                        <Popup>Pickup Location</Popup>
                    </Marker>
                )}

                {destPos && (
                    <Marker position={destPos} icon={destIcon}>
                        <Popup>Destination</Popup>
                    </Marker>
                )}

                {driverPos && (
                    <Marker position={driverPos} icon={driverIcon}>
                        <Popup>Driver Location</Popup>
                    </Marker>
                )}

                {polylinePositions && (
                    <Polyline
                        positions={polylinePositions}
                        color="#2563eb"
                        weight={4}
                        dashArray="6, 8"
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default LiveTracking;