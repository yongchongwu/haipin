import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResumeWork } from './resume-work.model';
import { ResumeWorkPopupService } from './resume-work-popup.service';
import { ResumeWorkService } from './resume-work.service';

@Component({
    selector: 'jhi-resume-work-delete-dialog',
    templateUrl: './resume-work-delete-dialog.component.html'
})
export class ResumeWorkDeleteDialogComponent {

    resumeWork: ResumeWork;

    constructor(
        private resumeWorkService: ResumeWorkService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resumeWorkService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resumeWorkListModification',
                content: 'Deleted an resumeWork'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resume-work-delete-popup',
    template: ''
})
export class ResumeWorkDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeWorkPopupService: ResumeWorkPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.resumeWorkPopupService
                .open(ResumeWorkDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
