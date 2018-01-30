import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ResumeShowcase } from './resume-showcase.model';
import { ResumeShowcaseService } from './resume-showcase.service';

@Injectable()
export class ResumeShowcasePopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resumeShowcaseService: ResumeShowcaseService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.resumeShowcaseService.find(id).subscribe((resumeShowcase) => {
                this.resumeShowcaseModalRef(component, resumeShowcase);
            });
        } else {
            return this.resumeShowcaseModalRef(component, new ResumeShowcase());
        }
    }

    resumeShowcaseModalRef(component: Component, resumeShowcase: ResumeShowcase): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resumeShowcase = resumeShowcase;
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
