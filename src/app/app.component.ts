import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterModule],
  template: `
    <main class="flex flex-col items-center p-4">
      <!-- Header with Brand Logo -->
      <header class="flex justify-center items-center">
        <img
          class="w-20 h-20" 
          src="/assets/logo.svg"
          alt="logo"
          aria-hidden="true"
        />
      </header>

      <!-- Main Content Section with dynamic padding -->
      <section class="w-full mt-6 px-4 md:px-8 lg:px-16 xl:px-32">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "homes";
}