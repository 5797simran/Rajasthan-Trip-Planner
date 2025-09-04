import React from 'react';

const patterns: { [key: string]: React.ReactNode } = {
    emerald: <path d="M0 20 Q 25 0, 50 20 T 100 20" stroke="currentColor" fill="none" strokeWidth="2"/>,
    ivory: <path d="M-10 10.5 C-10 4.7 4.7-10 10.5-10 S31 4.7 31 10.5 16.3 31 10.5 31 -10 16.3 -10 10.5z M30 20.5 C30 14.7 44.7 0 50.5 0 S71 14.7 71 20.5 56.3 41 50.5 41 30 26.3 30 20.5z" fill="none" stroke="currentColor" strokeWidth="2" />,
    rose: <path d="M.5 50 V.5 H50" fill="none" stroke="currentColor" strokeWidth="2"/>,
    orange: <path d="M0 0 H 25 V 25 H 50 V 50 H 0 Z" fill="currentColor" fillOpacity="0.5"/>,
    yellow: <path d="M10 0 L20 20 L0 8 H30 L10 28" fill="none" stroke="currentColor" strokeWidth="2"/>,
    sky: <path d="M-10 25 Q 15 0, 40 25 T 90 25" stroke="currentColor" fill="none" strokeWidth="2.5"/>,
    gray: <path d="M0 10h50 M0 20h50 M0 30h50 M0 40h50" stroke="currentColor" fill="none" strokeWidth="1.5"/>,
};

interface GeometricPatternProps {
    color: string;
    className?: string;
}

const GeometricPattern: React.FC<GeometricPatternProps> = ({ color, className }) => {
    const pattern = patterns[color] || patterns.gray;
    const patternId = `pattern-${color}`;

    return (
        <svg aria-hidden="true" className={className}>
            <defs>
                <pattern id={patternId} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="translate(-1 -1)">
                   {pattern}
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`}/>
        </svg>
    );
};

export default GeometricPattern;