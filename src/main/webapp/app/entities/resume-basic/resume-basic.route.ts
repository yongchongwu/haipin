import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResumeBasicComponent } from './resume-basic.component';
import { ResumeBasicDetailComponent } from './resume-basic-detail.component';
import { ResumeBasicPopupComponent } from './resume-basic-dialog.component';
import { ResumeBasicDeletePopupComponent } from './resume-basic-delete-dialog.component';

import { Principal } from '../../shared';

export const resumeBasicRoute: Routes = [
    {
        path: 'resume-basic',
        component: ResumeBasicComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeBasic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resume-basic/:id',
        component: ResumeBasicDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeBasic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resumeBasicPopupRoute: Routes = [
    {
        path: 'resume-basic-new',
        component: ResumeBasicPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeBasic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-basic/:id/edit',
        component: ResumeBasicPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeBasic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-basic/:id/delete',
        component: ResumeBasicDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeBasic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
