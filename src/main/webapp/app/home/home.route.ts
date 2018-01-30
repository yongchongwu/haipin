import {Route} from "@angular/router";
import {HomeComponent, HomeRouteAccessService} from "./";

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    },
    canActivate: [HomeRouteAccessService]
};
