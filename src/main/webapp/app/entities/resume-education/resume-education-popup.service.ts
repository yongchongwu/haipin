import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ResumeEducation } from './resume-education.model';
import { ResumeEducationService } from './resume-education.service';

@Injectable()
export class ResumeEducationPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resumeEducationService: ResumeEducationService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.resumeEducationService.find(id).subscribe((resumeEducation) => {
                this.resumeEducationModalRef(component, resumeEducation);
            });
        } else {
            return this.resumeEducationModalRef(component, new ResumeEducation());
        }
    }

    resumeEducationModalRef(component: Component, resumeEducation: ResumeEducation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resumeEducation = resumeEducation;
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
