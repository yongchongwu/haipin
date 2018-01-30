import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResumeRouteAccessService } from "./resume-route-access-service";
import { MyresumeComponent } from './my-resume.component';
import { MyresumeFirstComponent } from "./new-resume.component";

export const MyresumeRoute: Routes = [
    {
        path: 'new-resume',
        component: MyresumeFirstComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.myresume'
        },
        canActivate: [UserRouteAccessService]
    },{
        path: 'my-resume',
        component: MyresumeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.myresume'
        },
        canActivate: [UserRouteAccessService,ResumeRouteAccessService]
    }
];
