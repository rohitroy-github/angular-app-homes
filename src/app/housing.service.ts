import { Injectable } from "@angular/core";
import { HousingLocation } from "./housinglocation";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  constructor() {}

  serverDataUrl = "http://localhost:3000";

  // readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  // protected housingLocationList: HousingLocation[] = [
  //     {
  //       id: 0,
  //       name: 'Shree Residency',
  //       city: 'Mumbai',
  //       state: 'Maharashtra',
  //       photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
  //       availableUnits: 4,
  //       wifi: true,
  //       laundry: true,
  //     },
  //     {
  //       id: 1,
  //       name: 'Sai Comfort Stay',
  //       city: 'Bengaluru',
  //       state: 'Karnataka',
  //       photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
  //       availableUnits: 0,
  //       wifi: false,
  //       laundry: true,
  //     },
  //     {
  //       id: 2,
  //       name: 'Annapurna Housing',
  //       city: 'Kolkata',
  //       state: 'West Bengal',
  //       photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
  //       availableUnits: 1,
  //       wifi: false,
  //       laundry: false,
  //     },
  //     {
  //       id: 3,
  //       name: 'Green Valley Residency',
  //       city: 'Pune',
  //       state: 'Maharashtra',
  //       photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
  //       availableUnits: 1,
  //       wifi: true,
  //       laundry: false,
  //     },
  //     {
  //       id: 4,
  //       name: 'Happy Living Homes',
  //       city: 'Ahmedabad',
  //       state: 'Gujarat',
  //       photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
  //       availableUnits: 1,
  //       wifi: true,
  //       laundry: false,
  //     },
  //     {
  //       id: 5,
  //       name: 'Lotus Residency',
  //       city: 'Hyderabad',
  //       state: 'Telangana',
  //       photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
  //       availableUnits: 2,
  //       wifi: true,
  //       laundry: true,
  //     },
  //     {
  //       id: 6,
  //       name: 'Serene Shelter',
  //       city: 'Chennai',
  //       state: 'Tamil Nadu',
  //       photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
  //       availableUnits: 5,
  //       wifi: true,
  //       laundry: true,
  //     },
  //     {
  //       id: 7,
  //       name: 'Heritage Heights',
  //       city: 'Jaipur',
  //       state: 'Rajasthan',
  //       photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
  //       availableUnits: 2,
  //       wifi: true,
  //       laundry: true,
  //     },
  //     {
  //       id: 8,
  //       name: 'Safe Haven Residency',
  //       city: 'Indore',
  //       state: 'Madhya Pradesh',
  //       photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
  //       availableUnits: 10,
  //       wifi: false,
  //       laundry: false,
  //     },
  //     {
  //       id: 9,
  //       name: 'Capital Residency',
  //       city: 'New Delhi',
  //       state: 'Delhi',
  //       photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
  //       availableUnits: 6,
  //       wifi: true,
  //       laundry: true,
  //     },
  //   ];

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const fetchedData = await fetch(`${this.serverDataUrl}/housingLocations`);

    return (await fetchedData.json()) ?? {};
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.serverDataUrl}/housingLocations/${id}`);

    return (await data.json()) ?? {};
  }

  // submitApplication(firstName: string, lastName: string, email: string) {
  //   console.log(
  //     `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
  //   );
  // }

  async submitApplication(
    firstName: string,
    lastName: string,
    email: string,
    propertyId: number
  ): Promise<void> {
    const applicationData = { firstName, lastName, email, propertyId };

    console.log(applicationData);

    const response = await fetch(`${this.serverDataUrl}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });

    if (response.ok) {
      console.log("Application submitted successfully:", await response.json());
    } else {
      console.error("Error submitting application:", response.statusText);
    }
  }
}
