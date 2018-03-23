
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
			<div class="module_3">
				<div class="head_box clearfix">
					<div class="head_left floatLeft Mask_box">
						<img v-bind:src="data.head"/>
						<div class="Mask"  v-if="allDelete">
							<p>上传图片的宽为500PX</p>
							<p>
								<span type="primary "round class="fileBox">
								上传<i class="el-icon-upload el-icon--right"></i>
								<input type="file" v-on:change="head($refs.module3Head,500)" ref="module3Head" />
							</span>
							</p>
						</div>
					</div>
					<div class="head_right floatRight">
						<h1>
							<span v-show="IFdataShow" v-on:click="edit">{{data.h1}}</span>
							<input type="text" style="width: 450px;"  v-if="allDelete"  v-show="IFdataHide"  v-model="data.h1" @keyup.13="okedit(data.h1)"  v-on:focusout="okedit(data.h1)"/>
						</h1>
						<p class="money" v-for="(item,index) in data.moneyall">
							<mark>促销价：</mark>￥
							<span v-show="IFdataShow" v-on:click="edit">{{item.min}}</span>
							<input type="text" style="width: 150px;"  v-if="allDelete"  v-show="IFdataHide"  v-model="item.min" @keyup.13="okedit(item.min)"  v-on:focusout="okedit(item.min)"/>
							- 
							<span v-show="IFdataShow" v-on:click="edit">{{item.max}}</span>
							<input type="text" style="width: 150px;"  v-if="allDelete"  v-show="IFdataHide"  v-model="item.max" @keyup.13="okedit(item.max)"  v-on:focusout="okedit(item.max)"/>
						</p>
						<p class="spec">规格：</p>
						<div class="dht clearfix">
							<ul class="dht_left floatLeft">
								<li v-for="(item,index) in data.txtName">
									<span v-show="IFdataShow" v-on:click="edit">{{item.name}}</span>
									<input type="text" style="width: 100px;" 	v-if="allDelete"  v-show="IFdataHide"  v-model="item.name" @keyup.13="okedit(item.name)"  v-on:focusout="okedit(item.name)"/>
								</li>
							</ul>
							<ul class="floatRight">
								<li v-for="(item,index) in data.money"> 
									<span v-show="IFdataShow" v-on:click="edit">{{item.mon}}</span>
									<input type="text" style="width: 100px;" 	v-if="allDelete"  v-show="IFdataHide"  v-model="item.mon" @keyup.13="okedit(item.mon)"  v-on:focusout="okedit(item.mon)"/>
								</li>
							</ul>
							<p class="text-center" v-if="allDelete" >
								<el-button type="success" size="mini" @click="addtxt">添加一行</el-button>
								<el-button type="danger" size="mini" @click="deltxt">删除一行</el-button>
							</p>
						</div>
						<div class="abt">
							<a href="javascript:void(0)"  onclick="clickGXinRong(this);" style="display: inline-block;" data-type="co" data-keyword="关键字" data-local="A">
								最新报价
							</a>
							<a href="javascript:void(0)"  onclick="clickGXinRong(this);" style="display: inline-block;" data-type="co" data-keyword="关键字" data-local="A">
								立即抢购
							</a>
						</div>
					</div>
				</div>
				<div class="introduce">
					<span>产品介绍</span>
				</div>
				<div class="contentBox">
					<div v-for="(item,index) in data.parameter">
						<h2>
							<i></i>
							<span v-show="IFdataShow" v-on:click="edit">{{item.h1}}</span>
							<input type="text" v-if="allDelete"  v-show="IFdataHide"  v-model="item.h1" @keyup.13="okedit(item.h1)"  v-on:focusout="okedit(item.h1)"/>
							<i></i>
						</h2>
						<div class="img_min Mask_box">
							<img v-bind:src="item.img" width="100%"/>
							<div class="Mask"  v-if="allDelete">
								<p>上传图片的宽为1080PX</p>
								<p>
									<span type="primary "round class="fileBox">
									上传<i class="el-icon-upload el-icon--right"></i>
									<input type="file" v-on:change="parameter($refs.module3parameter[index],index,1080)" ref="module3parameter" />
								</span>
								 <el-button type="danger" round icon="el-icon-delete" @click="delparameter(index)">删除</el-button>
								</p>
							</div>
						</div>
					</div>
					<p class="text-center" v-if="allDelete">
						<br />
						<el-button type="success" size="mini" @click="addparameter">添加一行产品参数</el-button>
					</p>
				</div>
				<div class="img_max Mask_box" v-for="(item,index) in data.abt1">
					<a href="javascript:void(0)"  onclick="clickGXinRong(this);" style="display: inline-block;" data-type="co" data-keyword="关键字" data-local="A"><img v-bind:src="item" width="100%"/></a>
					<div class="Mask"  v-if="allDelete">
						<p>上传图片的宽为1920PX</p>
						<p>
							<span type="primary "round class="fileBox">
							上传<i class="el-icon-upload el-icon--right"></i>
							<input type="file" v-on:change="abt1($refs.module3abt1[index],index,1920)" ref="module3abt1" />
						</span>
						 <el-button type="danger" round icon="el-icon-delete" @click="delabt1(index)">删除</el-button>
						</p>
					</div>
				</div>
				<p class="text-center" v-if="allDelete">
						<br />
						<el-button type="success" size="mini" @click="addabt1">添加一行横屏banner</el-button>
				</p>
				<div class="contentBox">
					<div v-for="(item,index) in data.beat">
						<h2>
							<i></i>
							<span v-show="IFdataShow" v-on:click="edit">{{item.h1}}</span>
							<input type="text" v-if="allDelete"  v-show="IFdataHide"  v-model="item.h1" @keyup.13="okedit(item.h1)"  v-on:focusout="okedit(item.h1)"/>
							<i></i>
						</h2>
						<div class="img_min Mask_box">
							<img v-bind:src="item.img" width="100%"/>
							<div class="Mask"  v-if="allDelete">
								<p>上传图片的宽为1080PX</p>
								<p>
									<span type="primary "round class="fileBox">
									上传<i class="el-icon-upload el-icon--right"></i>
									<input type="file" v-on:change="beat($refs.module3beat[index],index,1080)" ref="module3beat" />
								</span>
								 <el-button type="danger" round icon="el-icon-delete" @click="delbeat(index)">删除</el-button>
								</p>
							</div>
						</div>
					</div>
					<p class="text-center" v-if="allDelete">
						<br/>
						<el-button type="success" size="mini" @click="addbeat">添加一行产品照片</el-button>
					</p>
				</div>
				<div class="img_max Mask_box" v-for="(item,index) in data.abt2">
					<a href="javascript:void(0)"  onclick="clickGXinRong(this);" style="display: inline-block;" data-type="co" data-keyword="关键字" data-local="A"><img v-bind:src="item" width="100%"/></a>
					<div class="Mask"  v-if="allDelete">
						<p>上传图片的宽为1920PX</p>
						<p>
							<span type="primary "round class="fileBox">
							上传<i class="el-icon-upload el-icon--right"></i>
							<input type="file" v-on:change="abt2($refs.module3abt2[index],index,1920)" ref="module3abt2" />
						</span>
						 <el-button type="danger" round icon="el-icon-delete" @click="delabt2(index)">删除</el-button>
						</p>
					</div>
				</div>
				<p class="text-center" v-if="allDelete">
					<br />
					<el-button type="success" size="mini" @click="addabt2">添加一行横屏banner</el-button>
				</p>
				<!--*******************************-->
				<div id="script" v-html="script"></div>
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
      	data:global_.module3Img,
      	allDelete:true,/*删除多余代码*/
      	IFdataShow:true,
      	IFdataHide:false,
      	ImmediateUse:true,
      	Submit:false,
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
    	/***/
    	if($("body").attr("class")=="fix-header show-sidebar hide-sidebar"){
    		$(".pageWrapper_top").removeClass("pageWrapper_topR")
    	}else{$(".pageWrapper_top").addClass("pageWrapper_topR")}
    	/***/
    	var _this=this
    	this.indexData=JSON.parse(localStorage.getItem("data"))
    	this.pageId=localStorage.getItem("pageId")
//		console.log(this.$route.params.pageId)
		var moduleId=3
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
    			console.log(err)
    		}
    	});
		
    },
    methods: {
    	ImmediateUseclick(){
    		this.dialogFormVisible=true;
      		this.allDelete=false;
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
				}
			});
      		
    	},
    	Submitclick(){
    		var _this=this
    		this.html=$("#pageWrapper_box").html()
//  		console.log(this.html);
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
                    "modelId": 3,/*模板id**/
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
    	
    	open(txt,h1) {
        this.$alert(txt, h1, {
          confirmButtonText: '确定',
        });
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
		/**内容编辑区****/
		head(input_file,maxWidth){
			var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
	    		function(str){
	    			_this.data.head=str
	    	})
		},
		abt1(input_file,index,maxWidth){
			var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
	    		function(str){
	    			_this.data.abt1.splice(index,1,str)
	    	})
		},
		delabt1(index){
			this.data.abt1.splice(index,1)
		},
		addabt1(){
			this.data.abt1.push("http://page-bucket.oss-cn-beijing.aliyuncs.com/land-page/images/img5.jpg")
		},
		parameter(input_file,index,maxWidth){
			var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
	    		function(str){
	    			_this.data.parameter[index].img=str
	    	})
		},
		delparameter(index){
			this.data.parameter.splice(index,1)
		},
		beat(input_file,index,maxWidth){
			var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
	    		function(str){
	    			_this.data.beat[index].img=str
	    	})
		},
		delbeat(index){
			this.data.beat.splice(index,1)
		},
		abt2(input_file,index,maxWidth){
			var _this=this;
    		this.dataImg(_this,input_file,maxWidth,
	    		function(str){
	    			_this.data.abt2.splice(index,1,str)
	    	})
		},
		delabt2(index){
			this.data.abt2.splice(index,1)
		},
		addabt2(){
			this.data.abt2.push("http://page-bucket.oss-cn-beijing.aliyuncs.com/land-page/images/img5.jpg")
		},
		addtxt(){
			this.data.txtName.push({name:"螺杆式空压机 DHF-10A"})
			this.data.money.push({mon:"7560.00元"})
		},
		deltxt(){
			this.data.txtName.pop()
			this.data.money.pop()
		},
		addparameter(){
			this.data.parameter.push({img:"http://page-bucket.oss-cn-beijing.aliyuncs.com/land-page/images/img2.jpg",h1:"产品特点"})
		},
		addbeat(){
			this.data.beat.push({img:"http://page-bucket.oss-cn-beijing.aliyuncs.com/land-page/images/img6.jpg",h1:"客户实拍展示"})
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
										console.log("err")
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
.addMask{
	padding: 15px;
	background: rgba(0,0,0,0.5);
	text-align: center;
}
.Mask_box{
	position: relative;
}
.Mask_box:hover .Mask{
	display: flex;
}
.Mask{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background:  rgba(0,0,0,0.5);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	display: none;
}
.Mask>p{
	display: block;
	width: 100%;
	text-align: center;
	color: #fff;
	font-size: 24px;
}
.operation_head:hover .Mask{
	display: flex;
}
.clearfix:after {
  content: "\0020";
  display: block;
  height: 0;
  clear: both; }

.clearfix {
  zoom: 1; }

.floatLeft {
  float: left; }

.floatRight {
  float: right; }

.head_box {
  width: 1080px;
  margin: auto; }
ul,li,ol{
	list-style: none;
	margin: 0;
	padding: 0;
}
.module_3 {
		box-sizing: border-box;
		background: #fff;
}
.module_3{
	background: #fff;
	padding: 30px 0;
}
mark{background: none;}
.head_right {
  width: 556px;
  /*padding-top: 20px;*/ }
  .head_right h1 {
    font-size: 18px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #eee; }
  .head_right .money {
    padding: 15px 0;
    border-bottom: 1px dashed #eee;
    font-size: 26px;
    color: #f37732;
    font-weight: bold;
    display: flex;
    align-items: center; }
    .head_right .money mark {
      font-size: 14px;
      font-weight: normal; }
  .head_right .spec {
    padding-top: 20px;
    padding-left: 10px; }
  .head_right .dht {
    width: 320px;
    padding-left: 45px;
    padding-bottom: 20px;
    padding-top: 10px; }
    .head_right .dht ul li {
      margin-bottom: 12px; }
  .head_right .abt {
    padding-top: 30px;
    border-top: 1px dashed #eee;
    text-align: center; }
    .head_right .abt a {
      width: 200px;
      height: 45px;
      background: none;
      border: none;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      line-height: 45px;
      text-align: center; }
    .head_right .abt a:nth-child(1) {
      background: #f18938; }
    .head_right .abt a:nth-child(2) {
      background: #99c53f; }

.introduce {
  width: 1080px;
  margin: 20px auto;
  border-bottom: 1px solid #eee; }
  .introduce span {
    display: inline-block;
    padding: 10px 30px;
    border-bottom: 2px solid #99C53F; }

.contentBox {
  width: 1080px;
  margin: auto; }
  .contentBox h2 {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 70px 0 30px; }
    .contentBox h2 i {
      display: inline-block;
      width: 50px;
      height: 1px;
      background: #000; }
    .contentBox h2 span {
      display: inline-block;
      margin: 0 20px;
      font-size: 20px; }

.img_max {
  margin-top: 30px; }
</style>
