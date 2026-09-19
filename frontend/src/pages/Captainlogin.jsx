import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import { Car, Lock, Mail, ArrowRight } from 'lucide-react';

const Captainlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const captainData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);

            if (response.status === 200) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);
                navigate('/captain-home');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid captain login credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between max-w-md mx-auto bg-white">
            <div>
                <div className="flex items-center gap-2 mb-8">
                    <div className="bg-emerald-600 text-white p-2 rounded-xl">
                        <Car className="w-6 h-6" />
                    </div>
                    <span className="font-extrabold text-2xl tracking-tight text-gray-900">myRide Captain</span>
                </div>

                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Captain Sign In</h3>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                        <div className="flex items-center bg-gray-100 rounded-xl px-3.5 py-3 border border-gray-200 focus-within:border-emerald-600 focus-within:bg-white transition-all">
                            <Mail className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
                            <input
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent w-full focus:outline-none text-sm font-medium text-gray-900"
                                type="email"
                                placeholder="email@example.com"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
                        <div className="flex items-center bg-gray-100 rounded-xl px-3.5 py-3 border border-gray-200 focus-within:border-emerald-600 focus-within:bg-white transition-all">
                            <Lock className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
                            <input
                                className="bg-transparent w-full focus:outline-none text-sm font-medium text-gray-900"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type="password"
                                placeholder="password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-3 flex items-center justify-center gap-2 text-base disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In as Captain'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <p className="text-center text-sm font-medium text-gray-600 mt-6">
                    Want to drive with us?{' '}
                    <Link to="/captain-signup" className="text-emerald-600 font-extrabold underline underline-offset-2">
                        Register as Captain
                    </Link>
                </p>
            </div>

            <div>
                <Link
                    to="/login"
                    className="bg-black hover:bg-gray-900 text-white font-bold flex items-center justify-center gap-2 w-full py-3.5 rounded-xl transition-all shadow-md text-sm"
                >
                    Sign in as User / Rider
                </Link>
            </div>
        </div>
    );
};

export default Captainlogin;
