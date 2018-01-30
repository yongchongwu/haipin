import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Registration } from './registration.model';
import { RegistrationService } from './registration.service';

@Component({
    selector: 'jhi-registration-detail',
    templateUrl: './registration-detail.component.html'
})
export class RegistrationDetailComponent implements OnInit, OnDestroy {

    registration: Registration;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private registrationService: RegistrationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegistrations();
    }

    load(id) {
        this.registrationService.find(id).subscribe((registration) => {
            this.registration = registration;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegistrations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'registrationListModification',
            (response) => this.load(this.registration.id)
        );
    }
}
