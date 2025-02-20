import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

import { HousingLocation } from "../housinglocation";

import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: "app-housing-location",
  imports: [CommonModule, RouterModule, RouterLink],
  template: `
    <section class="listing">
      <a [routerLink]="['/detials', housingLocation.id]">
        <img
          class="listing-photo"
          [src]="housingLocation.photo"
          alt="Exterior photo of {{ housingLocation.name }}"
          crossorigin
        />
        <h2 class="listing-heading">{{ housingLocation.name }}</h2>
        <p class="listing-location">
          {{ housingLocation.city }}, {{ housingLocation.state }}
        </p>
      </a>

      <button [routerLink]="['/details', housingLocation.id]" class="learn-more-btn">
        Learn More
      </button>
      
    </section>
  `,
  styleUrls: ["./housing-location.component.css"],
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
