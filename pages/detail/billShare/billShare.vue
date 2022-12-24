<template>
	<view>
		<view style="margin-top: 20rpx;height: 75rpx;">
			<text style="margin-left: 20rpx;">账本名称</text>
			<text style="margin-left: 470rpx;">{{selectBill}}</text>
		</view>
		<view style="margin-top: 10rpx;display: flex;">
			<text style="margin-left: 20rpx;">账本权限</text>
			<view style="margin-left: 470rpx;width: 90rpx;text-align: right;">
				<text>{{selectPermission}}</text>
			</view>
			<view @click="editBillPermission()">
				<image class="rightarrow" :src="'/static/images/'+imageSwitch"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectBill:"",
				selectPermission:"",
				shareArrow:['rightarrow.png','downarrow.png'],
				imageSwitch:"rightarrow.png",
				permissionArray:['只读','可编辑']
			}
		},
		methods: {
			editBillPermission(){
				this.imageSwitch=this.shareArrow[1];
				uni.showActionSheet({
					itemList: this.permissionArray,
					success:  (res)=> {
						this.imageSwitch=this.shareArrow[0];
						
						this.selectPermission=this.permissionArray[res.tapIndex];
					}
				});
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
