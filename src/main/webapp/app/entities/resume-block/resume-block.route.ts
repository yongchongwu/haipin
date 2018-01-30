import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResumeBlockComponent } from './resume-block.component';
import { ResumeBlockDetailComponent } from './resume-block-detail.component';
import { ResumeBlockPopupComponent } from './resume-block-dialog.component';
import { ResumeBlockDeletePopupComponent } from './resume-block-delete-dialog.component';

import { Principal } from '../../shared';

export const resumeBlockRoute: Routes = [
    {
        path: 'resume-block',
        component: ResumeBlockComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeBlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resume-block/:id',
        component: ResumeBlockDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeBlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resumeBlockPopupRoute: Routes = [
    {
        path: 'resume-block-new',
        component: ResumeBlockPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeBlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-block/:id/edit',
        component: ResumeBlockPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeBlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-block/:id/delete',
        component: ResumeBlockDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeBlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
