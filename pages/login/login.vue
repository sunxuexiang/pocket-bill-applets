<template>
	<view>
		<view>
			<view class="header">
				<!-- <image src="/static/img/public/login-wx.png"></image> -->
			</view>
			<view class="content">
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>
			<button class="bottom" type="primary" withCredentials="true" @tap="getUserProfile">授权登录</button>
			<!-- 注意，这里要用@tap -->
		</view>
	</view>
</template>

<script>
	// 进入js模块
	import urls from '../../api/request.js'
	import {requestApi} from '../../api/api.js'
	export default {
		data() {
			return {
			};
		},
	methods: {
			getUserProfile() {
				debugger;
				uni.login({
				    provider: 'weixin',
				    success: function (loginRes) {
						uni.request({
						       url:'http://localhost:8083/bill-user/login?code='+loginRes.code,
						       method:"POST",
						       dataType:"json",
						       success:(res)=>{
									uni.setStorageSync('token',res.data.token)
									// 登录成功
									uni.getUserInfo({
									    provider: 'weixin',
									    success: function(info) {
											let userInfo = info.userInfo;
											let data = {userName:userInfo.nickName,userImg:userInfo.avatarUrl,userSex:userInfo.gender};
											let addUser = urls.m().addUser
											requestApi(addUser,data).then((res)=>{
												uni.switchTab({
													url:'/pages/user/userInfo'
												})
											});
											// uni.request({
											// 	url:'http://localhost:8083/bill-user/addUser',
											// 	data:,
											// 	header: {Authorization:uni.getStorageSync('token')},
											// 	method:'post',
											// 	success:(res)=>{
											// 		uni.switchTab({
											// 			url:'/pages/user/userInfo'
											// 		})
											// 	}
											// });
									    }
									})
						       },
						       fail(err) {
						        console.log(err);
						       }
						})
				       
				    },
				    fail: function (err) {
				        // 登录授权失败  
				        console.log(err);
				    }
				});
			}
		}
	}
</script>
<style>
	.header {
			margin: 90rpx 0 90rpx 50rpx;
			border-bottom: 1px solid #ccc;
			text-align: center;
			width: 650rpx;
			height: 300rpx;
			line-height: 450rpx;
		}
	 
		.header image {
			width: 200rpx;
			height: 200rpx;
		}
	 
		.content {
			margin-left: 50rpx;
			margin-bottom: 90rpx;
		}
	 
		.content text {
			display: block;
			color: #9d9d9d;
			margin-top: 40rpx;
		}
	 
		.bottom {
			border-radius: 80rpx;
			margin: 70rpx 50rpx;
			font-size: 35rpx;
		}
</style>