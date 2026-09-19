import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SocketDataContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';
import { MapPin, Navigation, Wallet, ShieldCheck, Home } from 'lucide-react';

const Riding = () => {
    const location = useLocation();
    const ride = location.state?.ride;
    const { receiveMessage } = useContext(SocketDataContext);
    const navigate = useNavigate();

    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        receiveMessage('ride-ended', () => {
            setIsCompleted(true);
        });
    }, [receiveMessage]);

    const captain = ride?.captain || {};
    const vehicle = captain?.vehicle || {};
    const captainName = captain?.fullname ? `${captain.fullname.firstname} ${captain.fullname.lastname || ''}` : 'Driver';

    return (
        <div className="h-screen w-screen relative flex flex-col justify-between bg-gray-100 overflow-hidden">
            {/* Top Home Nav button */}
            <Link
                to="/home"
                className="fixed top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-md hover:bg-gray-100 rounded-full shadow-lg border border-gray-100 text-gray-800"
            >
                <Home className="w-5 h-5" />
            </Link>

            {/* Live Map */}
            <div className="w-full h-full absolute inset-0 z-0">
                <LiveTracking />
            </div>

            {/* Bottom Trip Sheet */}
            <div className="relative z-10 p-5 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 flex flex-col gap-4 max-w-md w-full mx-auto mt-auto">
                {isCompleted ? (
                    <div className="flex flex-col items-center text-center gap-3 py-4">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-3xl">
                            ✓
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900">Trip Completed!</h3>
                        <p className="text-gray-500 text-sm">Thank you for riding with myRide. Please pay ₹{ride?.fare || 150} cash to your driver.</p>
                        <button
                            onClick={() => navigate('/home')}
                            className="w-full bg-black text-white font-bold py-3.5 rounded-2xl transition-all shadow-md mt-2"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                                    {captainName.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base leading-tight">{captainName}</h4>
                                    <p className="text-xs text-gray-500 font-medium capitalize mt-0.5">
                                        {vehicle.color || 'White'} &bull; {vehicle.vehicleType || 'Car'}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="bg-gray-200 text-gray-800 font-bold text-sm px-2.5 py-1 rounded-lg">
                                    {vehicle.plate || 'DL 01 AB 1234'}
                                </span>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-3 divide-y divide-gray-100 text-sm">
                            <div className="flex items-start gap-4 pt-1">
                                <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                                    <Navigation className="w-4 h-4 text-black" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-xs">Heading to Destination</h4>
                                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">{ride?.destination}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 pt-2">
                                <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                                    <Wallet className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-xs">Fare Amount</h4>
                                    <p className="text-xs font-bold text-emerald-600 mt-0.5">₹{ride?.fare || 150} Cash</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs font-semibold">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Trip in progress. Enjoy your safe journey!</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Riding;
