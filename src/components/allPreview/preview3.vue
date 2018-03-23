<template>
	<div id="preview">
		<div class="pageWrapper_top text-right ">
				<div class="container">
					<div class="row">
						<div class="col-md-6">
							<p style="line-height: 35px;">自定义模板</p>
						</div>
						<div class="col-md-6 text-right" style="padding-right: 30px;">
							<a href="#/Choice">退出预览</a>
							<el-button type="primary" plain><a href="#/operation3">立即制作</a></el-button>
						</div>
					</div>
				</div>
		</div>
		<div class="pageWrapper_box">
			<img src="http://page-bucket.oiaqye7985.com/land-page/images/module3yu.jpg" width="100%"/>
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    mounted(){
    	/***/
    	if($("body").attr("class")=="fix-header show-sidebar hide-sidebar"){
    		$(".pageWrapper_top").removeClass("pageWrapper_topR")
    	}else{$(".pageWrapper_top").addClass("pageWrapper_topR")}
    	/***/
    }
  };
</script>
<style type="text/css" >
	.el-button>span>a:hover{color: #fff;}
</style>