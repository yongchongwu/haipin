import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResumeSkillComponent } from './resume-skill.component';
import { ResumeSkillDetailComponent } from './resume-skill-detail.component';
import { ResumeSkillPopupComponent } from './resume-skill-dialog.component';
import { ResumeSkillDeletePopupComponent } from './resume-skill-delete-dialog.component';

import { Principal } from '../../shared';

export const resumeSkillRoute: Routes = [
    {
        path: 'resume-skill',
        component: ResumeSkillComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'resume-skill/:id',
        component: ResumeSkillDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resumeSkillPopupRoute: Routes = [
    {
        path: 'resume-skill-new',
        component: ResumeSkillPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeSkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-skill/:id/edit',
        component: ResumeSkillPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeSkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'resume-skill/:id/delete',
        component: ResumeSkillDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_HRM'],
            pageTitle: 'haipinApp.resumeSkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
