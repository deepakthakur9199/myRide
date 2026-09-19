import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { SocketDataContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { Car, MapPin, Navigation, Search, LogOut } from 'lucide-react';
import { getBaseUrl } from '../config';


const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState('car');
    const [ride, setRide] = useState(null);

    const [pickupCoords, setPickupCoords] = useState(null);
    const [destCoords, setDestCoords] = useState(null);

    const { socket, sendMessage, receiveMessage } = useContext(SocketDataContext);
    const { user } = useContext(UserDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user._id) {
            sendMessage('join', { userType: 'user', userId: user._id });
        }
    }, [user, sendMessage]);

    useEffect(() => {
        receiveMessage('ride-confirmed', (confirmedRide) => {
            setVehicleFound(false);
            setWaitingForDriver(true);
            setRide(confirmedRide);
        });

        receiveMessage('ride-started', (startedRide) => {
            setWaitingForDriver(false);
            navigate('/riding', { state: { ride: startedRide } });
        });
    }, [receiveMessage, navigate]);

    const handlePickupChange = async (e) => {
        const val = e.target.value;
        setPickup(val);
        if (val.trim().length >= 2) {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${getBaseUrl()}/maps/get-suggestions`, {
                    params: { input: val },
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPickupSuggestions(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDestinationChange = async (e) => {
        const val = e.target.value;
        setDestination(val);
        if (val.trim().length >= 2) {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${getBaseUrl()}/maps/get-suggestions`, {
                    params: { input: val },
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDestinationSuggestions(res.data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const findTrip = async () => {
        if (!pickup || !destination) return;
        setVehiclePanelOpen(true);
        setPanelOpen(false);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${getBaseUrl()}/rides/get-fare`, {
                params: { pickup, destination },
                headers: { Authorization: `Bearer ${token}` }
            });
            setFare(response.data);

            // Fetch coordinates for map rendering
            const pRes = await axios.get(`${getBaseUrl()}/maps/get-coordinates`, {
                params: { address: pickup },
                headers: { Authorization: `Bearer ${token}` }
            });
            setPickupCoords(pRes.data);

            const dRes = await axios.get(`${getBaseUrl()}/maps/get-coordinates`, {
                params: { address: destination },
                headers: { Authorization: `Bearer ${token}` }
            });
            setDestCoords(dRes.data);
        } catch (err) {
            console.error('Error fetching fare:', err);
        }
    };

    const createRide = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${getBaseUrl()}/rides/create`, {
                pickup,
                destination,
                vehicleType
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error('Error creating ride:', err);
        }
    };


    return (
        <div className="h-screen w-screen relative overflow-hidden flex flex-col justify-between bg-gray-100">
            {/* Top Header */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg pointer-events-auto border border-gray-100">
                    <Car className="w-5 h-5 text-emerald-500" />
                    <span className="font-extrabold text-xl tracking-tight text-gray-900">myRide</span>
                </div>

                <button
                    onClick={() => navigate('/user/logout')}
                    className="p-2.5 bg-white/90 backdrop-blur-md hover:bg-gray-100 rounded-full shadow-lg pointer-events-auto text-gray-700 transition-all border border-gray-100"
                    title="Logout"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>

            {/* Live Map Background */}
            <div className="w-full h-full absolute inset-0 z-0">
                <LiveTracking pickupCoords={pickupCoords} destCoords={destCoords} />
            </div>

            {/* Bottom Booking Panels Container */}
            <div className="flex flex-col justify-end h-full w-full absolute inset-0 z-10 pointer-events-none">
                <div className="p-5 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 pointer-events-auto flex flex-col gap-3 max-h-[85vh] overflow-y-auto">
                    <h4 className="text-xl font-extrabold text-gray-900">Find a trip</h4>

                    <div className="relative flex flex-col gap-2.5">
                        <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200 focus-within:border-black focus-within:bg-white transition-all">
                            <MapPin className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                            <input
                                onClick={() => { setPanelOpen(true); setActiveField('pickup'); }}
                                value={pickup}
                                onChange={handlePickupChange}
                                className="bg-transparent w-full focus:outline-none text-sm font-semibold text-gray-900"
                                type="text"
                                placeholder="Add a pick-up location"
                            />
                        </div>

                        <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200 focus-within:border-black focus-within:bg-white transition-all">
                            <Navigation className="w-5 h-5 text-black mr-3 shrink-0" />
                            <input
                                onClick={() => { setPanelOpen(true); setActiveField('destination'); }}
                                value={destination}
                                onChange={handleDestinationChange}
                                className="bg-transparent w-full focus:outline-none text-sm font-semibold text-gray-900"
                                type="text"
                                placeholder="Enter your destination"
                            />
                        </div>
                    </div>

                    {pickup && destination && (
                        <button
                            onClick={findTrip}
                            className="w-full bg-black hover:bg-gray-900 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md text-base mt-1 flex items-center justify-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            Find Available Rides
                        </button>
                    )}

                    {panelOpen && (
                        <div className="mt-2 border-t pt-2">
                            <LocationSearchPanel
                                suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                                setPickup={setPickup}
                                setDestination={setDestination}
                                activeField={activeField}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Vehicle Selection Modal */}
            {vehiclePanelOpen && (
                <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-end">
                    <div className="w-full max-w-md mx-auto">
                        <VehiclePanel
                            fare={fare}
                            selectVehicle={setVehicleType}
                            setVehiclePanelOpen={setVehiclePanelOpen}
                            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
                        />
                    </div>
                </div>
            )}

            {/* Confirm Ride Modal */}
            {confirmRidePanelOpen && (
                <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-end">
                    <div className="w-full max-w-md mx-auto">
                        <ConfirmRide
                            pickup={pickup}
                            destination={destination}
                            fare={fare}
                            vehicleType={vehicleType}
                            createRide={createRide}
                            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
                            setVehicleFound={setVehicleFound}
                        />
                    </div>
                </div>
            )}

            {/* Searching Driver Modal */}
            {vehicleFound && (
                <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-end">
                    <div className="w-full max-w-md mx-auto">
                        <LookingForDriver
                            pickup={pickup}
                            destination={destination}
                            fare={fare}
                            vehicleType={vehicleType}
                            setVehicleFound={setVehicleFound}
                        />
                    </div>
                </div>
            )}

            {/* Driver Assigned & OTP Modal */}
            {waitingForDriver && (
                <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-end">
                    <div className="w-full max-w-md mx-auto">
                        <WaitingForDriver
                            ride={ride}
                            setWaitingForDriver={setWaitingForDriver}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
