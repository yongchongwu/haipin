import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ResumeProject } from './resume-project.model';
import { ResumeProjectService } from './resume-project.service';

@Component({
    selector: 'jhi-resume-project-detail',
    templateUrl: './resume-project-detail.component.html'
})
export class ResumeProjectDetailComponent implements OnInit, OnDestroy {

    resumeProject: ResumeProject;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resumeProjectService: ResumeProjectService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResumeProjects();
    }

    load(id) {
        this.resumeProjectService.find(id).subscribe((resumeProject) => {
            this.resumeProject = resumeProject;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResumeProjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resumeProjectListModification',
            (response) => this.load(this.resumeProject.id)
        );
    }
}
