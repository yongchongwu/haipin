import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResumeBasic} from './../resume-basic/resume-basic.model';
import { MyresumeFirstService } from './new-resume.service';

@Component({
    templateUrl: './new-resume.component.html',
    styleUrls: [
        'new-resume.component.css'
    ]
})

export class MyresumeFirstComponent implements OnInit, OnDestroy {
    sexs: any[];
    workYears: any[];
    highestDegrees: any[];
    isSaving: boolean;
    resumeBasic:ResumeBasic;
    isSavin: boolean;
    dialCodes: any[];
    constructor(
        private alertService: JhiAlertService,
        private router: Router,
        private eventManager: JhiEventManager,
        private myresumeFirstService: MyresumeFirstService
       ) {
    }

    ngOnInit() {
        this.isSavin = false;
        this.resumeBasic=new ResumeBasic();
        this.sexs = [{code:'1',text:'男'},{code:'2',text:'女'}];
        this.highestDegrees = [{code: '大专', text: '大专'}, {code: '本科', text: '本科'}
        ,{code: '博士', text: '博士'},{code: '硕士', text: '硕士'},{code: '其他', text: '其他'}];
        this.workYears = [{code:'0',text:'毕业应届生'},{code:'1',text:'1年'},{code:'2',text:'2年'}
        ,{code:'3',text:'3年'},{code:'4',text:'4年'},{code:'5',text:'5年'},{code:'6',text:'6年'},
         {code:'7',text:'7年'},{code:'8',text:'8年'},{code:'9',text:'9年'},{code:'10',text:'10年'}
            ,{code:'11',text:'10年以上'}];
        this.dialCodes = [{code:'0086',text:'中国'},{code:'0082',text:'印度'}];
        //性别、最高学历、工作年限、区号占位符
        this.resumeBasic.sex = '';
        this.resumeBasic.highestDegree = '';
        this.resumeBasic.workYear = '';
        this.resumeBasic.dialCode = '0086';
    }

    resu() {
        this.isSavin = true;
        this.subscribeToEnrolResponse(
            this.myresumeFirstService.resu(this.resumeBasic));

    }

    private subscribeToEnrolResponse(result: Observable<ResumeBasic>) {
        result.subscribe((res: ResumeBasic) =>
            this.onEnrolSuccess(res), (res: Response) => this.onEnrolError(res));
    }

    private onEnrolSuccess(result: ResumeBasic) {
        this.isSavin = false;
        this.router.navigate(['/my-resume']);
    }

    private onEnrolError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSavin = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
	
    ngOnDestroy() {

    }

}
