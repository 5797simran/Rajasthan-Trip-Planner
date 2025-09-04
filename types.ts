export enum ActivityType {
  TravelTrain,
  TravelBus,
  TravelPlane,
  Explore,
  Stay,
  Experience,
  Departure,
  Arrival,
}

export interface Activity {
  type: ActivityType;
  description: string;
  time?: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  city: string;
  color: string;
  activities: Activity[];
  coords: { lat: number; lng: number };
  imageUrl: string;
}

export interface City {
  name: string;
  coords: { lat: number; lng: number };
  color: string;
}