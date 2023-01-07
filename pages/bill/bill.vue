<template>
	<view>
		<view class="head-class">
			
		</view>
		<view>
			<picker mode="date" :value="date" fields="year" :start="startDate" :end="endDate" @change="dateChange" style="margin-top:-224rpx;margin-left:22rpx">
				<view style="display:flex;flex-wrap: wrap;">
					<view>{{date}}年</view>
					<view style="width:60rpx;height:60rpx"><image src="../../static/down.png" style="width:40rpx;height:40rpx"></image></view>
				</view>
			</picker>
		</view>
		<view class="head-balance-class"><text style="font-size:15px;color:#b3b3b3 ;">结余</text></view>
		<view class="" style="fontSize:10px;margin: 20rpx 0px 0px 320rpx">
			<text style="fontSize:20px ">{{ yearTotalBalance }}</text>
			<text v-show="isDot">.</text>
			<text>{{ yearTotalbackPrice }}</text>
		</view>
		<view class="head-income">
			<text style="margin:0px 0px 0px 108rpx;font-size:15px;color:#b3b3b3">收入 </text>
			<text style="margin: 0px 0px 0px 24rpx;fontSize:20px">{{ yearTotalIn }}</text>
			<text v-show="isDot">.</text>
			<text>{{ yearTotalInBackPrice }}</text>
		</view>
		<view class="head-expenditure">
			<text style="margin:0px 0px 0px 108rpx;font-size:15px;color:#b3b3b3">支出 </text>
			<text style="margin: 0px 0px 0px 24rpx;fontSize:20px">{{ yearTotalOut }}</text>
			<text v-show="isDot">.</text>
			<text>{{ yearTotalOutBackPrice }}</text>
		</view>
		<view style="padding-bottom:160rpx;margin-top:-45rpx; " >
			<view>
				<view style="margin-top:75rpx">
					<text style="color:#b3b3b3;margin-left:10%">月份</text>
					<text style="color:#b3b3b3;margin-left:12%">收入</text>
					<text style="color:#b3b3b3;margin-left:13%">支出</text>
					<text style="color:#b3b3b3;margin-left:14%">结余</text>
				</view>
			</view>
			<p style="width:100%;height:1px;margin:22rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
			<view style="margin-top:12px;display:flex;flex-wrap: wrap;">
				<view style="display:flex;flex-wrap: wrap;" v-for="(item,index) in list">
					<view style="width:169rpx;margin-left:60rpx"><text style="color:#b3b3b3;">{{item.billMonth}}月</text></view>
					<view style="width:169rpx;"><text style="color:#b3b3b3;">{{item.monthIn}}</text></view>
					<view style="width:169rpx;"><text style="color:#b3b3b3;">{{item.monthOut}}</text></view>
					<view style="width:169rpx;"><text style="color:#b3b3b3;">{{item.balance}}</text></view>
					<p style="width:100%;height:1px;margin:22rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
				</view>
			</view>
		</view>
		<tab-bar :currentPage="3" style="padding-bottom:95px;"></tab-bar>
	</view>
</template>

<script>
		import tabBar from '@/components/tabbar/tabbar.vue' 
		// 进入js模块
		import urls from '../../api/request.js'
		import {requestApi} from '../../api/api.js'
	    export default {
	        data() {
				const currentDate = this.getDate({format: 'yyyy'});
	            return {
					// 结余
					yearTotalBalance:'',
					yearTotalbackPrice:'',
					// 支出
					yearTotalOut:'',
					yearTotalOutBackPrice:'',
					// 收入
					yearTotalIn:'',
					yearTotalInBackPrice:'',
					isDot: true,
					list:[],
					date: currentDate
	            };
	        },
			computed: {
				startDate() {
					return this.getDate('start');
				},
				endDate() {
					return this.getDate('end');
				}
			},
	        components:{
	            tabBar
	        },
			onShow(e) {
				let userinfo = uni.getStorageSync('token');
				if (userinfo == '') {
					uni.navigateTo({
						url: '/pages/login/login',
						success:()=>{
							//跳转完页面后再关闭启动页
							plus.navigator.closeSplashscreen();
						}
					});
				} else {
					let queryAnnualSummaryReportList = urls.m().queryAnnualSummaryReportList+'?year='+this.date+'&bookId='+6;
					requestApi(queryAnnualSummaryReportList,null).then((res)=>{
						let data = res[1].data.result
						this.list = res[1].data.result.data;
						this.totalprice(data.yearTotalBalance,'balane')
						this.totalprice(data.yearTotalOut,'out')
						this.totalprice(data.yearTotalIn,'in')
					});
				}  
			},
	        methods: {
				 totalprice(num,type) {
					// 判断是否有小数点
					if(!isNaN(num)){ // 判断 number类型的数字是不是NaN，因为NaN也是number类型
						this.isDot = ( (num + '').indexOf('.') != -1 );
					}
					if (this.isDot) {
						// 分割价钱 => ["337", "90"]
						let splitPrice = num.split(".");
						if (type == 'balane') {
							this.yearTotalBalance = splitPrice[0]
							this.yearTotalbackPrice = splitPrice[1]
						} else if (type == 'out') {
							this.yearTotalOut = splitPrice[0]
							this.yearTotalOutBackPrice = splitPrice[1]
						} else if (type == 'in') {
							this.yearTotalIn = splitPrice[0]
							this.yearTotalInBackPrice = splitPrice[1]
						}
					} else {
						if (type == 'balane') {
							this.yearTotalBalance = num
						} else if (type == 'out') {
							this.yearTotalOut = num
						} else if (type == 'in') {
							this.yearTotalIn = num
						}
					}
				},
				dateChange(e) {
					this.date = e.target.value.slice(0,7);
					let queryAnnualSummaryReportList = urls.m().queryAnnualSummaryReportList+'?year='+this.date+'&bookId='+2;
					requestApi(queryAnnualSummaryReportList,null).then((res)=>{
						let data = res[1].data.result
						this.list = res[1].data.result.data;
						
						this.totalprice(data.yearTotalBalance,'balane') 
						this.totalprice(data.yearTotalOut,'out')
						this.totalprice(data.yearTotalIn,'in')
					});
				},
				// 获取年月日信息
				getDate(type) {
					const date = new Date();
					let year = date.getFullYear();
					// let month = date.getMonth() + 1;
					if (type === 'start') {
						year = year - 60;
					} 
					else if (type === 'end') {
						year = year + 2;
					}
					return `${year}`;
				}
			}
	    };
</script>

export default {
	
}

<style>
	.head-class{
		width: 100%;
		height: 262rpx;
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
		margin: -13rpx 0px 0px 330rpx;
	}
	.head-income{
		margin: 16rpx 0px 0px 0px;
		width: 50%;
	}
	.head-expenditure{
		margin: -42rpx 0px 0px 350rpx;
		width:50%
	}
</style>
