import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';
import {
    ResumeBasicService,
    ResumeBasicPopupService,
    ResumeBasicComponent,
    ResumeBasicDetailComponent,
    ResumeBasicDialogComponent,
    ResumeBasicPopupComponent,
    ResumeBasicDeletePopupComponent,
    ResumeBasicDeleteDialogComponent,
    resumeBasicRoute,
    resumeBasicPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resumeBasicRoute,
    ...resumeBasicPopupRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResumeBasicComponent,
        ResumeBasicDetailComponent,
        ResumeBasicDialogComponent,
        ResumeBasicDeleteDialogComponent,
        ResumeBasicPopupComponent,
        ResumeBasicDeletePopupComponent,
    ],
    entryComponents: [
        ResumeBasicComponent,
        ResumeBasicDialogComponent,
        ResumeBasicPopupComponent,
        ResumeBasicDeleteDialogComponent,
        ResumeBasicDeletePopupComponent,
    ],
    providers: [
        ResumeBasicService,
        ResumeBasicPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinResumeBasicModule {}
