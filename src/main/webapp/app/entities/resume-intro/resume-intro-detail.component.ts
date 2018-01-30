import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ResumeIntro } from './resume-intro.model';
import { ResumeIntroService } from './resume-intro.service';

@Component({
    selector: 'jhi-resume-intro-detail',
    templateUrl: './resume-intro-detail.component.html'
})
export class ResumeIntroDetailComponent implements OnInit, OnDestroy {

    resumeIntro: ResumeIntro;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resumeIntroService: ResumeIntroService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResumeIntros();
    }

    load(id) {
        this.resumeIntroService.find(id).subscribe((resumeIntro) => {
            this.resumeIntro = resumeIntro;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResumeIntros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resumeIntroListModification',
            (response) => this.load(this.resumeIntro.id)
        );
    }
}
