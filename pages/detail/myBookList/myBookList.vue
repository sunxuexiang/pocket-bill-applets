<template>
	<view>
		<view class="out">
			<view v-for="(item,index) in bill" :key="index" @click="selectBill(index)">
				
				<view class="row" :class="{active:item.select}">
					<view style="font-weight: bold;">{{item.bookName}}</view>	
					<view style="font-size: 13px; margin-top: 40rpx;">创建时间</view>
					<view style="font-size: 10px; margin-top: -50rpx;">{{item.createDate | formatDate}}</view>	
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import urls from '../../../api/request.js'
	import {requestApi} from '../../../api/api.js'
	export default {
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			
			requestApi(urls.m().queryBillByUserId,null).then((res)=>{
				debugger;
				let result=res[1].data.result;
				for(let i=0;i<result.length;i++){
					if(result[i].isDefault==='1'){
						result[i].select=true;
					}else{
						result[i].select=false;
					}
				}
				this.bill=result;
			});
			
		},
		data() {
			return {
				bill:[]
			};
		},
		methods:{
			selectBill(index){
				let selectBill;
				for(let i=0;i<this.bill.length;i++){
					if(i==index){
						selectBill=this.bill[i];
						this.bill[i].select=true;
					}else{
						this.bill[i].select=false;
					}
				}
				uni.setStorageSync('selectBill',JSON.stringify(selectBill));
				let that=this;	
				setTimeout(function(){
					that.switchTab();	
				},300);
			},
			switchTab(){
				uni.switchTab({
					url: '/pages/detail/detail',
					success: (res) => {
						let page = getCurrentPages().pop();
						if (page == undefined || page == null) return;
						page.curSegment = 0;
						page.onLoad();
					},
				});
			}
		},
		filters:{
			formatDate(date){
				var date = new Date(date),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
				minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
				second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.out{
		display: flex;
		margin-top: 30rpx;
		.row{
			width: 220rpx;
			height: 260rpx;
			margin-left: 25rpx;
			text-indent: 30rpx;
			line-height: 90rpx;
			background-color: #d9d9d9;
			justify-content: center;
			border-radius: 13px;
			
		}
		.active{
			background-color: #EFF8FF;
			color: #0085FF;
			border: 1rpx solid #0085FF;
		}
	}
</style>