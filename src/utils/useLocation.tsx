/* eslint-disable @typescript-eslint/no-empty-function */

import React, { useState, useContext, createContext, ReactNode } from 'react';

interface LocationContextType {
    currentLocation: string;
    setCurrentLocation: (location: string) => void;
}

const LocationContext = createContext<LocationContextType>({
    currentLocation: '',
    setCurrentLocation: () => {},
});

interface LocationProviderProps {
    children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
    const [currentLocation, setCurrentLocation] = useState<string>('');

    const value = {
        currentLocation,
        setCurrentLocation,
    };

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
};

// Create the custom hook
export const useLocation = () => {
    const context = useContext(LocationContext);

    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }

    return context;
};
