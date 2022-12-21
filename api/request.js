// 公共地址
let url = 'http://localhost:8083/'
let gatprojectUrl = 'http://localhost:8082/'

const urls = class{
	constructor() {
	    
	}
	static m(){
		// 查询用户
		let queryUser = `${url}bill-user/queryUser`
		// 查询单个用户信息
		let queryRecordByUserId = `${url}bill-record/queryRecordByUserId`
		// 登录添加用户信息
		let addUser = `${url}bill-user/addUser`
		
		let queryBillDetailsCustomize=`${url}billBookInfoController/queryBillDetailsCustomize`
		
		let queryDefaultBillByUserId=`${url}billBookInfoController/queryDefaultBillByUserId`
		
		let queryBillByUserId=`${url}bill-manage/queryBillByUserId`
		
		let queryAnnualSummaryReportList = `${gatprojectUrl}billBookAnnualSummaryController/queryAnnualSummaryReportList`
		
		return {queryUser,queryRecordByUserId,
		queryBillDetailsCustomize,queryDefaultBillByUserId,
		queryBillByUserId,queryAnnualSummaryReportList}
	}
}
export default urls 