import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketDataContext = createContext();

const socket = io(import.meta.env.VITE_BASE_URL || 'http://localhost:4000', {
    autoConnect: true,
    transports: ['websocket', 'polling']
});

const SocketContext = ({ children }) => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log('Connected to socket server');
        }

        function onDisconnect() {
            setIsConnected(false);
            console.log('Disconnected from socket server');
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    const sendMessage = (eventName, message) => {
        socket.emit(eventName, message);
    };

    const receiveMessage = (eventName, callback) => {
        socket.on(eventName, callback);
    };

    return (
        <SocketDataContext.Provider value={{ socket, sendMessage, receiveMessage, isConnected }}>
            {children}
        </SocketDataContext.Provider>
    );
};

export default SocketContext;