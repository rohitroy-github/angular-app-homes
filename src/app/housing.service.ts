import { Injectable } from "@angular/core";
import { HousingLocation } from "./housinglocation";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  constructor() {}

  // URL of the JSON server where housing data is stored
  serverDataUrl = "http://localhost:3000";

  // readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  // Sample hardcoded housing location data (previously used before API integration)
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
  // ];

  /**
   * Fetches all available housing locations from the JSON server.
   * @returns A promise that resolves to an array of HousingLocation objects.
   */
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const fetchedData = await fetch(`${this.serverDataUrl}/housingLocations`);

    return (await fetchedData.json()) ?? {};
  }

  /**
   * Fetches a single housing location by its ID.
   * @param id - The ID of the housing location.
   * @returns A promise that resolves to a HousingLocation object or undefined if not found.
   */
  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.serverDataUrl}/housingLocations/${id}`);

    return (await data.json()) ?? {};
  }

  // Previous console-based application submission (before API implementation)
  // submitApplication(firstName: string, lastName: string, email: string) {
  //   console.log(
  //     `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
  //   );
  // }

  /**
   * Submits an application for a housing location.
   * @param firstName - The first name of the applicant.
   * @param lastName - The last name of the applicant.
   * @param email - The email of the applicant.
   * @param propertyId - The ID of the housing location being applied for.
   * @returns A promise that resolves once the application is submitted.
   */
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
