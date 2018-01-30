import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';
import {
    ResumeWorkService,
    ResumeWorkPopupService,
    ResumeWorkComponent,
    ResumeWorkDetailComponent,
    ResumeWorkDialogComponent,
    ResumeWorkPopupComponent,
    ResumeWorkDeletePopupComponent,
    ResumeWorkDeleteDialogComponent,
    resumeWorkRoute,
    resumeWorkPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resumeWorkRoute,
    ...resumeWorkPopupRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResumeWorkComponent,
        ResumeWorkDetailComponent,
        ResumeWorkDialogComponent,
        ResumeWorkDeleteDialogComponent,
        ResumeWorkPopupComponent,
        ResumeWorkDeletePopupComponent,
    ],
    entryComponents: [
        ResumeWorkComponent,
        ResumeWorkDialogComponent,
        ResumeWorkPopupComponent,
        ResumeWorkDeleteDialogComponent,
        ResumeWorkDeletePopupComponent,
    ],
    providers: [
        ResumeWorkService,
        ResumeWorkPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinResumeWorkModule {}
