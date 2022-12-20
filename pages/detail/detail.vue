<template>
	<view>
		<tab-bar :currentPage="0"></tab-bar>
		<view class="headStyle">
			<text class="pageTitle">口袋账本</text>
		</view>
		<view class="headStyle">
			<text style="margin-left: 40rpx;">{{year}}</text>
			<text class="incomeandexpense" style="margin-left: 120rpx;">收入</text>
			<text class="incomeandexpense" style="margin-left: 182rpx;">支出</text>
		</view>
		
		<view class="headStyle flex">
			<text class="flag">{{month}}</text>
			<view @tap="openModel"><image class="select" src="/static/images/select.png"></image></view>
			<text class="incomeMoney">12</text>
			<text class="expenseMoney">323213212</text>
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
					let data={bookId:1};
					uni.request({
						url:'http://localhost:8081/billBookInfoController/queryBillDetailsCustomize',
						method:"POST",
						data:data,
						dataType:"json",
						success:(res)=>{
							console.log(res);
						},
						fail(err) {
							console.log(err);
						}
					})
				}
			},
			onLoad(){
				let userinfo = uni.getStorageSync('token');
				if (userinfo == '') {
					uni.navigateTo({
						url: '/pages/login/login',
						success:()=>{
							//跳转完页面后再关闭启动页
							plus.navigator.closeSplashscreen();
						}
					});
				}
				
				const selectBill=uni.getStorageSync('selectBill');
				if(selectBill !==""){
					this.selectBill=JSON.parse(selectBill).bookName;
				}else{
					//需要从数据库中查
					this.selectBill="默认账本";
					
					uni.setStorageSync("selectBill","");
				}
				
			}
		};
</script>

<style lang="scss" scoped>
	.flex{
		display: flex;
	}
	.headStyle{
		width: 750rpx;
		height: 57rpx;
		background-color: #ffda66;
	}
	.pageTitle{
		margin-left: 317rpx;
		font-weight: bold;
	
	}
	.incomeandexpense{
		font-size: 13px;
		color: #737373;
	}
	.flag{
		margin-left: 40rpx;
	}
	.incomeMoney{
		font-size: 15px;
		margin-left: 102rpx;
	}
	.expenseMoney{
		font-size: 15px;
		margin-left: 195rpx;
	}
	.billbook{
		display: inline-block;
		width: 270rpx;
		height: 70rpx;
		text-indent: 50rpx;
		line-height: 70rpx;
		border-bottom: 1px solid #d9d9d9;
	}
	
	.sharebill{
		display: inline-block;
		width: 270rpx;
		height: 70rpx;
		text-indent: 50rpx;
		line-height: 70rpx;
		border-left: 1px solid #d9d9d9;
		border-right: 1px solid #d9d9d9;
		border-bottom: 1px solid #d9d9d9;
	}
	.search{
		display: inline-block;
		width: 208rpx;
		height: 70rpx;
		text-indent: 60rpx;
		line-height: 70rpx;
		border-bottom: 1px solid #d9d9d9;
	}
	.select{
		width: 35rpx;
		height: 35rpx;
		margin-left: 20rpx;
	}
	
	.lrarraw{
		width: 50rpx;
		height: 50rpx;
		margin-left: -70rpx;
		margin-top: 10rpx;
		
	}

	.date-wrapper {
        height: 90rpx;
        flex-direction: row;
        align-items: center;
        display: flex;
    }
 
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
    }
 
    .picker-wrapper-current {
        width: 750rpx;
        height: 100%;
        flex: 1;
        background-color: #ffffff;
    }
 
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
    }
 
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