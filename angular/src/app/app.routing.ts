import { AdminLayoutComponent, AuthLayoutComponent } from "./core";

import { Routes } from "@angular/router";

export const AppRoutes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      {
        path: "apps",
        loadChildren: () => import("./apps/apps.module").then(m => m.AppsModule)
      },
      {
        path: "widgets",
        loadChildren: () =>
          import("./widgets/widgets.module").then(m => m.WidgetsModule)
      },
      {
        path: "material",
        loadChildren: () =>
          import("./material/material.module").then(
            m => m.MaterialComponentsModule
          )
      },
      {
        path: "ecommerce",
        loadChildren: () =>
          import("./ecommerce/ecommerce.module").then(m => m.EcommerceModule)
      },
      {
        path: "taskboard",
        loadChildren: () =>
          import("./taskboard/taskboard.module").then(m => m.TaskboardModule)
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.module").then(m => m.FormModule)
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.module").then(m => m.TablesModule)
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./chartlib/chartlib.module").then(m => m.ChartlibModule)
      },
      {
        path: "maps",
        loadChildren: () => import("./maps/maps.module").then(m => m.MapModule)
      },
      {
        path: "dragndrop",
        loadChildren: () =>
          import("./dragndrop/dragndrop.module").then(m => m.DragndropModule)
      },
      {
        path: "pages",
        loadChildren: () =>
          import("./pages/pages.module").then(m => m.PagesModule)
      }
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "session",
        loadChildren: () =>
          import("./session/session.module").then(m => m.SessionModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "session/404"
  }
];
