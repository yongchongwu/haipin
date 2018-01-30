import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Card } from './card.model';
import { CardService } from './card.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-card',
    templateUrl: './card.component.html',
    styleUrls: [
    	'card.component.css'
    ]
})
export class CardComponent implements OnInit, OnDestroy {
	card: Card;
	cards: Card[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cardService: CardService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }
    loadAll() {
        this.cardService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cards = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
     getCurrentCard() {
        this.cardService.getCurrentCard().subscribe((card: Card) => {
            this.card = card;
        });

    }
    ngOnInit() {
//  	this.loadAll();
        this.getCurrentCard();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCards();
    }
	btnNone(){

	}
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Card) {
        return item.id;
    }
    registerChangeInCards() {
        this.eventSubscriber = this.eventManager.subscribe('cardListModification', (response) => this.getCurrentCard());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
