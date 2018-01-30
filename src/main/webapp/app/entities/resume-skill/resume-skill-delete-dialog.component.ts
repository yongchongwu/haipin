import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResumeSkill } from './resume-skill.model';
import { ResumeSkillPopupService } from './resume-skill-popup.service';
import { ResumeSkillService } from './resume-skill.service';

@Component({
    selector: 'jhi-resume-skill-delete-dialog',
    templateUrl: './resume-skill-delete-dialog.component.html'
})
export class ResumeSkillDeleteDialogComponent {

    resumeSkill: ResumeSkill;

    constructor(
        private resumeSkillService: ResumeSkillService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resumeSkillService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resumeSkillListModification',
                content: 'Deleted an resumeSkill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resume-skill-delete-popup',
    template: ''
})
export class ResumeSkillDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resumeSkillPopupService: ResumeSkillPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.resumeSkillPopupService
                .open(ResumeSkillDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
