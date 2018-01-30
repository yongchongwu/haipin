import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResumeSkill } from './resume-skill.model';
import { ResumeSkillPopupService } from './resume-skill-popup.service';
import { ResumeSkillService } from './resume-skill.service';

@Component({
    selector: 'jhi-resume-skill-dialog',
    templateUrl: './resume-skill-dialog.component.html'
})
export class ResumeSkillDialogComponent implements OnInit {

    resumeSkill: ResumeSkill;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private resumeSkillService: ResumeSkillService,
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
        if (this.resumeSkill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resumeSkillService.update(this.resumeSkill));
        } else {
            this.subscribeToSaveResponse(
                this.resumeSkillService.create(this.resumeSkill));
        }
    }

    private subscribeToSaveResponse(result: Observable<ResumeSkill>) {
        result.subscribe((res: ResumeSkill) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ResumeSkill) {
        this.eventManager.broadcast({ name: 'resumeSkillListModification', content: 'OK'});
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
    selector: 'jhi-resume-skill-popup',
    template: ''
})
export class ResumeSkillPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeSkillPopupService: ResumeSkillPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.resumeSkillPopupService
                    .open(ResumeSkillDialogComponent, params['id']);
            } else {
                this.modalRef = this.resumeSkillPopupService
                    .open(ResumeSkillDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
