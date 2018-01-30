import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResumeProject } from './resume-project.model';
import { ResumeProjectPopupService } from './resume-project-popup.service';
import { ResumeProjectService } from './resume-project.service';

@Component({
    selector: 'jhi-resume-project-delete-dialog',
    templateUrl: './resume-project-delete-dialog.component.html'
})
export class ResumeProjectDeleteDialogComponent {

    resumeProject: ResumeProject;

    constructor(
        private resumeProjectService: ResumeProjectService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resumeProjectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resumeProjectListModification',
                content: 'Deleted an resumeProject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resume-project-delete-popup',
    template: ''
})
export class ResumeProjectDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeProjectPopupService: ResumeProjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.resumeProjectPopupService
                .open(ResumeProjectDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
