import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class MenuService {
  constructor(public translate: TranslateService) {}

  getAll() {
    return [
      {
        link: "/",
        label: this.translate.instant("HOME"),
        icon: "explore"
      },
      {
        label: this.translate.instant("APPS"),
        icon: "apps",
        items: [
          { link: "/apps/calendar", label: this.translate.instant("CALENDAR") },
          { link: "/apps/media", label: this.translate.instant("MEDIA") },
          { link: "/apps/messages", label: this.translate.instant("MESSAGES") },
          { link: "/apps/social", label: this.translate.instant("SOCIAL") },
          { link: "/apps/chat", label: this.translate.instant("CHAT") }
        ]
      },
      {
        link: "/widgets",
        label: this.translate.instant("WIDGETS"),
        icon: "photo"
      },
      {
        label: this.translate.instant("MATERIAL"),
        icon: "equalizer",
        items: [
          {
            link: "/material/autocomplete",
            label: this.translate.instant("AUTOCOMPLETE")
          },
          {
            link: "/material/checkbox",
            label: this.translate.instant("CHECKBOX")
          },
          {
            link: "/material/datepicker",
            label: this.translate.instant("DATEPICKER")
          },
          {
            link: "/material/form-field",
            label: this.translate.instant("FORMFIELD")
          },
          { link: "/material/input", label: this.translate.instant("INPUT") },
          { link: "/material/radio", label: this.translate.instant("RADIO") },
          { link: "/material/select", label: this.translate.instant("SELECT") },
          { link: "/material/slider", label: this.translate.instant("SLIDER") },
          {
            link: "/material/slide-toggle",
            label: this.translate.instant("SLIDETOGGLE")
          },
          { link: "/material/menu", label: this.translate.instant("MENU") },
          {
            link: "/material/sidenav",
            label: this.translate.instant("SIDENAV")
          },
          {
            link: "/material/toolbar",
            label: this.translate.instant("TOOLBAR")
          },
          { link: "/material/card", label: this.translate.instant("CARDS") },
          {
            link: "/material/divider",
            label: this.translate.instant("DIVIDER")
          },
          {
            link: "/material/expansion",
            label: this.translate.instant("EXPANSION")
          },
          {
            link: "/material/grid-list",
            label: this.translate.instant("GRID")
          },
          { link: "/material/list", label: this.translate.instant("LISTS") },
          {
            link: "/material/stepper",
            label: this.translate.instant("STEPPER")
          },
          { link: "/material/tabs", label: this.translate.instant("TABS") },
          { link: "/material/tree", label: this.translate.instant("TREE") },
          { link: "/material/button", label: this.translate.instant("BUTTON") },
          {
            link: "/material/button-toggle",
            label: this.translate.instant("BUTTONTOGGLE")
          },
          { link: "/material/badge", label: this.translate.instant("BADGE") },
          { link: "/material/chips", label: this.translate.instant("CHIPS") },
          { link: "/material/icon", label: this.translate.instant("ICON") },
          {
            link: "/material/progress-spinner",
            label: this.translate.instant("PROGRESSSPINNER")
          },
          {
            link: "/material/progress-bar",
            label: this.translate.instant("PROGRESSBAR")
          },
          {
            link: "/material/bottom-sheet",
            label: this.translate.instant("BOTTOMSHEET")
          },
          { link: "/material/dialog", label: this.translate.instant("DIALOG") },
          {
            link: "/material/snack-bar",
            label: this.translate.instant("SNACKBAR")
          },
          {
            link: "/material/tooltip",
            label: this.translate.instant("TOOLTIP")
          },
          {
            link: "/material/paginator",
            label: this.translate.instant("PAGINATOR")
          },
          {
            link: "/material/sort",
            label: this.translate.instant("SORTHEADER")
          },
          { link: "/material/table", label: this.translate.instant("TABLE") }
        ]
      },
      {
        label: this.translate.instant("FORMS"),
        icon: "looks_3",
        items: [
          {
            link: "/forms/validation",
            label: this.translate.instant("VALIDATION")
          },
          { link: "/forms/upload", label: this.translate.instant("UPLOAD") },
          { link: "/forms/editor", label: this.translate.instant("EDITOR") }
        ]
      },
      {
        label: this.translate.instant("DATATABLE"),
        icon: "format_line_spacing",
        items: [
          {
            link: "/tables/fullscreen",
            label: this.translate.instant("FULLSCREEN")
          },
          { link: "/tables/editing", label: this.translate.instant("EDITING") },
          { link: "/tables/filter", label: this.translate.instant("FILTER") },
          { link: "/tables/paging", label: this.translate.instant("PAGING") },
          { link: "/tables/sorting", label: this.translate.instant("SORTING") },
          { link: "/tables/pinning", label: this.translate.instant("PINNING") },
          {
            link: "/tables/selection",
            label: this.translate.instant("SELECTION")
          }
        ]
      },
      {
        label: this.translate.instant("ECOMMERCE"),
        icon: "looks_3",
        items: [
          {
            link: "/ecommerce/products",
            label: this.translate.instant("PRODUCTS")
          },
          {
            link: "/ecommerce/compact",
            label: this.translate.instant("COMPACT")
          },
          { link: "/ecommerce/detail", label: this.translate.instant("DETAIL") }
        ]
      },
      {
        link: "/taskboard",
        label: this.translate.instant("TASKBOARD"),
        icon: "view_column"
      },
      {
        link: "/charts",
        label: this.translate.instant("CHARTS"),
        icon: "show_chart"
      },
      {
        label: this.translate.instant("MAPS"),
        icon: "navigation",
        items: [
          { link: "/maps/google", label: this.translate.instant("GOOGLE") },
          { link: "/maps/leaflet", label: this.translate.instant("LEAFLET") }
        ]
      },
      {
        link: "/dragndrop",
        label: this.translate.instant("DND"),
        icon: "show_chart"
      },
      {
        label: this.translate.instant("PAGES"),
        icon: "pages",
        items: [
          { link: "/pages/invoice", label: this.translate.instant("INVOICE") },
          {
            link: "/pages/timeline",
            label: this.translate.instant("TIMELINE")
          },
          { link: "/pages/user", label: this.translate.instant("USER") },
          { link: "/pages/blank", label: this.translate.instant("BLANK") },
          { link: "/pages/pricing", label: this.translate.instant("PRICING") }
        ]
      },
      {
        label: this.translate.instant("SESSION"),
        icon: "face",
        items: [
          { link: "/session/404", label: this.translate.instant("404") },
          { link: "/session/error", label: this.translate.instant("ERROR") },
          { link: "/session/signin", label: this.translate.instant("SIGNIN") },
          { link: "/session/signup", label: this.translate.instant("SIGNUP") },
          { link: "/session/forgot", label: this.translate.instant("FORGOT") },
          {
            link: "/session/lockscreen",
            label: this.translate.instant("LOCKSCREEN")
          }
        ]
      },
      {
        link: "http://reactprimer.fusepx.xom",
        label: this.translate.instant("React Version"),
        externalRedirect: true,
        icon: "bookmark"
      },
      {
        link: "http://primer.nyasha.me/docs",
        label: this.translate.instant("DOCS"),
        externalRedirect: true,
        icon: "local_library"
      }
    ];
  }
}
