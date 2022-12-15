<template>
	<view>
	        <tab-bar :currentPage="1"></tab-bar>
	    </view>
</template>

<script>
	import tabBar from '@/components/tabbar/tabbar.vue'
	    export default {
	        data() {
	            return {
	            };
	        },
	        components:{
	            tabBar
	        },
	        methods: {}
	    };
</script>

<style>
</style>