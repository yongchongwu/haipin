import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Registration } from './registration.model';
import { RegistrationPopupService } from './registration-popup.service';
import { RegistrationService } from './registration.service';

@Component({
    selector: 'jhi-registration-dialog',
    templateUrl: './registration-dialog.component.html',
    styleUrls: [
    	'registration-dialog.component.css'
    ]
})
export class RegistrationDialogComponent implements OnInit {

    registration: Registration;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private registrationService: RegistrationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.registration.id !== undefined) {
            this.subscribeToSaveResponse(
                this.registrationService.update(this.registration));
        } else {
            this.subscribeToSaveResponse(
                this.registrationService.create(this.registration));
        }
    }

    private subscribeToSaveResponse(result: Observable<Registration>) {
        result.subscribe((res: Registration) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Registration) {
        this.eventManager.broadcast({ name: 'registrationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-registration-popup',
    template: ''
})
export class RegistrationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registrationPopupService: RegistrationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.registrationPopupService
                    .open(RegistrationDialogComponent, params['id']);
            } else {
                this.modalRef = this.registrationPopupService
                    .open(RegistrationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
