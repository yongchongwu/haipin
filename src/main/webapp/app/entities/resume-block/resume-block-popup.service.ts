import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ResumeBlock } from './resume-block.model';
import { ResumeBlockService } from './resume-block.service';

@Injectable()
export class ResumeBlockPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resumeBlockService: ResumeBlockService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.resumeBlockService.find(id).subscribe((resumeBlock) => {
                this.resumeBlockModalRef(component, resumeBlock);
            });
        } else {
            return this.resumeBlockModalRef(component, new ResumeBlock());
        }
    }

    resumeBlockModalRef(component: Component, resumeBlock: ResumeBlock): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resumeBlock = resumeBlock;
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
