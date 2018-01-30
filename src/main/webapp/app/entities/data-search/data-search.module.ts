import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HaipinSharedModule } from '../../shared';
//引入chartjs
import { ChartsModule } from 'ng2-charts';
import { JsonpModule } from '@angular/http';

import {
	DataSearchService,
	DatasearchComponent,
	DatadetailComponent,
	DatasearchRoute,
	DatasearchResolvePagingParams
} from './';

const ENTITY_STATES = [
    ...DatasearchRoute,
];

@NgModule({
    imports: [
        HaipinSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        ChartsModule,
        JsonpModule
    ],
    declarations: [
        DatasearchComponent,
        DatadetailComponent
    ],
    entryComponents: [
        DatasearchComponent,
        DatadetailComponent
    ],
    providers: [
        DataSearchService,
        DatasearchResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinDatasearchModule {}
