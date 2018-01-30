import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResumeExpectComponent } from './resume-expect.component';
import { ResumeExpectDetailComponent } from './resume-expect-detail.component';
import { ResumeExpectPopupComponent } from './resume-expect-dialog.component';
import { ResumeExpectDeletePopupComponent } from './resume-expect-delete-dialog.component';

import { Principal } from '../../shared';

export const resumeExpectRoute: Routes = [
    {
        path: 'resume-expect',
        component: ResumeExpectComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeExpect.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resume-expect/:id',
        component: ResumeExpectDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeExpect.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resumeExpectPopupRoute: Routes = [
    {
        path: 'resume-expect-new',
        component: ResumeExpectPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeExpect.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-expect/:id/edit',
        component: ResumeExpectPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeExpect.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-expect/:id/delete',
        component: ResumeExpectDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeExpect.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
