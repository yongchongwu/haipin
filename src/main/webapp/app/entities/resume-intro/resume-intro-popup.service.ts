import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ResumeIntro } from './resume-intro.model';
import { ResumeIntroService } from './resume-intro.service';

@Injectable()
export class ResumeIntroPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resumeIntroService: ResumeIntroService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.resumeIntroService.find(id).subscribe((resumeIntro) => {
                this.resumeIntroModalRef(component, resumeIntro);
            });
        } else {
            return this.resumeIntroModalRef(component, new ResumeIntro());
        }
    }

    resumeIntroModalRef(component: Component, resumeIntro: ResumeIntro): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resumeIntro = resumeIntro;
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
