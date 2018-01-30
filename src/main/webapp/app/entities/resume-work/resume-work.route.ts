import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResumeWorkComponent } from './resume-work.component';
import { ResumeWorkDetailComponent } from './resume-work-detail.component';
import { ResumeWorkPopupComponent } from './resume-work-dialog.component';
import { ResumeWorkDeletePopupComponent } from './resume-work-delete-dialog.component';

import { Principal } from '../../shared';

export const resumeWorkRoute: Routes = [
    {
        path: 'resume-work',
        component: ResumeWorkComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeWork.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resume-work/:id',
        component: ResumeWorkDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeWork.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resumeWorkPopupRoute: Routes = [
    {
        path: 'resume-work-new',
        component: ResumeWorkPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeWork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-work/:id/edit',
        component: ResumeWorkPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeWork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-work/:id/delete',
        component: ResumeWorkDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeWork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
