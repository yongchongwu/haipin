import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DatasearchComponent } from './data-search.component';
import { DatadetailComponent } from './data-detail.component';

@Injectable()
export class DatasearchResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'index,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const DatasearchRoute: Routes = [
    {
        path: 'data-search',
        component: DatasearchComponent,
        resolve: {
            'pagingParams': DatasearchResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.dataSearch.home.title1'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'data-detail/:id',
        component: DatadetailComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.dataSearch.home.title2'
        },
        canActivate: [UserRouteAccessService]
    }
];
