<template>
  <div class="choice" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
  		<div class="container">
	  			<div class="row">
							<div class="col-md-12">
								<p class="index_title" style="justify-content: space-between;">
									<span><span class="index_span "></span><span class="sub_company">{{this.UserName}}</span></span>
								</p>
							</div>
					</div>
					<!---->
					<div class="row">
						<div class="col-md-12">
							<div class="choice_top">
									<p>你好：{{this.UserName}}</p>
									<p><span>着陆页制作流程</span><span style="color:#27abfc ;">（每张流量卡最多可制作5张着陆页）</span></p>
									<p class="choice_topAbt">
											<button class="btn btn-danger" style="margin-left: 0;">点击制作</button>
											<img src="../assets/jiant.jpg"/>
											<button class="btn btn-danger">填写页面名称</button>
											<img src="../assets/jiant.jpg"/>
											<button class="btn btn-danger">编辑页面</button>
											<img src="../assets/jiant.jpg"/>
											<button class="btn btn-danger">审核发布</button>
									</p>
									<p><span>着陆页制作引导</span></p>
									<p><span style="color:#27abfc ;">1.通用模板：</span><span style="color:#27abfc ;">（指已有设计稿，只需切图上传即可；如需制作移动端需再次切图上传）</span></p>
									<p><span >点击图片可更换；详细制作引导请点击该模板预览！</span></p>
									<p><span style="color:#27abfc ;">2.自定义模板：</span><span style="color:#27abfc ;">（指无需设计稿，根据模板样式替换其模板文字及图片内容；改模板制动生成移动端，无需再次制作）</span></p>
									<p><span >文字可双击编辑；点击图片可更换；详细制作引导请点击该模板预览！</span></p>
							</div>
						</div>
				</div>
				<!---->
				<div class="row">
					<div class="col-md-12">
						<p class="index_title" style="justify-content: space-between;">
							<span><span class="index_span "></span><span class="sub_company">着陆页样式</span></span>
						</p>
					</div>
				</div>
				<!---->
  		</div>
  		
  		<div class="container">
  			<div class="module_img">
						<div class="row">
								<div class="col-md-3" v-for="(Img,index) in Img">
										<p class="text-center">
											<span v-if="index==0">通用模板</span>
											<span v-if="index==1">自定义模板</span>
											<span v-if="index==2">产品报价模板</span>
										</p>
										<div>
												<p class="module_imgBox text-center"><img v-bind:src="Img.displayImgPc" width="100%"/></p>
												<p class="text-center">
													<el-button @click="primary(index)" type="primary" plain>制 作</el-button>
				    							<el-button @click="preview(index)" plain>预 览</el-button>
												</p>
										</div>
								</div>
						</div>
				</div>
  		</div>
  		
  </div>
</template>
<script>
export default {
  name: 'Choice',
  data () {
    return {
      UserName:null,
      Img:null,
      indexData:null,
      loading:true,
    }
  },
  mounted(){
  	$("#show").show()
    this.UserName=localStorage.getItem("username")
    if(this.UserName==undefined){
    	this.$router.push({
            path: 'home', 
            name: 'home',
        })
    }
    this.$xhr.get("/page/findModel").then((res)=>{
				this.Img=res.data
				this.loading=false
//				console.log(res.data)
		})
  },
  methods:{
  	preview(index){
	  	  this.$router.push({
		        path: 'preview'+(index+1), 
		        name: 'preview'+(index+1)
	      })
  	},
  	primary(index){
  		this.$router.push({
		        path: 'operation'+(index+1), 
		        name: 'operation'+(index+1)
	      })
  	}
  }
}
</script>

