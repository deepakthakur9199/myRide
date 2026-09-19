export const getBaseUrl = () => {
    const envUrl = import.meta.env.VITE_BASE_URL;
    if (envUrl && envUrl.trim() !== '' && !envUrl.includes('localhost')) {
        return envUrl.replace(/\/$/, '');
    }
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        return envUrl ? envUrl.replace(/\/$/, '') : 'http://localhost:4000';
    }
    return '';
};

export const extractErrorMessage = (err, defaultMsg = 'An error occurred. Please try again.') => {
    if (err.response?.data) {
        if (typeof err.response.data === 'string') {
            return err.response.data;
        }
        if (err.response.data.message) {
            return err.response.data.message;
        }
        if (Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
            return err.response.data.errors.map(e => e.msg).join(', ');
        }
    }
    return err.message || defaultMsg;
};
