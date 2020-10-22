const getters = {
  currentItemId: state => state.bus_info.currentItemId,
  reservationDateInfo: state => state.rank_info.reservationDateInfo,
  userId: state => state.user.userId,
  userName: state => state.user.userName
}
export default getters
