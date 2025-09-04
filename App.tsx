import React, { useState, useMemo, useEffect } from 'react';
import ItineraryTimeline from './components/ItineraryTimeline';
import MapComponent from './components/Map';
import DayNavigator from './components/DayNavigator';
import { ITINERARY_DATA } from './constants';
import type { City, ItineraryDay } from './types';
import GeometricPattern from './components/GeometricPattern';

const backgroundColors: { [key: string]: string } = {
    gray: 'bg-gray-900',
    emerald: 'bg-emerald-900',
    ivory: 'bg-stone-100', // Corrected: Light ivory background for Udaipur
    rose: 'bg-rose-900',
    orange: 'bg-orange-900',
    yellow: 'bg-amber-900',
    sky: 'bg-sky-900',
};

const App: React.FC = () => {
  const [highlightedCity, setHighlightedCity] = useState<string | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  
  const [activePattern, setActivePattern] = useState(ITINERARY_DATA[0].color);
  const [oldPattern, setOldPattern] = useState<string | null>(null);

  useEffect(() => {
    const newColor = ITINERARY_DATA[currentDayIndex].color;
    if (newColor !== activePattern) {
        setOldPattern(activePattern);
        setActivePattern(newColor);
        const timer = setTimeout(() => {
            setOldPattern(null);
        }, 1000); // Match CSS animation duration
        return () => clearTimeout(timer);
    }
  }, [currentDayIndex, activePattern]);


  const cities = useMemo(() => {
    const cityMap = new Map<string, City>();
    ITINERARY_DATA.forEach(day => {
      if (!cityMap.has(day.city)) {
        cityMap.set(day.city, {
          name: day.city,
          coords: day.coords,
          color: day.color,
        });
      }
    });
    return Array.from(cityMap.values());
  }, []);

  const waypoints = useMemo(() => {
    if (currentDayIndex === 0) return [];

    const currentDay = ITINERARY_DATA[currentDayIndex];
    let previousDay = null;
    for (let i = currentDayIndex - 1; i >= 0; i--) {
        if (ITINERARY_DATA[i].city !== currentDay.city) {
            previousDay = ITINERARY_DATA[i];
            break;
        }
    }

    if (previousDay && currentDay.city !== previousDay.city) {
        return [previousDay.coords, currentDay.coords];
    }

    return [];
  }, [currentDayIndex]);
  
  const activeDayData: ItineraryDay | null = useMemo(() => {
    return ITINERARY_DATA[currentDayIndex] || null;
  }, [currentDayIndex]);

  const handlePrev = () => {
    setCurrentDayIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentDayIndex((prev) => Math.min(ITINERARY_DATA.length - 1, prev + 1));
  };
  
  const handleDaySelect = (index: number) => {
    setCurrentDayIndex(index);
  };

  const mainBgClass = backgroundColors[activePattern] || 'bg-gray-900';
  const patternColorClass = activePattern === 'ivory' ? 'text-amber-600' : 'text-white';
  const headerTextColor = activePattern === 'ivory' ? 'text-gray-800' : 'text-white';

  
  return (
    <main className={`relative min-h-screen font-sans flex flex-col transition-colors duration-1000 ${mainBgClass}`}>
      <div className="absolute inset-0 w-full h-full">
        {oldPattern && (
          <div key={`${oldPattern}-old`} className="absolute inset-0 w-full h-full animate-fade-out">
            <GeometricPattern color={oldPattern} className={`w-full h-full opacity-20 ${oldPattern === 'ivory' ? 'text-amber-600' : 'text-white'}`}/>
          </div>
        )}
        <div key={activePattern} className="absolute inset-0 w-full h-full animate-fade-in">
          <GeometricPattern color={activePattern} className={`w-full h-full opacity-25 ${patternColorClass}`}/>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full flex-grow flex flex-col">
        <header className="text-center shrink-0 py-8 sm:py-12">
          <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight ${headerTextColor}`}>
            Rajasthan
          </h1>
        </header>
        
        <div className="flex-grow flex flex-col lg:justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 w-full lg:items-center">
              <section className="flex flex-col items-center justify-center relative px-12 sm:px-16 order-2 lg:order-1">
                <button 
                  onClick={handlePrev} 
                  disabled={currentDayIndex === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95 backdrop-blur-sm"
                  aria-label="Previous Day"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>

                <div className="w-full">
                  <ItineraryTimeline 
                    dayIndex={currentDayIndex}
                    onHoverCity={setHighlightedCity} 
                  />
                </div>
                
                <button 
                  onClick={handleNext} 
                  disabled={currentDayIndex === ITINERARY_DATA.length - 1}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95 backdrop-blur-sm"
                  aria-label="Next Day"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
                <DayNavigator 
                  totalDays={ITINERARY_DATA.length}
                  currentIndex={currentDayIndex}
                  onSelectDay={handleDaySelect}
                  activeColor={activeDayData?.color || 'gray'}
                />
              </section>
              <aside className="lg:col-span-1 flex items-center order-1 lg:order-2">
                 <div className="w-full">
                  <MapComponent 
                    cities={cities} 
                    highlightedCity={highlightedCity} 
                    waypoints={waypoints}
                    activeDayData={activeDayData}
                  />
                 </div>
              </aside>
            </div>
        </div>
      </div>
    </main>
  );
};

export default App;