<template>
	<view class="head-backColor">
		<view class="head-class">
			
		</view>
		<view class="head-in-class" :class="head_in_class?'click':''" @click="clickChange(2)"><view class="text-in-class" style="margin-top:6px;margin-left:27rpx;font-size:13px" :style="inColor">支出</view></view>
		<view class="head-out-class" :class="head_out_class?'click':''" @click="clickChange(1)"><view style="margin-top:6px;margin-left:27rpx;font-size:13px" :style="outColor">收入</view></view>
		
		<view class="head_out_class1" :class="head_out_class1?'click':''" @click="clickChange1(1)"><view style="margin-top:10rpx;margin-left:36rpx;" :style="outColor1">周</view></view>
		<view class="head_out_class2" :class="head_out_class2?'click':''" @click="clickChange1(2)"><view style="margin-top:10rpx;margin-left:36rpx;" :style="outColor2">月</view></view>
		<view class="head_out_class3" :class="head_out_class3?'click':''" @click="clickChange1(3)"><view style="margin-top:10rpx;margin-left:36rpx;" :style="outColor3">年</view></view>
		<view style="margin-top:145px;margin-left:35rpx;">
			<picker mode="date" :value="date" :style="yearStyle" fields="year" :start="startDate" :end="endDate" @change="dateChange" style="margin-top:-224rpx;margin-left:22rpx;display: none;">
				<view style="display:flex;flex-wrap: wrap;">
					<view>{{date}}年</view>
				</view>
				<p style="width:29%;height:2px;margin:4px 0px 0px -28px;padding:0px;background-color: black;overflow:hidden;"></p>
				<p style="width:100%;height:1px;margin:0rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
			</picker>
			<picker mode="date" :value="monthDate" :style="monthStyle" fields="month" :start="startMonthDate" :end="endMonthDate" @change="dateChangeMonth" style="margin-top:-224rpx;margin-left:22rpx;display: none;">
				<view style="display:flex;flex-wrap: wrap;">
					<view>{{monthDate}}</view>
				</view>
				<p style="width:29%;height:2px;margin:4px 0px 0px -28px;padding:0px;background-color: black;overflow:hidden;"></p>
				<p style="width:100%;height:1px;margin:0rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
			</picker>
			<view style="margin-top:-227rpx;" :style="weekStyle">
				<view style="margin-left:24rpx">本周</view>
				<p style="width:29%;height:2px;margin:4px 0px 0px -28px;padding:0px;background-color: black;overflow:hidden;"></p>
				<p style="width:100%;height:1px;margin:0rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
			</view>
		</view>
		<view style="margin: 22rpx 0px 0px 46rpx;font-size:13px;color: #737373;">
			<view>总{{zcText}}:</view> <view style="width:400rpx;margin:-16px 0px 0px 97rpx;">{{total}}</view>
			<view style="margin-top:10rpx">平均值:</view>
			<view style="width:400rpx;margin:-16px 0px 0px 97rpx;">{{average}}</view>
		</view>
		<view class="box">
		    <view class="charts-box">
		        <qiun-data-charts type="line" :chartData="chartData" :opts="optsLine" background="none"/>
		    </view>
		</view>
		<tab-bar :currentPage="1"></tab-bar>
    </view>
</template>

<script>
	// 进入js模块
	import urls from '../../api/request.js'
	import {requestApi} from '../../api/api.js'
    export default {
        data() {
			const currentDate = this.getDate({format: 'yyyy'});
			const currentMonthDate = this.getMonthDate({format: 'yyyy-MM'})
            return {
				yearChar:[],
                chartData:{},
				head_in_class:'',
				head_out_class:'',
				inColor:'',
				outColor:'',
				head_out_class1:'',
				head_out_class2:'',
				head_out_class3:'',
				outColor1:'',
				outColor2:'',
				outColor3:'',
				average:'',
				total:'',
				date: currentDate,
				monthStyle:'',
				yearStyle:'',
				weekStyle:'',
				monthDate:currentMonthDate,
				infoPayType:'',
				month:'',
				zcText:'',
				billType:'',
				optsLine: {
					"dataLabel": false,
					"color": ['#ffda66'],
					"legend": {
						"show": false,
						"position": "right",
						"lineHeight": 25,
					},
					"yAxis":{
						"disabled":true
					},
					"xAxis":{
						"fontSize":8
					},
					"extra": {
						"line": {
							"type": "curve",
							"width": 2,
						},
						"tooltip": {
							"borderWidth": 0,
							"borderRadius": 0,
							"borderColor": "#000000",
							"borderOpacity": 0.7,
							"bgColor": "#000000",
							"bgOpacity": 0.7,
							"gridType": "solid",
							"dashLength": 4,
							"gridColor": "#CCCCCC",
							"fontColor": "#FFFFFF",
							"splitLine": true,
							"horizentalLine": false,
							"labelBgColor": "#FFFFFF",
							"labelBgOpacity": 0.7,
							"labelFontColor": "#666666"
						}

					}
				}
				
            }
        },
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			startMonthDate(){
				return this.getMonthDate('start');
			},
			endMonthDate(){
				return this.getMonthDate('end');
			}
		},
        methods: {
            ChartMethod:function(type){
				const selectBill =uni.getStorageSync('selectBill');
				if (type === "year") {
					let billBookReportGatherController = urls.m().billBookReportGatherController+"?bookId="+selectBill.bookId+"&infoPayType="+this.infoPayType+"&year="+this.date
					requestApi(billBookReportGatherController,null).then((res)=>{
						this.yearChar = res[1].data.result.result;
						this.total = res[1].data.result.total;
						this.average = res[1].data.result.average;
						this.chartData = {categories: this.yearChar.map(item=>`${item.date}月`),
							  series: [{
								name: "支出",
								data: this.yearChar.map(item=>item.value),
							  }]}
					}) 
				} else if (type === 'month') {
					let year = this.monthDate.slice(0,4)
					let month = this.month;
					let queryReporyByMonth = urls.m().queryReporyByMonth+"?bookId="+selectBill.bookId+"&infoPayType="+this.infoPayType+"&year="+year+"&month="+month
					requestApi(queryReporyByMonth,null).then((res)=>{
						this.yearChar = res[1].data.result.result;
						this.total = res[1].data.result.total;
						this.average = res[1].data.result.average;
						this.chartData = {categories: this.yearChar.map(item=>`${item.date}`),
							  series: [{
								name: "支出",
								data: this.yearChar.map(item=>item.value),
							  }]}
					}) 
				} else if (type === 'week'){
					let queryReporyByWeek = urls.m().queryReporyByWeek+"?bookId="+selectBill.bookId+"&infoPayType="+this.infoPayType
					requestApi(queryReporyByWeek,null).then((res)=>{
						this.yearChar = res[1].data.result.result;
						this.total = res[1].data.result.total;
						this.average = res[1].data.result.average;
						this.chartData = {categories: this.yearChar.map(item=>`${item.date}`),
							  series: [{
								name: "支出",
								data: this.yearChar.map(item=>item.value),
							  }]}
					}) 
				}
			},
			clickChange:function(type){
				this.infoPayType = type
				if (type === 1) {
					this.zcText = '支出'
					this.head_in_class = false 
					this.head_out_class=true
					this.inColor = 'color:#330000'
					this.outColor = 'color:white'
					this.isInHider = 'display:none'
					this.isOutHider = ''
				} else if (type === 2) { 
					this.zcText = '收入'
					this.head_in_class = true
					this.head_out_class=false
					this.inColor = 'color:white'
					this.outColor = 'color:#330000'
					this.isInHider = ''
					this.isOutHider = 'display:none'
				}
				this.clickChange1(this.billType)
			},
			clickChange1:function(type) {
				this.billType = type;
				if (type === 1) {
					this.head_out_class1 = true
					this.head_out_class2=false
					this.head_out_class3=false
					this.outColor1 = 'color:white'
					this.outColor2 = 'color:#330000'
					this.outColor3 ='color:#330000'
					this.monthStyle = 'display:none';
					this.yearStyle = 'display:none'
					this.weekStyle = 'display:block'
					this.ChartMethod('week')
				} else if (type === 2) {
					this.head_out_class1 = false 
					this.head_out_class2=true
					this.head_out_class3=false
					this.outColor1 = 'color:#330000'
					this.outColor2 = 'color:white'
					this.outColor3 = 'color:#330000'
					this.monthStyle = 'display:block';
					this.yearStyle = 'display:none'
					this.weekStyle = 'display:none'
					this.ChartMethod('month')
				} else if (type === 3) {
					this.head_out_class1 = false
					this.head_out_class2=false
					this.head_out_class3=true
					this.outColor1 = 'color:#330000'
					this.outColor2 ='color:#330000'
					this.outColor3 = 'color:white'
					this.monthStyle = 'display:none';
					this.yearStyle = 'display:block';
					this.weekStyle = 'display:none'
					this.ChartMethod('year')
				}
			},
			dateChange(e) {
				this.date = e.target.value.slice(0,7);
				this.ChartMethod('year');
			},
			dateChangeMonth(e) {
				this.monthDate = e.target.value.slice(0,4)+"年"+e.target.value.slice(5,7)+"月";
				this.month = e.target.value.slice(5,7);
				this.ChartMethod('month')
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
			},
			getMonthDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				if (type === 'start') {
					year = year - 60;
				} 
				else if (type === 'end') {
					year = year + 2;
				}
				this.month = month;
				return `${year}年${month}月`;
			}
        },
		onLoad:function() {
			this.clickChange(2);
			this.clickChange1(1);
		}
    }
</script>

<style lang="scss" scoped>
    .box {
        padding: 30rpx;
        .title {
            font-size: 32rpx;
            font-weight: bold;
        }
        .charts-box{
          width: 100%;
          height:379rpx;
        }
    }
	.head-backColor{
		background-color: white;
		height: 100vh;
	}
	.head-class{
		width: 100%;
		height: 200rpx;
		background-color: #ffda66;
	}
	.head-in-class{
		width: 100rpx;
		border: 1px solid #00001a;
		height: 60rpx;
		margin: -92rpx 0rpx 0rpx 58rpx;
		border-radius:17rpx 0rpx 0rpx 17rpx
	}
	.head_out_class1{
		width: 100rpx;
		border: 1px solid #00001a;
		height: 63rpx;
		margin: -65rpx 0rpx 0rpx 380rpx;
		border-radius:17rpx 0rpx 0rpx 17rpx
	}
	.head_out_class2{
		width: 100rpx;
		border: 1px solid #00001a;
		height: 63rpx;
		margin: -66rpx 0rpx 0rpx 482rpx;
	}
	.head_out_class3{
		width: 100rpx;
		border: 1px solid #00001a; 
		height: 63rpx;
		margin: -67rpx 0rpx 0rpx 584rpx;
		border-radius:0rpx 17rpx 17rpx 0rpx
	}
	.head_out_class1.click{background-color: rgb(45, 45, 45);}
	.head_out_class2.click{background-color: rgb(45, 45, 45);}
	.head_out_class3.click{background-color: rgb(45, 45, 45);}
	.head-in-class.click{
		background-color: rgb(45, 45, 45);
	}
	.head-out-class{
		margin: -65rpx 0rpx 0rpx 158rpx; 
		border: 1px solid #00001a;
		width: 100rpx;
		height: 60rpx;
		border-radius:0rpx 17rpx 17rpx 0rpx
	}
	.head-out-class.click{
		background-color: rgb(45, 45, 45);
	}
</style>