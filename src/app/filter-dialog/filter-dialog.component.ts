import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-filter-dialog",
  standalone: true,
  imports: [FormsModule],
  template: `
<section class="p-5 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
<h2 class="text-lg font-semibold text-gray-800">Filter Properties</h2>

      <div class="flex flex-col gap-3 mt-3">
        <label class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" [(ngModel)]="filters.wifi" class="accent-blue-500" />
          WiFi Available
        </label>

        <label class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" [(ngModel)]="filters.laundry" class="accent-blue-500" />
          Laundry Available
        </label>

        <label class="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" [(ngModel)]="filters.parking" class="accent-blue-500" />
          Parking Available
        </label>

        <div>
          <label class="block text-sm font-medium text-gray-700">Min Rent:</label>
          <input
            type="number"
            [(ngModel)]="filters.minRent"
            class="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Max Rent:</label>
          <input
            type="number"
            [(ngModel)]="filters.maxRent"
            class="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

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

  applyFilters() {
    this.dialogRef.close(this.filters);
  }
}
