import React from 'react';
import { MapPin, Navigation, Wallet, Loader2 } from 'lucide-react';

const LookingForDriver = ({ pickup, destination, fare, vehicleType, setVehicleFound }) => {
    const fareAmount = fare[vehicleType] || fare.car || 150;

    return (
        <div className="bg-white p-5 rounded-t-3xl shadow-2xl border-t border-gray-100 flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Looking for a Driver...</h3>
                <Loader2 className="w-6 h-6 text-black animate-spin" />
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <img
                        className="h-20 object-contain"
                        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                        alt="Searching"
                        onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3202/3202003.png'; }}
                    />
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded-full font-semibold animate-pulse">
                        Searching Nearby
                    </span>
                </div>

                <div className="w-full flex flex-col gap-3 divide-y divide-gray-100">
                    <div className="flex items-start gap-4 pt-2">
                        <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-sm">Pickup Point</h4>
                            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{pickup}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 pt-3">
                        <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                            <Navigation className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-sm">Destination</h4>
                            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{destination}</p>
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
                onClick={() => setVehicleFound(false)}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl transition-all text-sm"
            >
                Cancel Ride Request
            </button>
        </div>
    );
};

export default LookingForDriver;
