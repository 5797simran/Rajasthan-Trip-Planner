import React from 'react';
import { ItineraryDay, Activity, ActivityType } from '../types';

const colorVariants: { [key: string]: { border: string; bg: string; text: string; icon: string; header: string } } = {
    white: { border: 'border-gray-200', bg: 'bg-gray-800', text: 'text-gray-700', icon: 'text-gray-600', header: 'bg-gray-50' },
    emerald: { border: 'border-emerald-300', bg: 'bg-emerald-500', text: 'text-emerald-600', icon: 'text-emerald-500', header: 'bg-emerald-50' },
    slate: { border: 'border-slate-300', bg: 'bg-slate-500', text: 'text-slate-600', icon: 'text-slate-500', header: 'bg-slate-50' },
    rose: { border: 'border-rose-300', bg: 'bg-rose-500', text: 'text-rose-600', icon: 'text-rose-500', header: 'bg-rose-50' },
    red: { border: 'border-red-300', bg: 'bg-red-500', text: 'text-red-600', icon: 'text-red-500', header: 'bg-red-50' },
    amber: { border: 'border-amber-300', bg: 'bg-amber-500', text: 'text-amber-600', icon: 'text-amber-500', header: 'bg-amber-50' },
    sky: { border: 'border-sky-300', bg: 'bg-sky-500', text: 'text-sky-600', icon: 'text-sky-500', header: 'bg-sky-50' },
};

const HeaderPattern: React.FC<{ color: string }> = ({ color }) => {
    const patterns: { [key: string]: React.ReactNode } = {
        emerald: <path d="M0 20 Q 25 0, 50 20 T 100 20" stroke="currentColor" fill="none" strokeWidth="1"/>,
        slate: <path d="M-10 10.5 C-10 4.7 4.7-10 10.5-10 S31 4.7 31 10.5 16.3 31 10.5 31 -10 16.3 -10 10.5z M30 20.5 C30 14.7 44.7 0 50.5 0 S71 14.7 71 20.5 56.3 41 50.5 41 30 26.3 30 20.5z" fill="none" stroke="currentColor" strokeWidth="1" />,
        rose: <path d="M.5 200V.5H200" fill="none" stroke="currentColor" strokeWidth="1"/>,
        red: <path d="M0 0 H 25 V 25 H 50 V 50 H 0 Z" fill="currentColor" fillOpacity="0.5"/>,
        amber: <path d="M10 0 L20 20 L0 8 H30 L10 28" fill="none" stroke="currentColor" strokeWidth="1"/>,
        sky: <path d="M-10 25 Q 15 0, 40 25 T 90 25" stroke="currentColor" fill="none" strokeWidth="1"/>,
        white: <path d="M0 10h50 M0 20h50 M0 30h50 M0 40h50" stroke="currentColor" fill="none" strokeWidth="0.5"/>,
    };

    const pattern = patterns[color] || patterns.white;

    return (
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-10">
            <defs>
                <pattern id={`pattern-${color}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="translate(-1 -1)">
                   {pattern}
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pattern-${color})`}/>
        </svg>
    );
};


const ActivityIcon: React.FC<{ type: ActivityType; className: string }> = ({ type, className }) => {
  const iconProps = { className: `w-6 h-6 ${className}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 };
  
  switch (type) {
    case ActivityType.TravelTrain: return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" /></svg>;
    case ActivityType.TravelBus: return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75c0-.231-.035-.454-.1-.664M6.75 7.5h1.5" /></svg>;
    case ActivityType.TravelPlane: return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>;
    case ActivityType.Explore: return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
    case ActivityType.Stay: return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-1.5m-15-13.5H18" /></svg>;
    case ActivityType.Experience: return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.552.044.77.73.343 1.086l-4.194 3.603a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.194-3.603a.563.563 0 01.343-1.086l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>;
    case ActivityType.Departure: return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>;
    case ActivityType.Arrival: return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>;
    default: return null;
  }
};

const ActivityItem: React.FC<{ activity: Activity, colorClass: string }> = ({ activity, colorClass }) => (
  <li className="flex items-start gap-4">
    <div className="flex-shrink-0 pt-0.5">
      <ActivityIcon type={activity.type} className={colorClass} />
    </div>
    <div>
      <p className="text-gray-800">{activity.description}</p>
      {activity.time && <p className="text-sm text-gray-500">{activity.time}</p>}
    </div>
  </li>
);

interface ItineraryDayCardProps {
  dayData: ItineraryDay;
  onHover: (city: string | null) => void;
}

const ItineraryDayCard: React.FC<ItineraryDayCardProps> = ({ dayData, onHover }) => {
  const cardColors = colorVariants[dayData.color] || colorVariants.white;

  return (
    <div
      className="relative w-full max-w-lg mx-auto"
      onMouseEnter={() => onHover(dayData.city)}
      onMouseLeave={() => onHover(null)}
    >
      <div className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-lg ${cardColors.bg} ring-8 ring-white shadow`}>
        {dayData.day}
      </div>
      
      <div className={`bg-white rounded-2xl shadow-lg border ${cardColors.border} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
        <div className={`relative p-5 border-b ${cardColors.border} ${cardColors.header}`}>
            <HeaderPattern color={dayData.color} />
            <div className="relative">
                <p className={`text-xs font-bold uppercase tracking-wider ${cardColors.text}`}>{dayData.city}</p>
                <h2 className="text-2xl font-bold text-gray-800 mt-1 font-serif">{dayData.title}</h2>
                <p className="text-sm text-gray-500">{dayData.date}</p>
            </div>
        </div>
        <div className="p-6 bg-white">
            <ul className="space-y-4">
              {dayData.activities.map((activity, index) => (
                <ActivityItem key={index} activity={activity} colorClass={cardColors.icon} />
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDayCard;