import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Comprobar si el token está almacenado en localStorage
        const token = localStorage.getItem('access');
        setIsAuthenticated(!!token);
    }, []);

    const login = (token) => {
        localStorage.setItem('access', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('access');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useAuth = () => useContext(AuthContext);
