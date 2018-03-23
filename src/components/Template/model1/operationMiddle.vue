<template>
	<div id="operation">
		<div class="pageWrapper_top text-right ">
			<div class="container">
				<div class="row">
					<div class="col-md-6">
						<p style="line-height: 35px;">通用模板</p>
					</div>
					<div class="col-md-6 text-right" style="padding-right: 30px;">
						<el-button plain><a href="#/Choice" style="color: #000000;">退出模板</a></el-button>
						<el-button plain  onclick="javascript:location.reload();">重做</el-button>
						<el-button type="primary" v-if="ImmediateUse" @click="ImmediateUseclick">立即使用</el-button>
						<el-button type="primary" v-if="Submit"  v-bind:disabled="disabled"  @click="Submitclick">提交并发布</el-button>
					</div>
				</div>
			</div>
			<div class="Pc_middle">
				<div class="container">
					<div class="row">
						<div class="col-md-24 text-center">
							<a href="#/operation1" class="pc_abt ">PC端制作</a>
							<a href="javascript:void(0)" class="pc_abt pc_activ">移动端制作</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pageWrapperP_box">
			<div id="operation_box" v-model="html">
				<ul style="width: 768px; margin: auto;">
					<li class="Mask_box" v-for="(maskBox,index) in data.img" v-loading="loading"  element-loading-text="拼命加载中"
			    element-loading-spinner="el-icon-loading"
			    element-loading-background="rgba(0, 0, 0, 0.8)">
						<img v-bind:src="maskBox" width="100%"/>
						<div class="Mask"  v-if="allDelete">
							<p>上传图片的宽为750PX</p>
							<p>
								<span type="primary "round class="fileBox">
								上传<i class="el-icon-upload el-icon--right"></i>
								<input type="file" v-on:change="maskFile($refs.module2mask[index],index,750)" ref="module2mask" />
								</span>
								<el-button type="danger" round icon="el-icon-delete" @click="delMask(index)">删除</el-button>
							</p>
						</div>
					</li>
					<li class="addMask"  v-if="allDelete">
						<el-button type="success" @click="addMask">添加一张</el-button>
					</li>
				</ul>
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
		
		<el-dialog :visible.sync="dialogVisible"  width="30%">
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
    data() {
      return {
      	  indexData:null,/*首页数据**/
      	  pageId:null,/*详情页传的ID**/
      	  description:null,/*模板名称**/
      	  descriptionNumber:0,
      	  Boxloading:false,
      	  loading:false,
      	  ImmediateUse:true,
      	  Submit:false,
      	  allDelete:true,
      	  dialogVisible:false,
      	  script:'',
      	  data:global_.module2minImg,
      	  dialogFormVisible:true,
      	  hintText:false,
      	  Release:'<p style="font-size: 20px;color: rgba(30,125,253);font-weight: bold;">发布成功</p><p>请在首页<a href="#/details" style="font-style: normal;color: rgba(30,125,253);">[维护]</a>中查看网址~</p>',
      	  classRed:false,
      	  waning:false,
      	  againLading:false,
      	  disabled:false,
      	  html:$("#operation_box").html(),
      };
    },
     watch: {  
		description(newValue, oldValue) {  
		       this.descriptionNumber= newValue.length
		    }  
	},
    mounted(){
    	/***/
    	if($("body").attr("class")=="fix-header show-sidebar hide-sidebar"){
    		$(".pageWrapper_top").removeClass("pageWrapper_topR")
    	}else{$(".pageWrapper_top").addClass("pageWrapper_topR")}
    	/***/
    	this.indexData=JSON.parse(localStorage.getItem("data"))
    	this.pageId=localStorage.getItem("pageId")
//  	console.log(this.indexData)
    	var _this=this;
		var moduleId=1
		var modulePageId=null
		if(this.$route.params.pageId==undefined){
//			console.log("新增")
		}else{
			moduleId=this.$route.params.moduleDdata.id;
			modulePageId=this.$route.params.pageId;
//			console.log(modulePageId)
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
//  			console.log(str.data.paramMob)
    			_this.data=str.data.paramMob
    		},
    		error:function(err){
    			console.log("err")
    		}
    	});
    },
    methods: {
    	open(txt,h1) {
	        this.$alert(txt, h1, {
	          confirmButtonText: '确定',
	        });
      	},
      	Return(){
//    		localStorage.clear()
  		  	 this.$router.push({
	            path: 'details', 
	            name: 'details',
	        })
      	},
      	/**获取生意帮代码*/
      	ImmediateUseclick(){
      		this.dialogFormVisible=true;
      		this.allDelete=false;
      		this.waning=true
      		var _this=this;
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
					console.log("err")
				}
			});
      	},
      	/**提交*/
      	Submitclick(){
      		this.disabled=true;
      		var _this=this
      		this.allDelete=false
      		$.ajax({
      			type:"post",
				dataType:"json",
				contentType : 'application/json;charset=UTF-8',
				url:_this.apiUrl.apiUrl+"/page/createHtmlPage",
				data:JSON.stringify({
                    "channelId": _this.indexData.channel_id,/*渠道ID**/
                    "clientId": _this.indexData.c_id,/*客户customer_id  ID**/
                    "modelType":1,/*模板类型**/
                    "clientName": _this.indexData.CustomerName,/*客户名称**/
                    "htmlCode":$("#operation_box").html(),/*html代码**/
                    "editParam":JSON.stringify(_this.data),
                    "modelId": 1,/*模板id**/
                    "orderId":_this.indexData.network_id,/*流量卡ID**/
                    "description":_this.description,
				    "pageId":_this.pageId,
				}),
				success:function(res){
					if(res.status==500){
						alert("着陆页数量不能大于5个")
						_this.$router.push({
				            path: 'home', 
				            name: 'home',
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
      	/*提示框**/
      	Prompt(){
      		if(this.description==null||this.description==''){
      			this.classRed=true;
      		}else{
      			this.dialogFormVisible = false;
      			this.classRed=false;
      		}
      		
      	},
    	maskFile(input_file,index,maxWidth){
    		var _this=this;
    		this.loading=true;
    		this.loading=true;
    		this.dataImg(_this,input_file,maxWidth,
	    		function(str){
	    		_this.data.img.splice(index,1,str)
	    	})
    	},
    	addMask(){
    		this.data.img.push("http://ad.wayboo.net.cn/common/img/i/middle1.jpg")
    	},
    	delMask(index){
//  		console.log(index)
    		this.data.img.splice(index,1)
    	},
    	/*上传图片**/
		dataImg(_this,input_file,maxWidth, get_data){
            if (typeof (FileReader) === 'undefined') {  
                alert("抱歉，你的浏览器版本太陈旧，请使用现代浏览器操作！");  
            } else {  
                try {  
		 			 var formData = new FormData();
					 var file = input_file.files[0];
					 var txt=''
                     var h1=''
                     _this.loading=true
		             formData.append("file",file);
                     if(parseInt(file.size/1024)>300){
                    	alert("图片不能大于300kb")
                    	_this.loading=false
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
                    		if(maxWidth<=image.width&&maxWidth>=(image.width-10)&&parseInt(file.size/1024)<300){
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
		                    			_this.loading=false;
		                    			get_data(str.data); 
									},
									error:function(){
										
									}
			                	});
                    			
                    		}else{
                    			/**宽不正确*/
                    			 txt="上传图片的宽为"+maxWidth+"PX;大小不能超过300kb"; h1="失败"
                    			_this.open(txt,h1)
                    			_this.loading=false
                    		}
                    	}
                    	image.src= this.result;
                    }  
                    reader.readAsDataURL(file);  
                } catch (e) {  
                	_this.loading=false
                    //alert('图片转Base64出错啦！' + e.toString());
                }  
            }					
		}
		/*上传图片结束**/
    }
  }
</script>

<style scoped="scoped">
.operation_head{
	position: relative;
}
ul{
	list-style: none;
	margin: 0;
	padding: 0;
}
li{
	list-style: none;
	margin: 0;
	padding: 0;
}
.addMask{
	padding: 15px;
	background: rgba(255,255,255,0.5);
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
	background: rgba(0,0,0,0.5);
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
</style>