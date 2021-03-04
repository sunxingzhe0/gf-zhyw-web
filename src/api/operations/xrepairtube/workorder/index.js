import request from '@/utils/request'

export default {
	/**
   * 
   * @param {*} params 
   */
	getOrderList(params) {
		return request({
			url: '/api/v1/xrepairtube/workorder/getOrderList',
			method: 'get',
			params,
		})
  },
	
	/**
   * 
   * @param {*} params 
   */
	getRecord(params) {
		return request({
			url: '/api/v1/xrepairtube/workorder/getRecord',
			method: 'get',
			params,
		})
  }
}