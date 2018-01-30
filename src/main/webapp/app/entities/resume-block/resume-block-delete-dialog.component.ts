import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResumeBlock } from './resume-block.model';
import { ResumeBlockPopupService } from './resume-block-popup.service';
import { ResumeBlockService } from './resume-block.service';

@Component({
    selector: 'jhi-resume-block-delete-dialog',
    templateUrl: './resume-block-delete-dialog.component.html'
})
export class ResumeBlockDeleteDialogComponent {

    resumeBlock: ResumeBlock;

    constructor(
        private resumeBlockService: ResumeBlockService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resumeBlockService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resumeBlockListModification',
                content: 'Deleted an resumeBlock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resume-block-delete-popup',
    template: ''
})
export class ResumeBlockDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeBlockPopupService: ResumeBlockPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.resumeBlockPopupService
                .open(ResumeBlockDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
