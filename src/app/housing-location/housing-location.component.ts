import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocation } from "../housinglocation";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: "app-housing-location",
  imports: [CommonModule, RouterModule, RouterLink],
  template: `
    <section class="bg-gray-100 rounded-xl overflow-hidden shadow-lg p-6 flex flex-col items-center">
      <a [routerLink]="['/details', housingLocation.id]" class="w-full">
        <img
          class="w-full h-64 object-cover rounded-t-3xl"
          [src]="housingLocation.photo"
          alt="Exterior photo of {{ housingLocation.name }}"
          crossorigin
        />
        <h2 class="text-xl font-bold text-blue-600 mt-4">{{ housingLocation.name }}</h2>
        <p class="text-gray-700 flex items-center mt-2">
          <img src="/assets/location-pin.svg" alt="Location" class="w-4 h-4 mr-1" />
          {{ housingLocation.city }}, {{ housingLocation.state }}
        </p>
      </a>
      <button [routerLink]="['/details', housingLocation.id]" 
        class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Learn More
      </button>
    </section>
  `,
  styleUrls: ["./housing-location.component.css"],
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
