import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResumeShowcase } from './resume-showcase.model';
import { ResumeShowcasePopupService } from './resume-showcase-popup.service';
import { ResumeShowcaseService } from './resume-showcase.service';

@Component({
    selector: 'jhi-resume-showcase-dialog',
    templateUrl: './resume-showcase-dialog.component.html'
})
export class ResumeShowcaseDialogComponent implements OnInit {

    resumeShowcase: ResumeShowcase;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private resumeShowcaseService: ResumeShowcaseService,
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
        if (this.resumeShowcase.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resumeShowcaseService.update(this.resumeShowcase));
        } else {
            this.subscribeToSaveResponse(
                this.resumeShowcaseService.create(this.resumeShowcase));
        }
    }

    private subscribeToSaveResponse(result: Observable<ResumeShowcase>) {
        result.subscribe((res: ResumeShowcase) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ResumeShowcase) {
        this.eventManager.broadcast({ name: 'resumeShowcaseListModification', content: 'OK'});
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
    selector: 'jhi-resume-showcase-popup',
    template: ''
})
export class ResumeShowcasePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeShowcasePopupService: ResumeShowcasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.resumeShowcasePopupService
                    .open(ResumeShowcaseDialogComponent, params['id']);
            } else {
                this.modalRef = this.resumeShowcasePopupService
                    .open(ResumeShowcaseDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
