import {Routes, Route, useLocation} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

import NavBar from './components/NavBar';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import ShowDetailsPage from './pages/ShowDetailsPage';
import NotificationsPage from './pages/NotificationsPage';
import AboutPage from './pages/AboutPage';
import {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import FestivalsPage from "./pages/FestivalsPage.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import FestivalDetailsPage from "./pages/FestivalDetailsPage.tsx";
import Footer from "./components/Footer.tsx";
import ShowsPage from "./pages/ShowsPage.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import {useAmplitude} from './hooks/useAmplitude.ts';
import PageTracker from "./hooks/PageTracker.ts";


const queryClient = new QueryClient();

function App() {
    const location = useLocation();
    const {i18n} = useTranslation();
    const showNavBar = location.pathname !== '/';

    useEffect(() => {
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    }, [i18n.language]);

    useAmplitude();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col min-h-screen bg-primary-950">
                {showNavBar && <NavBar/>}
                <AnimatePresence mode="wait">
                    <ScrollToTop/>
                    <PageTracker/>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<SplashPage/>}/>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/show/:id" element={<ShowDetailsPage/>}/>
                        <Route path="/show" element={<ShowsPage/>}/>
                        <Route path="/alerts" element={<NotificationsPage/>}/>
                        <Route path="/about" element={<AboutPage/>}/>
                        <Route path="/festivals" element={<FestivalsPage/>}/>
                        <Route path="/festivals/:id" element={<FestivalDetailsPage/>}/>
                    </Routes>
                </AnimatePresence>
                <Footer/>
            </div>
        </QueryClientProvider>
    )
        ;
}

export default App;