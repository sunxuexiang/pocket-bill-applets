<template>
	<view>
	        <tab-bar :currentPage="1"></tab-bar>
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
</style>