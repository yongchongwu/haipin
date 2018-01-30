import { BaseEntity } from './../../shared';

export class DataSearch implements BaseEntity {
    constructor(
        public id?: any,
    	public edu_chinese?: string,
    	public title_chinese?: string,
    	public eol1_chinese?: string,
		public eol2_chinese?: string,
		public eol3_chinese?: string,
		public university_chinese?: string,
		public university_rank_min?: number,
		public university_rank_max?: number,
		public country_chinese?: string,
		public state_chinese?: string,
		public academic_rank_min?: number,
		public academic_rank_max?: number,
		public name?: string,
		public age_min?: number,
		public age_max?: number,
		public email?: string,
		public have_zone_1?: string,
		public have_zone_2?: string,
		public have_zone_3?: string,
		public have_zone_4?: string,
		public have_zone_other?: string,
		public keyword?: string,
		public gender?: string,
		public page?: number,
		public phone?: string,
		public size?: number,
		public sort?: any[],
    ) {
    }
}
