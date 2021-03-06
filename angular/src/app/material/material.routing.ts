import {
  ComponentExamplesComponent,
  ComponentViewerComponent
} from "./pages/component-viewer/component-viewer";

import { Routes } from "@angular/router";

export const MaterialRoutes: Routes = [
  {
    path: ":id",
    component: ComponentViewerComponent,
    children: [
      {
        path: "",
        component: ComponentExamplesComponent,
        pathMatch: "full"
      }
    ]
  }
];
