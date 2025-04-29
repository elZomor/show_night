import React from 'react';

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({icon, label, value}) => {
    return (
        <div className="flex items-center gap-2">
            {icon}
            <div className="w-28 text-gray-400 font-medium">{label}:</div>
            <div className="text-white">{value}</div>
        </div>
    );
};

export default InfoRow;
