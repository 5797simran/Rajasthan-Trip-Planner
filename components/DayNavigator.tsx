import React from 'react';

interface DayNavigatorProps {
  totalDays: number;
  currentIndex: number;
  onSelectDay: (index: number) => void;
  activeColor: string;
}

const colorVariants: { [key: string]: string } = {
    gray: 'bg-gray-500',
    emerald: 'bg-emerald-500',
    ivory: 'bg-amber-500',
    rose: 'bg-rose-400',
    orange: 'bg-orange-400',
    yellow: 'bg-yellow-400',
    sky: 'bg-sky-400',
};

const DayNavigator: React.FC<DayNavigatorProps> = ({ totalDays, currentIndex, onSelectDay, activeColor }) => {
  return (
    <div className="flex justify-center items-center space-x-3 mt-8 py-4">
      {Array.from({ length: totalDays }).map((_, index) => {
        const isActive = index === currentIndex;
        const activeBg = colorVariants[activeColor] || colorVariants.gray;
        const ringColor = activeColor === 'ivory' ? 'focus:ring-amber-300' : 'focus:ring-sky-300';
        return (
          <button
            key={index}
            onClick={() => onSelectDay(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${isActive ? `${activeBg} scale-150` : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'} ${ringColor}`}
            aria-label={`Go to day ${index}`}
            aria-current={isActive}
          />
        );
      })}
    </div>
  );
};

export default DayNavigator;