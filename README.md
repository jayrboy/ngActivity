# NgActivity

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Add Angular Material

```bash
ng add @angular/material
```

# Install NPM ToastR

```bash
npm install ngx-toastr --save
npm install @angular/animations --save
```

1. Set up: Add CSS to angular.json

```json
"styles": [
  "styles.scss", "node_modules/ngx-toastr/toastr.css"
]
```

2. Add "provideAnimations()" and "provideToastr()" to "app.config.ts"

```ts
import { AppComponent } from "./src/app.component";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { provideToastr } from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideToastr(), // Toastr providers
  ],
};
```

3. Use

```ts
//TODO:
import { ToastrService } from 'ngx-toastr';

@Component({...})
export class YourComponent {
  //TODO:
  constructor(private toastr: ToastrService) { }

  //TODO:
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
```

## Options

- https://github.com/scttcper/ngx-toastr
