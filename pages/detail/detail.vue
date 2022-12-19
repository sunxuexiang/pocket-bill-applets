<template>
	<view class="head-backColor">
		<view class="head-class">
			
		</view>
		<tab-bar :currentPage="0"></tab-bar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabbar/tabbar.vue'
	    export default {
	        data() {
	            return {
	            };
	        },
	        components:{
	            tabBar
	        },
	        methods: {},
			onLoad:()=>{
				let userinfo = uni.getStorageSync('token');
				if (userinfo == '') {
					uni.navigateTo({
						url: '/pages/login/login',
						success:()=>{
							//跳转完页面后再关闭启动页
							plus.navigator.closeSplashscreen();
						}
					});
				}
			}
	    };
</script>

<style>
	.head-class{
		width: 100%;
		height: 400rpx;
		background-color: #ffda66;
	}
	.head-backColor{
		background-color: #f2f2f2;
		height: 100vh;
	}
</style>