import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';
import {
    ResumeShowcaseService,
    ResumeShowcasePopupService,
    ResumeShowcaseComponent,
    ResumeShowcaseDetailComponent,
    ResumeShowcaseDialogComponent,
    ResumeShowcasePopupComponent,
    ResumeShowcaseDeletePopupComponent,
    ResumeShowcaseDeleteDialogComponent,
    resumeShowcaseRoute,
    resumeShowcasePopupRoute,
} from './';

const ENTITY_STATES = [
    ...resumeShowcaseRoute,
    ...resumeShowcasePopupRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ResumeShowcaseComponent,
        ResumeShowcaseDetailComponent,
        ResumeShowcaseDialogComponent,
        ResumeShowcaseDeleteDialogComponent,
        ResumeShowcasePopupComponent,
        ResumeShowcaseDeletePopupComponent,
    ],
    entryComponents: [
        ResumeShowcaseComponent,
        ResumeShowcaseDialogComponent,
        ResumeShowcasePopupComponent,
        ResumeShowcaseDeleteDialogComponent,
        ResumeShowcaseDeletePopupComponent,
    ],
    providers: [
        ResumeShowcaseService,
        ResumeShowcasePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinResumeShowcaseModule {}
