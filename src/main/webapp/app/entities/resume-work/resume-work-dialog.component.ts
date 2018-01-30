import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResumeWork } from './resume-work.model';
import { ResumeWorkPopupService } from './resume-work-popup.service';
import { ResumeWorkService } from './resume-work.service';

@Component({
    selector: 'jhi-resume-work-dialog',
    templateUrl: './resume-work-dialog.component.html'
})
export class ResumeWorkDialogComponent implements OnInit {

    resumeWork: ResumeWork;
    authorities: any[];
    isSaving: boolean;
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private resumeWorkService: ResumeWorkService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        console.log(this.resumeWork.startDate);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.resumeWork.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resumeWorkService.update(this.resumeWork,true));
        } else {
            this.subscribeToSaveResponse(
                this.resumeWorkService.create(this.resumeWork,true));
        }
    }

    private subscribeToSaveResponse(result: Observable<ResumeWork>) {
        result.subscribe((res: ResumeWork) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ResumeWork) {
        this.eventManager.broadcast({ name: 'resumeWorkListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
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
}

@Component({
    selector: 'jhi-resume-work-popup',
    template: ''
})
export class ResumeWorkPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeWorkPopupService: ResumeWorkPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.resumeWorkPopupService
                    .open(ResumeWorkDialogComponent, params['id']);
            } else {
                this.modalRef = this.resumeWorkPopupService
                    .open(ResumeWorkDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
