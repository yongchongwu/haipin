import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';
import {
    ResumeBlockService,
    ResumeBlockPopupService,
    ResumeBlockComponent,
    ResumeBlockDetailComponent,
    ResumeBlockDialogComponent,
    ResumeBlockPopupComponent,
    ResumeBlockDeletePopupComponent,
    ResumeBlockDeleteDialogComponent,
    resumeBlockRoute,
    resumeBlockPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resumeBlockRoute,
    ...resumeBlockPopupRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResumeBlockComponent,
        ResumeBlockDetailComponent,
        ResumeBlockDialogComponent,
        ResumeBlockDeleteDialogComponent,
        ResumeBlockPopupComponent,
        ResumeBlockDeletePopupComponent,
    ],
    entryComponents: [
        ResumeBlockComponent,
        ResumeBlockDialogComponent,
        ResumeBlockPopupComponent,
        ResumeBlockDeleteDialogComponent,
        ResumeBlockDeletePopupComponent,
    ],
    providers: [
        ResumeBlockService,
        ResumeBlockPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinResumeBlockModule {}
