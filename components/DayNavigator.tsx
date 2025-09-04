import React from 'react';

interface DayNavigatorProps {
  totalDays: number;
  currentIndex: number;
  onSelectDay: (index: number) => void;
  activeColor: string;
}

const colorVariants: { [key: string]: string } = {
    white: 'bg-gray-800',
    emerald: 'bg-emerald-500',
    slate: 'bg-slate-500',
    rose: 'bg-rose-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    sky: 'bg-sky-500',
};

const DayNavigator: React.FC<DayNavigatorProps> = ({ totalDays, currentIndex, onSelectDay, activeColor }) => {
  return (
    <div className="flex justify-center items-center space-x-3 mt-8 py-4">
      {Array.from({ length: totalDays }).map((_, index) => {
        const isActive = index === currentIndex;
        const activeBg = colorVariants[activeColor] || colorVariants.white;
        return (
          <button
            key={index}
            onClick={() => onSelectDay(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${isActive ? `${activeBg} scale-150` : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'}`}
            aria-label={`Go to day ${index}`}
            aria-current={isActive}
          />
        );
      })}
    </div>
  );
};

export default DayNavigator;