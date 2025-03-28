// creating new interface
// https://angular.dev/tutorials/first-app/04-interfaces
export interface HousingLocation {
  id: number;
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
  furnished: boolean;
  parking: boolean;
  rent: string;
  roomType: string;
  nearby: string[];
}
