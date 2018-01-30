import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResumeShowcaseComponent } from './resume-showcase.component';
import { ResumeShowcaseDetailComponent } from './resume-showcase-detail.component';
import { ResumeShowcasePopupComponent } from './resume-showcase-dialog.component';
import { ResumeShowcaseDeletePopupComponent } from './resume-showcase-delete-dialog.component';

import { Principal } from '../../shared';

export const resumeShowcaseRoute: Routes = [
    {
        path: 'resume-showcase',
        component: ResumeShowcaseComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeShowcase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resume-showcase/:id',
        component: ResumeShowcaseDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeShowcase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resumeShowcasePopupRoute: Routes = [
    {
        path: 'resume-showcase-new',
        component: ResumeShowcasePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeShowcase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-showcase/:id/edit',
        component: ResumeShowcasePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeShowcase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-showcase/:id/delete',
        component: ResumeShowcaseDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeShowcase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
