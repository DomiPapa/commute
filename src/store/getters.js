const getters = {
  currentItemId: state => state.bus_info.currentItemId,
  reservationDateInfo: state => state.rank_info.reservationDateInfo,
  uid: state => state.user.uid
}
export default getters
