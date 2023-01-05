<template>
	<view class="main">
	<view
	    v-for="(item, index) in csListArrl"
	    :key="index"
	    :data-index="index" 
	    class="order-item" 
	    @touchstart="drawStart" 
	    @touchmove="drawMove" 
	    @touchend="drawEnd" 
	    :style="'right:'+item.right+'px'">
	        <view class="content">列表展示内容</view>
	        <view class="remove" @click="delData(item)">注 销</view>
	        <view class="edit" @click="editData(item)">编 辑</view>
	    </view>
		<tab-bar :currentPage="2"></tab-bar>
	</view>
</template>

<script > 
	import tabBar from '@/components/tabbar/tabbar.vue'
	    export default { 
	        data() {  
	            return {
					//列表数据，可根据自己的业务获取
					csListArrl:[{
						name:'小A',
						age:'18'
					}],
					//左滑默认宽度
					delBtnWidth: 80
	            };
	        },
	        components:{
	            tabBar
	        },
	        methods: {
				//开始触摸滑动
				drawStart(e) {
					console.log("开始触发");
					var touch = e.touches[0];
					this.startX = touch.clientX;
				},
				//触摸滑动
				drawMove(e) {
					console.log("滑动");
					for (var index in this.csListArrl) {
						this.$set(this.csListArrl[index],'right',0);
					}
					var touch = e.touches[0];
					var item = this.csListArrl[e.currentTarget.dataset.index];
					var disX = this.startX - touch.clientX;
					if (disX >= 20) {
							if (disX > this.delBtnWidth) {
							disX = this.delBtnWidth;
							}
							this.$set(this.csListArrl[e.currentTarget.dataset.index],'right',disX);
					} else {
						this.$set(this.csListArrl[e.currentTarget.dataset.index],'right',0);
					}
				},
				//触摸滑动结束
				drawEnd(e) {
					console.log("滑动结束");
					var item = this.csListArrl[e.currentTarget.dataset.index];
					if (item.right >= this.delBtnWidth / 2) {
						this.$set(this.csListArrl[e.currentTarget.dataset.index],'right',this.delBtnWidth);
					} else {
						this.$set(this.csListArrl[e.currentTarget.dataset.index],'right',0);
					}
				},
				//删除方法
				delData(item){
					console.log("删除")
					uni.showModal({
						title: '提示',
						content: "确认注销该人员？",
						success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
						}
					});
				},
				editData(item){
					uni.showModal({
						title: '提示',
						content: "确认编辑该项目？",
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			}, 
			onLoad:()=>{
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
			}
	    };
</script>

<style>
	.main{
	    width: 90%;
	    height: auto;
	    margin: 10px auto;
	    overflow: hidden
	}
	.order-item {
	    width: 100%;
	    display: flex;
	    position: relative;
	    margin: 10px auto;
	    align-items:right ;
	    flex-direction: row;
	}
	.content{
	    width: 100%;
	    height: 100px;
	    margin: 0 auto;
	    border: 1px solid #C0C0C0;
	    line-height: 100px;
	    text-align: center;
	}
	
	.remove {
	    margin-left:-5%;
	    width: 80px;
	    height: 100%;
	    background-color: red;
	    color: #FFFFFF;
	    position: absolute;
	    top: 0;
	    right: -80px;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    font-size: 16px;
	}
</style>