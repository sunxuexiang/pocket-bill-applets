<template>
	<view class="listbox">
		<view class="pricebox" v-for="(item,index) in priceList" :key="index" @click="priceChange(index)">
			<view class="priceinerbox" :class="{active:item.isSelect}">
				<text class="txt-fontsize16">{{item.name}}</text>
			</view>
 
		</view>
	</view>
 
 
</template>
<script>
	export default {
		data() {
			return {
				priceList: [{
						name: '不加热',
						value: 0,
						isSelect: false
					}, {
						name: '不出水',
						value: 1,
						isSelect: false
					}, {
						name: '有异响',
						value: 2,
						isSelect: false
					}, {
						name: '工作异常',
						value: 3,
						isSelect: false
					},
					{
						name: '漏水',
						value: 4,
						isSelect: false
					}, {
						name: '显示故障',
						value: 5,
						isSelect: false
					}, {
						name: '操作失灵',
						value: 6,
						isSelect: false
					}, {
						name: '其它问题',
						value: 7,
						isSelect: false
					},
				],
				// 选择有问题的value值
				troubl: []
 
			}
		},
		methods: {
			priceChange(index) {
				// 点击选中，再次点击可删除勾选
				if (!this.priceList[index].isSelect) {
					this.priceList[index].isSelect = true
				} else {
					this.priceList[index].isSelect = false
				}
 
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.listbox {
		margin-top: 200rpx;
		width: 94%;
		margin-left: 3%;
		height: 10vh;
		font-size: 26rpx;
		font-weight: 400;
		background-color: yellow;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
 
		.pricebox {
			width: 25%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
 
			// 点击前
			.priceinerbox {
				width: 80%;
				height: 3vh;
				background-color: #F7F7F7;
				border: 1rpx solid #F7F7F7;
				border-radius: 5rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
 
			// 点击后变色
			.active {
				background-color: #EFF8FF;
				color: #0085FF;
				border: 1rpx solid #0085FF;
				border-radius: 5rpx;;
			}
		}
	}
</style>
