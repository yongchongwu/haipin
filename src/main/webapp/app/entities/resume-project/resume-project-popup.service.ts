import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ResumeProject } from './resume-project.model';
import { ResumeProjectService } from './resume-project.service';

@Injectable()
export class ResumeProjectPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resumeProjectService: ResumeProjectService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.resumeProjectService.find(id).subscribe((resumeProject) => {
                if (resumeProject.startDate) {
                    resumeProject.startDate = {
                        year: resumeProject.startDate.getFullYear(),
                        month: resumeProject.startDate.getMonth() + 1,
                        day: resumeProject.startDate.getDate()
                    };
                }
                if (resumeProject.endDate) {
                    resumeProject.endDate = {
                        year: resumeProject.endDate.getFullYear(),
                        month: resumeProject.endDate.getMonth() + 1,
                        day: resumeProject.endDate.getDate()
                    };
                }
                this.resumeProjectModalRef(component, resumeProject);
            });
        } else {
            return this.resumeProjectModalRef(component, new ResumeProject());
        }
    }

    resumeProjectModalRef(component: Component, resumeProject: ResumeProject): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resumeProject = resumeProject;
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
