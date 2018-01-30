import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';
import {
    RegistrationService,
    RegistrationPopupService,
    RegistrationComponent,
    RegistrationDetailComponent,
    RegistrationDialogComponent,
    RegistrationPopupComponent,
    RegistrationDeletePopupComponent,
    RegistrationDeleteDialogComponent,
    registrationRoute,
    registrationPopupRoute,
    RegistrationTipComponent,
    RegistrationCleartComponent,
} from './';

const ENTITY_STATES = [
    ...registrationRoute,
    ...registrationPopupRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RegistrationComponent,
        RegistrationDetailComponent,
        RegistrationDialogComponent,
        RegistrationDeleteDialogComponent,
        RegistrationPopupComponent,
        RegistrationDeletePopupComponent,
        RegistrationTipComponent,
        RegistrationCleartComponent,
    ],
    entryComponents: [
        RegistrationComponent,
        RegistrationDialogComponent,
        RegistrationPopupComponent,
        RegistrationDeleteDialogComponent,
        RegistrationDeletePopupComponent,
        RegistrationTipComponent,
        RegistrationCleartComponent,

    ],
    providers: [
        RegistrationService,
        RegistrationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinRegistrationModule {}
