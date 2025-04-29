import React, {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import {Menu, X} from 'lucide-react'; // استيراد X كمان
import LanguageSwitcher from './LanguageSwitcher.tsx';
import Logo from '../assets/logo_navbar.png';

const NavBar: React.FC = () => {
    const location = useLocation();
    const {t, i18n} = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const isActive = (path: string) => location.pathname === path;

    useEffect(() => {
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    }, [i18n.language]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 bg-theater-dark py-4 px-4 z-10 shadow-md shadow-black/30"
            initial={{y: -100}}
            animate={{y: 0}}
            transition={{type: 'spring', stiffness: 260, damping: 20}}
        >
            <div className="container-custom flex items-center justify-between">
                {/* Logo */}
                <Link to="/home" className="flex items-center">
                    <img src={Logo} className="h-14 w-auto" alt="Logo"/>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <NavItem to="/home" label={t('nav.home')} isActive={isActive('/home')}/>
                    <NavItem to="/festivals" label={t('nav.festivals')} isActive={isActive('/festivals')}/>
                    {/*<NavItem to="/search" label={t('nav.search')} isActive={isActive('/search')}/>*/}
                    {/*<NavItem to="/alerts" label={t('nav.notifications')} isActive={isActive('/alerts')}/>*/}
                    {/*<NavItem to="/about" label={t('nav.about')} isActive={isActive('/about')}/>*/}
                    <LanguageSwitcher/>
                </div>

                {/* Mobile Burger Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28}/> : <Menu size={28}/>}
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        className={`absolute top-20 ${i18n.language === 'ar' ? 'left-4' : 'right-4'} bg-theater-dark shadow-lg rounded-lg py-4 px-6 flex flex-col gap-4 md:hidden`}
                    >
                        <NavItemMobile to="/home" label={t('nav.home')} setIsMenuOpen={setIsMenuOpen}
                                       isActive={isActive('/home')}/>
                        <NavItemMobile to="/festivals" label={t('nav.festivals')} setIsMenuOpen={setIsMenuOpen}
                                       isActive={isActive('/festivals')}/>

                        {/*<NavItemMobile to="/search" label={t('nav.search')} setIsMenuOpen={setIsMenuOpen}*/}
                        {/*               isActive={isActive('/search')}/>*/}
                        {/*<NavItemMobile to="/alerts" label={t('nav.notifications')} setIsMenuOpen={setIsMenuOpen}*/}
                        {/*               isActive={isActive('/alerts')}/>*/}
                        {/*<NavItemMobile to="/about" label={t('nav.about')} setIsMenuOpen={setIsMenuOpen}*/}
                        {/*               isActive={isActive('/about')}/>*/}
                        <LanguageSwitcher/>
                    </div>
                )}
            </div>
        </motion.nav>
    );
};

interface NavItemProps {
    to: string;
    label: string;
    isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({to, label, isActive}) => {
    return (
        <Link
            to={to}
            className="relative group"
        >
      <span className={`font-medium ${isActive ? 'text-secondary-500' : 'text-gray-300 hover:text-secondary-500'}`}>
        {label}
      </span>
            {isActive && (
                <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-secondary-500"
                    layoutId="activeTab"
                    transition={{type: 'spring', stiffness: 500, damping: 30}}
                />
            )}
        </Link>
    );
};

interface NavItemMobileProps {
    to: string;
    label: string;
    setIsMenuOpen: (open: boolean) => void;
    isActive: boolean;
}

const NavItemMobile: React.FC<NavItemMobileProps> = ({to, label, setIsMenuOpen, isActive}) => {
    return (
        <Link
            to={to}
            className="text-white relative"
            onClick={() => setIsMenuOpen(false)}
        >
      <span className="relative inline-block">
        {label}
          {isActive && (
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary-500"></div>
          )}
      </span>
        </Link>
    );
};
export default NavBar;
