// 封装请求
let requestApi = function(url,data){
	return new Promise((resole,reject)=>{
		uni.request({
			url:url,
			method:'POST',
			header:{'Authorization':uni.getStorageSync('token')},
			data:data
		})
		.then((res)=>{
			resole(res)
			console.log(res)
		})
		.catch((err)=>{
			reject(err);
			console.log(err);
		})
	})
}
export{requestApi}