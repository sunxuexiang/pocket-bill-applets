<template>
	<view class="head-backColor">
		<view class="head-class">
			
		</view>
		<view class="head-text-class"><text style="font-size:18px">账单</text></view>
		<view class="head-balance-class"><text style="font-size:15px;color:#b3b3b3 ;">结余</text></view>
		<view class="" style="fontSize:10px;margin: 20rpx 0px 0px 320rpx">
			<text style="fontSize:20px ">{{ frontPrice }}</text>
			<text v-show="isDot">.</text>
			<text>{{ backPrice }}</text>
		</view>
		<view class="head-income">
			<text style="margin:0px 0px 0px 108rpx;font-size:15px;color:#b3b3b3">收入 </text>
			<text style="margin: 0px 0px 0px 24rpx;fontSize:20px">{{ frontPrice }}</text>
			<text v-show="isDot">.</text>
			<text>{{ backPrice }}</text>
		</view>
		<view class="head-expenditure">
			<text style="margin:0px 0px 0px 108rpx;font-size:15px;color:#b3b3b3">支出 </text>
			<text style="margin: 0px 0px 0px 24rpx;fontSize:20px">{{ frontPrice }}</text>
			<text v-show="isDot">.</text>
			<text>{{ backPrice }}</text>
		</view>
		<view>
			<view style="margin-top:24rpx">
				<text style="color:#b3b3b3;margin-left:10%">月份</text>
				<text style="color:#b3b3b3;margin-left:12%">收入</text>
				<text style="color:#b3b3b3;margin-left:13%">支出</text>
				<text style="color:#b3b3b3;margin-left:14%">结余</text></view>
		</view>
		<p style="width:100%;height:1px;margin:22rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
		<view>
			<view style="margin-top:24rpx" v-for="(item,index) in list">
				<text style="color:#b3b3b3;margin-left:10%">{{item.month}}</text>
				<text style="color:#b3b3b3;margin-left:17%">{{item.shouru}}</text>
				<text style="color:#b3b3b3;margin-left:18%">{{item.zhichu}}</text>
				<text style="color:#b3b3b3;margin-left:18%">{{item.jieyu}}</text></view>
		</view>
		<p style="width:100%;height:1px;margin:22rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
		<tab-bar :currentPage="3"></tab-bar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabbar/tabbar.vue'
	    export default {
	        data() {
	            return {
					price:'337.90',
					frontPrice:'',
					backPrice:'',
					isDot: true,
					list:[{
						month:12,
						shouru: 22,
						zhichu: 33,
						jieyu: 44
					},{
						month:12,
						shouru: 15.2,
						zhichu: 19.2,
						jieyu: -4
					}]
	            };
	        },
	        components:{
	            tabBar
	        },
			onShow(e) {
				this.totalprice(this.price)
			},
	        methods: {
				 totalprice(num) {
					// 判断是否有小数点
					if(!isNaN(num)){ // 判断 number类型的数字是不是NaN，因为NaN也是number类型
						this.isDot = ( (num + '').indexOf('.') != -1 );
					}
					if (this.isDot) {
						// 分割价钱 => ["337", "90"]
						let splitPrice = num.split(".");
						this.frontPrice = splitPrice[0]
						this.backPrice = splitPrice[1]
					} else {
						this.frontPrice = num
					}
				}
			}
	    };
</script>

export default {
	
}

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
	.head-text-class{
		margin: -350rpx 0px 0px 330rpx;
	}
	.head-balance-class{
		margin: 80rpx 0px 0px 330rpx;
	}
	.head-income{
		margin: 16rpx 0px 0px 0px;
		width: 50%;
	}
	.head-expenditure{
		margin: -50rpx 0px 0px 300rpx;
		width:50%
	}
</style>
