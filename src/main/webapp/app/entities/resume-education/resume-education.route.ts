import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResumeEducationComponent } from './resume-education.component';
import { ResumeEducationDetailComponent } from './resume-education-detail.component';
import { ResumeEducationPopupComponent } from './resume-education-dialog.component';
import { ResumeEducationDeletePopupComponent } from './resume-education-delete-dialog.component';

import { Principal } from '../../shared';

export const resumeEducationRoute: Routes = [
    {
        path: 'resume-education',
        component: ResumeEducationComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeEducation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resume-education/:id',
        component: ResumeEducationDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeEducation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resumeEducationPopupRoute: Routes = [
    {
        path: 'resume-education-new',
        component: ResumeEducationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeEducation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-education/:id/edit',
        component: ResumeEducationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeEducation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-education/:id/delete',
        component: ResumeEducationDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeEducation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
