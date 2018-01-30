import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResumeEducation } from './resume-education.model';
import { ResumeEducationPopupService } from './resume-education-popup.service';
import { ResumeEducationService } from './resume-education.service';

@Component({
    selector: 'jhi-resume-education-delete-dialog',
    templateUrl: './resume-education-delete-dialog.component.html'
})
export class ResumeEducationDeleteDialogComponent {

    resumeEducation: ResumeEducation;

    constructor(
        private resumeEducationService: ResumeEducationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resumeEducationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resumeEducationListModification',
                content: 'Deleted an resumeEducation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resume-education-delete-popup',
    template: ''
})
export class ResumeEducationDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeEducationPopupService: ResumeEducationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.resumeEducationPopupService
                .open(ResumeEducationDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
