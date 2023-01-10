<template>
	<view>
		<view style="margin-top: 20rpx;height: 75rpx;">
			<text style="margin-left: 20rpx;">账本名称</text>
			<text style="margin-left: 470rpx;">{{bookName}}</text>
		</view>
		<!-- <view style="margin-top: 10rpx;display: flex;">
			<text style="margin-left: 20rpx;">账本权限</text>
			<view style="margin-left: 470rpx;width: 90rpx;text-align: right;">
				<text>{{selectPermission}}</text>
			</view>
			<view @click="editBillPermission()">
				<image class="rightarrow" :src="'/static/images/'+imageSwitch"></image>
			</view>
		</view> -->
		<view class="out">
			<view v-for="(item,index) in users" :key="index" @click="selectUser(index)">
				<view class="row" hover-class="viewclick">
					<view class="icon-class" >
						<image :src="item.userImg" class="icon-img">
					</view>
					<view style="font-weight:bold;text-indent:-22rpx;width:133rpx;padding-left:34px;padding-left: 38px;margin-top:-17rpx;font-size:15px;">{{item.userName}}</view>	
					<view style="font-size:10px;margin-top:-27px;width:85rpx;padding-left:64rpx;font-size:14px;" :class="{admin:item.sharePower=='0'}">
						{{item.sharePower | formatPower}}
					</view>	
				</view>
			</view>
			<view class="row" style="border:1px dashed  #d9d9d9;text-indent: 80rpx;line-height: 280rpx;" @click="shareNewUser()">
				<image style="width: 50rpx;height: 50rpx;" src="../../../static/image/addshare.jpg" ></image>
			</view>
		</view>
	</view>
</template>

<script>
	import urls from '../../../api/request.js'
	import {requestApi} from '../../../api/api.js'
	export default {
		data() {
			return {
				bookName:"",
				// selectPermission:"",
				// shareArrow:['rightarrow.png','downarrow.png'],
				// imageSwitch:"rightarrow.png",
				// permissionArray:['只读','可编辑']
				adminOperator:['设置为可编辑权限','设置为只读权限','删除成员'],
				users:[],
			}
		},
		methods: {
			selectUser(index){
				uni.showActionSheet({
					itemList: this.adminOperator,
					success:  (res)=> {
						const selectBill=uni.getStorageSync('selectBill');
						let shareId=this.users[index].shareId;
						if(res.tapIndex===0||res.tapIndex===1){
							let sharePower=res.tapIndex+1;
							let updateUserBillPermession=urls.m().updateUserBillPermession+"?shareId="+shareId+"&sharePower="+(res.tapIndex+1);
							requestApi(updateUserBillPermession,null).then((res)=>{
								
							});
						}else{
							let deleteUserBillPermession=urls.m().deleteUserBillPermession+"?shareId="+shareId;
							requestApi(deleteUserBillPermession,null).then((res)=>{
							 	
							});
						}
					}
				});
			},
			shareNewUser(){
				debugger;
				const selectbill=uni.getStorageSync("selectBill");
				uni.share({
				    provider: 'weixin',
				    scene: "WXSceneSession",
				    type: 5,
				    imageUrl: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/962fc340-4f2c-11eb-bdc1-8bd33eb6adaa.png',
				    title: '欢迎体验口袋账本',
				    miniProgram: {
				        id: 'gh_0aae9fd25c22',
				        path: 'pages/detail/detail?bookId='+selectbill.bookId+"userId="+selectbill.userId,
				        type: 1,
				        webUrl: 'http://uniapp.dcloud.io'
				    },
				    success: ret => {
				        console.log(JSON.stringify(ret));
				    }
				});
				
			}
			// editBillPermission(){
			// 	this.imageSwitch=this.shareArrow[1];
			// 	uni.showActionSheet({
			// 		itemList: this.permissionArray,
			// 		success:  (res)=> {
			// 			this.imageSwitch=this.shareArrow[0];
						
			// 			this.selectPermission=this.permissionArray[res.tapIndex];
			// 			const selectBill=JSON.parse(uni.getStorageSync('selectBill'));
			// 			let updateShareBillBatch=urls.m().updateShareBillBatch+"?bookId="+selectBill.bookId+"&sharePower="+(res.tapIndex+1);
			// 			requestApi(updateShareBillBatch,null).then((res)=>{
							
			// 			});
			// 		}
			// 	});
			// }
		},
		onLoad(){
			const selectBill=uni.getStorageSync("selectBill");
			this.bookName=selectBill.bookName;

			let queryUserByBookId=urls.m().queryUserByBookId+"?bookId="+selectBill.bookId;
			requestApi(queryUserByBookId,null).then((res)=>{

				this.users=res[1].data.result;
			});
		},
		filters:{
			formatPower(sharePower){
				let showField;
				if(sharePower==='1'){
					showField='可编辑';
				}else if(sharePower==='2'){
					showField='只读';
				}else{
					showField='管理员';
				}
				return showField;
			}
		},
	}
</script>

<style lang="scss">
	// .rightarrow{
	// 	width: 40rpx;
	// 	height: 40rpx;
	// 	margin-left: 10rpx;	
	// }
	
	.out{
		display: flex;
		margin-top: 10rpx;
		flex-flow: wrap;
		.row{
			width: 210rpx;
			height: 250rpx;
			margin-left: 25rpx;
			margin-top: 20rpx;
			// text-indent: 30rpx;
			line-height: 90rpx; 
			background-color: white;
			justify-content: center;
			border-radius: 10px;
			border-style:outset;
			border-width:1px;
		    border:1px solid #d9d9d9;
			box-shadow: 1.5px 1px 1px 1px #f2f2f2;
		}
		.admin{
			color: red;
		}
	}
	.viewclick{
		opacity: 0.5;
	}
	.icon-class{
		border-radius:100px;
		overflow:hidden;
		background-color:rgb(247, 247, 247);
		margin:30rpx 0rpx 0rpx 42rpx;
		width: 120rpx;
		height: 120rpx;
	}
	.icon-img{
		margin: 0rpx ​0rpx 0rpx 0rpx;
		width: 120rpx;
		height: 120rpx;
	}
</style>

