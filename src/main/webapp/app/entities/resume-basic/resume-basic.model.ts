import { BaseEntity } from './../../shared';

export class ResumeBasic implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public name?: string,
        public sex?: string,
        public birthDay?: string,
        public birthYear?: string,
        public birthMonth?: string,
        public dialCode?: string,
        public phone?: string,
        public email?: string,
        public liveCity?: string,
        public highestDegree?: string,
        public researchField?: string,
        public workYear?: string,
        public headPic?: string,
        public oneWord?: string,
        public userIdentity?: string,
        public resumeName?: string,
        public resumeKey?: string,
        public resumeScore?: number,
        public status?: number,
        public createTime?: number,
        public updateTime?: number,
    ) {
    }
}
