import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, UserCheck } from 'lucide-react';

const Start = () => {
    return (
        <div className="h-screen w-full flex flex-col justify-between bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=1000&auto=format&fit=crop')]" style={{ backgroundPosition: 'center' }}>
            <div className="p-7">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full w-fit">
                    <Car className="w-5 h-5 text-emerald-400" />
                    <span className="font-extrabold text-xl tracking-tight">myRide</span>
                </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md pb-8 px-6 pt-6 rounded-t-3xl shadow-2xl border-t border-white/20 flex flex-col gap-4">
                <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                    Get Started with <span className="text-black underline underline-offset-4 decoration-emerald-500">myRide</span>
                </h2>
                <p className="text-gray-500 text-sm font-medium">
                    Fast, reliable, and comfortable rides anytime, anywhere. Experience seamless urban mobility today.
                </p>

                <div className="flex flex-col gap-3 mt-2">
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-2xl transition-all shadow-lg text-base"
                    >
                        <span>Continue as User</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>

                    <Link
                        to="/captain-login"
                        className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md text-base"
                    >
                        <UserCheck className="w-5 h-5" />
                        <span>Sign in as Captain / Driver</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Start;
