import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housinglocation";
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { HousingService } from "../housing.service";

@Component({
  selector: "app-home",
  imports: [CommonModule, HousingLocationComponent],
  template: `
   <section>
      <form>
        <input type="text" placeholder="Filter by city" />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      <!-- displaying single data -->

    <!-- <app-housing-location [housingLocation]="housingLocation"></app-housing-location> -->

    <!-- displaying multiple data -->

    <app-housing-location
        *ngFor="let housingLocation of housingLocationList"
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

  

  housingLocationList: HousingLocation[] = [];

  // dependency injection
  // https://angular.dev/tutorials/first-app/09-services
  
  constructor(private housingService: HousingService) { 
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }


}

