<template>
	<div class="details">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<p class="index_title" style="justify-content: space-between;">
						<span><span class="index_span "></span><span class="sub_company">{{this.UserName}}</span></span>
						<a href="javascript:void(0)" @click="home">返回上一页</a>
					</p>
				</div>
			</div>
			<!---->
			<div class="row">
				<div class="table-responsive">
				  	<table class="table  table-bordered ">
				  		<thead>
				  			<tr>
				  				<th  class="text-center">序号</th>
				  				<th class="text-center">页面名称</th>
				  				<th class="text-center">预览</th>
				  				<th class="text-center">状态</th>
				  				<th class="text-center">操作</th>
				  			</tr>
				  		</thead>
				  		<tbody>
				  			<tr v-for="(details,index) in details">
				  				<th  class="text-center">{{index}}</th>
				  				<th class="text-center">{{details.pageName}}</th>
				  				<th class="text-center" v-html="details.href"></th>
				  				<th class="text-center">
				  					<span v-if="details.state==0">未审核</span>
				  					<span v-if="details.state==1">已通过</span>
				  					<span v-if="details.state==2">未通过（{{details.checkInfo}}）</span>
				  					<span v-if="details.state==3">暂未使用</span>
				  				</th>
				  				<th class="text-center">
				  					<el-button type="primary" size="mini" @click="newDetails(index)">重做 </el-button>
				  					<el-button type="primary" size="mini" @click="newedit(index)">修改 </el-button>
				  				</th>
				  			</tr>
				  		</tbody>
				  	</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      indexData:null,
      UserName:null,
      pageId:null,
      details:[],
      allQU:null,
    }
  },
  mounted(){
    this.UserName=localStorage.getItem("username")
    this.allQU=this.$route.params.allquery
    if(this.UserName==undefined){
    	this.$router.push({
            path: 'home', 
            name: 'home',
        })
    }
    var _this=this
    this.indexData=JSON.parse(localStorage.getItem("data"))
    $.ajax({
    	contentType :'application/json;charset=UTF-8',
		type:"get",
		dataType: 'json',
		url:_this.apiUrl.apiUrl+"/page/findPages",
		async:true,
		data:{
		  "cid": _this.indexData.c_id,
		  "orderId":_this.indexData.network_id,
		},
		success:function(res){
//			console.log(res)
			for(var i in res.data){
				_this.details.push({
					pageName:res.data[i].clientName,
		      		href:res.data[i].visitUrl,
		      		state:res.data[i].state,
		      		pageId:res.data[i].id,
		      		checkInfo:res.data[i].checkInfo,
		      		moduleType:res.data[i].modelType
				})
			}
		},
		error(){
			_this.$router.push({
	            path: 'home', 
	            name: 'home',
	        })
		}
    });
  },
  methods:{
  	newDetails(index){
		this.apiUrl.pageId=this.details[index].pageId
		localStorage.setItem("pageId",this.details[index].pageId);
		this.$router.push({
	        path: 'Choice', 
	        name: 'Choice',
	        params:{
            	customerName:this.indexData,
            	UserName:this.UserName
            }
	    })
  	},
  	newedit(index){
  		var _this=this;
  		localStorage.setItem("pageId",this.details[index].pageId);
  		var id=this.details[index].pageId;
  		var moduleType=this.details[index].moduleType
//		console.log(moduleType)
  		$.ajax({
  			contentType :"application/json;charset=UTF-8",
			type:"get",
			dataType: 'json',
  			url:_this.apiUrl.apiUrl+"/page/findModelByPageId",
  			async:true,
  			data:{"pageId":id},
			success:function(res){
//				console.log(res)
				if(res.status==500){
					return
				}
				var moduleDdata=res.data
				var index= res.data.id
//				console.log(res)
				if(moduleType==0){
					_this.$router.push({
			             path: 'operation'+index, 
			        	 name: 'operation'+index,
			        	 params:{
			            	moduleDdata:moduleDdata,
			            	pageId:id
			            }
			        })
				}else if(moduleType==1){
					_this.$router.push({
			             path: 'operation'+index+'Middle', 
			        	 name: 'operation'+index+'Middle',
			        	 params:{
			            	moduleDdata:moduleDdata,
			            	pageId:id
			            }
			        })
				}
			},
			error(){
				alert("网路故障")
			}
  		});
  	},
  	home(){
  		this.$router.push({
	        path: 'home', 
	        name: 'home',
	        params:{
            	allquery:this.allQU
            }
	    })
  	}
  }
  	  
}
</script>

<style>
</style>