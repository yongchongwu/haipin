import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';
import {
    ResumeIntroService,
    ResumeIntroPopupService,
    ResumeIntroComponent,
    ResumeIntroDetailComponent,
    ResumeIntroDialogComponent,
    ResumeIntroPopupComponent,
    ResumeIntroDeletePopupComponent,
    ResumeIntroDeleteDialogComponent,
    resumeIntroRoute,
    resumeIntroPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resumeIntroRoute,
    ...resumeIntroPopupRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResumeIntroComponent,
        ResumeIntroDetailComponent,
        ResumeIntroDialogComponent,
        ResumeIntroDeleteDialogComponent,
        ResumeIntroPopupComponent,
        ResumeIntroDeletePopupComponent,
    ],
    entryComponents: [
        ResumeIntroComponent,
        ResumeIntroDialogComponent,
        ResumeIntroPopupComponent,
        ResumeIntroDeleteDialogComponent,
        ResumeIntroDeletePopupComponent,
    ],
    providers: [
        ResumeIntroService,
        ResumeIntroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinResumeIntroModule {}
