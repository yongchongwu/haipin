//引入外部资源
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiPaginationUtil, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

//引入dataSearch的类、服务层
import { DataSearch } from './data-search.model';
import { DataSearchService } from './data-search.service';

//分页
import { ITEMS_PER_PAGE_SEARCH, Principal, User, UserService, ResponseWrapper } from '../../shared';
import { PaginationConfigSearch } from '../../blocks/config/uib-pagination.config';

//html&&css注册页面
@Component({
    templateUrl: './data-search.component.html',
    styleUrls: [
        'data-search.component.css'
    ]
})
export class DatasearchComponent implements OnInit, OnDestroy {

//变量声明
	dataSearch: DataSearch;
	//学历、职称、学科领域、目前工作地点
	edu_chineses: any[];
	title_chineses: any[];
	eol1_chineses: any[];
	eol2_chineses: any[];
	eol3_chineses: any[];
	country_chineses: any[];
	state_chineses: any[];
	//控制输入框清空按钮'X'的显示隐藏
	great_display: boolean = true;
	name_display: boolean = true;
	email_display: boolean = true;
	keyword_display: boolean = true;
	//搜索结果、结果总数、排名根据
	search_results: any[];
	results_number: number;
	rank_gist: string;
	//有效筛选条件
	conditions: any[] = [];
	//分页
	page: any;
	totalItems: any;
	itemsPerPage: any;
	routeData: any;
	previousPage: any;
	reverse: any;
	predicate: any;
	users: User[];
	//蒙板宽高要通过ts获取
	mask_height: any;
	mask_width: any;
	//返回顶部透明度
	top_opacity: any;
	//学历(复选框)
	edu_display: string = 'none';
	edu_content: any[] = [];
	edu_display_content: boolean = false;
	dataSearch_edu_chinese: any[] = [];
	//职称(复选框)
	title_display: string = 'none';
	title_content: any[] = [];
	title_display_content: boolean = false;
	dataSearch_title_chinese: any[] = [];
	//学科领域(复选框)
	subject_display: string = 'none';
	subject_content: any[] = [];
	subject_display_content: boolean = false;
	//目前工作地点(复选框)
	site_display: string = 'none';
	site_content: any[] = [];
	site_display_content: boolean = false;

//依赖注入
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dataSearchService: DataSearchService,
        private alertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        //注入分页组件配置参数
        private paginationConfig: PaginationConfigSearch,
        private parseLinks: JhiParseLinks,
    ) {
    	let me = this
    	me.itemsPerPage = ITEMS_PER_PAGE_SEARCH;
        me.routeData = me.activatedRoute.data.subscribe((data) => {
			me.page = data['pagingParams'].page;
	        me.previousPage = data['pagingParams'].page;
	        me.reverse = data['pagingParams'].ascending;
	        me.predicate = data['pagingParams'].predicate;
        });
        //检测网页顶部卷去的距离,从而控制'返回顶部'是否显示
        window.onscroll = function() {
        	document.documentElement.scrollTop >= 550?me.top_opacity = '1':me.top_opacity = '0';
        }
        //点击网页文档的时候让职称、学历复选框消失
        document.body.onclick = function() {
        	me.title_display = 'none';
            me.edu_display = 'none';
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

//页面初始化
    ngOnInit() {
		this.init();
    }

//分页
	//页数改变
    loadPage(page) {
    	let me = this;
    	console.log(page);
    	if (page !== me.previousPage) {
            me.previousPage = page;
            me.transition();
            //统一页数
			me.dataSearch.page = me.page;
            me.query(me.dataSearch);
        }
    }

	//拼接路由参数
	sort() {
		let me = this;
        const result = [me.predicate + ',' + (me.reverse ? 'asc' : 'desc')];
        if (me.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

	//改变路由
	transition() {
		let me = this;
        me.router.navigate(['/data-search'], {
            queryParams: {
                page: me.page,
                sort: me.predicate + ',' + (me.reverse ? 'asc' : 'desc')
            }
        });
   }

	//数据初始化
	init() {
		let me = this;
		me.dataSearch = new DataSearch();
		//学历、职称、学科领域、目前工作地点默认为'不限'
    	me.dataSearch.edu_chinese = undefined;
    	me.dataSearch.title_chinese = undefined;
    	me.dataSearch.eol1_chinese = '';
    	me.dataSearch.eol2_chinese = '';
    	me.dataSearch.eol3_chinese = '';
    	me.dataSearch.country_chinese = '';
    	me.dataSearch.state_chinese = '';
    	//论文分区默认为空
    	me.dataSearch.have_zone_1 = '';
		me.dataSearch.have_zone_2 = '';
		me.dataSearch.have_zone_3 = '';
		me.dataSearch.have_zone_4 = '';
		//排名依据默认为相关度
		me.dataSearch.sort =  [{sort_name: "index",sort_type: "asc"}];
		me.rank_gist = 'RelevanceRanking';
		//统一页数
		me.dataSearch.page = me.page;
    	me.dataSearchService.query().subscribe((res: DataSearch) =>
	            (function(res) {
	            	console.log('dataSearch请求成功：');
	            	console.log(res);
	            	me.mask_height = document.body.scrollHeight+'px';
	            	me.mask_width = document.body.scrollWidth+'px';
	            	//学历、职称、学科领域、目前工作地点
	            	me.edu_chineses = res['aggregations']['edu_chinese']['buckets'];
	            	me.binding(me.edu_chineses,me.edu_content);
	            	me.title_chineses = res['aggregations']['title_chinese']['buckets'];
                    me.binding(me.title_chineses,me.title_content);
	            	me.eol1_chineses = res['aggregations']['eol1_chinese']['buckets'];
	            	me.country_chineses = res['aggregations']['country_chinese']['buckets'];
	            	//搜索结果、结果总数
	            	me.search_results = res['hits']['hits'];
	            	me.results_number = res['hits']['total'];
	            	me.totalItems = res['hits']['total'];
	            }(res)), (res: Response) => me.onSaveError(res));
    	//默认有效筛选条件为空&&清楚筛选时清空
		me.conditions = [];
	}

	//提取复选框要绑定的二维数组（key，boolean）
    binding(source,target) {
        for(var Key in source) {
            //定义二维数组
            target[parseInt(Key)] = [];
            target[parseInt(Key)][0] = source[Key].key;
        }
    }

	//学科领域、目前工作地点下拉单联动、排名依据数据交互
	select_change(Str) {
		let me = this;
		if(Str == 'eol1') {
			console.log(me.dataSearch.eol1_chinese);
			me.dataSearchService._change('eol2_chinese','eol1_chinese',me.dataSearch.eol1_chinese).subscribe((res: DataSearch) =>
	            (function(res) {
	            	console.log('点一级==>学科领域下拉单联动成功');
	            	me.dataSearch.eol2_chinese = '';
	    			me.dataSearch.eol3_chinese = '';
	            	if(me.dataSearch.eol1_chinese == '') {
		    			me.eol2_chineses = [];
		    			me.eol3_chineses = [];
					}else {
		            	me.eol2_chineses = res['aggregations']['eol2_chinese']['eol2_chinese.raw']['buckets'];
		            	me.eol3_chineses = [];
					}
	            }(res)), (res: Response) => me.onSaveError(res));
		}else if(Str == 'eol2') {
			console.log(me.dataSearch.eol2_chinese);
			me.dataSearchService._change('eol3_chinese','eol2_chinese',me.dataSearch.eol2_chinese).subscribe((res: DataSearch) =>
	            (function(res) {
	            	console.log('点二级级==>学科领域下拉单联动成功');
	            	me.dataSearch.eol3_chinese = '';
	            	if(me.dataSearch.eol2_chinese == '') {
		    			me.eol3_chineses = [];
					}else {
						me.eol3_chineses = res['aggregations']['eol3_chinese']['eol3_chinese.raw']['buckets'];
					}
	            }(res)), (res: Response) => me.onSaveError(res));
		}else if(Str == 'country') {
			console.log(me.dataSearch.country_chinese);
			me.dataSearchService._change('state_chinese','country_chinese',me.dataSearch.country_chinese).subscribe((res: DataSearch) =>
	            (function(res) {
	            	console.log('点一级==>目前工作地点下拉单联动成功');
	            	me.dataSearch.state_chinese = '';
	            	if(me.dataSearch.country_chinese == '') {
		    			me.state_chineses = [];
					}else {
						me.state_chineses = res['aggregations']['state_chinese']['state_chinese.raw']['buckets'];
					}
	            }(res)), (res: Response) => me.onSaveError(res));
		}else if(Str == 'rank_gist') {
			switch(me.rank_gist) {
				case "RelevanceRanking" : me.dataSearch.sort[0].sort_name = 'index';break;
				case "AcademicRanking" : me.dataSearch.sort[0].sort_name = 'academic_rank_min';break;
				case "UniversityRank" : me.dataSearch.sort[0].sort_name = 'university_rank_min';break;
				default : console.log('不可能有这种排名根据');
			}
			me.dataSearch.sort[0].sort_type = 'asc';
			//排名根据改变后再次进行检索
			me.btn_search();
		}
	}

	//[]转换为undefined
    transform(target) {
        //判断复选框绑定的数组为空就转换为undefined
        if(target&&target.length == 0) {
            target = undefined;
        }
    }

    //筛选复选框有效条件
    checkbox_valid(KEY,Str,once,source,i,identity) {
        let me = this;
        if(KEY == Str&&once) {
            //遍历复选框绑定的数据
            let arr = source;
            for(var key in arr) {
                me.conditions[i] = [identity,arr[key]];
                i++;
            }
            once = false;
        }
        return i;
    }

    //筛选排名（有最大和最小两个值的那种）的有效条件
    pair_valid(min,max,Str_target,i) {
        let me = this;
        if(min&&max) {
            me.conditions[i] = [Str_target,min+' - '+max];
        }else if(min) {
            me.conditions[i] = [Str_target,'>'+min];
        }else if(max) {
            me.conditions[i] = [Str_target,'<'+max];
        }
        i++;
        return i;
    }

	//点击检索按钮
	btn_search() {
		let me = this;
		//每页显示10条数据,且回到第一页
		me.dataSearch.size = 10;
		me.dataSearch.page = 1;
		me.page = 1;
		//将有效筛选条件取出
		let i = 0;
		//所在大学、学科、年龄、职称、学历
		let one_university = true;
		let one_academic_rank = true;
		let one_age_min = true;
		let one_title = true;
        let one_edu = true;
        //判断学历、职称复选框绑定的数组转换
        me.transform(me.dataSearch.edu_chinese);
        me.transform(me.dataSearch.title_chinese);
		//先把上次保存的有效筛选条件清空再提取;
		me.conditions = [];
		for(var Key in me.dataSearch) {
			if(Key!='page'&&Key!='size'&&me.dataSearch[Key]){
				switch(Key) {
					case 'eol1_chinese' : me.conditions[i] = ['学科领域1级',me.dataSearch.eol1_chinese];break;
					case 'eol2_chinese' : me.conditions[i] = ['学科领域2级',me.dataSearch.eol2_chinese];break;
					case 'eol3_chinese' : me.conditions[i] = ['学科领域3级',me.dataSearch.eol3_chinese];break;
					case 'university_chinese' : me.conditions[i] = ['在职大学',me.dataSearch.university_chinese];break;
					case 'country_chinese' : me.conditions[i] = ['目前工作地点(国家)',me.dataSearch.country_chinese];break;
					case 'state_chinese' : me.conditions[i] = ['目前工作地点(地区)',me.dataSearch.state_chinese];break;
					case 'name' : me.conditions[i] = ['姓名',me.dataSearch.name];break;
					case 'email' : me.conditions[i] = ['电子邮箱',me.dataSearch.email];break;
					case 'have_zone_1' : me.conditions[i] = ['论文分区','一区'];break;
					case 'have_zone_2' : me.conditions[i] = ['论文分区','二区'];break;
					case 'have_zone_3' : me.conditions[i] = ['论文分区','三区'];break;
					case 'have_zone_4' : me.conditions[i] = ['论文分区','四区'];break;
					default : i--;
				}
				i++;
                //学历多选
                if(me.dataSearch.edu_chinese) {
                    i = me.checkbox_valid(Key,'edu_chinese',one_edu,me.dataSearch.edu_chinese.split(","),i,'学历')
                }
				//职称多选
                if(me.dataSearch.title_chinese) {
                    i = me.checkbox_valid(Key,'title_chinese',one_title,me.dataSearch.title_chinese.split(","),i,'职称')
                }
				//最大和最小值（所在大学排名、学科排名、年龄）
                if(one_university&&(Key == 'university_rank_min'||Key == 'university_rank_max')) {
                    i = me.pair_valid(me.dataSearch['university_rank_min'],me.dataSearch['university_rank_max'],'所在大学排名',i);
                    one_university = false;
                }
                if(one_academic_rank&&(Key == 'academic_rank_min'||Key == 'academic_rank_max')) {
                    i = me.pair_valid(me.dataSearch['academic_rank_min'],me.dataSearch['academic_rank_max'],'学科排名',i);
                    one_academic_rank = false;
                }
                if(one_age_min&&(Key == 'age_min'||Key == 'age_max')) {
                    i = me.pair_valid(me.dataSearch['age_min'],me.dataSearch['age_max'],'年龄',i);
                    one_age_min = false;
                }
			}
		}
		console.log('输出有效筛选条件：');
		console.log(me.conditions);
		//如果模糊检索输入框有内容,就要先翻译,再查询
		console.log('提交查询json：')
		console.log(me.dataSearch);
		if(me.dataSearch.keyword) {
			me.dataSearchService._translate(me.dataSearch.keyword).subscribe((res: DataSearch) =>
	            (function(res) {
	            	console.log('keyword翻译成功');
            		me.dataSearch.keyword = res['trans_result'][0].dst;
	            	//添加英文到有效筛选条件
	            	let key_word: any[] = ['模糊检索',me.dataSearch.keyword];
	            	me.conditions.push(key_word);
	            	console.log('翻译后再次输出有效筛选条件：');
					console.log(me.conditions);
	            	//再查询
	            	me.query(me.dataSearch);
	            }(res)), (res: Response) => me.onSaveError(res));
		}else {
			me.query(me.dataSearch);
		}
	}

	// 论文分区boolean值转换
    boolean_transform(source) {
        source?source = '是':source = '';
    }

	//查询数据
	query(dataSearch) {
		let me = this;
		//查询之前先将论文分区绑定的boolean值转换成字符串
		//(angular2不能使用ng-true-value在html模板中直接绑定checkbox的自定义值)
        me.boolean_transform(me.dataSearch.have_zone_1);
        me.boolean_transform(me.dataSearch.have_zone_2);
        me.boolean_transform(me.dataSearch.have_zone_3);
        me.boolean_transform(me.dataSearch.have_zone_4);
		me.dataSearchService._search(dataSearch).subscribe((res: DataSearch) =>
            (function(res) {
            	console.log('dataSearch查询成功：');
            	console.log(res);
            	//搜索结果、结果总数
            	if(res['hits']) {
            		me.search_results = res['hits']['hits'];
        			me.results_number = res['hits']['total'];
        			me.totalItems = res['hits']['total'];
            	}
            }(res)), (res: Response) => me.onSaveError(res));
	}

	//清楚筛选
	reset() {
		this.init();
	}

	//清楚某一条有效筛选条件
	reset_obj(index) {
		let me = this;
		console.log(me.conditions[index][0]);
		//一个字段对应两个值的所在大学、学科、年龄部分
		if(me.conditions[index][0] == '所在大学排名') {
			me.dataSearch.university_rank_min = null;
			me.dataSearch.university_rank_max = null;
		}
		if(me.conditions[index][0] == '学科排名') {
			me.dataSearch.academic_rank_min = null;
			me.dataSearch.academic_rank_max = null;
		}
		if(me.conditions[index][0] == '年龄') {
			me.dataSearch.age_min = null;
			me.dataSearch.age_max = null;
		}
		//一级title能够判断
		switch(me.conditions[index][0]) {
			case '学科领域1级' : me.dataSearch.eol1_chinese = '';break;
			case '学科领域2级' : me.dataSearch.eol2_chinese = '';break;
			case '学科领域3级' : me.dataSearch.eol3_chinese = '';break;
			case '在职大学' :  me.x_Click('great');break;
			case '目前工作地点(国家)' : me.dataSearch.country_chinese = '';break;
			case '目前工作地点(地区)' : me.dataSearch.state_chinese = '';break;
			case '姓名' : me.x_Click('name');break;
			case '电子邮箱' : me.x_Click('email');break;
			case '模糊检索' : me.x_Click('keyword');break;
			default : console.log('一级title不可判断');
		}
		//只有二级content才能判断是哪个论文分区
		switch(me.conditions[index][1]) {
			case '一区' : me.dataSearch.have_zone_1 = '';break;
			case '二区' : me.dataSearch.have_zone_2 = '';break;
			case '三区' : me.dataSearch.have_zone_3 = '';break;
			case '四区' : me.dataSearch.have_zone_4 = '';break;
			default : console.log('论文分区不可判断');
		}
		//职称多选
        if(me.conditions[index][0] == '职称') {
		    me.checkbox_x(me.dataSearch.title_chinese,me.title_content,index);
            me.title_display_content = me.limit_display(me.title_display_content,me.dataSearch_title_chinese,me.title_content,'title');
        }
        //学历多选
        if(me.conditions[index][0] == '学历') {
            me.checkbox_x(me.dataSearch.edu_chinese,me.edu_content,index);
            me.edu_display_content = me.limit_display(me.edu_display_content,me.dataSearch_edu_chinese,me.edu_content,'edu');
        }
		//清除某一条有效筛选条件后再次进行检索
		me.btn_search();
	}

    ///清楚某一条含复选框选项的有效筛选条件的数据交互
    checkbox_x(source,target,index) {
        //遍历复选框绑定的数据
        let me = this;
        let arr = source.split(",");
        for(var Key in arr) {
            //如果与点击'X'的选项相等,就将其取出(要将Key字符类型转换为number类型)
            if(arr[Key] == me.conditions[index][1]) {
                let Value = arr[Key];
                //再遍历上面的复选框绑定的值
                for(var Key in target) {
                    //找到与点击'X'的值相等的那个选项，将其绑定的boolean值设为false
                    if(target[Key][0] == Value) {
                        target[Key][1] = false;
                    }
                }
            }
        }
        console.log(target);
        console.log(me.edu_content);
    }

    //控制'不限'显示隐藏
    limit_display(limit,data_target,source,identity) {
        let me = this;
        //先让'不限'显示
        limit = false;
        //让上次保留的绑定数组清空,再重新赋值
        data_target = [];
        //遍历复选框绑定的数组
        for(var i=0;i<source.length;i++) {
            //如果为true,则表示选中
            if(source[i][1]) {
                //如果选中,隐藏'不限'
                limit = true;
                //并添加到绑定数组
                data_target.push(source[i][0]);
            }
        }
        if(identity == 'title') {
            me.dataSearch.title_chinese = data_target.join(',');
        }else if(identity == 'edu') {
            me.dataSearch.edu_chinese = data_target.join(',');
        }
        return limit;
    }

    //复选框的所有网页交互效果
    checkbox_effect(Str,$event,name) {
        let me = this;
        //阻止冒泡,影响其他事件
        $event.stopPropagation();
        if(Str == 'title') {
            //点击假输入框控制复选框的显示隐藏
            if(name == 'title') {
                me.title_display = me.title_display == 'none'?'block':'none';
            }else if(name == 'edu') {
                me.edu_display = me.edu_display == 'none'?'block':'none';
            }
        }else if(Str == 'title_close') {
            //点击复选框'X'隐藏复选框
            if(name == 'title') {
                me.title_display = 'none';
            }else if(name == 'edu') {
                me.edu_display = 'none';
            }
        }else if(typeof Str == 'number') {
            //点击假输入框里面的'X'让对应的数据绑定为false
            if(name == 'title') {
                me.title_content[Str][1] = false;
            }else if(name == 'edu') {
                me.edu_content[Str][1] = false;
            }
        }
        //点击输入框中的'X'和复选框内容改变
        if((typeof Str == 'number')||(Str == 'change')) {
            if(name == 'title') {
                me.title_display_content = me.limit_display(me.title_display_content,me.dataSearch_title_chinese,me.title_content,'title');
            }else if(name == 'edu') {
                me.edu_display_content = me.limit_display(me.edu_display_content,me.dataSearch_edu_chinese,me.edu_content,'edu');
            }
        }
    }

	//所有输入框正在输入事件
	oninput(Str) {
		let me = this;
		console.log('正在输入');
		if(Str == 'great') {
			me.dataSearch.university_chinese == ''?me.great_display = true:me.great_display = false;
		}else if(Str == 'name') {
			me.dataSearch.name == ''?me.name_display = true:me.name_display = false;
		}else if(Str == 'email') {
			me.dataSearch.email == ''?me.email_display = true:me.email_display = false;
		}else if(Str == 'keyword') {
			me.dataSearch.keyword == ''?me.keyword_display = true:me.keyword_display = false;
		}
	}

	//点击'x'清空输入内容
	x_Click(Str) {
		let me = this;
		console.log('清空');
		if(Str == 'great') {
			me.dataSearch.university_chinese = '';
			me.great_display = true;
		}else if(Str == 'name') {
			me.dataSearch.name = '';
			me.name_display = true;
		}else if(Str == 'email') {
			me.dataSearch.email = '';
			me.email_display = true;
		}else if(Str == 'keyword') {
			me.dataSearch.keyword = '';
			me.keyword_display = true;
		}
	}

	//回顶部
	back_top() {
		let target = 0;
		let present = document.documentElement.scrollTop;
		console.log(document.documentElement.scrollTop);
		console.log('回顶部');
		//缓动定时器
		let scroll = setInterval(function() {
			present = present-(present-target)/10;
			window.scrollTo(0,present);
			console.log(present);
			if(present<=1) {
				clearInterval(scroll);
			}
		},10);
	}

	//离开页面时执行的函数
	ngOnDestroy() {
    	console.log('离开');
    }

}
