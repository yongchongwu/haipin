import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResumeBasic } from './resume-basic.model';
import { ResumeBasicPopupService } from './resume-basic-popup.service';
import { ResumeBasicService } from './resume-basic.service';

@Component({
    selector: 'jhi-resume-basic-dialog',
    templateUrl: './resume-basic-dialog.component.html'
})
export class ResumeBasicDialogComponent implements OnInit {

    resumeBasic: ResumeBasic;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private resumeBasicService: ResumeBasicService,
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
        if (this.resumeBasic.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resumeBasicService.update(this.resumeBasic));
        } else {
            this.subscribeToSaveResponse(
                this.resumeBasicService.create(this.resumeBasic));
        }
    }

    private subscribeToSaveResponse(result: Observable<ResumeBasic>) {
        result.subscribe((res: ResumeBasic) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ResumeBasic) {
        this.eventManager.broadcast({ name: 'resumeBasicListModification', content: 'OK'});
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
    selector: 'jhi-resume-basic-popup',
    template: ''
})
export class ResumeBasicPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeBasicPopupService: ResumeBasicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.resumeBasicPopupService
                    .open(ResumeBasicDialogComponent, params['id']);
            } else {
                this.modalRef = this.resumeBasicPopupService
                    .open(ResumeBasicDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
