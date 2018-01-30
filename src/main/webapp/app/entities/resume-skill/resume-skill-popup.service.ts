import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ResumeSkill } from './resume-skill.model';
import { ResumeSkillService } from './resume-skill.service';

@Injectable()
export class ResumeSkillPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resumeSkillService: ResumeSkillService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.resumeSkillService.find(id).subscribe((resumeSkill) => {
                this.resumeSkillModalRef(component, resumeSkill);
            });
        } else {
            return this.resumeSkillModalRef(component, new ResumeSkill());
        }
    }

    resumeSkillModalRef(component: Component, resumeSkill: ResumeSkill): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resumeSkill = resumeSkill;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
