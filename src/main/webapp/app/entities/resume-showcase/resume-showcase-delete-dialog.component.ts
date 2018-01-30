import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResumeShowcase } from './resume-showcase.model';
import { ResumeShowcasePopupService } from './resume-showcase-popup.service';
import { ResumeShowcaseService } from './resume-showcase.service';

@Component({
    selector: 'jhi-resume-showcase-delete-dialog',
    templateUrl: './resume-showcase-delete-dialog.component.html'
})
export class ResumeShowcaseDeleteDialogComponent {

    resumeShowcase: ResumeShowcase;

    constructor(
        private resumeShowcaseService: ResumeShowcaseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resumeShowcaseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resumeShowcaseListModification',
                content: 'Deleted an resumeShowcase'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resume-showcase-delete-popup',
    template: ''
})
export class ResumeShowcaseDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeShowcasePopupService: ResumeShowcasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.resumeShowcasePopupService
                .open(ResumeShowcaseDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
