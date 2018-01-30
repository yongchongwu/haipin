import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResumeBasic } from './resume-basic.model';
import { ResumeBasicPopupService } from './resume-basic-popup.service';
import { ResumeBasicService } from './resume-basic.service';

@Component({
    selector: 'jhi-resume-basic-delete-dialog',
    templateUrl: './resume-basic-delete-dialog.component.html'
})
export class ResumeBasicDeleteDialogComponent {

    resumeBasic: ResumeBasic;

    constructor(
        private resumeBasicService: ResumeBasicService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resumeBasicService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resumeBasicListModification',
                content: 'Deleted an resumeBasic'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resume-basic-delete-popup',
    template: ''
})
export class ResumeBasicDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeBasicPopupService: ResumeBasicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.resumeBasicPopupService
                .open(ResumeBasicDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
