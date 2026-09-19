import React from 'react';
import { MapPin, Navigation, Wallet, ChevronDown } from 'lucide-react';

const ConfirmRide = ({
    pickup,
    destination,
    fare,
    vehicleType,
    createRide,
    setConfirmRidePanelOpen,
    setVehicleFound
}) => {
    const fareAmount = fare[vehicleType] || fare.car || 150;

    const handleConfirm = () => {
        createRide();
        setConfirmRidePanelOpen(false);
        setVehicleFound(true);
    };

    return (
        <div className="bg-white p-5 rounded-t-3xl shadow-2xl border-t border-gray-100 flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Confirm your Ride</h3>
                <button
                    onClick={() => setConfirmRidePanelOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-full text-gray-500"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div>

            <div className="flex flex-col items-center gap-3">
                <img
                    className="h-24 object-contain"
                    src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                    alt="Selected Vehicle"
                    onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3202/3202003.png'; }}
                />

                <div className="w-full flex flex-col gap-3 divide-y divide-gray-100">
                    <div className="flex items-start gap-4 pt-2">
                        <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-sm">Pickup Point</h4>
                            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{pickup || 'Current Location'}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 pt-3">
                        <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                            <Navigation className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-sm">Destination</h4>
                            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{destination || 'Selected Destination'}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 pt-3">
                        <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-sm">₹{fareAmount}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Cash Payment</p>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleConfirm}
                className="w-full bg-black hover:bg-gray-900 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg text-base"
            >
                Confirm Ride & Search Driver
            </button>
        </div>
    );
};

export default ConfirmRide;
