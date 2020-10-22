const getters = {
  currentItemId: state => state.bus_info.currentItemId,
  reservationDateInfo: state => state.rank_info.reservationDateInfo,
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  phone: state => state.user.phone,
  department: state => state.user.department,
  shuttleInfos: state => state.user.shuttleInfos
}
export default getters
