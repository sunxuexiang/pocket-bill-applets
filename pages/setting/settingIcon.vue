<template>
	<view class="head-backColor">
		<view class="head-class">
			
		</view>
		<view class="head-in-class" :class="head_in_class?'click':''" @click="clickChange(2)"><view class="text-in-class" style="margin-top:10rpx;margin-left:90rpx;" :style="inColor">支出</view></view>
		<view class="head-out-class" :class="head_out_class?'click':''" @click="clickChange(1)"><view style="margin-top:10rpx;margin-left:90rpx;" :style="outColor">收入</view></view>
		<view  :style="isInHider" style="padding-bottom:190rpx;">
			<view   v-for="(item,index) in list"
					:key="index"
					:data-index="index" 
					class="list-item" 
					@touchstart="drawStart" 
					@touchmove="drawMove"  
					@touchend="drawEnd" 
					:style="'right:'+item.right+'px'">
				<view style="margin:40rpx 0px 0px 20rpx;width:70rpx;height:70rpx;"><image src="../../static/addBill/jinzhi.png" style="width: 40rpx;height: 40rpx;"></view>
				<view class="icon-class" >
					<image :src="item.typeIcon" class="icon-img">
				</view>
				<view style="margin:-50rpx 0px 0px 150rpx;width:271rpx;"><text style="margin-left:52rpx;font-size:13px;font-weight: bold;color: rgb(96,98,102);">{{item.typeName}}</text></view>
				<view style="margin:-20px 0px 0px 650rpx;width:70rpx;height:70rpx;"><image src="../../static/addBill/henggang.png" style="width: 40rpx;height: 40rpx;"></view>
				
				<view class="remove" :style="index!=0?'height:160%;margin-top:-31rpx':''" @click="delData(item)" >删除</view>
				<p style="width:100%;height:1px;margin:0rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
			</view>
			<view style="width:100%;position:fixed;bottom:0;background-color:white;height:130rpx;box-shadow:1px 1px 4px 4px rgba(0, 0, 0, 0.1);display:flex"
			@click="clickItem1(0)">
				<view style="width:60rpx;height:60rpx;margin:34rpx 0px 0px 291rpx;">
					<image src="../../static/addBill/jiahao.png" style="width:40rpx;height:40rpx;">
				</view>
				<view style="margin:39rpx 0px 0px -19rpx;font-size:13px;color:#8a8a8a">添加类别</view>
			</view>
		</view>
		
		<view  :style="isOutHider" style="padding-bottom:190rpx;">
			<view   v-for="(item,index) in list"
					:key="index"
					:data-index="index" 
					class="list-item" 
					@touchstart="drawStart" 
					@touchmove="drawMove" 
					@touchend="drawEnd" 
					:style="'right:'+item.right+'px'">
				<view style="margin:40rpx 0px 0px 20rpx;width:70rpx;height:70rpx;"><image src="../../static/addBill/jinzhi.png" style="width: 40rpx;height: 40rpx;"></view>
				<view class="icon-class" >
					<image :src="item.typeIcon" class="icon-img">
				</view>
				<view style="margin:-50rpx 0px 0px 150rpx;width:271rpx;"><text style="margin-left:52rpx;font-size:13px;font-weight: bold;color: rgb(96,98,102);">{{item.typeName}}</text></view>
				<view style="margin:-20px 0px 0px 650rpx;width:70rpx;height:70rpx;"><image src="../../static/addBill/henggang.png" style="width: 40rpx;height: 40rpx;"></view>
				<view class="remove" :style="index!=0?'height:160%;margin-top:-31rpx':''" @click="delData(item)">删除</view>
				<p style="width:100%;height:1px;margin:0rpx auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></p>
			</view>
			<view 
			style="width:100%;position:fixed;bottom:0;background-color:white;height:130rpx;box-shadow:1px 1px 4px 4px rgba(0, 0, 0, 0.1);display:flex" 
			@click="clickItem1()">
				<view style="width:60rpx;height:60rpx;margin:34rpx 0px 0px 291rpx;">
					<image src="../../static/addBill/jiahao.png" style="width:40rpx;height:40rpx;">
				</view>
				<view style="margin:39rpx 0px 0px -19rpx;font-size:13px;color:#8a8a8a" >添加类别</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" backgroundColor="white">
			<view style="margin:30rpx 0rpx 0rpx 298rpx;font-size:13px">
				添加{{typeText}}类别
			</view>
			<view style="margin:-19px 0px 0px 616rpx;width:100rpx;height:100rpx">
				<button style="font-size:20rpx;border-radius:35%" @click="addBillType()" 
				 :disabled="disabled" :style="disabledColor">完成</button>
			</view>
			<view class="icon-class1" >
				<image :src="systemIconImage" class="icon-img1">
			</view>
			<view>
				<input type="text" v-model="typeName" @input="input" placeholder="请输入类别名称(不超过四个字)" style="font-size:30rpx;margin:28rpx 0px 0px 124rpx;width:70%;height:50rpx;border-radius:100rpx;border:1px solid rgb(247, 247, 247);background-color:rgb(247, 247, 247)">
			</view>
			
			<view >
				<view  v-for="(item,index) in systemIconParentIdList">
					<view style="margin:60rpx 0rpx 0rpx 340rpx;font-size:24rpx;">
						<text>{{item.typeName}}</text>
					</view>
					<view style="display: flex;flex-flow: wrap;">
						<view v-for="(systemItem, systemIndex) in systemIconList">
							<view  v-if="systemItem.parentId === item.typeId">
								<view class="icon-class2"  :class="systemItem.typeId===positionIds?'backgound-color':''" @click="clickIcon(systemItem)">
									<image :src="systemItem.typeIcon" class="icon-img2">
								</view>
							</view>
						</view>
					</view>
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
	            return {
					list:[],
					head_in_class:true,
					head_out_class:false,
					isOutHider:'',
					isInHider:'',
					//左滑默认宽度
					delBtnWidth: 80,
					inColor:'color:white',
					outColor:'color:#330000',
					infoPayType:'',
					systemIconList:[],
					systemIconParentIdList:[],
					positionIds:[],
					systemIconImage:'',
					typeText:'',
					typeName:'',
					disabled:true,
					disabledColor:'background-color:#e5e5e5'
					
	            };
	        },
	        components:{
	        },
	        methods: {
				onAllIcon(type){
					let queryBillType = urls.m().queryBillType+"?type="+type
					requestApi(queryBillType,null).then((res)=>{
						this.list = res[1].data.result
					})
				},
				clickChange:function(type){
					if (type === 1) {
						this.onAllIcon(2);
						this.infoPayType = 2
						this.head_in_class = false 
						this.head_out_class=true
						this.inColor = 'color:#330000'
						this.outColor = 'color:white'
						this.typeText = '收入'
						this.isInHider = 'display:none'
						this.isOutHider = ''
						
					} else if (type === 2) { 
						this.onAllIcon(1)
						this.infoPayType = 1
						this.head_in_class = true
						this.head_out_class=false
						this.inColor = 'color:white'
						this.outColor = 'color:#330000'
						this.typeText = '支出'
						this.isInHider = ''
						this.isOutHider = 'display:none'
					}
				},
				clickItem1:function(parentId){
					this.$refs['popup'].open()
					let querySystemIcon = urls.m().querySystemIcon+"?parentId="+parentId
					requestApi(querySystemIcon,null).then((res)=>{
						this.systemIconParentIdList = res[1].data.result
					})
					let querySystemIconParentId = urls.m().querySystemIcon+"?parentId=1"
					requestApi(querySystemIconParentId,null).then((res)=>{
						this.systemIconList = res[1].data.result
						this.clickIcon(res[1].data.result[0]);
					})
				},
				clickIcon:function(item){
					this.positionIds = item.typeId
					this.systemIconImage = item.typeIcon
				},
				addBillType:function(item) {
					if(this.typeName.length > 4) {
						uni.showToast({
							title: '类别不超过四个字',
							icon: 'none',
							duration: 2000
						})
						return;
					} 
					let addBillTypeMethod = urls.m().addBillType;
					let data = {typeIcon:this.systemIconImage,typeName:this.typeName,parentId:this.positionIds,type:this.infoPayType}
					requestApi(addBillTypeMethod,data).then((res)=>{
						if (res[1].data.code === 200) {
							uni.showToast({
								title: '添加成功',
								icon: 'none',
								duration: 2000
							})
							this.$refs['popup'].close()
							this.onAllIcon(this.infoPayType)
						}
					})
					
				},
				input(){
					if (this.typeName != '') {
						this.disabled = false
						this.disabledColor = 'background-color:#ffda66;color:black' 
					} else {
						this.disabled = true
						this.disabledColor = 'background-color:#e5e5e5'
					}
				},
				//开始触摸滑动
				drawStart(e) {
					console.log("开始触发");
					var touch = e.touches[0];
					this.startX = touch.clientX;
				},
				//触摸滑动
				drawMove(e) {
					console.log("滑动");
					for (var index in this.list) {
						this.$set(this.list[index],'right',0);
					}
					var touch = e.touches[0];
					var item = this.list[e.currentTarget.dataset.index];
					var disX = this.startX - touch.clientX;
					if (disX >= 20) {
							if (disX > this.delBtnWidth) {
							disX = this.delBtnWidth;
							}
							this.$set(this.list[e.currentTarget.dataset.index],'right',disX);
					} else {
						this.$set(this.list[e.currentTarget.dataset.index],'right',0);
					}
				},
				//触摸滑动结束
				drawEnd(e) {
					console.log("滑动结束");
					var item = this.list[e.currentTarget.dataset.index];
					if (item.right >= this.delBtnWidth / 2) {
						this.$set(this.list[e.currentTarget.dataset.index],'right',this.delBtnWidth);
					} else {
						this.$set(this.list[e.currentTarget.dataset.index],'right',0);
					}
				},
				delData(item) {
					uni.showLoading({ title: '加载中',mask:true});
					let removeBillType = urls.m().removeBillType;
					let data = {typeId:item.typeId}
					requestApi(removeBillType,data).then((res)=>{
						this.onAllIcon(this.infoPayType);
						setTimeout(function () { uni.hideLoading();}, 100);
					})
				}
			},
			onLoad:function(option){
				let iconId = option.iconId
				if (iconId === "999") {
					this.clickChange(2);
				} else {
					this.clickChange(1);
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
	.icon-img{
		margin: 12rpx 0rpx 0rpx 11rpx;
		width: 40rpx;
		height: 40rpx;
	}
	.icon-img2{
		margin: 12rpx 0rpx 0rpx 11rpx;
		width: 60rpx;
		height: 60rpx;
	}
	.icon-class2.backgound-color{
		background-color: #ffda66;
	}
	.icon-class{
		border-radius:100px;
		overflow:hidden;
		background-color:rgb(247, 247, 247);
		margin:-79rpx 0rpx 0rpx 90rpx;
		width: 60rpx;
		height: 60rpx;
	}
	.icon-class2{
		border-radius:100px;
		overflow:hidden;
		background-color:rgb(247, 247, 247);
		margin:0rpx 0rpx 0rpx 40rpx;
		width: 80rpx;
		height: 80rpx;
	}
	.list-item{
		width: 100%;
		height: 67rpx;
		position: relative;
		align-items:right ;
		flex-direction: row;
	}
	.remove {
	    margin-top:-14rpx;
	    width: 80px;
	    height: 132%;
	    background-color: #ff8080;
	    color: #FFFFFF;
	    position: absolute;
	    top: 0;
	    right: -80px;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    font-size: 16px;
	}
	.icon-class1{
		border-radius:100px;
		overflow:hidden;
		background-color:rgb(247, 247, 247);
		margin:0rpx 0rpx 0rpx 316rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: #ffda66;
	}
	.icon-img1{
		margin: 25rpx 0rpx 0rpx 21rpx;
		width: 60rpx;
		height: 60rpx;
	}
</style>