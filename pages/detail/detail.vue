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
	        methods: {}
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