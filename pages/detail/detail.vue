<template>
	<view>
		<tab-bar :currentPage="0"></tab-bar>
		<view class="headStyle">
			<text class="pageTitle">口袋账本</text>
		</view>
		<view class="headStyle">
			<text class="year">sdf</text>
			<text class="incomeandexpense">收入</text>
			<text class="incomeandexpense">支出</text>
		</view>
		
		<view class="headStyle">
			<text class="image">时间</text>
			<image class="image" src="/static/images/select.png"></image>
			<text class="incomeMoney">12</text>
			<text class="expenseMoney">323213212</text>
		</view>
		
		<view>
			<text class="billbook">默认账本</text>
			<text class="sharebill">共享账本</text>
			<text class="search">搜索</text>
		</view>
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
	.headStyle{
		width: 750rpx;
		height: 50rpx;
		background-color: #ffda66;
	}
	.pageTitle{
		margin-left: 317rpx;
		font-weight: bold;
	
	}
	.incomeandexpense{
		font-size: 10px;
		color: #737373;
		margin-left: 190rpx;
	}
	.flag{
		margin-left: 170rpx;
	}
	.incomeMoney{
		font-size: 15px;
		margin-left: 115rpx;
	}
	.expenseMoney{
		font-size: 15px;
		margin-left: 195rpx;
	}
	.billbook{
		display: inline-block;
		width: 290rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		border-right: 1px solid #d9d9d9;
		border-bottom: 1px solid #d9d9d9;
	}
	
	.sharebill{
		display: inline-block;
		width: 290rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		border-right: 1px solid #d9d9d9;
		border-bottom: 1px solid #d9d9d9;
	}
	.search{
		display: inline-block;
		width: 165rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		border-bottom: 1px solid #d9d9d9;
	}
	.image{
		width: 35rpx;
		height: 35rpx;
		margin-left: 20rpx;
	}
	.year{
		margin-left: 20rpx;
	}

</style>