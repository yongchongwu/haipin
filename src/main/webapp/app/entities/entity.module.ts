import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HaipinCardModule } from './card/card.module';
import { HaipinMyresumeModule } from './my-resume/my-resume.module';
import { HaipinRegistrationModule } from './registration/registration.module';
import { HaipinResumeBasicModule } from './resume-basic/resume-basic.module';
import { HaipinResumeBlockModule} from './resume-block/resume-block.module';
import { HaipinResumeEducationModule } from './resume-education/resume-education.module';
import { HaipinResumeExpectModule} from './resume-expect/resume-expect.module';
import { HaipinResumeIntroModule } from './resume-intro/resume-intro.module';
import { HaipinResumeProjectModule} from './resume-project/resume-project.module';
import { HaipinResumeShowcaseModule} from './resume-showcase/resume-showcase.module';
import { HaipinResumeSkillModule} from './resume-skill/resume-skill.module';
import { HaipinResumeWorkModule} from './resume-work/resume-work.module';
import { HaipinDatasearchModule } from './data-search/data-search.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HaipinCardModule,
        HaipinMyresumeModule,
        HaipinRegistrationModule,
        HaipinResumeBasicModule,
        HaipinResumeBlockModule,
        HaipinResumeEducationModule,
        HaipinResumeExpectModule,
        HaipinResumeIntroModule,
        HaipinResumeProjectModule,
        HaipinResumeShowcaseModule,
        HaipinResumeSkillModule,
        HaipinResumeWorkModule,
        HaipinDatasearchModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HaipinEntityModule {}
