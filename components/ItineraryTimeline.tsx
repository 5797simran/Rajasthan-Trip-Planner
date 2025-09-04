import React from 'react';
import { ITINERARY_DATA } from '../constants';
import ItineraryDayCard from './ItineraryDayCard';

interface ItineraryTimelineProps {
  onHoverCity: (city: string | null) => void;
  dayIndex: number;
}

const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ onHoverCity, dayIndex }) => {
  const dayData = ITINERARY_DATA[dayIndex];
  
  return (
    <div className="relative w-full">
      <div className="relative flex flex-col items-center min-h-[400px]">
        {/* Animate presence by changing key */}
        <div key={dayIndex} className="w-full animate-card-enter">
           <ItineraryDayCard
            dayData={dayData}
            onHover={onHoverCity}
          />
        </div>
      </div>
       <style>{`
        @keyframes gentle-swoop-in {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-card-enter {
          animation: gentle-swoop-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </div>
  );
};

export default ItineraryTimeline;