<template>
  <div class="container"  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
  		<div class="row">
					<div class="col-md-12">
						<p class="index_title"><span class="index_span"></span><span class="companyName"></span>{{this.UserName}}</p>
					</div>
			</div>
			<!--输入框-->
			<div class="input">
				<div class="row">
					<div class="col-lg-4 col-lg-12">
						<div class="form-horizontal">
						    <div class="form-group">
							    <label for="name" class="col-sm-4 control-label  CustomerName">客户名称：</label>
							    <div class="col-sm-8">
							    	<el-input placeholder="客户名称 " v-model.trim='CustomerName'></el-input>
							    </div>
							 </div>
						</div>
					</div>
					<div class="col-lg-4 col-lg-12">
						<div class="form-horizontal">
						    <div class="form-group">
							    <label for="tel" class="col-sm-4 control-label">联系电话：</label>
							    <div class="col-sm-8">
							     <el-input placeholder="电话" v-model.trim='contactTel'></el-input>
							    </div>
							 </div>
						</div>
					</div>
					<div class="col-lg-4 col-lg-12">
						<div class="form-horizontal">
						    <div class="form-group">
							    <label for="inputPassword3" class="col-sm-4 control-label">状态：</label>
							    <div class="col-sm-8">
							    	  <el-select v-model="state" placeholder="请选择" style="display: block;">
										    <el-option
										      v-for="item in styleRadioArr"
										      :key="item.value"
										      :label="item.label"
										      :value="item.value">
										    </el-option>
										  </el-select>
							    </div>
							 </div>
						</div>
					</div>
					<div class="col-lg-4 col-lg-12">
						<div class="form-horizontal">
						    <div class="form-group">
							    <label for="time" class="col-sm-4 control-label">下单时间：</label>
							    <div class="col-sm-8" id="timebox">
							      <div class="block">
									    <el-date-picker
									      v-model="selectionTime"
									      type="date"
									      value-format="yyyy-MM-dd"
									      placeholder="选择日期" style="display: block;width: 100%;"  @change="getSTime" format="yyyy-MM-dd" >
									    </el-date-picker>
									  </div>
							    </div>
							 </div>
						</div>
					</div>
					<div class="col-lg-4">
						 <el-button type="primary" v-on:click="query">查询</el-button>
					</div>
				</div>
			</div>
			<!--表格-->
			<div class="table-responsive">
			  <table class="table  table-bordered ">
			  		<thead>
			  			<tr>
			  				<!--<th  class="text-center">序号</th>-->
			  				<th class="text-center">渠道类型</th>
			  				<th class="text-center">类型</th>
			  				<th class="text-center">客户名称</th>
			  				<th class="text-center">状态</th>
			  				<th class="text-center">联系电话</th>
			  				<th class="text-center">下单时间</th>
			  				<th class="text-center">操作</th>
			  			</tr>
			  		</thead>
			  		<tbody>
			  			<tr v-for="(tbodyData,index) in tbodyData2">
			  				<!--<th class="text-center">{{index}}</th>-->
			  				<th class="text-center">{{tbodyData.channelType}}</th>
			  				<th class="text-center">{{tbodyData.Type}}</th>
			  				<th class="text-center">{{tbodyData.CustomerName}}</th>
			  				<th class="text-center">
			  					<!--{{tbodyData.state}}-->
			  					<span v-if="tbodyData.state==1">审核通过待制作</span>
			  					<span v-if="tbodyData.state==3">作完成待检查</span>
			  					<span v-if="tbodyData.state==4">检查不合格</span>
			  					<span v-if="tbodyData.state==6">上线完成</span>
			  				</th>
			  				<th class="text-center">{{tbodyData.contactTel}}</th>
			  				<th class="text-center">{{tbodyData.selectionTime}}</th>
			  				<th class="text-center" id="primary">
			  					<span v-if="tbodyData.pageVisitUrl!=null">
			  						<el-button type="primary"  plain @click="sendParams(index)" size="mini" >再制作 </el-button>
			  					</span>
			  					<span v-else="tbodyData.pageVisitUrl!=null">
			  						<el-button type="primary" plain @click="sendParams(index)" size="mini" >着陆页在制作 </el-button>
			  					</span>
			  					<span v-if="tbodyData.pageVisitUrl!=null">
			  						<el-button type="primary" plain size="mini" @click="onlineService(index)">在线客服  </el-button>
			  						<el-button type="primary" plain size="mini" @click="details(index)">维护 </el-button>
			  					</span>
			  				</th>
			  			</tr>
			  		</tbody>
			  </table>
			  <div class="fenye clearfix">
			  	<el-pagination
			  		@current-change="pagination"
			  		background
					  layout="prev, pager, next"
					  :page-size="PageCount"
					  :total="total_page">
					</el-pagination>
			  </div>
			</div>
			<el-dialog title="在线客服修改" :visible.sync="dialogFormVisible"class="text-center">
			  <el-form>
			  	<p class="title_h2">在线客服设置</p><br />
					    <el-row class="text-left">
					    		<el-col :span='4'>列表是否显示：</el-col>
									<el-col :span="20">
										<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
								    	<el-checkbox label="1">在线咨询</el-checkbox>
									    <el-checkbox label="2">企业QQ</el-checkbox>
									    <el-checkbox label="4">在线留言</el-checkbox>
									    <el-checkbox label="5">回拨电话</el-checkbox>
								    </el-checkbox-group>
									</el-col>
					    </el-row><br />
					    <el-row class="text-left">
					    		<el-col :span='4'>样式编号：</el-col>
					    		<el-col :span='20'>
					    			<el-radio v-model="styleRadio" label="1">样式1</el-radio>
  									<el-radio v-model="styleRadio" label="2">样式2</el-radio>
					    		</el-col>
					    </el-row><br />
					     <el-row class="text-left">
					    		<el-col :span='12'>
					    				 产品类型&nbsp;&nbsp;&nbsp;：
					    				 <el-select v-model="productType" placeholder="请选择">
											    <el-option
											      v-for="item in productTypeArr"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
										 	 </el-select>
					    		</el-col>
					    		<el-col :span='12'>
					    				 位置：
					    				 <el-select v-model="Position" placeholder="请选择">
											    <el-option
											      v-for="item in PositionArr"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
										 	 </el-select>
					    		</el-col>
					    </el-row><br />
					    <el-row>
					    	<el-col :span='24' class="text-left">
				    				 显示中间页：
				    				 <el-select v-model="sybExtend" placeholder="请选择">
										    <el-option
										      v-for="item in sybExtendArr"
										      :key="item.value"
										      :label="item.label"
										      :value="item.value">
										    </el-option>
									 	 </el-select>
					    		</el-col>
					    </el-row><br />
					    <p class="title_h2">请选择投放网站</p>
					    <el-row>
					    	<el-col :span="24">
					    		   <el-checkbox-group  v-model="checkedCities1">
									    <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.source}}</el-checkbox>
									  </el-checkbox-group>
					    	</el-col>
					    </el-row>
			  </el-form>
			  <div slot="footer" class="dialog-footer text-center">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="Determine">确 定</el-button>
			  </div>
			</el-dialog>
</div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
    	conceal:false,
    	checkedCities:[],
    	checkedCities1: ["1"],
    	PageCount:10,
    	total_page:0,
    	loading:true,
      cities:[
      	{id:"1",source:360}
      ],
    	arr2T:[1,0,0,0,0,0,1,1],
    	dialogFormVisible:false,
    	formLabelWidth: '120px',
    	/**时间选择框*/
    		pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        /***/
       Position:'left',
       PositionArr:[
       	{ value: 'right',label: '右边'},
       	{ value: 'left',label: '左边'}
       
       ],
       /***/
      	sybExtend:"0",
      	sybExtendArr:[
      	{ value: '0',label: '是'},
       	{ value: '1',label: '否'}
      	],
        /*产品类型下拉框**/
        productType:'3',
        productTypeArr:[
        	{ value: '3',label: '流量卡着落页'}
        ],
    	/*状态拉框**/
				styleRadioArr: [
					{ value: null,label: '==请选择=='},
	        { value: '1',label: '审核通过待制作'},
	        { value: '3',label: '制作完成待检查'},
	        { value: '4',label: '检查不合格'},
	        { value: '6',label: '上线完成'},
				],
				styleRadio:'2',
			/*表格数据**/
			  tbodyData2:[],
				tbodyData:[
					{
						channelType:"",
						Type:"",
						CustomerName:"",
						contactTel:"",
						selectionTime:"",
						state:"",/*状态*/
						c_id:"",
						network_id:"",
						channel_id:"",
						pageVisitUrl:""
					},
				],
				/*查询输入框**/
        selectionTime: null,/*时间**/
      	CustomerName:null,/*用户名称*/
      	state:null,/*状态*/
      	contactTel:null,/*电话*/
      	UserName:null,
      	channel_id:null,
      	pages:1,
      	indexService:null,
      	sybId:null,
      	allquery:null,
    }
  },
  mounted(){
  			$("#show").hide()
  			localStorage.clear()
//			console.log(localStorage.getItem("data"))
//			console.log(localStorage.getItem("username"))
//			console.log(localStorage.getItem("pageId"))
// 				console.log(this.$route.params.allquery)
 				if(this.$route.params.allquery==undefined){
// 					console.log(0)
 				}else{
 					this.CustomerName=this.$route.params.allquery.CustomerName
			  	this.contactTel=this.$route.params.allquery.contactTel
			  	this.state=this.$route.params.allquery.state
			  	this.selectionTime=this.$route.params.allquery.selectionTime
 				}

  	  	this.$xhr.get("/login/channelInfo").then((res)=>{
				this.UserName=res.data.sub_company;
				this.channel_id=res.data.channel_id;
				this.ajaxData(this.pages,this.CustomerName,this.contactTel,this.state,this.selectionTime,this.channel_id,this)   
			})
  	  
			/*获取投放域名**/
			this.$xhr.get("/page/findDomainNames").then((res)=>{
				for(var i in res.data){
					this.cities[i]={
						id:res.data[i].id,
						source:res.data[i].source
					}
				}
			})
  },
  methods:{
  	/*提交在线客服**/
  	Determine(){
  		/*在线客服列表console.log(this.arr2T)**/
  		var _this=this
  		var syb_extend=_this.arr2T.join(",");
			$.ajax({
					type:"post",
					contentType : "application/json;charset=UTF-8",
					url:_this.apiUrl.apiUrl+"/page/code/sybCodeUpdate",
					async:true,
					data:JSON.stringify({
					  "c_id": _this.tbodyData2[_this.indexService].c_id,
					  "network_id": _this.tbodyData2[_this.indexService].network_id,
					  "domainIds":_this.checkedCities1 ,
					  "syb_extend":_this.sybExtend,
					  "syb_ifShow":syb_extend,
					  "syb_position":_this.Position,
					  "syb_productType": _this.productType,
					  "syb_styleNum": _this.styleRadio,
					  "syb_id":this.sybId
					}),
					success:function(str){
						_this.dialogFormVisible = false
					}
			})
  	},
  	/*生意帮代码回显**/
  	onlineService(index){
  		this.indexService=index
//		console.log(this.tbodyData2[index].c_id)
  		var _this=this
			$.ajax({
				url:_this.apiUrl.apiUrl+"/page/code/sybCode",
					contentType : 'application/json;charset=UTF-8',
	    		type:"post",
					async:true,
					data:JSON.stringify({
					  "c_id": _this.tbodyData2[index].c_id,
					  "network_id":_this.tbodyData2[index].network_id,
					}),
					success:function(res){
//						console.log(res)
						_this.sybId=res.data.codeEntity.id
						_this.Position=res.data.codeEntity.sybPosition;
						_this.productType=res.data.codeEntity.sybProducttype;
						_this.styleRadio=res.data.codeEntity.sybStylenum
						_this.checkedCities1=JSON.parse(res.data.domainIds)
						_this.checkedCities=[]
						var arr=res.data.codeEntity.sybIfshow;
						arr=arr.split(",")
						_this.arr2T=arr
						for(var i in arr){
							if(arr[i]=="1"){
								_this.checkedCities.push(i)
							}
						}
//						console.log(_this.checkedCities)
					}
				
			})
  		this.dialogFormVisible = true
  	},
  	/*在线客服列表选项**/
  	handleCheckedCitiesChange(){
  		this.arr2T=[1,0,0,0,0,0,1,1]
  		var checkA=this.checkedCities;
  		for (var i in checkA) {
	  			if(checkA[i]=='1'){/*咨询**/
	  				this.arr2T[1]='1'
	  			}else if(checkA[i]=='2'){/*qq**/
						this.arr2T[2]='1'
					}else if(checkA[i]=='4'){/*留言**/
						this.arr2T[4]='1'
					}else if(checkA[i]=='5'){/*电话**/
						this.arr2T[5]='1'
					}
				
  		}
    },
  	/**查询*/
  	query(){
  		this.allquery={
  			CustomerName:this.CustomerName,
  			contactTel:this.contactTel,
  			state:this.state,
  			selectionTime:this.selectionTime,
  		}
			this.ajaxData(1,this.CustomerName,this.contactTel,this.state,this.selectionTime,this.channel_id,this)
  	},
  	/*制作着陆页按钮*/
  	sendParams(index){
  	localStorage.clear("pageId")
		localStorage.setItem("data",JSON.stringify(this.tbodyData2[index]))
		localStorage.setItem("username",this.UserName)
  	 this.$router.push({
            path: 'Choice', 
            name: 'Choice',
            params:{
            	UserName:this.UserName
            }
        })
  	},
  	/*制作详情页按钮*/
  	details(index){
			localStorage.clear("pageId")
			
			localStorage.setItem("data",JSON.stringify(this.tbodyData2[index]))
			localStorage.setItem("username",this.UserName)
	  		this.allquery={
	  			CustomerName:this.CustomerName,
	  			contactTel:this.contactTel,
	  			state:this.state,
	  			selectionTime:this.selectionTime,
	  		}
		  	 this.$router.push({
            path: 'details', 
            name: 'details',
            params:{
            	UserName:this.UserName,
            	allquery:this.allquery,
            }
        })
  	},
  	getSTime(val) {
         this.selectionTime=val;
    },
  	/*分页**/
  	pagination(currentPage){
  		var pages=currentPage
  		this.ajaxData(pages,this.CustomerName,this.contactTel,this.state,this.selectionTime,this.channel_id,this)
  	},
  	/**请求数据**/
  	ajaxData(pages,customer,phone,status,order_time,channel_id,_this){
  		_this.tbodyData=[]
  		this.loading=false
  		$.ajax({
  			url:_this.apiUrl.apiUrl+"/page/findHomePageData",
					contentType : 'application/json;charset=UTF-8',
    			type:"post",
			    dataType: 'json',
  				data:JSON.stringify({
						  "channel_id": channel_id,
						  "customer": customer,
						  "order_time": order_time,
						  "page": pages,
						  "phone": phone,
						  "status": status
					}),
					success:function(res){
//						console.log(res)
						if(res.data!=null){
							var count=res.data.count
							_this.total_page=count
						}else{
//							alert("网络异常")
							return
						}
					  _this.total_page=count
						var str=res.data.list;
						for(var i in str){
							_this.tbodyData.push({
								channelType:str[i].channel_name,
								Type:"流量卡",
								CustomerName:str[i].customer_name,
								contactTel:str[i].phone,
								selectionTime:str[i].order_time,
								state:str[i].status,/*状态*/
								c_id:str[i].customer_id,
								network_id:str[i].id,
								pageVisitUrl:str[i].pageVisitUrl,
								channel_id:str[i].channel_id
							})
						}
						_this.tbodyData2=_this.tbodyData
						_this.loading=false;
					}
  			
  		})
  		
  	},
  }
}
</script>
