import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Card } from './card.model';
import { CardPopupService } from './card-popup.service';
import { CardService } from './card.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-card-dialog',
    templateUrl: './card-dialog.component.html',
    styleUrls: [
    	'card-dialog.component.css'
    ]
})
export class CardDialogComponent implements OnInit {

    card: Card;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private cardService: CardService,
        private userService: UserService,
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
//2
    save() {
        this.isSaving = true;
        if (this.card.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardService.update(this.card));
//              location.reload();
        } else {
            this.subscribeToSaveResponse(
                this.cardService.create(this.card));
//              location.reload();
        }
    }

    private subscribeToSaveResponse(result: Observable<Card>) {
        result.subscribe((res: Card) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Card) {
        this.eventManager.broadcast({ name: 'cardListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-card-popup',
    template: ''
})
export class CardPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardPopupService: CardPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.cardPopupService
                    .open(CardDialogComponent, params['id']);
            } else {
                this.modalRef = this.cardPopupService
                    .open(CardDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
