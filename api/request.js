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
		//查询用户账单自定义
		let queryBillDetailsCustomize=`${detailsUrl}billBookInfoController/queryBillDetailsCustomize`
		//查询默认账单
		let queryDefaultBillByUserId=`${userUrl}billBookInfoController/queryDefaultBillByUserId`
		//查询用户所有账单
		let queryBillByUserId=`${userUrl}bill-manage/queryBillByUserId`
		//查询年度账单
		let queryAnnualSummaryReportList = `${gatprojectUrl}billBookAnnualSummaryController/queryAnnualSummaryReportList`
		//修改默认账单
		let updateDefaultBill = `${userUrl}/bill-manage/updateDefaultBill`
		
		return {queryUser,queryRecordByUserId,
		queryBillDetailsCustomize,queryDefaultBillByUserId,
		queryBillByUserId,queryAnnualSummaryReportList,updateDefaultBill}
	}
}
export default urls 