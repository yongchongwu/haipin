import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ResumeWork } from './resume-work.model';
import { ResumeWorkService } from './resume-work.service';

@Injectable()
export class ResumeWorkPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resumeWorkService: ResumeWorkService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.resumeWorkService.find(id).subscribe((resumeWork) => {
                if (resumeWork.startDate) {
                    resumeWork.startDate = {
                        year: resumeWork.startDate.getFullYear(),
                        month: resumeWork.startDate.getMonth() + 1,
                        day: resumeWork.startDate.getDate()
                    };
                }
                if (resumeWork.endDate) {
                    resumeWork.endDate = {
                        year: resumeWork.endDate.getFullYear(),
                        month: resumeWork.endDate.getMonth() + 1,
                        day: resumeWork.endDate.getDate()
                    };
                }
                this.resumeWorkModalRef(component, resumeWork);
            });
        } else {
            return this.resumeWorkModalRef(component, new ResumeWork());
        }
    }

    resumeWorkModalRef(component: Component, resumeWork: ResumeWork): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resumeWork = resumeWork;
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
