//引入外部资源
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';

//引入服务层
import { DataSearchService } from './data-search.service';

//html&&css注册页面
@Component({
    templateUrl: './data-detail.component.html',
    styleUrls: [
        'data-detail.component.css'
    ]
})
export class DatadetailComponent implements OnInit, OnDestroy {

//变量声明
	//通过路由获取到的数据
	private subscription: Subscription;
	public professor_info: any;
	//教育经历、工作经历、论文与出版物
	public educations: any;
	public works: any;
	public publications: any;
	//chartjs注入canvas数据
	public barChartOptions:any = {
    	scaleShowVerticalLines: false,
	    responsive: true
  	};
  	public barChartLabels:string[] = ['一区', '二区', '三区', '四区', '未知'];
 	public barChartType:string = 'bar';
  	public barChartLegend:boolean = true;
  	public barChartData:any[] = [
    	{data: [0, 0, 0, 0, 0], label: '论文分区'}
  	];
	public myColors = [
		{
	     	backgroundColor: [
		                    'rgba(255, 99, 132, 0.2)',
		                    'rgba(54, 162, 235, 0.2)',
		                    'rgba(255, 206, 86, 0.2)',
		                    'rgba(75, 192, 192, 0.2)',
		                    'rgba(153, 102, 255, 0.2)'
		                ],
		    borderColor: [
		                    'rgba(255,99,132,1)',
		                    'rgba(54, 162, 235, 1)',
		                    'rgba(255, 206, 86, 1)',
		                    'rgba(75, 192, 192, 1)',
		                    'rgba(153, 102, 255, 1)'
		                ],
		    borderWidth: 1
	 	},		
	];	
//依赖注入
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dataSearchService: DataSearchService,
    ) {
    }

//数据初始化
    ngOnInit() {
    	let me = this;
    	console.log('初始化');
    	this.subscription = this.route.params.subscribe((params) => {
            this.dataSearchService.find_detail(params['id']).subscribe((res) => {
            	console.log('学者详情信息查询成功：');
            	console.log(res);
	            me.professor_info = res['hits']['hits'][0]['_source'];
	            //教育经历、工作经历、论文与出版物json字符串转换成json
	            me.educations =  eval("(" + me.professor_info['education_linkedin'] + ")");
	            me.works = eval("(" + me.professor_info['experience_linkedin'] + ")");
	            me.publications = eval("(" + me.professor_info['publication'] + ")");
	            //chartjs更改canvas数据
	            me.barChartData = [{
	            	data: [
	            		me.professor_info['zone_1'],
	            		me.professor_info['zone_2'],
	            		me.professor_info['zone_3'],
	            		me.professor_info['zone_4']
            		],
            		label: '论文分区'
            	}];
	        });
        });
    }

	//离开页面时执行的函数
	ngOnDestroy() {
    	console.log('离开');
    }

}
