import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegistrationComponent } from './registration.component';
import { RegistrationDetailComponent } from './registration-detail.component';
import { RegistrationPopupComponent } from './registration-dialog.component';
import { RegistrationDeletePopupComponent } from './registration-delete-dialog.component';

import { RegistrationTipComponent } from './registration-tip.component';
import { RegistrationCleartComponent } from './registration-cleart.component';
import { Principal } from '../../shared';

export const registrationRoute: Routes = [
    {
        path: 'registration',
        component: RegistrationComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },{
        path: 'registration/cleart',
        component: RegistrationCleartComponent,
        data: {
            authorities: [],
            pageTitle: 'haipinApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'registration/tip',
        component: RegistrationTipComponent,
        data: {
            authorities: [],
            pageTitle: 'haipinApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'registration/:id',
        component: RegistrationDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const registrationPopupRoute: Routes = [
    {
        path: 'registration-new',
        component: RegistrationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registration/:id/edit',
        component: RegistrationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registration/:id/delete',
        component: RegistrationDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.registration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
