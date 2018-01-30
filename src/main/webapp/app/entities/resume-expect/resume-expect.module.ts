import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';
import {
    ResumeExpectService,
    ResumeExpectPopupService,
    ResumeExpectComponent,
    ResumeExpectDetailComponent,
    ResumeExpectDialogComponent,
    ResumeExpectPopupComponent,
    ResumeExpectDeletePopupComponent,
    ResumeExpectDeleteDialogComponent,
    resumeExpectRoute,
    resumeExpectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resumeExpectRoute,
    ...resumeExpectPopupRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResumeExpectComponent,
        ResumeExpectDetailComponent,
        ResumeExpectDialogComponent,
        ResumeExpectDeleteDialogComponent,
        ResumeExpectPopupComponent,
        ResumeExpectDeletePopupComponent,
    ],
    entryComponents: [
        ResumeExpectComponent,
        ResumeExpectDialogComponent,
        ResumeExpectPopupComponent,
        ResumeExpectDeleteDialogComponent,
        ResumeExpectDeletePopupComponent,
    ],
    providers: [
        ResumeExpectService,
        ResumeExpectPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinResumeExpectModule {}
