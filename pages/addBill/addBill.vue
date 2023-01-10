<template>
	<view class="head-backColor">
		<view class="head-class">
			
		</view>
		<view class="head-in-class" :class="head_in_class?'click':''" @click="clickChange(2)"><view class="text-in-class" style="margin-top:10rpx;margin-left:90rpx;" :style="inColor">支出</view></view>
		<view class="head-out-class" :class="head_out_class?'click':''" @click="clickChange(1)"><view style="margin-top:10rpx;margin-left:90rpx;" :style="outColor">收入</view></view>
		<view style="display: flex;flex-flow: wrap;" :style="isInHider">
			<view  style="width: 130rpx;height: 188rpx;margin-left:39rpx" v-for="(item,index) in list">
				<view class="icon-class" :class="item.typeId===positionIds?'backgound-color':''" @click="clickItem(item)">
					<image :src="item.typeIcon" class="icon-img">
				</view>
				<text style="margin-left:52rpx;font-size:13px;font-weight: bold;color: rgb(96,98,102);">{{item.typeName}}</text>
			</view>
			<view  style="width: 130rpx;height: 188rpx;margin-left:39rpx">
				<view class="icon-class" :class="999===positionIds?'backgound-color':''" @click="setting(999)">
					<image src="../../static/addBill/set.png" class="icon-img">
				</view>
				<text style="margin-left:52rpx;font-size:13px;font-weight: bold;color: rgb(96,98,102);">设置</text>
			</view>
		</view>
		<view style="display: flex;flex-flow: wrap;" :style="isOutHider">
			<view class="admin-list" style="width: 130rpx;height: 188rpx;margin-left:39rpx" v-for="(item,index) in list">
				<view class="icon-class" :class="item.typeId===positionIds?'backgound-color':''" @click="clickItem(item)">
					<image :src="item.typeIcon" class="icon-img">
				</view>
				<text style="margin-left:52rpx;font-size:13px;font-weight: bold;color: rgb(96,98,102);">{{item.typeName}}</text>
			</view>
			<view  style="width: 130rpx;height: 188rpx;margin-left:39rpx">
				<view class="icon-class" :class="888===positionIds?'backgound-color':''" @click="setting(888)">
					<image src="../../static/addBill/set.png" class="icon-img">
				</view>
				<text style="margin-left:52rpx;font-size:13px;font-weight: bold;color: rgb(96,98,102);">设置</text>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" backgroundColor="white">
			<view><input type="number" v-model="money" placeholder="0.00" style="font-size:70rpx;margin:50rpx 0px 0px 100rpx;width:300rpx;height:180rpx;"></view>
			<p style="width:90%;height:1px;margin:22rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
			<view>
				<view><image src="../../static/addBill/rili.png" style="width:50rpx;height:50rpx;margin:0px 0px 0px 32px;"></view>
				<view style="margin:-68rpx 0px 0px 150rpx;"><text style="font-size:27rpx;color: rgb(123,125,128);">日期</text> </view>
				<view style="margin:-36rpx 0px 0px 231rpx;font-size:14px;font-weight: bold;color: rgb(123,125,128);">
					<picker mode="date" :value="date" fields="day" :start="startDate" :end="endDate" @change="dateChange"><view>{{date}}</view></picker>
				</view>
			</view>
			<view>
				<view><image src="../../static/addBill/zhanghu.png" style="width:50rpx;height:50rpx;margin:68rpx 0px 0px 32px;"></view>
				<view style="margin:-68rpx 0px 0px 150rpx;"><text style="font-size:27rpx;color: rgb(123,125,128);" >账户</text> </view>
				<view style="display:flex;flex-flow:wrap;margin:-50rpx 0px 0px 232rpx;font-size: 13px;">
					<view v-for="(item,index) in payList">
						<view style="border:1px solid black;width:90rpx;height:58rpx;text-align:center;" 
						:style="item.id===1?'border-radius:10px 0px 0px 10px':item.id===5?'border-radius:0px 10px 10px 0px':''" 
						@click="payClick(item)" >
							<view style="margin-top: 8rpx;" :class="item.id===positionPayIds?'font-color':''">{{item.payName}}</view></view>
					</view> 
				</view>
				<view>
					<view><image src="../../static/addBill/fenlei.png" style="width:50rpx;height:50rpx;margin:30rpx 0px 0px 32px;"></view>
					<view style="margin:-57rpx 0px 0px 150rpx;"><text style="font-size:27rpx;color: rgb(123,125,128);">分类</text> </view>
					<view style="margin:-42rpx 0px 0px 234rpx"><text style="font-size:13px;font-weight:bold;color: rgb(96,98,102);">{{typeName}}</text> </view>
				</view>
				<view>
					<view><image src="../../static/addBill/zhangben.png" style="width:50rpx;height:50rpx;margin:30rpx 0px 0px 32px;"></view>
					<view style="margin:-57rpx 0px 0px 150rpx;"><text style="font-size:27rpx;color: rgb(123,125,128);">账本</text> </view>
					<view style="margin:-42rpx 0px 0px 234rpx"><text style="font-size:13px;font-weight:bold;color: rgb(96,98,102);">{{bookName}}</text> </view>
				</view>
				<view>
					<view><image src="../../static/addBill/beizhu.png" style="width:50rpx;height:50rpx;margin:30rpx 0px 0px 32px;"></view>
					<view style="margin:-57rpx 0px 0px 150rpx;"><text style="font-size:27rpx;color: rgb(123,125,128);">备注</text> </view>
					<view style="margin:-42rpx 0px 0px 234rpx">
						<input type="text" v-model="remark" placeholder="添加备注" style="font-size:13px"/>
					</view>
				</view>
				<view style="margin-top:35rpx;margin-left:100rpx;display:flex;">
					<view><button style="width:220rpx;height:85rpx;font-size: 15px;background-color: rgb(113,213,161);" @click="saveInfo(1)">保存</button></view>
					<view><button style="width:220rpx;margin-left:87rpx;height:85rpx;font-size: 15px;background-color: rgb(251,189,113);" @click="saveInfo(2)">再记一笔</button></view>
				</view>
			</view>
		</uni-popup> 
	</view> 
</template>

<script>
		// 进入js模块
		import urls from '../../api/request.js'
		import {requestApi} from '../../api/api.js'
	    export default {	
	        data() {
				const currentDate = this.getDate({format: 'yyyy-mm-dd'});
	            return {
					head_in_class:true,
					head_out_class:false,
					inColor:'color:white',
					outColor:'color:#330000',
					isOutHider:'',
					isInHider:'',
					imgBackColor:false,
					list:[],
					positionIds:[],
					positionPayIds:[],
					date: currentDate,
					typeName:'',
					bookId:'',
					bookName:'',
					payName:'',
					money:'',
					remark:'',
					infoPayType:'',
					payList:[{
						id:1,
						payName:'微信'
					},{
						id:2,
						payName:'支付宝'
					},{
						id:3,
						payName:'银行卡'
					},{
						id:4,
						payName:'现金'
					},{
						id:5,
						payName:'其他'
					}]
	            };
	        },
			onShow:function(){
				this.clickChange(2);
				this.positionIds = []
			},
	        methods: {
				clickChange:function(type){
					this.infoPayType = type
					if (type === 1) {
						this.onAllIcon(2);
						this.head_in_class = false 
						this.head_out_class=true
						this.inColor = 'color:#330000'
						this.outColor = 'color:white'
						
						this.isInHider = 'display:none'
						this.isOutHider = ''
						
					} else if (type === 2) { 
						this.onAllIcon(1)
						this.head_in_class = true
						this.head_out_class=false
						this.inColor = 'color:white'
						this.outColor = 'color:#330000'
						
						this.isInHider = ''
						this.isOutHider = 'display:none'
					}
				},
				onAllIcon:function(type) {
					let queryBillType = urls.m().queryBillType+"?type="+type
					requestApi(queryBillType,null).then((res)=>{
						this.list = res[1].data.result
					})
					const selectBill=uni.getStorageSync('selectBill');
					if (selectBill != '') {
						this.bookId = selectBill.bookId;
						this.bookName = selectBill.bookName;
					}
				},
				clickItem:function(item) {
					this.positionIds = item.typeId
					this.typeName = item.typeName
					this.$refs['popup'].open()
				},
				payClick:function(item) {
					this.positionPayIds = item.id
					this.payName = item.payName
				},
				dateChange(e) {
					this.date = e.target.value;
				},
				// 获取年月日信息
				getDate(type) {
					const date = new Date();
					let year = date.getFullYear();
					if (type === 'start') {
						year = year - 60;
					} 
					else if (type === 'end') {
						year = year + 2;
					} 
					let month = date.getMonth()+1;
					month = month > 9?month:'0'+month
					let day = date.getDate()
					day = day > 9?day:'0'+day
					return `${year}-${month}-${day}`;
				},
				saveInfo(type) {
					let addBookInfo = urls.m().addBookInfo
					if (this.payName === '') {
						uni.showToast({
							title: '请填写支付方式',
							//将值设置为 success 或者直接不用写icon这个参数
							icon: 'error',
							//显示持续时间为 2秒
							duration: 2000
						}) 
						return;
					} else if (this.money === '') {
						uni.showToast({
							title: '请输入记账金额',
							//将值设置为 success 或者直接不用写icon这个参数
							icon: 'error',
							//显示持续时间为 2秒
							duration: 2000
						}) 
						return;
					}
					let data = {bookId:this.bookId,payName:this.payName,typeId:this.positionIds
					,infoMoney:this.money,infoPayType:this.infoPayType,infoRemark:this.remark,infoDate:this.date}
					requestApi(addBookInfo,data).then((res)=>{
						if (res[1].statusCode === 200) {
							if (type === 2) {
								uni.showToast({
									title: '记账成功',
									icon: 'none',
									duration: 2000
								})
								this.money = ''
								this.remark = ''
							} else {
								uni.redirectTo({
									url:'/pages/detail/detail'
								})
							}
						}
					})
				},
				setting(id){
					this.positionIds = id
					uni.navigateTo({
						url:'/pages/setting/settingIcon?iconId='+id
					})
				}
			}
	    };
</script>

<style>
	.head-backColor{
		background-color: white;
		height: 100vh;
	}
	.head-class{
		width: 100%;
		height: 100rpx;
		background-color: #ffda66;
	}
	.head-in-class{
		width: 240rpx;
		border: 1px solid #00001a;
		height: 60rpx;
		margin: -92rpx 0rpx 0rpx 136rpx;
		border-radius:17rpx 0rpx 0rpx 17rpx
	}
	.head-in-class.click{
		background-color: rgb(45, 45, 45);
	}
	.head-out-class{
		margin: -64rpx 0rpx 0rpx 380rpx; 
		border: 1px solid #00001a;
		width: 240rpx;
		height: 60rpx;
		border-radius:0rpx 17rpx 17rpx 0rpx
	}
	.head-out-class.click{
		background-color: rgb(45, 45, 45);
	}
	.icon-class{
		border-radius:100px;
		overflow:hidden;
		background-color:rgb(247, 247, 247);
		margin:49rpx 0rpx 0rpx 26rpx;
		width: 100rpx;
		height: 100rpx;
	}
	.icon-class.backgound-color{
		background-color: #ffda66;
	}
	.icon-img{
		margin: 25rpx 0rpx 0rpx 21rpx;
		width: 60rpx;
		height: 60rpx;
	}
	.font-color{
		color: #ffda66
	}
</style>