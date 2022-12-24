<template>
	<view>
		<tab-bar :currentPage="0"></tab-bar>
		<!-- <view class="headStyle">
			<text class="pageTitle">口袋账本</text>
		</view> -->
		<view class="headStyle">
			<text style="margin-left: 40rpx;">{{year}}</text>
			<text class="incomeandexpense" style="margin-left: 120rpx;">收入</text>
			<text class="incomeandexpense" style="margin-left: 182rpx;">支出</text>
		</view>
		
		<view class="headStyle flex">
			<text class="flag">{{month}}</text>
			<view @tap="openModel"><image class="select" src="/static/images/select.png"></image></view>
			<text class="incomeMoney">{{monthIn}}</text>
			<text class="expenseMoney">{{monthOut}}</text>
		</view>
		
		<view class="flex">
			<text class="billbook">{{selectBill}}</text>
			<view>
				<navigator url="/pages/detail/myBookList/myBookList" open-type="navigate">
					<image class="lrarraw" src="/static/images/lrarrow.png"></image>
				</navigator>
			</view>
			<text class="sharebill">共享账本</text>
			<view>
				<navigator url="/pages/detail/billShare/billShare" open-type="navigate">
					<image class="lrarraw" src="/static/images/share.png"></image>
				</navigator>
			</view>
			<text class="search">搜索</text>
			<view>
				<navigator url="/pages/detail/detailSearch/detailSearch" open-type="navigate">
					<image class="lrarraw" src="/static/images/search.png"></image>
				</navigator>
			</view>
		</view>
		
		<view class="out">
			<view v-for="(item,index) in billDetails" :key="index" >
				<view class="row">
					<view class="detailTop">
						<view class=".detailTopItem" style="margin-left: 45rpx;">{{item.infoDate | formatDate}}</view>
						<view class=".detailTopItem" style="margin-left: 50rpx;">收入 {{item.dayIn}}</view>
						<view class=".detailTopItem" style="margin-left: 190rpx;">支出 {{item.dayOut}}</view>
					</view>	
					<view v-for="(itemIn,indexIn) in item.bookInfos" :key="indexIn" @click="selectBillDetail(indexIn)">
						<view class="detailDown">
							<text class=".detailDownItem" style="margin-left: 35rpx;width: 100rpx;">头像</text>
							<text class=".detailDownItem" style="margin-left: 20rpx;width: 120rpx;">{{itemIn.typeId}}</text>
							<text class=".detailDownItem" style="margin-left: 20rpx;width: 216rpx;">{{itemIn.infoRemark}}</text>
							<text class=".detailDownItem" style="margin-left: 20rpx;width: 216rpx;">{{itemIn.infoMoney}}</text>
						</view>
					</view>
						
				</view>
			</view>
		</view>
		<view class="date-wrapper">
			<!-- 弹出层 -->
			<view class="date-wrapper-model" v-if="visable">
				<view class="confirm-cancel">
					<text class="cancel" @tap="closeModel()">取消</text>
					<text class="confirm" @tap="handlerConfirmPicker">确认</text>
				</view>
				<view @tap="closeModel" style="flex: 3;"></view>
				<view style="flex: 2;">
					<picker-view class="picker-wrapper-current" :indicator-style="indicatorStyle" :value="pickerValue" @change="bindChange">
						<picker-view-column v-if="
							  type === 'year' ||
							  type === 'month' ||
							  type === 'date'">
							<text class="item" v-for="(item, index) in years" :key="index">{{item}}</text>
						</picker-view-column>
						<picker-view-column v-if="
							  type === 'date' ||
							  type === 'month'">
							<text class="item" v-for="(item, index) in months" :key="index">{{ item }}月</text>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabBar from '@/components/tabbar/tabbar.vue'
	import urls from '../../api/request.js'
	import {requestApi} from '../../api/api.js'
	export default {
		name: "DatePicker",
		components:{
			tabBar
		},
		props: {
			defaultValue: {
				// 默认值
				type: Array,
				default: () => {
					return [];
				},
			},
			type: {
				// 显示类型 year month date yearRange daterange monthrange
				type: String,
				default: "month",
			},
			format: {
				// 日期格式 目前仅支持 yyyy-mm-dd 和 yyyy-m-d
				type: String,
				default: "yyyy-mm-dd",
			},
			minYear: {
				// 起始年份
				type: String,
				default: "1990",
			}
		},
		data() {
			const date = new Date();
			const years = [];
			const year = date.getFullYear();
			const months = [];
			const month = date.getMonth() + 1;
			
			
			for (let i = this.minYear; i <= date.getFullYear(); i++) {
				years.push(i);
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i);
			}
			return {
				indicatorStyle: `height: 80rpx`,
				visable: false,
				pickerValue: [9999, month - 1],years,months,
				currents: [],
				textVal: "",
				year:(new Date()).getFullYear()+"年",
				month:(new Date()).getMonth()+1+"月",
				selectBill:"",
				monthIn:"",
				monthOut:"",
				billDetails:[],
				defaultValueCopy: [],
			};
		},
		methods: {
			openModel() {
				this.setVal(String(this.textVal).split(this.rangeSeparator));
				this.visable = true;
				this.defaultValueCopy = [];
			},
			setVal(defaultValue = []) {
				if (defaultValue.length > 0) {
					// 定义默认值
					try {
						let year = "";
						let month = "";	                           
						const splitVal = defaultValue[0].split("-");
						if (splitVal.length === 1) {
							year = splitVal[0];
						} else if (splitVal.length === 2) {
							year = splitVal[0];
							month = splitVal[1];
						}
						if (year !== "") {
							this.pickerValue[0] = this.years.indexOf(Number(year));
						}
						if (month !== "") {
							this.pickerValue[1] = this.months.indexOf(Number(month));
						}    
						this.currents = this.pickerValue;
					} catch (error) {
						console.error(error);
					}
				}
			},
			closeModel() {
				this.visable = false;
			},
			getDate() {
				const format = this.format;
				let currents = this.currents;
				const years = this.years;
				if (currents[0] === 9999) {
					currents[0] = years.length - 1;
				}
				const months = this.months;
				let year = years[currents[0]];
				let month = months[currents[1]];
				if (format.indexOf("mm") >= 0 && Number(month) < 10) {
					month = `0${month}`;
				}
				let changeVal = [];
				switch (this.type) {
					case "year":
						changeVal = [year];
						this.textVal = changeVal[0];
						break;
					case "month":
						changeVal = [year + "-" + month];
						this.textVal = changeVal[0];
						break;
					default:
						break;
				}
				console.log(this.textVal + "+++++++++++++" + changeVal)
				return changeVal
			},
			handlerConfirmPicker() {
				let date=String(this.getDate());
				this.year=date.split("-")[0]+"年";
				this.month=date.split("-")[1]+"月";
				this.closeModel();
				this.queryBillDetailsCustomize();
			},
			bindChange(e) {
				console.log(e)
				const currents = e.detail.value;
				this.currents = currents;
			},
			queryBillDetailsCustomize(){
				const selectBill=JSON.parse(uni.getStorageSync('selectBill'));
				
				debugger;
				let year=this.year.substr(0,this.year.length-1);
				let month=this.month.substr(0,this.month.length-1);
				
				var endDate = new Date(year,month,0).getDate();//获取指定月最后一天
				
				var startDate=new Date(year,month).getDate(); 
				
				var startTime=String(year+"-"+month+"-0"+startDate+" 00:00:00");
				
				var endTime=String(year+"-"+month+"-"+endDate+" 23:59:59");
				
				let queryBillDetailsCustomize=urls.m().queryBillDetailsCustomize+"?bookId="+selectBill.bookId
				+"&startTime="+startTime+"&endTime="+endTime;
				
				requestApi(queryBillDetailsCustomize,null).then((res)=>{
					debugger;
					this.monthIn=res[1].data.result.monthIn;
					this.monthOut=res[1].data.result.monthOut;
					this.billDetails=res[1].data.result.data;
				});
			},
			selectBillDetail(index){
				
			}
		},
		onLoad(){
			let userinfo = uni.getStorageSync('token');
			if (userinfo == '') {
				uni.navigateTo({
					url: '/pages/login/login',
					success:()=>{
						//跳转完页面后再关闭启动页
						//plus.navigator.closeSplashscreen();
					}
				});
			}
			const selectBill=JSON.parse(uni.getStorageSync('selectBill'));
			debugger;
			if(selectBill !==""){
				this.selectBill=selectBill.bookName;
				this.queryBillDetailsCustomize();
			}else{
				//需要从数据库中查
				requestApi(urls.m().queryDefaultBillByUserId,null).then((res)=>{
					const tmpSelectBill=res[1].data.result;
					uni.setStorageSync("selectBill",tmpSelectBill);
					this.selectBill=tmpSelectBill.bookName;
					this.queryBillDetailsCustomize();
				});
			}
		},
		filters:{
			formatDate(date){
				var date = new Date(date);
				
				var month = date.getMonth() + 1;
				var day = date.getDate();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				
				var weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				var weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

				var timer =  month + '月' + day +'日' + ' '+weekDay[date.getDay()];
				return timer;
			}
		},
	};
</script>

<style lang="scss" scoped>
	.flex{
		display: flex;
		.flag{
			margin-left: 40rpx;
		}
		.incomeMoney{
			font-size: 15px;
			margin-left: 102rpx;
		}
		.expenseMoney{
			font-size: 15px;
			margin-left: 210rpx;
		}
		.billbook{
			display: inline-block;
			width: 290rpx;
			height: 77rpx;
			text-indent: 50rpx;
			line-height: 70rpx;
			border-bottom: 2px solid #d9d9d9;
		}
		
		.sharebill{
			display: inline-block;
			width: 300rpx;
			height: 77rpx;
			text-indent: 50rpx;
			line-height: 70rpx;
			border-left: 1px solid #d9d9d9;
			border-right: 1px solid #d9d9d9;
			border-bottom: 2px solid #d9d9d9;
		}
		.search{
			display: inline-block;
			width: 158rpx;
			height: 77rpx;
			text-indent: 20rpx;
			line-height: 70rpx;
			border-bottom: 2px solid #d9d9d9;
		}
		.lrarraw{
			width: 50rpx;
			height: 50rpx;
			margin-left: -70rpx;
			margin-top: 10rpx;
			
		}
	}
	.headStyle{
		width: 750rpx;
		height: 57rpx;
		background-color: #ffda66;
		.incomeandexpense{
			font-size: 13px;
			color: #737373;
		}
		.pageTitle{
			margin-left: 317rpx;
			font-weight: bold;
		
		}
		.select{
			width: 35rpx;
			height: 35rpx;
			margin-left: 20rpx;
		}
	}

	.date-wrapper {
        height: 90rpx;
        flex-direction: row;
        align-items: center;
        display: flex;
		.date-wrapper-model {
		    position: fixed;
		    top: 0;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    z-index: 999;
		    background-color: rgba(0, 0, 0, 0.5);
		    display: flex;
		    flex-direction: column;
			.confirm-cancel {
			    position: absolute;
			    bottom: 575rpx;
			    left: 0;
			    width: 750rpx;
			    height: 100rpx;
			    background-color: #ffffff;
			    display: flex;
			    flex-direction: row;
			    z-index: 99999;
				.cancel {
				    flex: 1;
				    height: 100rpx;
				    padding-left: 30rpx;
				    line-height: 60rpx;
				    text-align: left;
				    font-size: 35rpx;
				    color: #3244fe;
				}
				 
				.confirm {
				    flex: 1;
				    height: 100rpx;
				    padding-right: 30rpx;
				    line-height: 60rpx;
				    text-align: right;
				    font-size: 35rpx;
				    color: #3244fe;
				}
			}
			.picker-wrapper-current {
			    width: 750rpx;
			    height: 100%;
			    flex: 1;
			    background-color: #ffffff;
				.item {
				    line-height: 80rpx;
				    height: 80rpx;
				    font-size: 30rpx;
				    background-color: #ffffff;
				    text-align: center;
				    justify-content: center;
				    align-items: center;
				    display: flex;
				}
			}
		}
    }
	
	.out{
		.row{
			width: 750rpx;
			.detailTop{
				display: flex;
				height: 60rpx;
				background-color: #d9d9d9;
			}
			.detailDown{
				display: flex;
				height: 105rpx;
				background-color: #f0f0f0;
			}
		}
	}
	.detailTopItem{
		display: inline-block;
		height: 60rpx;
		line-height: 50rpx;
		font-size: 25rpx;
	}
	.detailDownItem{
		display: inline-block;
		height: 105rpx;
		line-height: 100rpx;
		font-size: 25rpx;
		text-align: right;
	}
	
</style>