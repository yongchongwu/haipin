import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ResumeBasic } from './resume-basic.model';
import { ResumeBasicService } from './resume-basic.service';

@Injectable()
export class ResumeBasicPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resumeBasicService: ResumeBasicService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.resumeBasicService.find(id).subscribe((resumeBasic) => {
                this.resumeBasicModalRef(component, resumeBasic);
            });
        } else {
            return this.resumeBasicModalRef(component, new ResumeBasic());
        }
    }

    resumeBasicModalRef(component: Component, resumeBasic: ResumeBasic): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resumeBasic = resumeBasic;
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
