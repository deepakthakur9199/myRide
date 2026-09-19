import React from 'react';
import { MapPin } from 'lucide-react';

const LocationSearchPanel = ({ suggestions = [], setPickup, setDestination, activeField }) => {
    const handleSelectLocation = (location) => {
        if (activeField === 'pickup') {
            setPickup(location);
        } else if (activeField === 'destination') {
            setDestination(location);
        }
    };

    return (
        <div className="flex flex-col gap-2 py-2">
            {suggestions.length === 0 ? (
                <div className="text-gray-400 text-center py-4 text-sm font-medium">
                    Type a location to search suggestions...
                </div>
            ) : (
                suggestions.map((elem, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleSelectLocation(elem)}
                        className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-xl cursor-pointer border border-transparent hover:border-gray-200 transition-all"
                    >
                        <div className="bg-gray-200 p-2.5 rounded-full flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5 text-gray-700" />
                        </div>
                        <h4 className="font-medium text-gray-800 text-sm leading-snug line-clamp-2">
                            {elem}
                        </h4>
                    </div>
                ))
            )}
        </div>
    );
};

export default LocationSearchPanel;
