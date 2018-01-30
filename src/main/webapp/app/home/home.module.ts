import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent, HomeRouteAccessService } from './';

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
        HomeRouteAccessService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinHomeModule {}
