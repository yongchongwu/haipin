import { BaseEntity } from './../../shared';

export class ResumeProject implements BaseEntity {
    constructor(
        public id?: number,
        public resumeId?: number,
        public projectName?: string,
        public positionName?: string,
        public startDate?: any,
        public endDate?: any,
        public projectRemark?: string,
        public projectUrl?: string,
    ) {
    }
}
