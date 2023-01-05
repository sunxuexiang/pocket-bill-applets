<template>
	<view >
		<view v-if="conditionVisible">
			<form @submit="formSubmit" @reset="formReset">
				<view class="billRemark">
					<view class="title">账单内容</view>
					<input class="uni-input" focus placeholder="请输入关键字" />
				</view>
				
				<view class="billRemark">
					<view class="title">开始日期</view>
					<input class="uni-input" :value="startTime" placeholder="请输入开始日期"  @tap="openModel(1)"/>
				</view>
				<view class="billRemark">
					<view class="title">结束日期</view>
					<input class="uni-input" :value="endTime" placeholder="请输入结束日期"  @tap="openModel(2)"/>
				</view>
				<view class="billRemark">
					<view class="title">金额范围</view>
					<view style="display: flex;">
						<view><input class="uni-input" style="width: 320rpx;" type="digit" placeholder="最小金额" /></view>
						<view style="width: 20rpx;margin-top: 35rpx;margin-left: 30rpx;">-</view>
						<view><input class="uni-input" style="width: 320rpx; margin-left: 20rpx;" type="digit" placeholder="最大金额" /></view>
					</view>
				</view>
				
				<view class="billRemark">
					<view class="title">记账人</view>
					<input class="uni-input" placeholder="请输入关键字" />
				</view>
				
				<view class="billbutton" style="display: flex;">
					
					<button class="uni-button"  style="background-color: white;" form-type="reset">重置</button>
					<button class="uni-button"  style="background-color: gold;" form-type="submit">确认</button>
				</view>
			</form>
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
								  type === 'date' ||
								  type === 'yearRange' ||
								  type === 'daterange' ||
								  type === 'monthrange'">
								<text class="item" v-for="(item, index) in years" :key="index">{{item}}</text>
							</picker-view-column>
							<picker-view-column v-if="
								  type === 'date' ||
								  type === 'month' ||
								  type === 'daterange' ||
								  type === 'monthrange'">
								<text class="item" v-for="(item, index) in months" :key="index">{{ item }}月</text>
							</picker-view-column>
							<picker-view-column v-if="type === 'date' || type === 'daterange'">
								<text class="item" v-for="(item, index) in days" :key="index">{{ item }}日</text>
							</picker-view-column>
							<picker-view-column v-if="
								  type === 'yearRange' ||
								  type === 'daterange' ||
								  type === 'monthrange' ||
								  type === 'weekRange'">
								<text class="item">{{ rangeSeparator }}</text>
							</picker-view-column>
							<!-- 范围选择 -->
							<picker-view-column v-if="
								  type === 'yearRange' ||
								  type === 'daterange' ||
								  type === 'monthrange'">
								<text class="item" v-for="(item, index) in years2" :key="index">{{item}}</text>
							</picker-view-column>
							<picker-view-column v-if="type === 'daterange' || type === 'monthrange'">
								<text class="item" v-for="(item, index) in months2" :key="index">{{ item }}月</text>
							</picker-view-column>
							<picker-view-column v-if="type === 'daterange'">
								<text class="item" v-for="(item, index) in days2" :key="index">{{ item }}日</text>
							</picker-view-column>
						</picker-view>
					</view>
				</view>
			</view>
		</view>
		
		<view>
			<view v-if="detailVisible" class="details">
				<view class="billSearch" style="display: flex;" >
					<input class="billSearch-input" placeholder="搜索账单" :value="inputClearValue" @input="clearInput" @click="switchPage()"/>
					<!-- <text class="uni-icon" v-if="showClearIcon" @click="clearIcon"></text> -->
				</view>
				
				<view  style="display: flex;margin-top: 20rpx;">
					<view class="fieldStyle" style="margin-left: 100rpx;">收入</view>
					<view class="fieldStyle" style="margin-left: 200rpx;">支出</view>
					<view class="fieldStyle" style="margin-left: 210rpx;">结余</view>
				</view>
				<view  style="display: flex;margin-top: 10rpx;">
					<view style="margin-left: 80rpx;">200.00</view>
					<view style="margin-left: 140rpx;">100.00</view>
					<view style="margin-left: 180rpx;">100.00</view>
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
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "DatePicker",
		props: {
			defaultValue: {
				// 默认值
				type: Array,
				default: () => {
					return [];
				},
			},
			placeholder: {
				type: String,
				default: "请选择"
			},
			type: {
				// 显示类型 year month date yearRange daterange monthrange
				type: String,
				default: "date",
			},
			rangeSeparator: {
				// 选择分隔符
				type: String,
				default: "到",
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
			let days = [];
			const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
			const day = date.getDate();
			for (let i = this.minYear; i <= date.getFullYear(); i++) {
				years.push(i);
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i);
			}
			if (new Date().getMonth() + 1 === 2) {
				days = [];
				if (
					(new Date().getFullYear() % 4 === 0 &&
						new Date().getFullYear() % 100 !== 0) ||
					new Date().getFullYear() % 400 === 0
				) {
					for (let i = 1; i < 30; i++) {
						days.push(i);
					}
				} else {
					for (let i = 1; i < 29; i++) {
						days.push(i);
					}
				}
			} else if (
				[4, 6, 9, 11].some((item) => new Date().getMonth() + 1 === item)
			) {
				days = [];
				for (let i = 1; i < 31; i++) {
					days.push(i);
				}
			} else if (
				[1, 3, 5, 7, 8, 10, 12].some((item) => new Date().getMonth() + 1 === item)
			) {
				days = [];
				for (let i = 1; i < 32; i++) {
					days.push(i);
				}
			}
			return {
				indicatorStyle: `height: 80rpx`,
				visable: false,
				pickerValue: [9999, month - 1, day - 1, null, 9999, month - 1, day - 1],
				years,
				years2: years,
				year,
				months,
				months2: months,
				month,
				days,
				days2: days,
				day,
				weeks,
				currents: [],
				textVal: "",
				defaultValueCopy: [],
				startTime:"",
				endTime:"",
				clickTimeFlag:"",
				detailVisible:false,
				conditionVisible:true,
				inputClearValue: '',
				showClearIcon: false,
			};
		},
		created() {
			console.log(uni.getSystemInfoSync().screenWidth + "++++++++++++++++++++++++" + Math.round(uni.getSystemInfoSync().screenWidth /
				(750 / 100)))
			this.defaultValueCopy = this.defaultValue
			if (this.defaultValueCopy.length !== 0) {
				const defaultValue = this.defaultValueCopy;
				if (defaultValue.length === 1) {
					this.textVal = defaultValue[0];
				} else if (defaultValue.length === 2) {
					this.textVal = `${defaultValue[0]}${this.rangeSeparator}${defaultValue[1]}`;
				}
			}
		},
		methods: {
			switchPage(){
				this.conditionVisible=true;
				this.detailVisible=false;
			},
			clearInput: function(event) {
				this.inputClearValue = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() {
				this.inputClearValue = '';
				this.showClearIcon = false;
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				this.conditionVisible=false;
				this.detailVisible=true;
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			openModel(clickTimeFlag) {
				this.clickTimeFlag=clickTimeFlag;
				const defaultValue = this.defaultValueCopy;
				if (defaultValue.length === 1) {
					this.textVal = defaultValue[0];
				} else if (defaultValue.length === 2) {
					this.textVal = `${defaultValue[0]}${this.rangeSeparator}${defaultValue[1]}`;
				}
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
						let day = "";
						let year2 = "";
						let month2 = "";
						let day2 = "";
						const splitVal = defaultValue[0].split("-");
						if (splitVal.length === 1) {
							year = splitVal[0];
						} else if (splitVal.length === 2) {
							year = splitVal[0];
							month = splitVal[1];
						} else if (splitVal.length === 3) {
							year = splitVal[0];
							month = splitVal[1];
							day = splitVal[2];
						}
						if (year !== "") {
							this.pickerValue[0] = this.years.indexOf(Number(year));
						}
						if (month !== "") {
							this.pickerValue[1] = this.months.indexOf(Number(month));
						}
						if (day !== "") {
							this.pickerValue[2] = this.days.indexOf(Number(day));
						}
						if (defaultValue.length === 2) {
							const splitVal2 = defaultValue[1].split("-");
							if (splitVal2.length === 1) {
								year2 = splitVal2[0];
							} else if (splitVal2.length === 2) {
								year2 = splitVal2[0];
								month2 = splitVal2[1];
							} else if (splitVal2.length === 3) {
								year2 = splitVal2[0];
								month2 = splitVal2[1];
								day2 = splitVal2[2];
							}
							if (year2 !== "") {
								this.pickerValue[4] = this.years2.indexOf(Number(year2));
							}
							if (month2 !== "") {
								this.pickerValue[5] = this.months2.indexOf(Number(month2));
							}
							if (day2 !== "") {
								this.pickerValue[6] = this.days2.indexOf(Number(day2));
							}
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
				if (currents[4] === 9999) {
					currents[4] = years.length - 1;
				}
				const months = this.months;
				const days = this.days;
				const days2 = this.days2;
				let year = years[currents[0]];
				let month = months[currents[1]];
				if (format.indexOf("mm") >= 0 && Number(month) < 10) {
					month = `0${month}`;
				}
				let day = days[currents[2]];
				if (format.indexOf("dd") >= 0 && Number(day) < 10) {
					day = `0${day}`;
				}
				let year2 = years[currents[4]];
				let month2 = months[currents[5]];
				if (format.indexOf("mm") >= 0 && Number(month2) < 10) {
					month2 = `0${month2}`;
				}
				let day2 = days2[currents[6]];
				if (format.indexOf("dd") >= 0 && Number(day2) < 10) {
					day2 = `0${day2}`;
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
					case "date":
						changeVal = [year + "-" + month + "-" + day];
						this.textVal = changeVal[0];
						break;
					case "yearRange":
						changeVal = [year, year2];
						this.textVal = `${changeVal[0]}${this.rangeSeparator}${changeVal[1]}`;
						break;
					case "daterange":
						changeVal = [`${year}-${month}-${day}`, `${year2}-${month2}-${day2}`];
						this.textVal = `${changeVal[0]}${this.rangeSeparator}${changeVal[1]}`;
						break;
					case "monthrange":
						changeVal = [`${year}-${month}`, `${year2}-${month2}`];
						this.textVal = `${changeVal[0]}${this.rangeSeparator}${changeVal[1]}`;
						break;
					default:
						break;
				}
				console.log(this.textVal + "+++++++++++++" + changeVal)
				return changeVal
			},
			handlerConfirmPicker() {
				//this.$emit("on-change", this.getDate());
				if(this.clickTimeFlag===1){
					this.startTime=this.getDate();
				}else{
					this.endTime=this.getDate();
				}
				this.closeModel();
			},
			bindChange(e) {
				console.log(e)
				const currents = e.detail.value;
				if (currents[1] + 1 === 2) {
					this.days = [];
					if (
						((currents[0] + this.minYear) % 4 === 0 &&
							(currents[0] + this.minYear) % 100 !== 0) ||
						(currents[0] + this.minYear) % 400 === 0
					) {
						for (let i = 1; i < 30; i++) {
							this.days.push(i);
						}
					} else {
						for (let i = 1; i < 29; i++) {
							this.days.push(i);
						}
					}
				} else if ([4, 6, 9, 11].some((item) => currents[1] + 1 === item)) {
					this.days = [];
					for (let i = 1; i < 31; i++) {
						this.days.push(i);
					}
				} else if (
					[1, 3, 5, 7, 8, 10, 12].some((item) => currents[1] + 1 === item)
				) {
					this.days = [];
					for (let i = 1; i < 32; i++) {
						this.days.push(i);
					}
				}
 
				if (currents[5] + 1 === 2) {
					this.days2 = [];
					if (
						((currents[4] + this.minYear) % 4 === 0 &&
							(currents[4] + this.minYear) % 100 !== 0) ||
						(currents[4] + this.minYear) % 400 === 0
					) {
						for (let i = 1; i < 30; i++) {
							this.days2.push(i);
						}
					} else {
						for (let i = 1; i < 29; i++) {
							this.days2.push(i);
						}
					}
				} else if ([4, 6, 9, 11].some((item) => currents[5] + 1 === item)) {
					this.days2 = [];
					for (let i = 1; i < 31; i++) {
						this.days2.push(i);
					}
				} else if (
					[1, 3, 5, 7, 8, 10, 12].some((item) => currents[5] + 1 === item)
				) {
					this.days2 = [];
					for (let i = 1; i < 32; i++) {
						this.days2.push(i);
					}
				}
				this.currents = currents;
			},
		},
	};
</script>
 
<style lang="scss" scoped>
	.billRemark{
		margin-top: 20rpx;
		margin-left: 20rpx;
		.title{
			font-size: 33rpx;
		}
		.uni-input{
			margin-top: 20rpx;
			width:700rpx;
			height: 70rpx;
			background-color: #f6f6f6;
			border-radius: 10px;
		}
	}
	
	.billbutton{
		position: absolute;
		bottom: 70rpx;
		width: 750rpx;
		height: 80rpx;
		display: flex;
		.uni-button{
			margin-top: 20rpx;
			width:350rpx;
			height: 80rpx;
			border: 1px solid black;
		}
	}
	.date-wrapper {
		height: 90rpx;
		flex-direction: row;
		align-items: center;
		display: flex;
	}
 
	.date-input {
		align-items: center;
		flex-direction: row;
	}
 
	.canlendar-icon {
		color: #3244fe;
		margin-left: 20rpx;
 
	}
 
	.date-wrapper-style {
		margin-left: 15rpx;
		color: #3244fe;
		font-size: 30rpx;
 
	}
 
	.arrow-right-icon {
		margin-left: 15rpx;
		color: #3244fe;
		margin-top: 10rpx;
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
	.details{
		background-color: #ffda66;
		width: 750rpx;
		height: 180rpx;
		.fieldStyle{
			font-size: 13px;
			color: #737373;
		}
		.billSearch{
			margin-left: 20rpx;
			.billSearch-input{
				width:700rpx;
				height: 70rpx;
				background-color: white;
				border-radius: 20px;
			}
			
		}
	}
	// .uni-icon {
	// 	background-image: url(../../../static/images/wrong.png);
	// 	font-family: uniicons;
	// 	font-size: 24px;
	// 	font-weight: normal;
	// 	font-style: normal;
	// 	width: 24px;
	// 	height: 24px;
	// 	line-height: 24px;
	// 	color: #999999;
	// }

	.uni-icon {
		background-image: url(../../../static/images/wrong.png); 
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
		width: 42upx;
		height: 32upx;
		margin-right:20upx;
	}

	
</style>
