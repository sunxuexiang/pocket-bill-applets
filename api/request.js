// 公共地址
let url = 'http://localhost:8083/'
let gatprojectUrl = 'http://localhost:8082/'
let detailUrl = 'http://localhost:8081/'

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
		// 查询账单列表
		let queryAnnualSummaryReportList = `${gatprojectUrl}billBookAnnualSummaryController/queryAnnualSummaryReportList`
		// 查询记账列表所有图表
		let queryBillType = `${url}bill-type/queryBillType`
		// 查询默认账本
		let queryDefaultBillByUserId = `${url}bill-manage/queryDefaultBillByUserId`
		// 记账
		let addBookInfo = `${detailUrl}billBookInfoController/addBookInfo`
		// 删除类别 
		let removeBillType = `${url}bill-type/removeBillType`
		return {queryUser,addUser,queryRecordByUserId,queryAnnualSummaryReportList
		,queryBillType,queryDefaultBillByUserId,addBookInfo,removeBillType}
	}
}
export default urls 