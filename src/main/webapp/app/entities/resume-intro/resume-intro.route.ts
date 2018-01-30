import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResumeIntroComponent } from './resume-intro.component';
import { ResumeIntroDetailComponent } from './resume-intro-detail.component';
import { ResumeIntroPopupComponent } from './resume-intro-dialog.component';
import { ResumeIntroDeletePopupComponent } from './resume-intro-delete-dialog.component';

import { Principal } from '../../shared';

export const resumeIntroRoute: Routes = [
    {
        path: 'resume-intro',
        component: ResumeIntroComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeIntro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resume-intro/:id',
        component: ResumeIntroDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeIntro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resumeIntroPopupRoute: Routes = [
    {
        path: 'resume-intro-new',
        component: ResumeIntroPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeIntro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-intro/:id/edit',
        component: ResumeIntroPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeIntro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-intro/:id/delete',
        component: ResumeIntroDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeIntro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
