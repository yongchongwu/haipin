import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResumeEducation } from './resume-education.model';
import { ResumeEducationPopupService } from './resume-education-popup.service';
import { ResumeEducationService } from './resume-education.service';

@Component({
    selector: 'jhi-resume-education-dialog',
    templateUrl: './resume-education-dialog.component.html'
})
export class ResumeEducationDialogComponent implements OnInit {

    resumeEducation: ResumeEducation;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private resumeEducationService: ResumeEducationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.resumeEducation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resumeEducationService.update(this.resumeEducation));
        } else {
            this.subscribeToSaveResponse(
                this.resumeEducationService.create(this.resumeEducation));
        }
    }

    private subscribeToSaveResponse(result: Observable<ResumeEducation>) {
        result.subscribe((res: ResumeEducation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ResumeEducation) {
        this.eventManager.broadcast({ name: 'resumeEducationListModification', content: 'OK'});
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
    selector: 'jhi-resume-education-popup',
    template: ''
})
export class ResumeEducationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeEducationPopupService: ResumeEducationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.resumeEducationPopupService
                    .open(ResumeEducationDialogComponent, params['id']);
            } else {
                this.modalRef = this.resumeEducationPopupService
                    .open(ResumeEducationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
