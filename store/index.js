import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      doctorid: null,
      appointmentDate: null,
      appointmentTime: null
    },
    mutations: {
      setDoctorID (state, data) {
        state.doctorid = data
      },
      setAppointmentDate (state, data) {
        state.appointmentDate = data
      },
      setAppointmentTime (state, data) {
        state.appointmentTime = data
      }
    },
    getters: {
      getDoctorID: state => {
        return state.doctorid
      },
      getAppointmentDate: state => {
        return state.appointmentDate
      },
      getAppointmentTime: state => {
        return state.appointmentTime
      }
    }
  })
}

export default createStore
