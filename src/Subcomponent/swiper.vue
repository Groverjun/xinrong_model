<template>
  <div id="bannerImg">
  	<swiper :options="swiperOption" ref="mySwiper">
    	<swiper-slide v-for="arr in bannerImg"><img v-bind:src="arr"/></swiper-slide>
  	</swiper>
  	<div class="banner_show text-center" v-if="allDelete">
  		<p class="text-center" style="color: #fff; font-size: 26px;">上传banner图片的宽为1920</p>
  			<el-button type="primary" class="fileBox" :loading="loading" @click="centerDialogVisible = true">
					上传
					<i class="el-icon-upload el-icon--right"></i>
				</el-button>
  	</div>
  	<!---->
  	<el-dialog
		  title="banner图片上传"
		  :visible.sync="centerDialogVisible"
		  v-if="allDelete"
		 >
		  <div class="min_banner">
		  		<p class="text-center" style="font-size: 24px;">上传图片的宽为1920</p>
		  	<ul class="clearfix">
		  		<li class="pull-left" v-for="(arr,index) in bannerImg">
		  			<img v-bind:src="arr"  />
		  			<p>
		  				<a href="javascript:void(0)" @click="bannerDel(index)">删除</a>
		  				<a href="javascript:void(0)" class="minfile">更换<input type="file" ref="bannerfile" @change="bannerfile($refs.bannerfile[index],index,1920)"/></a>
		  			</p>
		  		</li>
		  	</ul>
		  </div>
		  <br />
		  <div> <el-button @click="addBanner">增加一张</el-button></div>
		  <div slot="footer" class="text-center">
		    <el-button @click="centerDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'carrousel',
    props:["IFdata"],
    data() {
      return {
      	allDelete:true,
      	loading:false,
      	centerDialogVisible: false,
      	frontPoints:0,
      	bannerImg:[
      		"http://ad.wayboo.net.cn/common/img/i/banner.jpg",
      		"http://ad.wayboo.net.cn/common/img/i/banner.jpg",
      		"http://ad.wayboo.net.cn/common/img/i/banner.jpg",
      		"http://ad.wayboo.net.cn/common/img/i/banner.jpg",
      	],
        swiperOption: {
			  autoplay : {
			    	delay:1000
			   	},
        }
      }
    },
    mounted(){
    	console.log(this.IFdata)
    },
    watch: {  
		    IFdata(newValue, oldValue) {  
		       this.allDelete= newValue
		       console.log(newValue)
		    }  
		}, 
 		methods:{
		 			open(txt,h1) {
			        this.$alert(txt, h1, {
			          confirmButtonText: '确定',
			      });
			    },
					bannerfile(input_file,index,maxWidth){
		    		var _this=this;
		    		this.loading=true
		    		this.dataImg(_this,input_file,maxWidth,
			    		function(str){
			    	  _this.bannerImg[index]=str
			    	})
		    	},
		    	bannerDel(index){
		    		this.bannerImg.splice(index, 1);
		    	},
		    	addBanner(){
		    		if(this.bannerImg.length<4){
		    			this.bannerImg.push("https://s17.postimg.org/tjkj6r3lb/banner.jpg")
		    		}
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
			                 if(parseInt(file.size/1024/1024)>1){
			                	alert("图片不能大于1M")
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
			                		if(maxWidth<=(image.width+10)&&maxWidth>=(image.width-10)){
			                			/**发送Ajax请求*/
                    			$.ajax({
				                		type:"post",
				                		url:"http://192.168.1.140:8081/file/saveImage",
				                		data: formData,
			                 			dataType : "json",
			                 			async: false,
		                    		contentType: false,
		                    		processData: false,
														success:function(str){
															console.log(str)
		                    			_this.loading=false;
		                    			get_data(str.data); 
														},
														error:function(){
															
														}
			                		});
			                		}else{
			                			/**宽不正确*/
			                			 txt="上传图片的宽为"+maxWidth+"PX"; h1="失败"
			                			_this.open(txt,h1)
			                			_this.loading=false
			                		}
			                	}
			                	image.src= this.result;
			                }  
			                reader.readAsDataURL(file);  
			            } catch (e) {  
			                alert('图片转Base64出错啦！' + e.toString());
			            }  
			        }					
					}
					/*上传图片结束**/
 		}
  }
</script>
<style>
	#bannerImg{
		position: relative;
	}
	.banner_show{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: rgba(0,0,0,0.5);
		z-index: 10;
		display: none;
	}
	#bannerImg:hover .banner_show{
		display: flex;
	}
		.min_banner  ul{
			padding: 0;
			margin: 0;
		}
	.min_banner li{
		width: 150px;
		height: 50px;
		border: 1px solid #ccc;
		overflow: hidden;
		margin-right: 5px;
		position: relative;
	}
	.min_banner li>p{
		position: absolute;
		top: 0;
		width: 100%;
		text-align: center;
		display: none;
		align-items: center;
		justify-content: center;
	}
	.min_banner li:hover p{
		display: flex;
		
	}
	.min_banner li>p a{
		padding: 2px 5px;
		background: #00AEEF;
		color: #fff;
		width:38px ;
		height: 23px;
		display: inline-block;
		position: relative;
		margin: 0 5px;
	}
	.min_banner li>p .minfile{
		position: relative;
		overflow: hidden;
		width:38px ;
		height: 23px;
		top: 10;
		display: inline-block;
	}
	.min_banner li>p .minfile input{
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		font-size: 100px;
	}
	.min_banner li img{
		width: 100%
	}
</style>