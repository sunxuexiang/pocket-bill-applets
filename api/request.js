// 公共地址
let userUrl = 'http://localhost:8083/'
let gatprojectUrl = 'http://localhost:8082/'
let detailUrl = 'http://localhost:8081/'

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
			let queryBillDetailsCustomize=`${detailUrl}billBookInfoController/queryBillDetailsCustomize`
			//查询默认账单
			let queryDefaultBillByUserId=`${userUrl}billBookInfoController/queryDefaultBillByUserId`
			//查询用户所有账单
			let queryBillByUserId=`${userUrl}bill-manage/queryBillByUserId`
			//查询年度账单
			let queryAnnualSummaryReportList = `${gatprojectUrl}billBookAnnualSummaryController/queryAnnualSummaryReportList`
			// 查询记账列表所有图表
			let queryBillType = `${url}bill-type/queryBillType`
			// 记账
			let addBookInfo = `${detailUrl}billBookInfoController/addBookInfo`
			// 删除类别 
			let removeBillType = `${url}bill-type/removeBillType`
			// 查询系统类别
			let querySystemIcon = `${url}bill-type/querySystemIcon`
			// 添加类别
			let addBillType = `${url}bill-type/addBillType`
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
			,updateShareBillBatch}

	}
}
export default urls 