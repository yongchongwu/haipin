import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';

import {
    MyresumeFirstComponent,
    MyresumeFirstService,
    MyresumeComponent,
    MyresumeService,
    ResumeRouteAccessService,
    MyresumeRoute,
} from './';

const ENTITY_STATES = [
    ...MyresumeRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MyresumeFirstComponent,
        MyresumeComponent,
    ],
    entryComponents: [
        MyresumeFirstComponent,
        MyresumeComponent,
    ],
    providers: [
        MyresumeFirstService,
        MyresumeService,
        ResumeRouteAccessService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinMyresumeModule {}
