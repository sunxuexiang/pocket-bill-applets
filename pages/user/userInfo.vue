<template >
	<view class="head-backColor">
		<view class="head-class">
			
		</view>
		<view class="head-info">
			<view class="head-img">
				<image :src="userInfo.userImg" class="class-img"></image>
			</view>
			<view class="head-name-class">
				<text>{{userInfo.userName}}</text>
			</view>
			<view class="check-days">
				<view style="margin-left: 52rpx;font-weight: bold;font-size: 40rpx;color: #737373;"><text>{{userInfo.recordCount}}</text></view>
				<view class="check-day-text">打卡天数</view>
			</view>
			<view class="book-keep-days">
				<view style="margin-left: 52rpx;font-weight: bold;font-size: 40rpx;color: #737373;"><text>{{userInfo.recordCount}}</text></view>
				<view class="check-day-text">记账次数</view>
			</view>
			<view class="book-days">
				<view style="margin-left: 52rpx;font-weight: bold;font-size: 40rpx;color: #737373;"><text>{{userInfo.recordCount}}</text></view>
				<view class="check-day-text">记账天数</view>
			</view>
		</view>
		<view class="head-bill">
			<view class="head-bill-manage">
				<view><text>账单管理</text></view>
				<view class="right-class-view1"><image src="../../static/right.png" class="right-class"></image></view>
			</view>
			<p style="width:90%;height:1px;margin:22rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
			<view class="head-bill-export">
				<view><text>账单导出</text></view>
				<view class="right-class-view2"><image src="../../static/right.png" class="right-class"></image></view>
			</view>
			<p style="width:90%;height:1px;margin:22rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
			<view class="head-bill-import">
				<view><text>账单导入</text></view>
				<view class="right-class-view3"><image src="../../static/right.png" class="right-class"></image></view>	
			</view>
		</view>
		<view class="head-setting">
			<view class="head-bill-export">
				<view><text>关于我们</text></view>
				<view class="right-class-view2"><image src="../../static/right.png" class="right-class"></image></view>
			</view>
			<p style="width:90%;height:1px;margin:22rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
			<view class="head-bill-import">
				<view><text>联系客服</text></view>
				<view class="right-class-view3"><image src="../../static/right.png" class="right-class"></image></view>	
			</view>
		</view>
		<tab-bar :currentPage="4"></tab-bar>
	</view>
</template>

<script>
		import tabBar from '@/components/tabbar/tabbar.vue'
		// 进入js模块
		import urls from '../../api/request.js'
		import {requestApi} from '../../api/api.js'
	    export default {
	        data() {
	            return {
					userInfo: {userName:'',userImg:'',recordCount:''}
	            };
	        },
	        components:{
	            tabBar
	        },
			onShow:function(){
				let userinfo = uni.getStorageSync('token');
				if (userinfo == '') {
					uni.navigateTo({
						url: '/pages/login/login',
						success:()=>{
							//跳转完页面后再关闭启动页
							plus.navigator.closeSplashscreen();
						}
					});
				} else {
					let queryUser = urls.m().queryUser
					requestApi(queryUser,null).then((res)=>{
						let data = res[1].data.result
						this.userInfo.userName=data.userName; 
						this.userInfo.userImg=data.userImg
					});
					let queryRecordByUserId = urls.m().queryRecordByUserId
					requestApi(queryRecordByUserId,null).then((res)=>{
						let data = res[1].data.result
						this.userInfo.recordCount = data
					})
				}
			},
	        methods: {
			},
	    }
</script>

<style>
	.head-class{
		width: 100%;
		height: 400rpx;
		background-color: #ffda66;
	}
	.head-info{
		width: 90%;
		height: 300rpx;
		background-color: #ffffff;
		border:1px solid #ffffff;
		border-radius: 22rpx;
		margin-left: 5%;
		margin-top:-187rpx;
		box-shadow:2px 2px 0px #e5e5e5
	}
	.head-bill{
		width: 90%;
		height: 340rpx;
		background-color: #ffffff;
		border:1px solid #ffffff;
		border-radius: 22rpx;
		margin:20rpx 0px 0px 42rpx;
		box-shadow:2px 2px 0px #e5e5e5
	}
	.head-setting{
		width: 90%;
		height: 200rpx;
		background-color: #ffffff;
		border:1px solid #ffffff;
		border-radius: 22rpx;
		margin:20rpx 0px 0px 42rpx;
		box-shadow:2px 2px 0px #e5e5e5
	}
	.head-img{
		width: 23%;
		height: 160rpx;
		border: 1px solid black;
		border-radius:100px;
		overflow:hidden;
		margin:-26px 0px 0px 38px
	}
	.class-img{
		width: 100%;
		height: 100%;
	}
	.head-name-class{
		width: 300rpx;
		margin:-90rpx 0rpx 0rpx 300rpx
	}
	.check-days{
		width: 130rpx;
		height: 120rpx;
		margin:86rpx 0rpx 0rpx 50rpx
	}
	.check-day-text{
		margin-top: 26rpx;
		font-weight: bold;
		font-size: 12px;
		margin-left: 9px;
		color: #b3b3b3;
	}
	.book-keep-days{
		margin:-120rpx 0px 0px 270rpx
	}
	.book-days{
		margin:-106rpx 0px 0px 500rpx
	}
	.head-bill-manage{
		width:70%;
		margin:49rpx 0px 0px 70rpx;
		font-weight: bold;
		font-size: 35rpx;
		color: #737373;
	}
	.head-bill-export{
		width:70%;  
		margin:30rpx 0px 0px 70rpx;
		font-weight: bold;
		font-size: 35rpx;
		color: #737373;
	}
	.head-bill-import{
		width:70%;
		margin:0rpx 0px 0px 70rpx;
		font-weight: bold;
		font-size: 35rpx;
		color: #737373;
	}
	.right-class{
		width: 40rpx;
		height: 50rpx;
	}
	.right-class-view3{
		margin:-48rpx 0px 0px 500rpx;
	}
	.right-class-view2{
		margin:-48rpx 0px 0px 500rpx;
	}
	.right-class-view1{
		margin:-48rpx 0px 0px 500rpx;
	}
	.head-backColor{
		background-color: #f2f2f2;
		height: 100vh;
	}
	
	
</style>