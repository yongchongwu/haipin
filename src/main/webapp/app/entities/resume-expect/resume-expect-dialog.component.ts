import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResumeExpect } from './resume-expect.model';
import { ResumeExpectPopupService } from './resume-expect-popup.service';
import { ResumeExpectService } from './resume-expect.service';

@Component({
    selector: 'jhi-resume-expect-dialog',
    templateUrl: './resume-expect-dialog.component.html'
})
export class ResumeExpectDialogComponent implements OnInit {

    resumeExpect: ResumeExpect;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private resumeExpectService: ResumeExpectService,
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
        if (this.resumeExpect.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resumeExpectService.update(this.resumeExpect));
        } else {
            this.subscribeToSaveResponse(
                this.resumeExpectService.create(this.resumeExpect));
        }
    }

    private subscribeToSaveResponse(result: Observable<ResumeExpect>) {
        result.subscribe((res: ResumeExpect) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ResumeExpect) {
        this.eventManager.broadcast({ name: 'resumeExpectListModification', content: 'OK'});
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
    selector: 'jhi-resume-expect-popup',
    template: ''
})
export class ResumeExpectPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeExpectPopupService: ResumeExpectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.resumeExpectPopupService
                    .open(ResumeExpectDialogComponent, params['id']);
            } else {
                this.modalRef = this.resumeExpectPopupService
                    .open(ResumeExpectDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
