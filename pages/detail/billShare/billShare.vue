<template>
	<view>
		<view style="margin-top: 20rpx;height: 75rpx;">
			<text style="margin-left: 20rpx;">账本名称</text>
			<text style="margin-left: 480rpx;">{{selectBill}}</text>
		</view>
		<view style="margin-top: 10rpx;display: flex;">
			<text style="margin-left: 20rpx;">账本权限</text>
			<text style="margin-left: 480rpx;">只读</text>
			<view @click="editBillPermission()"><image class="rightarrow" src="/static/images/rightarrow.png"></image></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectBill:"",
				selectPermission:""
			}
		},
		methods: {
			editBillPermission(){
				
			}
		},
		onLoad(){
			this.selectBill=JSON.parse(uni.getStorageSync("selectBill")).bookName;
			
		}
	}
</script>

<style lang="scss">
	.rightarrow{
		width: 40rpx;
		height: 40rpx;
		margin-left: 10rpx;
		
	}
</style>
