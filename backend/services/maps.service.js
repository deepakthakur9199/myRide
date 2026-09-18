const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOMAPS_API;
    if (!apiKey) {
        return {
            lat: 28.6139,
            ltd: 28.6139,
            lng: 77.2090
        };
    }

    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                lat: location.lat,
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            return { lat: 28.6139, ltd: 28.6139, lng: 77.2090 };
        }
    } catch (error) {
        console.error('Error fetching address coordinate:', error.message);
        return { lat: 28.6139, ltd: 28.6139, lng: 77.2090 };
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOMAPS_API;
    if (!apiKey) {
        return {
            distance: { text: '10 km', value: 10000 },
            duration: { text: '20 mins', value: 1200 },
            status: 'OK'
        };
    }

    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.rows?.[0]?.elements?.[0]) {
            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                return {
                    distance: { text: '10 km', value: 10000 },
                    duration: { text: '20 mins', value: 1200 },
                    status: 'OK'
                };
            }
            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            return {
                distance: { text: '10 km', value: 10000 },
                duration: { text: '20 mins', value: 1200 },
                status: 'OK'
            };
        }
    } catch (err) {
        console.error('Error fetching distance and time:', err.message);
        return {
            distance: { text: '10 km', value: 10000 },
            duration: { text: '20 mins', value: 1200 },
            status: 'OK'
        };
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOMAPS_API;
    if (!apiKey) {
        const sampleSuggestions = [
            'Connaught Place, New Delhi, Delhi, India',
            'Cyber Hub, Gurugram, Haryana, India',
            'Indira Gandhi International Airport, Delhi, India',
            'Hauz Khas Village, New Delhi, Delhi, India',
            'MG Road, Bengaluru, Karnataka, India'
        ];
        return sampleSuggestions.filter(item => item.toLowerCase().includes(input.toLowerCase()));
    }

    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            return [input];
        }
    } catch (err) {
        console.error('Error fetching auto complete suggestions:', err.message);
        return [input];
    }
}

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    try {
        let captains = [];
        if (lat !== undefined && lng !== undefined) {
            captains = await captainModel.find({
                location: {
                    $geoWithin: {
                        $centerSphere: [ [ lng, lat ], radius / 6371 ]
                    }
                }
            });
        }
        if (!captains || captains.length === 0) {
            captains = await captainModel.find({});
        }
        return captains;
    } catch (err) {
        console.error('Error finding captains in radius:', err.message);
        return await captainModel.find({});
    }
}