import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterModule],
  template: `
    <main class="flex flex-col items-center">
      <!-- Header with Brand Logo -->
      <header class="flex justify-center items-center">
        <img
          class="w-30 h-30" 
          src="/assets/logo.svg"
          alt="logo"
          aria-hidden="true"
        />
      </header>

      <!-- Main Content Section with dynamic padding -->
      <article class=" container  mx-auto w-full px-4 md:px-8 lg:px-16 xl:px-16 pb-10">
        <router-outlet></router-outlet>
      </article>
    </main>
  `,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "homes";
}