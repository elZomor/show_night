import {useTranslation} from 'react-i18next';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const {t} = useTranslation();

    return (
        <footer className={`flex items-center p-5 bg-theater-dark h-16`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div>
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <p className={`text-sm text-secondary-500`}>
                            © {currentYear} {t('footer.copy_rights')}
                        </p>
                        <p className={`text-sm text-secondary-500`}>
                            {t('footer.details')}: support@play-cast.com
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
        ;
};

export default Footer;
