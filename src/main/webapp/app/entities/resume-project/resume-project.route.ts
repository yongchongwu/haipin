import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResumeProjectComponent } from './resume-project.component';
import { ResumeProjectDetailComponent } from './resume-project-detail.component';
import { ResumeProjectPopupComponent } from './resume-project-dialog.component';
import { ResumeProjectDeletePopupComponent } from './resume-project-delete-dialog.component';

import { Principal } from '../../shared';

export const resumeProjectRoute: Routes = [
    {
        path: 'resume-project',
        component: ResumeProjectComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeProject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resume-project/:id',
        component: ResumeProjectDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeProject.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resumeProjectPopupRoute: Routes = [
    {
        path: 'resume-project-new',
        component: ResumeProjectPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeProject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-project/:id/edit',
        component: ResumeProjectPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeProject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-project/:id/delete',
        component: ResumeProjectDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeProject.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
