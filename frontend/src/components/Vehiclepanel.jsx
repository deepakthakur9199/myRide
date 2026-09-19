import React from 'react';
import { User, ChevronDown } from 'lucide-react';

const VehiclePanel = ({ fare = {}, selectVehicle, setVehiclePanelOpen, setConfirmRidePanelOpen }) => {
    const handleChooseVehicle = (type) => {
        selectVehicle(type);
        setVehiclePanelOpen(false);
        setConfirmRidePanelOpen(true);
    };

    return (
        <div className="bg-white p-5 rounded-t-3xl shadow-2xl border-t border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Choose a Vehicle</h3>
                <button
                    onClick={() => setVehiclePanelOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-full text-gray-500"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div>

            {/* Car option */}
            <div
                onClick={() => handleChooseVehicle('car')}
                className="flex items-center justify-between p-3.5 border-2 border-gray-100 active:border-black hover:border-gray-800 rounded-2xl cursor-pointer transition-all bg-gray-50 hover:bg-white"
            >
                <img
                    className="h-14 object-contain"
                    src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                    alt="myRide Car"
                    onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3202/3202003.png'; }}
                />
                <div className="flex-1 px-4">
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-base">myRide Go</h4>
                        <span className="flex items-center text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                            <User className="w-3 h-3 mr-1" /> 4
                        </span>
                    </div>
                    <h5 className="text-xs font-medium text-gray-500 mt-1">2 mins away &bull; 15:24</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Affordable, compact rides</p>
                </div>
                <h2 className="text-lg font-extrabold text-gray-900">₹{fare.car || 150}</h2>
            </div>

            {/* Moto option */}
            <div
                onClick={() => handleChooseVehicle('moto')}
                className="flex items-center justify-between p-3.5 border-2 border-gray-100 active:border-black hover:border-gray-800 rounded-2xl cursor-pointer transition-all bg-gray-50 hover:bg-white"
            >
                <img
                    className="h-14 object-contain"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194/original/Uber_Moto_360x240 pixels_Option1.png"
                    alt="myRide Moto"
                    onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3082/3082383.png'; }}
                />
                <div className="flex-1 px-4">
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-base">Moto</h4>
                        <span className="flex items-center text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                            <User className="w-3 h-3 mr-1" /> 1
                        </span>
                    </div>
                    <h5 className="text-xs font-medium text-gray-500 mt-1">3 mins away &bull; 15:27</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Affordable motorcycle rides</p>
                </div>
                <h2 className="text-lg font-extrabold text-gray-900">₹{fare.moto || 65}</h2>
            </div>

            {/* Auto option */}
            <div
                onClick={() => handleChooseVehicle('auto')}
                className="flex items-center justify-between p-3.5 border-2 border-gray-100 active:border-black hover:border-gray-800 rounded-2xl cursor-pointer transition-all bg-gray-50 hover:bg-white"
            >
                <img
                    className="h-14 object-contain"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_552x368 pixels_Option1.png"
                    alt="myRide Auto"
                    onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/1048/1048315.png'; }}
                />
                <div className="flex-1 px-4">
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-base">myRide Auto</h4>
                        <span className="flex items-center text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                            <User className="w-3 h-3 mr-1" /> 3
                        </span>
                    </div>
                    <h5 className="text-xs font-medium text-gray-500 mt-1">1 min away &bull; 15:22</h5>
                    <p className="text-xs text-gray-400 mt-0.5">No haggling, doorstep pickup</p>
                </div>
                <h2 className="text-lg font-extrabold text-gray-900">₹{fare.auto || 110}</h2>
            </div>
        </div>
    );
};

export default VehiclePanel;
