import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';
import {
    ResumeEducationService,
    ResumeEducationPopupService,
    ResumeEducationComponent,
    ResumeEducationDetailComponent,
    ResumeEducationDialogComponent,
    ResumeEducationPopupComponent,
    ResumeEducationDeletePopupComponent,
    ResumeEducationDeleteDialogComponent,
    resumeEducationRoute,
    resumeEducationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resumeEducationRoute,
    ...resumeEducationPopupRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResumeEducationComponent,
        ResumeEducationDetailComponent,
        ResumeEducationDialogComponent,
        ResumeEducationDeleteDialogComponent,
        ResumeEducationPopupComponent,
        ResumeEducationDeletePopupComponent,
    ],
    entryComponents: [
        ResumeEducationComponent,
        ResumeEducationDialogComponent,
        ResumeEducationPopupComponent,
        ResumeEducationDeleteDialogComponent,
        ResumeEducationDeletePopupComponent,
    ],
    providers: [
        ResumeEducationService,
        ResumeEducationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinResumeEducationModule {}
