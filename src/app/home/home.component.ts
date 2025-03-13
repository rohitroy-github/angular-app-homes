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
      <form
        class="flex flex-wrap items-center justify-center gap-3 w-2/3"
        (submit)="filterResults(filter.value, $event)"
      >
        <input
          type="text"
          placeholder="Filter by city"
          #filter
          class="border border-blue-500 px-4 py-2 rounded-lg w-72 md:w-2/3 lg:w-1/3"
        />
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>
    </section>

    <section
      class="grid gap-8 mt-12 justify-around sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      *ngIf="filteredLocationList.length > 0; else noResults"
    >
      <!-- displaying single data -->

      <!-- <app-housing-location [housingLocation]="housingLocation"></app-housing-location> -->

      <!-- displaying multiple data -->

      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
        class="bg-white shadow-md rounded-xl"
      ></app-housing-location>
    </section>

    <!-- No Results Message -->
    <ng-template #noResults>
      <p class="text-gray-500 text-center mt-16">
        Sorry, there are no listed properties in this area.
      </p>
    </ng-template>
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
  filterResults(text: string, event: Event) {
    event.preventDefault();

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
