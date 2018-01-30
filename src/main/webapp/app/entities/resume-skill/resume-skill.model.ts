import { BaseEntity } from './../../shared';

export class ResumeSkill implements BaseEntity {
    constructor(
        public id?: number,
        public resumeId?: number,
        public skillName?: string,
        public masterLevel?: string,
        public skillPercent?: number,
        public skillRemark?: string,
    ) {
    }
}
