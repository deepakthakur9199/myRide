import React from 'react';
import { MapPin, Navigation, Wallet, User, Check, X } from 'lucide-react';

const RidePopUp = ({ ride, confirmRide, setRidePopupPanel }) => {
    const user = ride?.user || {};
    const userName = user?.fullname ? `${user.fullname.firstname} ${user.fullname.lastname || ''}` : 'Rider';

    const handleAccept = () => {
        confirmRide();
    };

    return (
        <div className="bg-white p-5 rounded-t-3xl shadow-2xl border-t border-gray-100 flex flex-col gap-4 animate-slide-up">
            <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
                    <h3 className="text-lg font-bold text-gray-900">New Ride Request!</h3>
                </div>
                <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                    2.2 km away
                </span>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-base">{userName}</h4>
                        <p className="text-xs text-gray-500">4.9 ★ &bull; Cash Ride</p>
                    </div>
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">₹{ride?.fare || 150}</h2>
            </div>

            <div className="w-full flex flex-col gap-3 divide-y divide-gray-100">
                <div className="flex items-start gap-4 pt-1">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-xs">Pickup</h4>
                        <p className="text-xs text-gray-500 mt-0.5 leading-snug">{ride?.pickup}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 pt-2">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                        <Navigation className="w-4 h-4 text-black" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-xs">Destination</h4>
                        <p className="text-xs text-gray-500 mt-0.5 leading-snug">{ride?.destination}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                    onClick={() => setRidePopupPanel(false)}
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 rounded-2xl transition-all text-sm"
                >
                    <X className="w-4 h-4" /> Ignore
                </button>
                <button
                    onClick={handleAccept}
                    className="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white font-bold py-3.5 rounded-2xl transition-all text-sm shadow-lg"
                >
                    <Check className="w-4 h-4 text-emerald-400" /> Accept Ride
                </button>
            </div>
        </div>
    );
};

export default RidePopUp;
