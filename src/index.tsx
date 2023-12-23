import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {LocationProvider} from "./utils/useLocation";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <LocationProvider>
            <App/>
        </LocationProvider>
    </BrowserRouter>
);