// 公共地址
let userUrl = 'http://localhost:8083/'
let gatprojectUrl = 'http://localhost:8082/'
let detailsUrl = 'http://localhost:8081/'

const urls = class{
	constructor() {
	    
	}
	static m(){
		// 查询用户
		let queryUser = `${userUrl}bill-user/queryUser`
		// 查询单个用户信息
		let queryRecordByUserId = `${userUrl}bill-record/queryRecordByUserId`
		// 登录添加用户信息
		let addUser = `${userUrl}bill-user/addUser`
		
		let queryBillDetailsCustomize=`${detailsUrl}billBookInfoController/queryBillDetailsCustomize`
		
		let queryDefaultBillByUserId=`${userUrl}billBookInfoController/queryDefaultBillByUserId`
		
		let queryBillByUserId=`${userUrl}bill-manage/queryBillByUserId`
		
		let queryAnnualSummaryReportList = `${gatprojectUrl}billBookAnnualSummaryController/queryAnnualSummaryReportList`
		
		let updateDefaultBill = `${userUrl}/bill-manage/updateDefaultBill`
		
		return {queryUser,queryRecordByUserId,
		queryBillDetailsCustomize,queryDefaultBillByUserId,
		queryBillByUserId,queryAnnualSummaryReportList}
	}
}
export default urls 