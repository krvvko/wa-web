import React from 'react';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Events from "./components/Events";
import News from "./components/News";
import Jobs from "./components/Jobs";

const App: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/jobs" element={<Jobs />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
