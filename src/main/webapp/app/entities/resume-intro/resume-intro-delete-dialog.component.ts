import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResumeIntro } from './resume-intro.model';
import { ResumeIntroPopupService } from './resume-intro-popup.service';
import { ResumeIntroService } from './resume-intro.service';

@Component({
    selector: 'jhi-resume-intro-delete-dialog',
    templateUrl: './resume-intro-delete-dialog.component.html'
})
export class ResumeIntroDeleteDialogComponent {

    resumeIntro: ResumeIntro;

    constructor(
        private resumeIntroService: ResumeIntroService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resumeIntroService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resumeIntroListModification',
                content: 'Deleted an resumeIntro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resume-intro-delete-popup',
    template: ''
})
export class ResumeIntroDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeIntroPopupService: ResumeIntroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.resumeIntroPopupService
                .open(ResumeIntroDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
