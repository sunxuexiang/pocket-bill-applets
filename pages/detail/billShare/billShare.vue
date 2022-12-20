<template>
	<view>
		<view style="margin-top: 20rpx;height: 75rpx;">
			<text style="margin-left: 20rpx;">账单名称</text>
			<text style="margin-left: 480rpx;">{{selectBill}}</text>
		</view>
		<view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectBill:""
			}
		},
		methods: {
			
		},
		onLoad(){
			this.selectBill=JSON.parse(uni.getStorageSync("selectBill")).bookName;
			
		}
	}
</script>

<style lang="scss">
	
</style>
