<template>
	<div id="operation">
		<div class="pageWrapper_top text-right ">
			<div class="container">
				<div class="row">
					<div class="col-md-6">
						<p style="line-height: 35px;">自定义模板</p>
					</div>
					<div class="col-md-6 text-right" style="padding-right: 30px;">
						<el-button plain><a href="#/Choice" style="color: #000000;">退出模板</a></el-button>
						<el-button plain  onclick="javascript:location.reload();">重做</el-button>
						<el-button type="primary" v-if="ImmediateUse" @click="ImmediateUseclick">立即使用</el-button>
						<el-button type="primary" v-if="Submit" @click="Submitclick" v-bind:disabled="disabled">提交并发布</el-button>
					</div>
				</div>
			</div>
		</div>
		<!--内容区-->
		<div id="pageWrapper_box">
			<!--<swiper :IFdata="IFdata"></swiper>-->
			<div v-for="(item,index) in data.banner" class="banner Mask_box"  v-loading="logingT"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
				<a href="javascript:void(0)"  onclick="clickGXinRong(this);" style="display: inline-block;" data-type="co" data-keyword="关键字" data-local="A">
					<img v-bind:src="item" width="100%"/>
				</a>
				<div class="mask" v-if="IFdata">
					<p style="color: #fff;">上传图片的宽为1920PX</p>
					<p>
						<span type="primary "round class="fileBox">
						上传<i class="el-icon-upload el-icon--right"></i>
						<input type="file" @change="bannerFile($refs.bannerImg[index],index,1920)" ref="bannerImg"/>
						</span>
						<el-button type="danger" round icon="el-icon-delete" @click="bannerDel(index)">删除</el-button>
					</p>
				</div>
			</div>
			<div class="row" v-if="IFdata" style="padding: 10px 0;">
				<div class="col-lg-12">
					<p  class="text-center">
						<el-button type="success" size="mini" @click="addbanner">添加一张</el-button>
					</p>
				</div>
			</div>
			<div class="b1_list">
				<div class="container">
					<div class="row">
						<div class="col-lg-12 ">
							<div class="title_Top">
								<span v-show="IFdataShow" v-on:click="edit">{{data.headtop_txt.h1}}</span>
								<input type="text" v-if="IFdata"  v-show="IFdataHide" v-model="data.headtop_txt.h1" @keyup.13="okedit(data.headtop_txt.h1)"  v-on:focusout="okedit(data.headtop_txt.h1)"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-4 col-lg-6 col-lg-12" v-for="(item,index) in data.product">
							<ul  v-loading="logingT"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
								<li class="Mask_box">
									<a href="javascript:void(0)"  onclick="clickGXinRong(this);" style="display: inline-block;" data-type="co" data-keyword="关键字" data-local="A">
										<img v-bind:src="item.img" width="100%"/>
									</a>
									<div class="mask" v-if="IFdata">
										<p style="color: #fff;">上传图片的宽为370PX</p>
										<p>
											<span type="primary "round class="fileBox">
											上传<i class="el-icon-upload el-icon--right"></i>
											<input type="file" @change="productFile($refs.productImg[index],index,370)" ref="productImg"/>
											</span>
											<el-button type="danger" round icon="el-icon-delete" @click="productDel(index)">删除</el-button>
										</p>
									</div>
								</li>
								<li>
									<p><i></i>
										<span  v-show="IFdataShow" v-on:click="edit">{{item.p}}</span>
										<input type="text" v-if="IFdata"  v-show="IFdataHide"  v-model="item.p" @keyup.13="okedit(item.p)"  v-on:focusout="okedit(item.p)" maxlength="16"/>
									<i></i></p>
								</li>
							</ul>
						</div>
					</div>
					<div class="row" v-if="IFdata">
						<div class="col-md-12 text-center">
							<el-button type="success" @click="productAdd">添加一张</el-button><br /><br />
						</div>
					</div>
				</div>
				<!---->
				<div v-for="(item,index) in data.iso" class="abt1 Mask_box"  v-loading="logingT"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
					<a href="javascript:void(0)"  onclick="clickGXinRong(this);" style="display: inline-block;" data-type="co" data-keyword="关键字" data-local="A">
						<img v-bind:src="item" width="100%"/>
					</a>
					<div class="mask" v-if="IFdata">
						<p style="color: #fff;">上传图片的宽为1920PX</p>
						<p>
							<span type="primary "round class="fileBox">
							上传<i class="el-icon-upload el-icon--right"></i>
							<input type="file" @change="isoFile($refs.isoImg[index],index,1920)" ref="isoImg"/>
							</span>
							<el-button type="danger" round icon="el-icon-delete" @click="isoDel(index)">删除</el-button>
						</p>
					</div>
				</div>
				<div class="row" v-if="IFdata" style="padding: 10px 0;">
					<div class="col-lg-12">
						<p  class="text-center">
							<el-button type="success" size="mini" @click="addabt1">添加一张</el-button>
						</p>
					</div>
				</div>
				<!---->
				<div class="b2_list">
					<div class="container">
						<div class="row">
							<div class="col-lg-12 ">
								<div class="title_Top">
									<span v-show="IFdataShow" v-on:click="edit">{{data.headtop_txt.h2}}</span>
									<input type="text" v-if="IFdata"  v-show="IFdataHide" v-model="data.headtop_txt.h2" @keyup.13="okedit(data.headtop_txt.h2)"  v-on:focusout="okedit(data.headtop_txt.h2)"/>
								</div>
							</div>
						</div>
						<div class="b2_listB" v-for="(item,index) in data.advantage">
							<div class="row">
								<div class="col-lg-6 col-lg-12" :style="calcStyle(index)">
									<div class="b2_listUL">
										<div class="b2_listUL_top">
											<h1>
												<span v-show="IFdataShow" v-on:click="edit">{{item.h1}}</span>
												<input type="text" v-if="IFdata"  v-show="IFdataHide" v-model="item.h1" 
												@keyup.13="okedit(item.h1)"  v-on:focusout="okedit(item.h1)"/>
											</h1>
											<p>
												<span v-show="IFdataShow" v-on:click="edit">{{item.p}}</span>
												<input type="text" v-if="IFdata"  v-show="IFdataHide" v-model="item.p" 
												@keyup.13="okedit(item.p)"  v-on:focusout="okedit(item.p)"/>
											</p>
										</div>
										<ul>
											<li v-for="(item2,index) in item.li">
												<span v-show="IFdataShow" v-on:click="edit">{{item2}}</span>
												<input type="text" v-if="IFdata"  v-show="IFdataHide" v-model="item.li[index]" 
												@keyup.13="okedit(item.li[index])"  v-on:focusout="okedit(item.li[index])" style="width: 400px;"/>
											</li>
										</ul>
									</div>
								</div>
								<div class="col-lg-6 col-lg-12"  v-loading="logingT"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
									<div class="Mask_box">
										<img v-bind:src="item.img" width="100%"/>
										<div class="mask" v-if="IFdata">
											<p style="color: #fff;">上传图片的宽为590PX</p>
											<p>
												<span type="primary "round class="fileBox">
												上传<i class="el-icon-upload el-icon--right"></i>
												<input type="file" @change="advantageFile($refs.advantageImg[index],index,590)" ref="advantageImg"/>
												</span>
												<el-button type="danger" round icon="el-icon-delete" @click="advantageDel(index)">删除</el-button>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--***********************************************************-->
				<div class="row" v-if="IFdata">
					<div class="col-md-12 text-center">
						<el-button type="success" @click="advantageAdd">添加一列</el-button><br /><br />
					</div>
				</div>
				<!---->
				<!--abt2-->
				<div v-for="(item,index) in data.steel" class="abt1 Mask_box"  v-loading="logingT"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
					<a href="javascript:void(0)"  onclick="clickGXinRong(this);" style="display: inline-block;" data-type="co" data-keyword="关键字" data-local="A">
						<img v-bind:src="item" width="100%"/>
					</a>
					<div class="mask" v-if="IFdata">
						<p style="color: #fff;">上传图片的宽为1920PX</p>
						<p>
							<span type="primary "round class="fileBox">
							上传<i class="el-icon-upload el-icon--right"></i>
							<input type="file" @change="steelFile($refs.steelImg[index],index,1920)" ref="steelImg"/>
							</span>
							<el-button type="danger" round icon="el-icon-delete" @click="steeloDel(index)">删除</el-button>
						</p>
					</div>
				</div>
				<div class="row" v-if="IFdata" style="padding: 10px 0;">
					<div class="col-lg-12">
						<p  class="text-center">
							<el-button type="success" size="mini" @click="addabt2">添加一张</el-button>
						</p>
					</div>
				</div>
				<!---->
				<div class="b3_list">
					<div class="container">
						<div class="row">
							<div class="col-lg-12">
								<div class="title_Top">
									<span v-show="IFdataShow" v-on:click="edit">{{data.headtop_txt.h3}}</span>
									<input type="text" v-if="IFdata"  v-show="IFdataHide" v-model="data.headtop_txt.h3" @keyup.13="okedit(data.headtop_txt.h3)"  v-on:focusout="okedit(data.headtop_txt.h3)"/>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-4 col-lg-12" v-for="(item,index) in data.successfulCases">
								<ul  v-loading="logingT"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
									<li class="Mask_box">
										<img v-bind:src="item.img" width="100%"/>
										<div class="mask" v-if="IFdata">
											<p style="color: #fff;">上传图片的宽为375PX</p>
											<p>
												<span type="primary "round class="fileBox">
												上传<i class="el-icon-upload el-icon--right"></i>
												<input type="file" @change="fulCasesFile($refs.fulCasesImg[index],index,375)" ref="fulCasesImg"/>
												</span>
												<el-button type="danger" round icon="el-icon-delete" @click="fulCasesDel(index)">删除</el-button>
											</p>
										</div>
									</li>
									<li>
										<p><i></i>
										<span v-show="IFdataShow" v-on:click="edit">{{item.p}}</span>
										<input type="text" v-if="IFdata"  v-show="IFdataHide" v-model="item.p" 
										@keyup.13="okedit(item.p)"  v-on:focusout="okedit(item.p)"/>
										<i></i></p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<!---->
				<!--***********************************************************-->
				<div class="row" v-if="IFdata">
					<div class="col-md-12 text-center">
						<el-button type="success" @click="fulCasesAdd">添加一列</el-button><br /><br />
					</div>
				</div>
				<!---->
				<div class="container">
					<div class="row">
						<div class="col-lg-12">
							<div class="title_Top">
								<span v-show="IFdataShow" v-on:click="edit">{{data.headtop_txt.h4}}</span>
								<input type="text" v-if="IFdata"  v-show="IFdataHide" v-model="data.headtop_txt.h4" @keyup.13="okedit(data.headtop_txt.h4)"  v-on:focusout="okedit(data.headtop_txt.h4)"/>
							</div>
						</div>
					</div>
				</div>
				<!---->
				<div class="foot">
					<div class="container">
						<div class="row" >
							<div class="col-lg-3" v-for="(item,index) in data.foot"  v-loading="logingT"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
								<p class="text-center Mask_box">
									<img v-bind:src="item.img" width="100%"/>
									<span class="mask" v-if="IFdata">
										<p style="color: #fff;">上传图片的宽为280PX</p>
										<p>
											<span type="primary "round class="fileBox">
											上传<i class="el-icon-upload el-icon--right"></i>
											<input type="file" @change="footFile($refs.footImg[index],index,280)" ref="footImg"/>
											</span>
											<el-button type="danger" round icon="el-icon-delete" @click="footDel(index)">删除</el-button>
										</p>
									</span>
								</p>
							</div>
						</div>
					</div>
					<div class="container">
						<div class="row">
							<div class="col-lg-12 ">
								<div class="foot_abt text-center">
									<a href="javascript:void(0)"  onclick="clickGXinRong(this);" style="display: inline-block;" data-type="co" data-keyword="关键字" data-local="A" class="btn btn-danger">
										立即咨询
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="script" v-html="this.script"></div>
			</div>
		</div>
		<!--提示框-->
		<el-dialog title="" :visible.sync="dialogFormVisible" width="35%" >
			  <div class="text-center" style="font-weight: bold;color:red ;font-size: 20px;" v-show="waning">
			  	<p>请在注意审核一下注意事项！</p>
			  	<p>如不通过将不予通过</p>
			  </div>
			  <div class="text-center" v-show="!waning">
			  	       页面名称：
			  		<input type="text" v-bind:class="{inputRed:classRed}" placeholder="请输入页面名称：" v-model.trim="description" :maxlength="20" style="width:400px;height: 45px;"/>
					<i style="display: inline-block;font-style: normal;position: relative;left: -50px;">
					 	 <span v-html="descriptionNumber"></span>/20
					</i>
					<p class="text-left" style="width: 370px;margin: auto;color: #f56c6c;margin-top: 10px;" v-if="classRed"><i class="el-icon-warning" style="padding-right: 5px;"></i>请输入页面名称</p>
			  </div>
			  <p style="position: absolute;width: 100%;border-bottom: 1px dashed #ccc;left: 0;margin: 20px 0;"></p>
			  <div class="module_txt">
			  	<p><i  class="el-icon-warning" style="padding-right: 5px;color:#f56c6c;"></i>模板制作注意事项：</p>
			  	<ul>
			  		<li>1.不能出现联系方式： 包括手机号，座机号，QQ号，邮箱，其他网址；</li>
			  		<li>2.不能出现公司名称及所在地域名称；</li>
			  		<li>3.不要出现资质图片，如要添加，图片上的公司信息需加马赛克。</li>
			  	</ul>
			  </div>
			  <div slot="footer" class="dialog-footer text-center">
			    <el-button type="primary" plain @click="Prompt" v-show='!waning'>使用该模板</el-button>
			    <el-button type="primary" plain v-show='waning' @click="dialogFormVisible=false">审核</el-button>
			  </div>
		</el-dialog>
		  <el-dialog :visible.sync="dialogVisible" width="30%">
			  <div class="text-center" v-html="Release"></div>
			  <div slot="footer" class="text-center">
			    <el-button type="primary" onclick="javascript:location.reload();" v-if="againLading">重新加载</el-button>
			    <el-button type="primary" @click="Return" v-else="againLading">确 定</el-button>
			  </div>
		</el-dialog>
	</div>
</template>

<script>
  import global_ from '@/assets/json.js'
  export default {
 	watch: {  
		description(newValue, oldValue) {  
		       this.descriptionNumber= newValue.length
		    }  
	},
    data() {
      return {
      	indexData:null,/*首页数据**/
      	pageId:null,/*详情页传的ID**/
      	description:null,/*模板名称**/
      	descriptionNumber:0,
      	data:global_.moduleImg1,
      	IFdata:true,/*删除多余代码*/
      	IFdataShow:true,
      	IFdataHide:false,
      	ImmediateUse:true,
      	Submit:false,
      	banner:'http://page-bucket.oiaqye7985.com/img/i/banner.jpg',
      	Release:'<p style="font-size: 20px;color: rgba(30,125,253);font-weight: bold;">发布成功</p><p>请在首页<a href="#/details" style="font-style: normal;color: rgba(30,125,253);">[维护]</a>中查看网址~</p>',
  	    classRed:false,
  	    waning:false,
  	    againLading:false,
  	    logingT:false,
      	script:'',
      	html:'',
      	disabled:false,
      	dialogVisible:false,
      	dialogFormVisible:true,
      };
    },
    mounted(){
//  	console.log(this.data.banner)
//  	console.log(localStorage.getItem("pageId"))
    	/***/
    	if($("body").attr("class")=="fix-header show-sidebar hide-sidebar"){
    		$(".pageWrapper_top").removeClass("pageWrapper_topR")
    	}else{$(".pageWrapper_top").addClass("pageWrapper_topR")}
    	/***/
    	this.indexData=JSON.parse(localStorage.getItem("data"))
    	this.pageId=localStorage.getItem("pageId")
    	var _this=this;
		var moduleId=2
		var modulePageId=null
		if(this.$route.params.pageId==undefined){
		}else{
			moduleId=this.$route.params.moduleDdata.id;
			modulePageId=this.$route.params.pageId;
		}
		$.ajax({
    		contentType :"application/json;charset=UTF-8",
			type:"get",
			dataType: 'json',
    		url:_this.apiUrl.apiUrl+"/page/findPageEditParams",
    		async:true,
    		data:{
    			"pageId":modulePageId,
    			"modelId":moduleId,
    		},
    		success:function(str){
//  			console.log(str.data.paramPC)
    			_this.data=str.data.paramPC
    		},
    		error:function(err){
    			console.log("err")
    		}
    	});
//		console.log(this.data)
    },
    methods: {
    	ImmediateUseclick(){
    		this.dialogFormVisible=true;
      		this.IFdata=false;
      		this.waning=true
      		this.edit=function(){}
      		var _this=this
      		$.ajax({
				type:"post",
				dataType:"json",
				url:_this.apiUrl.apiUrl+"/page/code/sybCode",
				contentType : 'application/json;charset=UTF-8',
				data:JSON.stringify({
				  "c_id":_this.indexData.c_id,
				  "network_id":_this.indexData.network_id
				}),
				success:function(res){
					_this.script=res.data.codeEntity.sybCreateCode;
//					console.log(_this.script)
					_this.ImmediateUse=false;
					_this.Submit=true;
				},
				error:function(){
//					console.log("err")
				}
			});
      		
    	},
    	Submitclick(){
    		var _this=this
    		this.html=$("#pageWrapper_box").html()
    		this.disabled=true
      		$.ajax({
      			type:"post",
				dataType:"json",
				contentType : 'application/json;charset=UTF-8',
				url:_this.apiUrl.apiUrl+"/page/createHtmlPage",
				data:JSON.stringify({
                    "channelId": _this.indexData.channel_id,/*渠道ID**/
                    "clientId": _this.indexData.c_id,/*客户customer_id  ID**/
                    "modelType":0,/*模板类型**/
                    "clientName": _this.indexData.CustomerName,/*客户名称**/
                    "htmlCode": _this.html,/*html代码**/
                   	"editParam":JSON.stringify(_this.data),
                    "modelId": 2,/*模板id**/
                    "orderId":_this.indexData.network_id,/*流量卡ID**/
                    "description":_this.description,
				    "pageId":_this.pageId,
				}),
				success:function(res){
					if(res.status==500){
						alert("着陆页数量不能大于5个")
						_this.$router.push({
				            path: 'details', 
	           				 name: 'details',
				        })
					}else{
						_this.dialogVisible=true
					}
				},
				error:function(err){
					_this.Release='<p style="font-size: 20px;color: rgba(30,125,253);font-weight: bold;">网络异常</p><p>也许他想静静~</p>'
					_this.againLading=true;
				}
      		})
    	},
    	Prompt(){
      		if(this.description==null||this.description==''){
      			this.classRed=true;
      		}else{
      			this.dialogFormVisible = false;
      			this.classRed=false;
      		}
      		
      	},
    	/**内容编辑区****/
    	open(txt,h1) {
        this.$alert(txt, h1, {
          confirmButtonText: '确定',
        });
      	},
      	bannerFile(input_file,index,maxWidth){
      		var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
		    	function(str){
		    		_this.data.banner.splice(index,1,str)
//		    		console.log(_this.data)
		    })
      },
      bannerDel(index){
      		this.data.banner.splice(index,1)
      },
      addbanner(){
      	this.data.banner.push("http://page-bucket.oiaqye7985.com/img/i/banner.jpg")
      },
      	Return(){
  		  	 this.$router.push({
	            path: 'details', 
	            name: 'details',
	        })
      	},
      	edit(){
			this.IFdataHide=true
			this.IFdataShow=false
		},
		okedit(str){
			if(str!=""){
				this.IFdataHide=false
				this.IFdataShow=true
			}else{
				var txt='请输入内容'
                var h1='错误'
				this.open(txt,h1)
			}
		},
		
		/**产品推荐*/
		productFile(input_file,index,maxWidth){
			var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
	    		function(str){
//	    		console.log(str)
	    		_this.data.product[index].img=str
	    	})
		},
		productDel(index){
			this.data.product.splice(index,1)
		},
		productAdd(){
			this.data.product.push({img:"http://page-bucket.oiaqye7985.com/img/i/b1_list1.jpg",p:"镀锌带方管"})
		},
		
		/***/
		
		isoFile(input_file,index,maxWidth){
			var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
		    	function(str){
//		    		console.log(str)
		    		_this.data.iso.splice(index,1,str)
//		    		console.log(_this.data)
		    })
		},
		isoDel(index){
			this.data.iso.splice(index,1)
		},
		addabt1(){
			this.data.iso.push("http://page-bucket.oiaqye7985.com/img/i/abt1.jpg")
		},
		/****/
		advantageFile(input_file,index,maxWidth){
			var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
		    	function(str){
		    	_this.data.advantage[index].img=str	
//		    	console.log(str)
		    })
		},
		advantageDel(index){
			this.data.advantage.splice(index,1)
		},
		advantageAdd(){
			this.data.advantage.push(
				{h1:"强大的生产实力",p:"库存充足、保证货期",li:["热镀锌带圆管、方管是主导产品，年产量达45万吨;",
				"直缝焊管、热镀锌管、螺旋焊管等产品年销量达65万吨;",	"产品广泛应用于水暖、大棚、穿线、石油、天然气等;", ],
				img:"http://page-bucket.oiaqye7985.com/img/i/b2_list1.jpg",},
			)
		},
		/****/
		steelFile(input_file,index,maxWidth){
			var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
		    	function(str){
		    		_this.data.steel.splice(index,1,str)
//		    		console.log(str)
		    })
		},
		steeloDel(index){
			this.data.steel.splice(index,1)
		},
		addabt2(){
			this.data.steel.push("http://page-bucket.oiaqye7985.com/img/i/abt2.jpg")
		},
		 /***/
		fulCasesFile(input_file,index,maxWidth){
			var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
		    	function(str){
		    	_this.data.successfulCases[index].img=str	
//		    	console.log(str)
		    })
		},
		fulCasesDel(index){
			this.data.successfulCases.splice(index,1)
		},
		fulCasesAdd(){
			this.data.successfulCases.push({img:"http://page-bucket.oiaqye7985.com/img/i/b3_list1.jpg",p:"大棚施工图"},)
		},
		footFile(input_file,index,maxWidth){
			var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
	    		function(str){
//	    		console.log(str)
	    		_this.data.foot[index].img=str
	    	})
		},
		footDel(index){
			this.data.foot.splice(index,1)
		},
		/***/
		calcStyle(index) {
	        var style = {}
	        if (index % 2 !== 0) {
	            style = {float: 'right'}
	        }
	        return style
		 },
    	/*上传图片**/
		dataImg(_this,input_file,maxWidth, get_data){
			
            if (typeof (FileReader) === 'undefined') {  
                alert("抱歉，你的浏览器版本太陈旧，请使用现代浏览器操作！");  
            } else {  
                try {
                	_this.logingT=true
		 			 var formData = new FormData();
					 var file = input_file.files[0];
					 var txt=''
                     var h1=''
		             formData.append("file",file);
                     if(parseInt(file.size/1024)>300){
                    	alert("图片不能大于300kb")
                    	_this.logingT=false
                    	return false;  
                    }
                    if (!/image\/\w+/.test(file.type)) {  
                        alert("请确保文件为图像类型");  
                        return false;  
                    }  
                    var reader = new FileReader();  
                    reader.onload = function () {
                    	var image = new Image();
                    	image.onload=function(){
                    		if(maxWidth<=(image.width+10)&&maxWidth>=(image.width-10)&&parseInt(file.size/1024)<300){
                    			/**发送Ajax请求*/
                    			$.ajax({
			                		type:"post",
			                		url:_this.apiUrl.apiUrl+"/file/saveImage",
			                		data: formData,
		                 			dataType : "json",
		                 			async: false,
		                    		contentType: false,
		                    		processData: false,
									success:function(str){
//										console.log(str)
		                    			_this.logingT=false;
		                    			get_data(str.data); 
		                    			
									},
									error:function(){
										
									}
			                	});
                    		}else{
                    			/**宽不正确*/
                    			 txt="上传图片的宽为"+maxWidth+"PX;大小不能超过300kb"; h1="失败"
                    			_this.open(txt,h1)
                    			_this.logingT=false
                    		}
                    	}
                    	image.src= this.result;
                    }  
                    reader.readAsDataURL(file);  
                } catch (e) {  
                	_this.logingT=false
                    //alert('图片转Base64出错啦！' + e.toString());
                }  
            }					
		}
		/*上传图片结束**/
    }
  }
</script>


<style scoped="scoped">
#pageWrapper_box{
	background: #fff;
}
.Mask_box{
	position: relative;
}
.Mask_box:hover .mask{
	display: flex;
}
.mask{
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.5);
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	display: none;
	
}
.mask p{
	color: #fff;
	font-size: 24px;
}
.b1_list ul p input {
    width: 100px;
}
ul{
	list-style: none;
	padding: 0;
	margin: 0;
}
.title_Top input {
width: 200px;
text-align: center;
}
.pageWrapper_box input {
    border: 1px solid #ccc;
}
.title_Top {
  text-align: center;
  background: url(http://page-bucket.oiaqye7985.com/img/i/title_top.jpg) no-repeat;
  width: 784px;
  height: 35px;
  font-weight: 500;
  text-align: center;
  font-size: 32px;
  color: #303030;
  line-height: 35px;
  margin: 80px auto 50px; }

.b1_list ul {
  text-align: center; }
  .b1_list ul p {
    padding: 15px 0;
    font-size: 20px;
    color: #555555; }
    .b1_list ul p i {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #1994ff;
      border-radius: 50%; }
    .b1_list ul p span {
      margin: 0 20px; }

.b2_list .b2_listUL {
  padding: 0 50px;
  margin-left: 20px; }
  .b2_list .b2_listUL .b2_listUL_top {
   width: 400px;
    height: 125px;
    background: url(http://page-bucket.oiaqye7985.com/img/i/bb2_bg.jpg) no-repeat;
    background-position: 50% 0;
    text-align: left;
    margin-bottom: 40px;
    padding-top: 10px;
    text-align: center;
    
    }
    .b2_list .b2_listUL .b2_listUL_top h1 {
     font-size: 28px;
    color: #303030; }
    .b2_list .b2_listUL .b2_listUL_top p {
      font-size: 14px;
      color: #ff0006;
     }
  .b2_list .b2_listUL ul {
  	text-align: left;
    font-size: 16px;
    color: #555555; }
    .b2_list .b2_listUL ul li {
      margin-bottom: 20px;
      list-style-image: url(http://page-bucket.oiaqye7985.com/img/i/xing.jpg);
       }
.b2_list .b2_listB {
  margin-bottom: 30px; }

.b3_list ul {
  text-align: center; }
  .b3_list ul p {
    padding: 15px 0;
    font-size: 20px;
    color: #555555; }
    .b3_list ul p i {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #1994ff;
      border-radius: 50%; }
    .b3_list ul p span {
      margin: 0 20px; }

.foot {
  background: #2799f6;
  padding: 40px 0 50px; }
  .foot p {
    padding: 0 20px; }
  .foot .foot_abt {
    margin-top: 30px; }
    .foot .foot_abt > button {
      background: #fff;
      color: #2799f6;
      border-color: #fff; }

@media (max-width: 800px) {
  .head {
    background: #f1f2f4;
    padding: 20px 0;
    text-align: center; }
    .head ul {
      font-size: 20px;
      color: #303030;
      padding-left: 0px; }

  .b2_list .b2_listUL .b2_listUL_top {
    width: 100%;
    text-align: right; }
    .b2_list .b2_listUL .b2_listUL_top h1 {
      font-size: 16px;
      padding: 30px 0 0 0px; }
    .b2_list .b2_listUL .b2_listUL_top p {
      font-size: 14px;
      padding: 0; }

  .title_Top {
    text-align: center;
    background: url(http://page-bucket.oiaqye7985.com/img/i/title_top.jpg) no-repeat;
    background-position: 50% 50%;
    width: 100%;
    height: 35px;
    text-align: center;
    font-size: 32px;
    color: #303030;
    line-height: 35px;
    margin: 80px auto 50px; } }	

</style>