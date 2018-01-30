import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResumeIntro } from './resume-intro.model';
import { ResumeIntroPopupService } from './resume-intro-popup.service';
import { ResumeIntroService } from './resume-intro.service';

@Component({
    selector: 'jhi-resume-intro-dialog',
    templateUrl: './resume-intro-dialog.component.html'
})
export class ResumeIntroDialogComponent implements OnInit {

    resumeIntro: ResumeIntro;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private resumeIntroService: ResumeIntroService,
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
        if (this.resumeIntro.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resumeIntroService.update(this.resumeIntro));
        } else {
            this.subscribeToSaveResponse(
                this.resumeIntroService.create(this.resumeIntro));
        }
    }

    private subscribeToSaveResponse(result: Observable<ResumeIntro>) {
        result.subscribe((res: ResumeIntro) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ResumeIntro) {
        this.eventManager.broadcast({ name: 'resumeIntroListModification', content: 'OK'});
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
    selector: 'jhi-resume-intro-popup',
    template: ''
})
export class ResumeIntroPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeIntroPopupService: ResumeIntroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.resumeIntroPopupService
                    .open(ResumeIntroDialogComponent, params['id']);
            } else {
                this.modalRef = this.resumeIntroPopupService
                    .open(ResumeIntroDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
