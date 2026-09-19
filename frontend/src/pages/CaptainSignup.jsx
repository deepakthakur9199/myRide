import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import { Car, Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { getBaseUrl, extractErrorMessage } from '../config';

const CaptainSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('car');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: parseInt(vehicleCapacity),
                vehicleType: vehicleType
            }
        };

        try {
            const response = await axios.post(`${getBaseUrl()}/captains/register`, captainData);

            if (response.status === 201) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);
                navigate('/captain-home');
            }
        } catch (err) {
            setError(extractErrorMessage(err, 'Failed to register captain. Please check vehicle and user details.'));
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-6 min-h-screen flex flex-col justify-between max-w-md mx-auto bg-white">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-emerald-600 text-white p-2 rounded-xl">
                        <Car className="w-6 h-6" />
                    </div>
                    <span className="font-extrabold text-2xl tracking-tight text-gray-900">myRide Captain</span>
                </div>

                <form onSubmit={submitHandler} className="flex flex-col gap-3">
                    <h3 className="text-xl font-extrabold text-gray-900">Register as a Captain</h3>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Captain Name</label>
                        <div className="flex gap-2">
                            <input
                                required
                                className="bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 w-1/2 text-sm font-medium focus:outline-none focus:border-emerald-600"
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                className="bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 w-1/2 text-sm font-medium focus:outline-none focus:border-emerald-600"
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-100 rounded-xl px-3.5 py-2.5 border border-gray-200 text-sm font-medium focus:outline-none focus:border-emerald-600"
                            type="email"
                            placeholder="email@example.com"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
                        <input
                            className="bg-gray-100 rounded-xl px-3.5 py-2.5 border border-gray-200 text-sm font-medium focus:outline-none focus:border-emerald-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            placeholder="At least 6 characters"
                        />
                    </div>

                    <h4 className="text-sm font-extrabold text-gray-800 border-t pt-2 mt-1">Vehicle Information</h4>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            required
                            className="bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 text-sm font-medium focus:outline-none focus:border-emerald-600"
                            type="text"
                            placeholder="Vehicle Color"
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                        />
                        <input
                            required
                            className="bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 text-sm font-medium focus:outline-none focus:border-emerald-600"
                            type="text"
                            placeholder="Plate Number"
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            required
                            className="bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 text-sm font-medium focus:outline-none focus:border-emerald-600"
                            type="number"
                            min="1"
                            placeholder="Capacity (e.g. 4)"
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                        />
                        <select
                            required
                            className="bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 text-sm font-medium focus:outline-none focus:border-emerald-600"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="motorcycle">Motorcycle</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2 text-base disabled:opacity-50"
                    >
                        {loading ? 'Registering...' : 'Register Captain'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <p className="text-center text-sm font-medium text-gray-600 mt-4">
                    Already registered?{' '}
                    <Link to="/captain-login" className="text-emerald-600 font-extrabold underline underline-offset-2">
                        Captain Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CaptainSignup;
