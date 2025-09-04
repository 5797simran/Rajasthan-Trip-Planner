import React, { useState, useMemo, useEffect } from 'react';
import ItineraryTimeline from './components/ItineraryTimeline';
import MapComponent from './components/Map';
import DayNavigator from './components/DayNavigator';
import { ITINERARY_DATA } from './constants';
import type { City } from './types';

const App: React.FC = () => {
  const [highlightedCity, setHighlightedCity] = useState<string | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  // State for handling background image cross-fade
  const [bgImage, setBgImage] = useState(ITINERARY_DATA[0].imageUrl);

  useEffect(() => {
    const newImage = ITINERARY_DATA[currentDayIndex].imageUrl;
    let linkElement: HTMLLinkElement | null = null;

    if (newImage) {
      // Preload the next image
      linkElement = document.createElement('link');
      linkElement.rel = 'preload';
      linkElement.as = 'image';
      linkElement.href = newImage;
      document.head.appendChild(linkElement);
    }

    // Set a timeout to allow the fade-out effect before changing the image
    const timer = setTimeout(() => {
      setBgImage(newImage);
    }, 500); // This should match the fade-out duration

    return () => {
      clearTimeout(timer);
      if (linkElement) {
        document.head.removeChild(linkElement);
      }
    };
  }, [currentDayIndex]);


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
  
  const activeDayData = useMemo(() => {
    const day = ITINERARY_DATA[currentDayIndex];
    return day ? { coords: day.coords, color: day.color, city: day.city, imageUrl: day.imageUrl } : null;
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

  const isPhotoDay = !!activeDayData?.imageUrl;
  const isWhiteDay = activeDayData?.color === 'white';
  const mainBgClass = isPhotoDay ? 'bg-gray-900' : (isWhiteDay ? 'bg-white' : 'bg-gray-900');
  const headerTextClass = isPhotoDay || !isWhiteDay ? 'text-white' : 'text-gray-800';
  
  return (
    <main className={`relative min-h-screen font-sans flex flex-col transition-colors duration-1000 ${mainBgClass}`}>
      {/* Background Image Container */}
      {isPhotoDay && bgImage && (
        <>
            <div
                key={bgImage}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 animate-fade-in"
                style={{ backgroundImage: `url('${bgImage}')` }}
            />
            <div className="absolute inset-0 bg-black/50" />
        </>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-8 w-full flex-grow flex flex-col">
        <header className="text-center mb-12 pt-8">
          <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight ${headerTextClass}`}>
            Rajasthan
          </h1>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 xl:gap-24 flex-grow items-center">
          <section className="flex flex-col items-center justify-center relative px-12 sm:px-16">
            <button 
              onClick={handlePrev} 
              disabled={currentDayIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95 backdrop-blur-sm"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95 backdrop-blur-sm"
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
          <aside className="lg:col-span-1 mt-8 lg:mt-0">
             <div className="lg:sticky lg:top-8">
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
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-in-out forwards;
        }
      `}</style>
    </main>
  );
};

export default App;