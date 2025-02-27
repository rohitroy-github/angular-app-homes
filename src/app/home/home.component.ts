// Angular component that displays a list of housing locations and allows users to filter them by city

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">
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
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

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
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
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
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
