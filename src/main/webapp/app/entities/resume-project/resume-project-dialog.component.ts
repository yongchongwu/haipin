import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResumeProject } from './resume-project.model';
import { ResumeProjectPopupService } from './resume-project-popup.service';
import { ResumeProjectService } from './resume-project.service';

@Component({
    selector: 'jhi-resume-project-dialog',
    templateUrl: './resume-project-dialog.component.html'
})
export class ResumeProjectDialogComponent implements OnInit {

    resumeProject: ResumeProject;
    authorities: any[];
    isSaving: boolean;
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private resumeProjectService: ResumeProjectService,
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
        if (this.resumeProject.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resumeProjectService.update(this.resumeProject,true));
        } else {
            this.subscribeToSaveResponse(
                this.resumeProjectService.create(this.resumeProject,true));
        }
    }

    private subscribeToSaveResponse(result: Observable<ResumeProject>) {
        result.subscribe((res: ResumeProject) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ResumeProject) {
        this.eventManager.broadcast({ name: 'resumeProjectListModification', content: 'OK'});
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
    selector: 'jhi-resume-project-popup',
    template: ''
})
export class ResumeProjectPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeProjectPopupService: ResumeProjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.resumeProjectPopupService
                    .open(ResumeProjectDialogComponent, params['id']);
            } else {
                this.modalRef = this.resumeProjectPopupService
                    .open(ResumeProjectDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
