//引入外部资源
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

//基本信息
import { Subscription, Observable } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ResumeBasic} from './../resume-basic/resume-basic.model';

//工作经历
import { ResumeWork} from './../resume-work/resume-work.model';
import { ResumeWorkService } from './../resume-work/resume-work.service';
import { MyresumeService } from './my-resume.service';
import { FormControl } from '@angular/forms';

//教育经历
import { ResumeEducation } from './../resume-education/resume-education.model';
import { ResumeEducationService } from './../resume-education/resume-education.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

//项目经验
import { ResumeProject } from './../resume-project/resume-project.model';
import { ResumeProjectService } from './../resume-project/resume-project.service';

//作品展示

//期望工作
import { ResumeExpect } from './../resume-expect/resume-expect.model';
import { ResumeExpectService } from './../resume-expect/resume-expect.service';

//职业技能
import { ResumeSkill } from './../resume-skill/resume-skill.model';
import { ResumeSkillService } from './../resume-skill/resume-skill.service';

//自我描述
import { ResumeIntro } from './../resume-intro/resume-intro.model';
import { ResumeIntroService } from './../resume-intro/resume-intro.service';

//自定义板块
import { ResumeBlock } from './../resume-block/resume-block.model';
import { ResumeBlockService } from './../resume-block/resume-block.service';

//html&&css注册页面
@Component({
    templateUrl: './my-resume.component.html',
    styleUrls: [
        'my-resume.component.css'
    ]
})
export class MyresumeComponent implements OnInit, OnDestroy {

//变量声明
	//性别、年、月、地区数组声明
    sexs: any[];
    birthYears: any[];
    birthMonths: any[];
    dialCodes: any[];
    //教育经历的学历和年份所在数组声明
    educationals: any[];
    //控制表单的保存按钮能否点击
    isSaving: boolean;
    //基本信息
    bs: any;
    isShowBasicForm: boolean;
    Waitload: boolean = true;
    resumeBasic: ResumeBasic;
    //工作经历
    wk: any;
    isAddWork: boolean;
    resumeWork: ResumeWork;
    resumeWorks: ResumeWork[];
	//教育经历
	ed: any;
	isAddEdu: boolean = false;
    resumeEducation: ResumeEducation;
	resumeEducations: ResumeEducation[];
	//项目经验
	pr: any;
	isAddPro: boolean = false;
	resumeProject: ResumeProject;
	resumeProjects: ResumeProject[];
	//作品展示
	//期望工作
	ex: any;
	isEditExp: boolean = false;
	resumeExpect: ResumeExpect;
	resumeExpects: ResumeExpect[];
	//职业技能
	sk: any;
	isAddSkill: boolean = false;
    resumeSkill: ResumeSkill;
	resumeSkills: ResumeSkill[];
	//自我描述
	it: any;
	isEditIntro: boolean = false;
	resumeIntro: ResumeIntro;
	//自定义板块
	bk: any;
	isEditBlock: boolean = false;
	resumeBlock: ResumeBlock;
	resumeBlocks: ResumeBlock[];

//依赖注入
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        //基本信息
        private eventManager: JhiEventManager,
        private alertService: JhiAlertService,
        //工作经历
    	private resumeWorkService: ResumeWorkService,
    	private myresumeService: MyresumeService,
		//教育经历
        private resumeEducationService: ResumeEducationService,
        //项目经验
        private resumeProjectService: ResumeProjectService,
        //作品展示
        //期望工作
        private resumeExpectService: ResumeExpectService,
        //职业技能
        private resumeSkillService: ResumeSkillService,
        //自我描述
        private resumeIntroService: ResumeIntroService,
        //自定义板块
        private resumeBlockService: ResumeBlockService
    ) {
    }

//数据初始化
    ngOnInit() {
        this.isShowBasicForm = false;
        this.sexs = [{code:'1',text:'男'},{code:'2',text:'女'}];
        this.birthYears = [{code:'1970',text:'1970'},{code:'1971',text:'1971'},{code:'1972',text:'1972'},
            {code:'1973',text:'1973'},{code:'1974',text:'1974'},{code:'1975',text:'1975'},{code:'1976',text:'1976'},
            {code:'1977',text:'1977'},{code:'1978',text:'1978'},{code:'1979',text:'1979'},{code:'1980',text:'1980'},
            {code:'1981',text:'1981'},{code:'1982',text:'1982'},{code:'1983',text:'1983'},{code:'1984',text:'1984'},
            {code:'1985',text:'1985'},{code:'1986',text:'1986'},{code:'1987',text:'1987'},{code:'1988',text:'1988'},
            {code:'1989',text:'1989'},{code:'1990',text:'1990'},{code:'1991',text:'1991'},{code:'1992',text:'1992'},
            {code:'1993',text:'1993'},{code:'1994',text:'1994'},{code:'1995',text:'1995'},{code:'1996',text:'1996'},
            {code:'1997',text:'1997'},{code:'1998',text:'1998'},{code:'1999',text:'1999'},{code:'2000',text:'2000'}
        ];
        this.birthMonths = [{code:'01',text:'01'},{code:'02',text:'02'},{code:'03',text:'03'},{code:'04',text:'04'},
            {code:'05',text:'05'},{code:'06',text:'06'},{code:'07',text:'07'},{code:'08',text:'08'},{code:'09',text:'09'},
            {code:'10',text:'10'},{code:'11',text:'11'},{code:'12',text:'12'}
        ];
        this.dialCodes = [{code:'0086',text:'中国'},{code:'0082',text:'印度'}];
        //学历层次与毕业年份数组
        this.educationals = [{'xuelis': [{'code': '大专'},{'code': '本科'},{'code': '硕士'},{'code': '博士'},{'code': '其他'}]},
        					 {'nians': [{'code': '1990'},{'code': '1991'},{'code': '1992'},{'code': '1993'},{'code': '1994'},
        					 {'code': '1995'},{'code': '1996'},{'code': '1997'},{'code': '1998'},{'code': '1999'},{'code': '2000'},
        					 {'code': '2001'},{'code': '2002'},{'code': '2003'},{'code': '2004'},{'code': '2005'},{'code': '2006'},
        					 {'code': '2007'},{'code': '2008'},{'code': '2009'},{'code': '2010'},{'code': '2011'},{'code': '2012'},
        					 {'code': '2013'},{'code': '2014'},{'code': '2015'},{'code': '2016'},{'code': '2017'},{'code': '2018'},
        					 {'code': '2019'},{'code': '2020'}]},
    						 {'types': [{'code': '全职'},{'code': '兼职'},{'code': '实习'}]},
       						 {'salarys': [{'code': '2k以下'},{'code': '2k-5k'},{'code': '5k-10k'},{'code': '10k-15k'},{'code': '15k-25k'},
       						 {'code': '25k-50k'},{'code': '50k以上'}]}];
		//基本信息、工作经历、教育经历、项目经验、作品展示、期望工作、职业技能、自我描述、自定义板块数据初始化
		this.resumeBasic = new ResumeBasic();
		this.resumeWork = new ResumeWork();
		this.resumeEducation = new ResumeEducation();
		this.resumeProject = new ResumeProject();
		this.resumeExpect = new ResumeExpect();
		this.resumeSkill = new ResumeSkill();
		this.resumeIntro = new ResumeIntro();
		this.resumeBlock = new ResumeBlock();
		this.resumeBlock.titleName = '自定义板块';//数据未加载完成时显示标题为自定义板块
		//页面初始化请求该用户所对应的数据
		this.Init();
    }

所有模块公用部分
    //数据请求
    Init() {
		this.myresumeService.getAllInfo().subscribe((resobj) => {
            this.resumeBasic = resobj['resumeBasic'];
            //基本信息数据回来以后才显示基本信息,不然会提前显示一些预期外的字体'女 年 月',因为数据没加载出来不能判断sex值;
            this.Waitload = false;
            this.resumeWorks = resobj['resumeWorks'];
            this.resumeEducations = resobj['resumeEducations'];
            this.resumeProjects = resobj['resumeProjects'];
            this.resumeExpects = resobj['resumeExpects'];
            if(this.resumeExpects[0]) {
            	this.resumeExpect = this.resumeExpects[0];
            	console.log("有exp");
            	//根据功能要求只需要一条期望工作(如果有值);
            }else {
            	console.log("没有exp");
            }
            this.resumeSkills = resobj['resumeSkills'];
            this.resumeIntro = resobj['resumeIntro'];
            if(this.resumeIntro) {
            	console.log("有intro");
            }else {
            	console.log("没有intro");
            	this.resumeIntro = new ResumeIntro();
            	this.resumeIntro.resumeId = this.resumeBasic.id;
            }
            this.resumeBlocks = resobj['resumeBlocks'];
            if(this.resumeBlocks[0]) {
            	this.resumeBlock = this.resumeBlocks[0];
            	console.log("有block");
            	//根据功能要求只需要一条自定义板块(如果有值);
            }else {
            	this.resumeBlock.titleName = '自定义板块';
            	this.resumeBlock.resumeId = this.resumeBasic.id;
            	console.log("没有block");
            }
            console.log(resobj);
            console.log('页面初始化请求数据完毕');
     });
	}

    //基本信息、自我描述、期望工作、职业技能、自定义板块的编辑与取消;工作经历、教育经历、项目经验、作品展示的添加与取消
    add_cancel(Str) {
    	if(Str == 'block_edit'){
    		console.log('block编辑');
    		this.bk = (<any>Object).assign({},this.resumeBlock);
    		this.isEditBlock = true;
    	}else if(Str == 'block_cancel'){
    		console.log('block取消');
    		this.resumeBlock = this.bk;
    		this.isEditBlock = false;
    	}else if(Str == 'intro_edit') {
    		console.log('intro编辑');
    		this.it = (<any>Object).assign({},this.resumeIntro);
    		this.isEditIntro = true;
    	}else if(Str == 'intro_cancel') {
    		console.log('intro取消');
    		this.resumeIntro = this.it;
    		this.isEditIntro = false;
    	}else if(Str == 'exp_edit') {
    		console.log('exp编辑');
    		this.resumeExpect.resumeId = this.resumeBasic.id;
    		this.ex = (<any>Object).assign({},this.resumeExpect);
    		this.isEditExp = true;
    	}else if(Str == 'exp_cancel') {
    		console.log('exp取消');
    		this.resumeExpect = this.ex;
    		this.isEditExp = false;
    	}else if(Str == 'pro_add') {
    		console.log('pro添加');
    		this.resumeProject = new ResumeProject();
    		this.isAddPro = true;
    	}else if(Str == 'pro_cancel') {
    		console.log('pro取消');
    		this.isAddPro = false;
    	}else if(Str == 'edu_add') {
    		console.log('edu添加');
    		this.resumeEducation = new ResumeEducation();
    		this.isAddEdu = true;
    	}else if(Str == 'edu_cancel') {
    		console.log('edu取消');
    		this.isAddEdu = false;
    	}else if(Str == 'work_add') {
    		console.log('work添加');
    		this.resumeWork = new ResumeWork();
       		this.isAddWork = true;
    	}else if(Str == 'work_cancel') {
    		console.log('work取消');
  		    this.isAddWork = false;
    	}else if(Str == 'bs_edit') {
    		console.log('basic编辑');
    		this.bs = (<any>Object).assign({},this.resumeBasic);
        	this.isShowBasicForm = true;
    	}else if(Str == 'bs_cancel') {
    		console.log('basic取消');
		 	this.resumeBasic = this.bs;
    		this.isShowBasicForm = false;
    	}
    }

	//数据交互失败后执行的函数
    private onSaveError(error) {
    	console.log('失败');
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.alertService.error(error.message, null, null);
    }

//基本信息
	//基本信息保存提交表单
    info() {
        let me = this;
        me.myresumeService.info(this.resumeBasic).subscribe((res: ResumeBasic) =>
            (function(res) {
            	console.log('basic保存成功');
            	me.isShowBasicForm = !me.isShowBasicForm;
            }(res)), (res: Response) => me.onSaveError(res));
    }

//工作经历
    //工作经历添加与编辑的保存
    work_save(work) {
    	let me = this;
        //上传数据至后台
        if(work.id){
        	console.log('更改');
        	console.log(work.id)
	        me.resumeWorkService.update(work,true).subscribe((res: ResumeWork) =>
	            (function(res) {
	            	console.log('work更改成功');
	            	//时间正转换,让时间以'2017-09-30'格式显示在页面中
		    		work.startDate = work.startDate.year+'-'+(work.startDate.month<10?'0'+work.startDate.month:work.startDate.month)+'-'+(work.startDate.day<10?'0'+work.startDate.day:work.startDate.day);
		    		work.endDate = work.endDate.year+'-'+(work.endDate.month<10?'0'+work.endDate.month:work.endDate.month)+'-'+(work.endDate.day<10?'0'+work.endDate.day:work.endDate.day);
	            	work.isShowEditForm = false;
	            }(res)), (res: Response) => me.onSaveError(res));
        }else {
        	console.log('创建');
        	me.resumeWork.resumeId = me.resumeBasic.id;
        	me.resumeWorkService.create(me.resumeWork,false).subscribe((res: ResumeWork) =>
	            (function(res) {
	            	console.log('work创建成功');
			        //直接添加该条数据
			        me.resumeWorks.push(res);
		        	me.isAddWork = false;
	            }(res)), (res: Response) => me.onSaveError(res));
        }
    }

    //工作经历编辑与取消
    work_edit(work,Str) {
    	let me = this;
    	console.log(work.id);
    	if(Str == 'edit') {
    		console.log('work编辑');
    		//时间逆转换,让时间可以填入日历输入框
    		me.resumeWorkService.find(work.id).subscribe((resumeWork) => {
                work.startDate = {
                    year: resumeWork.startDate.getFullYear(),
                    month: resumeWork.startDate.getMonth() + 1,
                    day: resumeWork.startDate.getDate()
                };
                work.endDate = {
                    year: resumeWork.endDate.getFullYear(),
                    month: resumeWork.endDate.getMonth() + 1,
                    day: resumeWork.endDate.getDate()
                };
                work.isShowEditForm = true;
                me.wk = (<any>Object).assign({},work);
			});
    	}else if(Str == 'cancel') {
    		console.log('work取消');
    		//时间正转换,让时间以'2017-09-30'格式显示在页面中
    		me.wk.startDate = me.wk.startDate.year+'-'+(me.wk.startDate.month<10?'0'+me.wk.startDate.month:me.wk.startDate.month)+'-'+(me.wk.startDate.day<10?'0'+me.wk.startDate.day:me.wk.startDate.day);
    		me.wk.endDate = me.wk.endDate.year+'-'+(me.wk.endDate.month<10?'0'+me.wk.endDate.month:me.wk.endDate.month)+'-'+(me.wk.endDate.day<10?'0'+me.wk.endDate.day:me.wk.endDate.day);
    		for(var Key in work) {
		        work[Key] = me.wk[Key];
		    }
    		work.isShowEditForm = false;
    	}
    }

    //工作经历编辑删除
    work_confirmDelete(id: number,work: any,index: number) {
    	console.log(id);
    	//从后台删除对应的数据
        this.resumeWorkService.delete(id).subscribe((response) => {
            console.log('work删除成功');
            this.resumeWorks.splice(index, 1);
			work.isShowEditForm = false;
        });
    }

//教育经历
    //教育经历添加与编辑的保存
    edu_save(edu) {
    	let me = this;
    	//上传数据至后台
        if (edu.id) {
        	console.log('更改');
        	console.log(edu.id);
	        me.resumeEducationService.update(edu).subscribe((res: ResumeEducation) =>
	            (function(res) {
	            	console.log('edu更改成功');
	            	edu.isShowEditForm = false;
	            }(res)), (res: Response) => me.onSaveError(res));
        } else {
        	console.log('创建');
        	edu.resumeId = me.resumeBasic.id;
	        me.resumeEducationService.create(edu).subscribe((res: ResumeEducation) =>
	            (function(res) {
	            	console.log('edu创建成功');
	            	//直接添加该条数据
					me.resumeEducations.push(res);
					me.isAddEdu = false;
	            }(res)), (res: Response) => me.onSaveError(res));
        }
    }

    //教育经历编辑与取消
    edu_edit(edu,Str) {
    	let me = this;
    	console.log(edu.id);
    	if(Str == 'edit') {
    		console.log('edu编辑');
    		edu.isShowEditForm = true;
    		me.ed = (<any>Object).assign({},edu);
    	}else if(Str == 'cancel') {
    		console.log('edu取消');
    		for(var Key in edu){
		        edu[Key] = me.ed[Key];
		    }
    		edu.isShowEditForm = false;
    	}
    }

    //教育经历编辑删除
    edu_confirmDelete(id: number,edu: any,index: number) {
    	console.log(id);
    	//从后台删除对应的数据
        this.resumeEducationService.delete(id).subscribe((response) => {
            console.log('edu删除成功');
	        this.resumeEducations.splice(index, 1);
	    	edu.isShowEditForm = false;
        });
    }

//项目经验
    //项目经验添加与编辑的保存
    pro_save(pro) {
    	let me = this;
    	//上传数据至后台
        if (pro.id) {
        	console.log('更改');
        	console.log(pro.id);
        	me.resumeProjectService.update(pro,false).subscribe((res: ResumeProject) =>
	            (function(res) {
	            	console.log('pro更改成功');
	            	//时间正转换,让时间以'2017-09-30'格式显示在页面中
		    		pro.startDate = pro.startDate.year+'-'+(pro.startDate.month<10?'0'+pro.startDate.month:pro.startDate.month)+'-'+(pro.startDate.day<10?'0'+pro.startDate.day:pro.startDate.day);
		    		pro.endDate = pro.endDate.year+'-'+(pro.endDate.month<10?'0'+pro.endDate.month:pro.endDate.month)+'-'+(pro.endDate.day<10?'0'+pro.endDate.day:pro.endDate.day);
	            	pro.isShowEditForm = false;
	            }(res)), (res: Response) => me.onSaveError(res));
        }else {
        	console.log('创建');
        	pro.resumeId = me.resumeBasic.id;
            me.resumeProjectService.create(pro,false).subscribe((res: ResumeProject) =>
            	(function(res) {
            		console.log('pro创建成功');
			        //直接添加该条数据
			        me.resumeProjects.push(res);
	    			me.isAddPro = false;
	            }(res)), (res: Response) => me.onSaveError(res));
        }
    }

    //项目经验编辑与取消
    pro_edit(pro,Str) {
    	let me = this;
    	console.log(pro.id);
    	if(Str == 'edit') {
    		console.log('pro编辑');
    		//时间转换,让时间可以填入日历输入框
    		me.resumeProjectService.find(pro.id).subscribe((resumeProject) => {
                pro.startDate = {
                    year: resumeProject.startDate.getFullYear(),
                    month: resumeProject.startDate.getMonth() + 1,
                    day: resumeProject.startDate.getDate()
                };
                pro.endDate = {
                    year: resumeProject.endDate.getFullYear(),
                    month: resumeProject.endDate.getMonth() + 1,
                    day: resumeProject.endDate.getDate()
                };
                pro.isShowEditForm = true;
                me.pr = (<any>Object).assign({},pro);
           });
    	}else if(Str == 'cancel') {
    		console.log('pro取消');
    		//时间正转换,让时间以'2017-09-30'格式显示在页面中
    		me.pr.startDate = me.pr.startDate.year+'-'+(me.pr.startDate.month<10?'0'+me.pr.startDate.month:me.pr.startDate.month)+'-'+(me.pr.startDate.day<10?'0'+me.pr.startDate.day:me.pr.startDate.day);
    		me.pr.endDate = me.pr.endDate.year+'-'+(me.pr.endDate.month<10?'0'+me.pr.endDate.month:me.pr.endDate.month)+'-'+(me.pr.endDate.day<10?'0'+me.pr.endDate.day:me.pr.endDate.day);
    		for(var Key in pro) {
		        pro[Key] = me.pr[Key];
		    }
    		pro.isShowEditForm = false;
    	}
    }

    //项目经验编辑删除
    pro_confirmDelete(id: number,pro: any,index: number) {
    	console.log(id);
    	//从后台删除对应的数据
        this.resumeProjectService.delete(id).subscribe((response) => {
            console.log('pro删除成功');
	        this.resumeProjects.splice(index, 1);
	    	pro.isShowEditForm = false;
        });
    }

//作品展示
	//作品展示添加与编辑的保存

	//作品展示编辑与取消

	//作品展示编辑删除

//期望工作
	//期望工作编辑保存
	exp_save() {
		let me = this;
		console.log('pro保存');
        this.resumeExpectService.update(this.resumeExpect).subscribe((res: ResumeExpect) =>
            (function(res) {
            	console.log('pro保存成功');
            	me.resumeExpect.id = res.id;
            	me.isEditExp = false;
            }(res)), (res: Response) => me.onSaveError(res));
	}

//职业技能
	//职业技能添加与编辑的保存

	//职业技能编辑与取消

	//职业技能编辑删除

//自我描述
	//自我描述编辑保存
	intro_save() {
		let me = this;
		console.log('intro保存');
        this.resumeIntroService.update(this.resumeIntro).subscribe((res: ResumeIntro) =>
            (function(res) {
            	console.log('intro保存成功');
            	me.resumeIntro.id = res.id;
            	me.isEditIntro = false;
            }(res)), (res: Response) => me.onSaveError(res));
	}

//自定义板块
	//自定义板块编辑保存
	block_save() {
		let me = this;
		console.log('block保存');
		this.resumeBlockService.update(this.resumeBlock).subscribe((res: ResumeBlock) =>
            (function(res) {
            	console.log('block保存成功');
            	me.resumeBlock.id = res.id;
            	me.isEditBlock = false;
            }(res)), (res: Response) => me.onSaveError(res));
	}

	//离开页面时执行的函数
	ngOnDestroy() {
    	console.log('离开');
    }

}
