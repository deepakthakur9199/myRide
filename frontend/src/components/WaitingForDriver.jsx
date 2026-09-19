import React from 'react';
import { MapPin, Navigation, Wallet, ShieldCheck, PhoneCall } from 'lucide-react';

const WaitingForDriver = ({ ride, setWaitingForDriver }) => {
    const captain = ride?.captain || {};
    const vehicle = captain?.vehicle || {};
    const captainName = captain?.fullname ? `${captain.fullname.firstname} ${captain.fullname.lastname || ''}` : 'Driver';

    return (
        <div className="bg-white p-5 rounded-t-3xl shadow-2xl border-t border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Driver is on the way</h3>
                    <p className="text-xs text-gray-500">Arriving in approx 3 minutes</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 font-extrabold text-lg px-3 py-1 rounded-xl border border-emerald-200">
                    OTP: <span className="tracking-widest">{ride?.otp || '----'}</span>
                </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700 text-lg">
                        {captainName.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-base leading-tight">{captainName}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-500 font-medium capitalize">{vehicle.color || 'White'} {vehicle.vehicleType || 'Car'}</span>
                            <span className="text-[10px] bg-gray-200 text-gray-700 font-bold px-1.5 py-0.5 rounded">
                                {vehicle.plate || 'DL 01 AB 1234'}
                            </span>
                        </div>
                    </div>
                </div>

                <a
                    href="tel:9999999999"
                    className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all shadow-md"
                >
                    <PhoneCall className="w-5 h-5" />
                </a>
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

                <div className="flex items-start gap-4 pt-2">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                        <Wallet className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-xs">₹{ride?.fare || 150}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Cash on arrival</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 bg-blue-50 text-blue-800 p-2.5 rounded-xl text-xs font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0 text-blue-600" />
                <span>Share your 6-digit OTP only with your driver after boarding.</span>
            </div>
        </div>
    );
};

export default WaitingForDriver;
