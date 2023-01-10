// 公共地址
let userUrl = 'http://localhost:8083/'
let gatprojectUrl = 'http://localhost:8082/'
let detailUrl = 'http://localhost:8081/'

const urls = class{
	constructor() {
	    
	}
	static m(){
		// 查询用户
<<<<<<< .mine
			let queryUser = `${userUrl}bill-user/queryUser`
			// 查询单个用户信息
			let queryRecordByUserId = `${userUrl}bill-record/queryRecordByUserId`
			// 登录添加用户信息
			let addUser = `${userUrl}bill-user/addUser`
			//查询用户账单自定义
			let queryBillDetailsCustomize=`${detailUrl}bill-manage/queryBillDetailsCustomize`
			//查询默认账单
			let queryDefaultBillByUserId=`${userUrl}bill-manage/queryDefaultBillByUserId`
			//查询用户所有账单
			let queryBillByUserId=`${userUrl}bill-manage/queryBillByUserId`
			//查询年度账单
			let queryAnnualSummaryReportList = `${gatprojectUrl}billBookAnnualSummaryController/queryAnnualSummaryReportList`
			// 查询记账列表所有图表
			let queryBillType = `${userUrl}bill-type/queryBillType`
			// 记账
			let addBookInfo = `${detailUrl}billBookInfoController/addBookInfo`
			// 删除类别 
			let removeBillType = `${userUrl}bill-type/removeBillType`
			// 查询系统类别
			let querySystemIcon = `${userUrl}bill-type/querySystemIcon`
			// 添加类别
			let addBillType = `${userUrl}bill-type/addBillType`
			//修改默认账单
			let updateDefaultBill = `${userUrl}/bill-manage/updateDefaultBill`
	    //修改账单权限批量
			let updateShareBillBatch = `${userUrl}/bill-share/updateShareBillBatch`
			//查询账单所有用户
			let queryUserByBookId = `${userUrl}/bill-share/queryUserByBookId`
			
			let updateUserBillPermession=`${userUrl}/bill-share/updateUserBillPermession`
			
			let deleteUserBillPermession=`${userUrl}/bill-share/deleteUserBillPermession`
			
			let addShare=`${userUrl}/bill-share/addShare`
			
			return {queryUser,addUser,queryRecordByUserId,queryAnnualSummaryReportList
			,queryBillType,queryDefaultBillByUserId,addBookInfo,removeBillType,querySystemIcon,addBillType,updateDefaultBill
			,queryBillDetailsCustomize,queryBillByUserId,deleteUserBillPermession,updateUserBillPermession,queryUserByBookId
			,updateShareBillBatch,addShare}


=======
		let queryUser = `${userUrl}bill-user/queryUser`
		// 查询单个用户信息
		let queryRecordByUserId = `${userUrl}bill-record/queryRecordByUserId`
		// 登录添加用户信息
		let addUser = `${userUrl}bill-user/addUser`
		//查询用户账单自定义
		let queryBillDetailsCustomize=`${detailUrl}billBookInfoController/queryBillDetailsCustomize`
		//查询默认账单
		let queryDefaultBillByUserId=`${userUrl}bill-manage/queryDefaultBillByUserId`
		//查询用户所有账单
		let queryBillByUserId=`${userUrl}bill-manage/queryBillByUserId`
		//查询年度账单
		let queryAnnualSummaryReportList = `${gatprojectUrl}billBookAnnualSummaryController/queryAnnualSummaryReportList`
		// 记账
		let addBookInfo = `${detailUrl}billBookInfoController/addBookInfo`
		// 查询系统类别
		let querySystemIcon = `${userUrl}bill-type/querySystemIcon`
		// 添加类别
		let addBillType = `${userUrl}bill-type/addBillType`
		//修改默认账单
		let updateDefaultBill = `${userUrl}/bill-manage/updateDefaultBill`
		// 删除类别
		let removeBillType = `${userUrl}bill-type/removeBillType`
		// 查询记账列表所有图表
		let queryBillType = `${userUrl}bill-type/queryBillType`
		// 查询年度报表
		let billBookReportGatherController = `${gatprojectUrl}billBookReportGatherController/queryReporyByYear`
		let addShare=`${userUrl}/bill-share/addShare`
		let deleteUserBillPermession=`${userUrl}/bill-share/deleteUserBillPermession`
		let updateUserBillPermession=`${userUrl}/bill-share/updateUserBillPermession`
		//查询账单所有用户
		let queryUserByBookId = `${userUrl}/bill-share/queryUserByBookId`
		//修改账单权限批量
		let updateShareBillBatch = `${userUrl}/bill-share/updateShareBillBatch`
		// 查询月度报表
		let queryReporyByMonth = `${gatprojectUrl}billBookReportGatherController/queryReporyByMonth`
		// 查询周报表
		let queryReporyByWeek = `${gatprojectUrl}billBookReportGatherController/queryReporyByWeek`
		return {queryUser,addUser,queryRecordByUserId,queryAnnualSummaryReportList
		,queryDefaultBillByUserId,addBookInfo,queryReporyByWeek
		,queryBillDetailsCustomize,queryBillByUserId,querySystemIcon,addBillType,updateDefaultBill,queryReporyByMonth,
		removeBillType,queryBillType,billBookReportGatherController,addShare,deleteUserBillPermession,updateUserBillPermession,queryUserByBookId,updateShareBillBatch}
>>>>>>> .theirs
	}
}
export default urls 