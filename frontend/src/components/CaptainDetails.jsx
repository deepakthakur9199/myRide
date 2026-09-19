import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { Wallet, Clock, Trophy } from 'lucide-react';

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);
    const fullname = captain?.fullname ? `${captain.fullname.firstname} ${captain.fullname.lastname || ''}` : 'Captain';
    const vehicle = captain?.vehicle || {};

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {fullname.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg leading-snug">{fullname}</h4>
                        <p className="text-xs text-gray-500 capitalize font-medium">
                            {vehicle.color || 'Black'} &bull; {vehicle.vehicleType || 'Car'} ({vehicle.plate || 'DL 01 AB 1234'})
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-extrabold text-gray-900">₹295.20</h2>
                    <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">Earned Today</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                <div className="flex flex-col items-center">
                    <Clock className="w-5 h-5 text-gray-600 mb-1" />
                    <h5 className="font-bold text-gray-800 text-sm">10.2</h5>
                    <p className="text-[10px] text-gray-500">Hours Online</p>
                </div>
                <div className="flex flex-col items-center border-x border-gray-200">
                    <Trophy className="w-5 h-5 text-gray-600 mb-1" />
                    <h5 className="font-bold text-gray-800 text-sm">12</h5>
                    <p className="text-[10px] text-gray-500">Trips Done</p>
                </div>
                <div className="flex flex-col items-center">
                    <Wallet className="w-5 h-5 text-gray-600 mb-1" />
                    <h5 className="font-bold text-gray-800 text-sm">₹295</h5>
                    <p className="text-[10px] text-gray-500">Net Fare</p>
                </div>
            </div>
        </div>
    );
};

export default CaptainDetails;
