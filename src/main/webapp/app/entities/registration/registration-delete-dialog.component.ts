import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Registration } from './registration.model';
import { RegistrationPopupService } from './registration-popup.service';
import { RegistrationService } from './registration.service';

@Component({
    selector: 'jhi-registration-delete-dialog',
    templateUrl: './registration-delete-dialog.component.html'
})
export class RegistrationDeleteDialogComponent {

    registration: Registration;

    constructor(
        private registrationService: RegistrationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.registrationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'registrationListModification',
                content: 'Deleted an registration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-registration-delete-popup',
    template: ''
})
export class RegistrationDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registrationPopupService: RegistrationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.registrationPopupService
                .open(RegistrationDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
