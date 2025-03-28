import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housinglocation";
import { HousingService } from "../housing.service";
import { MatDialog } from "@angular/material/dialog";
import { FilterDialogComponent } from "../filter-dialog/filter-dialog.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section class="flex flex-col items-center justify-center">
      <form
        class="flex flex-wrap items-center justify-center gap-3 w-2/3"
        (submit)="filterResults(filter.value, $event)"
      >
        <input
          type="text"
          placeholder="Filter by city, name, or room type"
          #filter
          class="border border-blue-500 px-4 py-2 rounded-lg w-72 md:w-2/3 lg:w-1/3"
        />

        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>

        <button
          type="button"
          (click)="openFilterDialog()"
          class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Filters
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
  private dialog = inject(MatDialog);

  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  filters = {
    searchText: "",
    wifi: false,
    laundry: false,
    parking: false,
    minRent: null,
    maxRent: null,
    roomType: "",
  };

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
   * Filters the results based on the provided search text.
   * Updates the searchText filter and applies the filters.
   *
   * @param text - The search text entered by the user.
   * @param event - The event object to prevent default form submission behavior.
   */
  filterResults(text: string, event: Event) {
    event.preventDefault();
    this.filters.searchText = text;
    this.applyFilters();
  }

  /**
   * Opens the filter dialog where users can select various filtering options.
   * After closing the dialog, if new filters are applied, updates the filter settings and applies them.
   */
  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      maxWidth: "90vw",  // Limits width to 90% of the viewport width
      width: "400px",     // Default width, but not fixed
      data: { ...this.filters },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.filters = result;
        this.applyFilters();
      }
    });
  }

  /**
   * Applies filters to the housing location list based on user-selected criteria.
   *
   * - Filters by search text in name, city, state, or room type.
   * - Filters by amenities (WiFi, laundry, parking).
   * - Filters by rent range (min and max rent).
   */
  applyFilters() {
    const lowerText = this.filters.searchText.toLowerCase();

    this.filteredLocationList = this.housingLocationList.filter(
      (location) =>
        (location.name.toLowerCase().includes(lowerText) ||
          location.city.toLowerCase().includes(lowerText) ||
          location.state.toLowerCase().includes(lowerText) ||
          location.roomType.toLowerCase().includes(lowerText)) &&
        (!this.filters.wifi || location.wifi) &&
        (!this.filters.laundry || location.laundry) &&
        (!this.filters.parking || location.parking) &&
        (!this.filters.minRent ||
          parseInt(location.rent.replace(/\D/g, "")) >= this.filters.minRent) &&
        (!this.filters.maxRent ||
          parseInt(location.rent.replace(/\D/g, "")) <= this.filters.maxRent)
    );
  }
}
