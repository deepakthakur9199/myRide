import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { Car, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { getBaseUrl, extractErrorMessage } from '../config';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        };

        try {
            const response = await axios.post(`${getBaseUrl()}/users/register`, newUser);

            if (response.status === 201) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token);
                navigate('/home');
            }
        } catch (err) {
            setError(extractErrorMessage(err, 'Failed to create account. Please check inputs.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between max-w-md mx-auto bg-white">
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="bg-black text-white p-2 rounded-xl">
                        <Car className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="font-extrabold text-2xl tracking-tight text-gray-900">myRide</span>
                </div>

                <form onSubmit={submitHandler} className="flex flex-col gap-3.5">
                    <h3 className="text-2xl font-extrabold text-gray-900">Create User Account</h3>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">What's your name?</label>
                        <div className="flex gap-2">
                            <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 w-1/2 focus-within:border-black focus-within:bg-white transition-all">
                                <User className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" />
                                <input
                                    required
                                    className="bg-transparent w-full focus:outline-none text-sm font-medium text-gray-900"
                                    type="text"
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 w-1/2 focus-within:border-black focus-within:bg-white transition-all">
                                <input
                                    className="bg-transparent w-full focus:outline-none text-sm font-medium text-gray-900"
                                    type="text"
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                        <div className="flex items-center bg-gray-100 rounded-xl px-3.5 py-3 border border-gray-200 focus-within:border-black focus-within:bg-white transition-all">
                            <Mail className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
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
                        <div className="flex items-center bg-gray-100 rounded-xl px-3.5 py-3 border border-gray-200 focus-within:border-black focus-within:bg-white transition-all">
                            <Lock className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                            <input
                                className="bg-transparent w-full focus:outline-none text-sm font-medium text-gray-900"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type="password"
                                placeholder="At least 6 characters"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black hover:bg-gray-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2 text-base disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <p className="text-center text-sm font-medium text-gray-600 mt-5">
                    Already have an account?{' '}
                    <Link to="/login" className="text-black font-extrabold underline underline-offset-2">
                        Login here
                    </Link>
                </p>
            </div>

            <div>
                <p className="text-[11px] leading-tight text-gray-400 text-center">
                    By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from myRide and its affiliates to the number provided.
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
