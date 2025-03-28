import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";

@Component({
  selector: "app-filter-dialog",
  standalone: true,
  imports: [FormsModule, MatSliderModule],
  template: `
    <section class="p-5 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 class="text-lg font-semibold text-gray-800">Filter Properties</h2>

      <div class="flex flex-col gap-3 mt-3">
        <!-- Checkbox for WiFi Availability -->
        <label class="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            [(ngModel)]="filters.wifi"
            class="accent-blue-500"
          />
          WiFi Available
        </label>

        <!-- Checkbox for Laundry Availability -->
        <label class="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            [(ngModel)]="filters.laundry"
            class="accent-blue-500"
          />
          Laundry Available
        </label>

        <!-- Checkbox for Parking Availability -->
        <label class="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            [(ngModel)]="filters.parking"
            class="accent-blue-500"
          />
          Parking Available
        </label>

        <!-- Rent Filter Section -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Estimated Rent: ₹{{ filters.minRent }} - ₹{{ filters.maxRent }} / month
          </label>

          <div class="flex flex-col">
            <!-- Rent Range Slider -->
            <mat-slider class="w-full" min="5000" max="50000">
              <input
                [(ngModel)]="filters.minRent"
                matSliderStartThumb
                [value]="filters.minRent"
                class="w-16 text-center border border-gray-300 rounded p-1"
              />
              <input
                [(ngModel)]="filters.maxRent"
                matSliderEndThumb
                [value]="filters.maxRent"
                class="w-16 text-center border border-gray-300 rounded p-1"
              />
            </mat-slider>
          </div>
        </div>

        <!-- Dropdown for Room Type Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Room Type:</label>
          <select
            [(ngModel)]="filters.roomType"
            class="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
          >
            <option value="">Any</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
          </select>
        </div>
      </div>

      <!-- Apply Filters Button -->
      <div class="flex justify-center mt-4">
        <button
          (click)="applyFilters()"
          class="bg-blue-600 text-white px-4 py-1.5 text-sm rounded-md shadow hover:bg-blue-700 transition-all"
        >
          Apply Filters
        </button>
      </div>
    </section>
  `,
})
export class FilterDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public filters: any
  ) {}

  ngOnInit() {
    // Set default values for rent range if not provided
    this.filters.minRent = this.filters.minRent || 5000;
    this.filters.maxRent = this.filters.maxRent || 10000;
  }

  // Close the dialog and return the selected filters
  applyFilters() {
    this.dialogRef.close(this.filters);
  }
}
