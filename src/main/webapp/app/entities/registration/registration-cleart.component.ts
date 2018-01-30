import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RegistrationService } from './registration.service';

import {Registration} from './registration.model';
import {RegistrationTipComponent} from "./registration-tip.component";

@Component({
    templateUrl: './registration-cleart.component.html',
    styleUrls: [
        'registration-cleart.component.css'
    ]
})
export class RegistrationCleartComponent implements OnInit, OnDestroy {
    researchFields: any[];
    birthYears: any[];
    highestDegrees: any[];
    registration: Registration;
    isSaving: boolean;

    constructor(
        private alertService: JhiAlertService,
        private registrationService: RegistrationService,
        private router: Router,
        private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.registration = new Registration();
        this.birthYears = [{code:'1970',text:'1970'},{code:'1971',text:'1971'},{code:'1972',text:'1972'},
            {code:'1973',text:'1973'},{code:'1974',text:'1974'},{code:'1975',text:'1975'},{code:'1976',text:'1976'},
            {code:'1977',text:'1977'},{code:'1978',text:'1978'},{code:'1979',text:'1979'},{code:'1980',text:'1980'},
            {code:'1981',text:'1981'},{code:'1982',text:'1982'},{code:'1983',text:'1983'},{code:'1984',text:'1984'},
            {code:'1985',text:'1985'},{code:'1986',text:'1986'},{code:'1987',text:'1987'},{code:'1988',text:'1988'},
            {code:'1989',text:'1989'},{code:'1990',text:'1990'},{code:'1991',text:'1991'},{code:'1992',text:'1992'},
            {code:'1993',text:'1993'},{code:'1994',text:'1994'},{code:'1995',text:'1995'},{code:'1996',text:'1996'},
            {code:'1997',text:'1997'},{code:'1998',text:'1998'},{code:'1999',text:'1999'},{code:'2000',text:'2000'}
        ];
        this.highestDegrees = [{'code': '大专'},{'code': '本科'},{'code': '硕士'},{'code': '博士'},{'code': '其他'}];
    	this.researchFields = [{'code': '工学'},{'code': '理学'},{'code': '医学'},{'code': '法学'},{'code': '管理学'},
        	{'code': '教育学'},{'code': '文学'},{'code': '经济学'},{'code': '农学'},{'code': '历史学'},{'code': '哲学'}];
    	//出生年、最高学历、	研究领域占位符
    	this.registration.birthYear = '';
    	this.registration.highestDegree = '';
    	this.registration.researchField = '';
    }

    enrol() {
        this.isSaving = true;
        this.registration.recruitmentUuid='1';
        this.subscribeToEnrolResponse(
            this.registrationService.enrol(this.registration));
    }

    private subscribeToEnrolResponse(result: Observable<Registration>) {
        result.subscribe((res: Registration) =>
            this.onEnrolSuccess(res), (res: Response) => this.onEnrolError(res));
    }

    private onEnrolSuccess(result: Registration) {
        this.isSaving = false;
        //跳转页面
        this.router.navigate(['/registration/tip']);
    }

    private onEnrolError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    ngOnDestroy() {

    }

}
