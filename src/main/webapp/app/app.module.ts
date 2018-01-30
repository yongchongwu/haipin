import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { HaipinSharedModule, UserRouteAccessService } from './shared';
import { HaipinHomeModule } from './home/home.module';
import { HaipinAdminModule } from './admin/admin.module';
import { HaipinAccountModule } from './account/account.module';
import { HaipinEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig, PaginationConfigSearch } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        HaipinSharedModule,
        HaipinHomeModule,
        HaipinAdminModule,
        HaipinAccountModule,
        HaipinEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        PaginationConfigSearch,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class HaipinAppModule {}
