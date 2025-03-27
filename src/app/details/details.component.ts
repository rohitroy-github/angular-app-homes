import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housinglocation";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article class="container mx-auto px-4 lg:px-16 py-10 flex flex-col lg:flex-row gap-10">
      <!-- Left Section: Image, Title, Location & Features -->
      <section class="w-full lg:w-2/3">
        <img
        class="h-[400px] w-full object-cover rounded-lg mb-8 shadow-lg"
        [src]="housingLocation?.photo"
          alt="Exterior photo of {{ housingLocation?.name }}"
          crossorigin
        />
        <h2 class="text-3xl sm:text-2xl font-bold mb-3">{{ housingLocation?.name }}</h2>
        <p class="text-xl sm:text-lg flex items-center gap-2 mb-3">
          <img src="/assets/location-pin.svg" alt="Location Icon" class="w-5 h-5" />
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
        <h2 class="text-2xl sm:text-xl font-semibold text-blue-600 mb-3">About this housing location</h2>
        <ul class="text-lg sm:text-base space-y-2">
          <li>🏠 Units available: <span class="font-semibold">{{ housingLocation?.availableUnits }}</span></li>
          <li>📶 Wifi: <span class="font-semibold">{{ housingLocation?.wifi ? 'Yes' : 'No' }}</span></li>
          <li>🧺 Laundry: <span class="font-semibold">{{ housingLocation?.laundry ? 'Yes' : 'No' }}</span></li>
          <li>🚗 Parking: <span class="font-semibold">{{ housingLocation?.parking ? 'Yes' : 'No' }}</span></li>
          <li>💰 Rent: <span class="font-semibold">{{ housingLocation?.rent }}</span></li>
          <li>🛏️ Room Type: <span class="font-semibold">{{ housingLocation?.roomType }}</span></li>
          <li>📍 Nearby Facilities: <span class="font-semibold">{{ housingLocation?.nearby?.join(', ') }}</span></li>

        </ul>
      </section>

      <!-- Right Section: Apply Form -->
      <section class="w-full lg:w-1/3 bg-gray-100 p-5 sm:p-4 rounded-lg shadow-md h-fit">
        <h2 class="text-xl sm:text-lg font-semibold mb-3">Interested ?</h2>
        <form [formGroup]="applyForm" 
        (submit)="submitApplication($event)"

        class="space-y-3">
          <input type="text" formControlName="firstName" placeholder="First Name" class="input-field text-lg sm:text-base bg-white p-3 sm:p-2 rounded-lg w-full" />
          <input type="text" formControlName="lastName" placeholder="Last Name" class="input-field text-lg sm:text-base bg-white p-3 sm:p-2 rounded-lg w-full" />
          <input type="email" formControlName="email" placeholder="Email" class="input-field text-lg sm:text-base bg-white p-3 sm:p-2 rounded-lg w-full" />
          <button type="submit" class="bg-blue-500 text-white px-5 sm:px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full cursor-pointer">
            Apply Now
          </button>
        </form>

        <p *ngIf="message" class="text-blue-500 text-sm mt-3 text-center">{{ message }}</p>

      </section>
    </article>
  `,
  styleUrls: [],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  message: string | null = null;
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params["id"], 10);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }
  
  submitApplication( event: Event) {
    event.preventDefault();


    if (!this.housingLocation) {
      console.error("Error: Housing location is undefined");
      return;
    }
    
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? "",
      this.housingLocation.id 
    );

    this.applyForm.reset();
    this.message = "The owner will contact you soon.";
  }
}
