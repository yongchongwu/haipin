import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResumeBlock } from './resume-block.model';
import { ResumeBlockPopupService } from './resume-block-popup.service';
import { ResumeBlockService } from './resume-block.service';

@Component({
    selector: 'jhi-resume-block-dialog',
    templateUrl: './resume-block-dialog.component.html'
})
export class ResumeBlockDialogComponent implements OnInit {

    resumeBlock: ResumeBlock;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private resumeBlockService: ResumeBlockService,
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
        if (this.resumeBlock.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resumeBlockService.update(this.resumeBlock));
        } else {
            this.subscribeToSaveResponse(
                this.resumeBlockService.create(this.resumeBlock));
        }
    }

    private subscribeToSaveResponse(result: Observable<ResumeBlock>) {
        result.subscribe((res: ResumeBlock) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ResumeBlock) {
        this.eventManager.broadcast({ name: 'resumeBlockListModification', content: 'OK'});
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
    selector: 'jhi-resume-block-popup',
    template: ''
})
export class ResumeBlockPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeBlockPopupService: ResumeBlockPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.resumeBlockPopupService
                    .open(ResumeBlockDialogComponent, params['id']);
            } else {
                this.modalRef = this.resumeBlockPopupService
                    .open(ResumeBlockDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
