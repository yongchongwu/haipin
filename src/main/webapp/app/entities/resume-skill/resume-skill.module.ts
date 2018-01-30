import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';
import {
    ResumeSkillService,
    ResumeSkillPopupService,
    ResumeSkillComponent,
    ResumeSkillDetailComponent,
    ResumeSkillDialogComponent,
    ResumeSkillPopupComponent,
    ResumeSkillDeletePopupComponent,
    ResumeSkillDeleteDialogComponent,
    resumeSkillRoute,
    resumeSkillPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resumeSkillRoute,
    ...resumeSkillPopupRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResumeSkillComponent,
        ResumeSkillDetailComponent,
        ResumeSkillDialogComponent,
        ResumeSkillDeleteDialogComponent,
        ResumeSkillPopupComponent,
        ResumeSkillDeletePopupComponent,
    ],
    entryComponents: [
        ResumeSkillComponent,
        ResumeSkillDialogComponent,
        ResumeSkillPopupComponent,
        ResumeSkillDeleteDialogComponent,
        ResumeSkillDeletePopupComponent,
    ],
    providers: [
        ResumeSkillService,
        ResumeSkillPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinResumeSkillModule {}
