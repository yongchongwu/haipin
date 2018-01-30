import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';
import {
    ResumeProjectService,
    ResumeProjectPopupService,
    ResumeProjectComponent,
    ResumeProjectDetailComponent,
    ResumeProjectDialogComponent,
    ResumeProjectPopupComponent,
    ResumeProjectDeletePopupComponent,
    ResumeProjectDeleteDialogComponent,
    resumeProjectRoute,
    resumeProjectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resumeProjectRoute,
    ...resumeProjectPopupRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResumeProjectComponent,
        ResumeProjectDetailComponent,
        ResumeProjectDialogComponent,
        ResumeProjectDeleteDialogComponent,
        ResumeProjectPopupComponent,
        ResumeProjectDeletePopupComponent,
    ],
    entryComponents: [
        ResumeProjectComponent,
        ResumeProjectDialogComponent,
        ResumeProjectPopupComponent,
        ResumeProjectDeleteDialogComponent,
        ResumeProjectDeletePopupComponent,
    ],
    providers: [
        ResumeProjectService,
        ResumeProjectPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinResumeProjectModule {}
