<template>
    <view>
        <view class="tabbar-container" :class="isIpx?'IpxBot':''">
            <view class="tabbar-item" v-for="(item,index) in tabList" :class="[item.centerItem ? 'center-item' : '']"
                @click="changeItem(item)" :key="index">
                <view class="item-top" :style="{padding: item.id == 2?0:'10rpx'}">
                    <image :src="tabId==item.id?item.selectIcon:item.icon" mode=""></image>
                </view>
                <view class="item-bottom" :class="[tabId==item.id ? 'item-active' : '']">
                    <text>{{item.text}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            currentPage: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                //适配IPhoneX
                isIpx: false, 
                //底部Tab
                tabId: 0,
                tabList: [{
                    id: 0,
                    path: "/pages/detail/detail",
                    icon: "/static/tabbar/details.png",
                    selectIcon: "/static/tabbar/details_check.png",
                    text: "明细",
                    centerItem: false
                }, {
                    id: 1,
                    path: "/pages/chart/chart",
                    icon: "/static/tabbar/picter.png",
                    selectIcon: "/static/tabbar/picter_check.png",
                    text: "图表",
                    centerItem: false
                }, {
                    id: 2,
                    path: "/pages/addBill/addBill",
                    icon: "/static/tabbar/add_check.png",
                    selectIcon: "/static/tabbar/add_check.png",
                    text: "记账",
                    centerItem: true
                },  {
                    id: 3,
                    path: "/pages/bill/bill",
                    icon: "/static/tabbar/bill.png",
                    selectIcon: "/static/tabbar/bill_check.png",
                    text: "账单",
                    centerItem: false
                },{
                    id: 4,
                    path: "/pages/user/userInfo",
                    icon: "/static/tabbar/user.png",
                    selectIcon: "/static/tabbar/user_check.png",
                    text: "我的",
                    centerItem: false
                }],
            };
        },
        mounted() {
            this.tabId = this.currentPage;
            //隐藏原生tab
            uni.hideTabBar();
        },
        created() {
            // 判断为 iPhone X 给予底部距离
            let that = this
            uni.getSystemInfo({
                success: function(res) {
                    if (res.model.indexOf('iPhone X') !== -1) {
                        that.isIpx = true;
                    }
                }
            })
        },
        methods: {
            // tab 切换
            changeItem(item) {
                if (item.id == 2) {
                    uni.redirectTo({
                    	url:item.path
                    })
                } else {
                    uni.switchTab({
                        url: item.path,
                    });
                }
            },

        }
    }
</script>

<style scoped>
    view {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .tabbar-container {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        /* height: 100rpx; */
        box-shadow: 0 0 5px #999;
        display: flex;
        align-items: center;
        padding: 5rpx 0;
        color: #999999;
        background-color: #FFFFFF;
    }

    .tabbar-container .tabbar-item {
        width: 20%;
        height: 100rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .tabbar-container .item-active {
        color: #f5cb2b;
    }  

    .tabbar-container .center-item {
        display: block;
        position: relative;
    }

    .tabbar-container .tabbar-item .item-top {
        width: 70rpx;
        height: 70rpx;
        padding: 5rpx;
    }

    .tabbar-container .center-item .item-top {
        flex-shrink: 0;
        width: 130rpx;
        height: 130rpx;
        position: absolute;
        top: -67rpx;
        left: calc(50% - 70rpx);
        border-radius: 50%;
        box-shadow: 0 0 5px #999;
        background-color: #FFFFFF;
    }

    .tabbar-container .tabbar-item .item-top image {
        width: 100%;
        height: 100%;
    }

    .tabbar-container .tabbar-item .item-bottom {
        font-size: 25rpx;
        width: 100%;
    }

    .tabbar-container .center-item .item-bottom {
        position: absolute;
        bottom: 2rpx;
    }

    /* 适配iPhone X */
    .IpxBot {
        padding-bottom: 30rpx !important;
    }
</style>
