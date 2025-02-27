// Angular component that displays a list of housing locations and allows users to filter them by city

import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housinglocation";
import { HousingService } from "../housing.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section class="flex flex-col items-center justify-center mt-10">
      <form class="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Filter by city"
          #filter
          class="border border-blue-500 px-4 py-2 rounded-lg w-72 md:w-2/3 lg:w-1/3 "
        />
        <button
          type="button"
          (click)="filterResults(filter.value)"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>
    </section>

    <section class="results">
      <!-- displaying single data -->

      <!-- <app-housing-location [housingLocation]="housingLocation"></app-housing-location> -->

      <!-- displaying multiple data -->

      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  // readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  // displaying single data

  // housingLocation: HousingLocation = {
  //   id: 9999,
  //   name: 'Test Home',
  //   city: 'Test city',
  //   state: 'ST',
  //   photo: `${this.baseUrl}/example-house.jpg`,
  //   availableUnits: 99,
  //   wifi: true,
  //   laundry: false,
  // };

  // displaying multiple data
  // https://angular.dev/tutorials/first-app/08-ngFor

  private housingService = inject(HousingService); // Dependency injection of HousingService
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.loadHousingLocations();
  }

  /**
   * Loads all housing locations from the HousingService
   * and initializes the filteredLocationList with all data.
   */
  private loadHousingLocations() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }

  /**
   * Filters the list of housing locations based on the user's input.
   * If no text is entered, it resets to show all locations.
   * @param text - The filter text entered by the user.
   */
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = [...this.housingLocationList]; // Reset to original list
      return;
    }
    // else
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
