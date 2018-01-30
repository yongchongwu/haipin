import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ResumeSkill } from './resume-skill.model';
import { ResumeSkillService } from './resume-skill.service';

@Component({
    selector: 'jhi-resume-skill-detail',
    templateUrl: './resume-skill-detail.component.html'
})
export class ResumeSkillDetailComponent implements OnInit, OnDestroy {

    resumeSkill: ResumeSkill;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resumeSkillService: ResumeSkillService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResumeSkills();
    }

    load(id) {
        this.resumeSkillService.find(id).subscribe((resumeSkill) => {
            this.resumeSkill = resumeSkill;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResumeSkills() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resumeSkillListModification',
            (response) => this.load(this.resumeSkill.id)
        );
    }
}
