<template>
	<div id="app">
		<div id="wrapper">
			<nav class="navbar navbar-default navbar-static-top m-b-0">
				<div class="navbar-header">
					<!--logo区-->
					<div class="top-left-part" style="width: 200px;">
						<a href="#" class="logo" style="display: block;">
							<!--<span class="hidden-xs">-->
		                       <img src="./assets/logo.png" alt="home" width="133px" height="36px"/>
                     		<!--</span>-->
						</a>
					</div>
					<!--左边logo结束-->
					<!--左边列表区-->
					<ul class="nav navbar-top-links navbar-left">
						<li>
							<a href="javascript:void(0)" class="open-close waves-effect waves-light">
								<i class="ti-menu"></i>
							</a>
						</li>
					</ul>
					<!--左边列表结束-->
					<!--右边列表-->
					<ul class="nav navbar-top-links navbar-right pull-right">
						<li class="dropdown">
							<a class="dropdown-toggle profile-pic" style="cursor: pointer;">
								<b class="hidden-xs">您好：</b>
								<b class="hidden-xs">{{UserName}}</b>
							</a>
						</li>
						<li class="dropdown">
							<a class="dropdown-toggle profile-pic" style="cursor: pointer;">
								<b class="hidden-xs"v-on:click="SignOut">退出</b>
							</a>
						</li>
					</ul>
					<!--右边列表结束-->
				</div>
				<!--navbar-header结束-->
			</nav>
			<div class="navbar-default sidebar" role="navigation">
				<div class="sidebar-nav slimscrollsidebar">
					<div class="sidebar-head">
						<h3><span class="fa-fw open-close"><i class="ti-close ti-menu"></i></span><span class="hide-menu">导航</span></h3>
					</div>
					<div class="user-profile">
						<div class="dropdown user-pro-body">
							<ul class="nav in" id="side-menu">
								<li>
									<router-link to="/" class="waves-effect">
										<span class="hide-menu text-left" style="display: flex;align-items: center;">
											<i class="iconfont icon-shouye" style="margin-right: 20px;"></i>
											首页 
										</span>
									</router-link>
								</li>
								<li id="show">
									<router-link to="Choice" class="waves-effect" v-if="conceal">
										<span class="hide-menu  text-left display" style="display: flex;align-items: center;"><i class="iconfont icon-yemian" style="margin-right: 20px;"></i>着落页模板 </span>
									</router-link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!---->
			<div id="page-wrapper">
				<router-view/>
			</div>
			<!--内容区结束-->
			<footer class="footer text-center">
				<font style="vertical-align: inherit;">
					<font style="vertical-align: inherit;">信融着陆页智能制作系统 </font>
				</font>
			</footer>
			<el-dialog
			  title="提示"
			  :visible.sync="dialogVisible"
			  width="30%"
			  >
			  <span>检查到您的浏览器是IE内核，继续使用可能会影响您的用户体验</span>
			  <p>如果您使用的是360、QQ、百度等国内浏览器，请切换为急速模式</p>
			  <p><img src="@/assets/360.png" width="100%"/></p>
			  <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			  </span>
			</el-dialog>
		</div>

	</div>
</template>
<script type="text/javascript">
export default {
  name: 'app',
  data () {
    return {
      UserName: '',
      conceal:true,
      dialogVisible:false,
    }
  },
  mounted(){
  		this.$xhr.get("/login/channelInfo").then((res)=>{
			this.UserName=res.data.sub_company;
			this.apiUrl.allName=''
		})
		if(this.IEVersion()!=-1){
			this.dialogVisible=true
		}
  },
  methods:{
  	SignOut(){
  		localStorage.clear()
  		$.cookie("token",null,{expires: -1,path: '/'})
        console.log($.cookie("token"))
    	window.location.href='http://sso.mywayboo.com/sso/sso/tologin.action?main=http://zz.wayboo.net.cn/static/index.html';
  	},
    clearAllCookie() {  
	    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
	    if(keys) {  
	        for(var i = keys.length; i--;)  
	            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
	    }  
	},
     IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return 7;
            } else if(fIEVersion == 8) {
                return 8;
            } else if(fIEVersion == 9) {
                return 9;
            } else if(fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }   
        } else if(isEdge) {
            return 'edge';//edge
        } else if(isIE11) {
            return 11; //IE11  
        }else{
            return -1;//不是ie浏览器
        }
    }
  }
}
</script>