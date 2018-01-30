import { BaseEntity } from './../../shared';

export class ResumeWork implements BaseEntity {
    constructor(
        public id?: number,
        public resumeId?: number,
        public companyName?: string,
        public companyLogo?: string,
        public positionName?: string,
        public startDate?: any,
        public endDate?: any,
        public workContent?: string,
        public isUploadLogo?: boolean,
        public isShowEditForm?: boolean
    ) {
        this.isUploadLogo = false;
        this.isShowEditForm=false;
    }
}
