import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResumeExpect } from './resume-expect.model';
import { ResumeExpectPopupService } from './resume-expect-popup.service';
import { ResumeExpectService } from './resume-expect.service';

@Component({
    selector: 'jhi-resume-expect-delete-dialog',
    templateUrl: './resume-expect-delete-dialog.component.html'
})
export class ResumeExpectDeleteDialogComponent {

    resumeExpect: ResumeExpect;

    constructor(
        private resumeExpectService: ResumeExpectService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resumeExpectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resumeExpectListModification',
                content: 'Deleted an resumeExpect'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resume-expect-delete-popup',
    template: ''
})
export class ResumeExpectDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeExpectPopupService: ResumeExpectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.resumeExpectPopupService
                .open(ResumeExpectDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
