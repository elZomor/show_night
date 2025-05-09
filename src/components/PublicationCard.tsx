import React from 'react';
import {motion} from 'framer-motion';

interface PublicationCardProps {
    fileUrl: string;
    number: string | undefined;
    date: string | undefined;
}

const PublicationCard: React.FC<PublicationCardProps> = ({fileUrl, number, date}) => {
    return (
        <motion.a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-900 rounded-lg shadow-md overflow-hidden border border-gray-700 hover:shadow-lg transition-shadow flex flex-col items-center p-4"
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
        >
            <div className="w-full h-48 bg-black rounded-md overflow-hidden mb-4 flex items-center justify-center">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                    alt="PDF thumbnail"
                    className="w-16 h-16 object-contain"
                />
            </div>
            <div className="text-center">
                <h4 className="text-white font-semibold mb-1">{number}</h4>
                <p className="text-sm text-gray-400">{date}</p>
            </div>
        </motion.a>

    );
};

export default PublicationCard;
