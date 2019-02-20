import baseUrl from '../baseUrl'
export default {
  getAddress: baseUrl + '/address/getAddresses',
  addAddress: baseUrl + '/address/addAddress',
  editAddress: baseUrl + '/address/editAddress',
  deleteAddress: baseUrl + '/address/deleteAddress',
  setDefault: baseUrl + '/address/setDefault'
}
