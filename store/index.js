import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      doctorid: null,
      appointmentDate: null
    },
    mutations: {
      setDoctorID (state, data) {
        state.doctorid = data
      },
      setAppointmentDate (state, data) {
        state.appointmentDate = data
      }
    },
    getters: {
      getDoctorID: state => {
        return state.doctorid
      },
      getAppointmentDate: state => {
        return state.appointmentDate
      }
    }
  })
}

export default createStore
