<template>
    <section class="users-view" >
        <form style="padding: 10px 20px; margin: 0 25px; position: relative; display: flex;">
            <div style="margin: 10px 0;flex: 20%;">
                <span class="doctor-doctorid">Doctor </span>
                <select v-model="doctorid">
                    {{doctors[0].doctorname}}
                    <option disabled value="">Please select one</option>
                    <option v-for="doctor in doctors" v-bind:value="doctor.doctorid">
                        {{doctor.doctorname}}
                    </option>
                </select>
            </div>
                <div style="margin: 10px 0; flex: 20%;" v-if="doctorid">
                    <span class="appointment-date">Date </span>
                    <input type="date" v-model="date"/>
                </div>
                <div style="margin: 10px 0; flex: 20%;" v-if="date" >
                    <span class="appointment-time">Times </span>
                    <select v-model="booktime">
                        <option disabled value="">select time</option>
                        <option v-for="time in appointmentTimes" v-bind:value="time.time">
                            {{time.time}}
                        </option>
                    </select>
                </div>
        </form>
        <button type="button" class="button--grey" @click="update" v-if="booktime" style="padding: 10px 20px; margin: 0 45px; position: relative;">Update</button>
    </section>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
      async asyncData () {
        let doctorData = await axios.get('/api/doctors')
        return { doctors: doctorData.data }
      },
      beforeCreate () {
        if (this.$store.getters.getDoctorID === null || this.$store.getters.getAppointmentDate === null) {
          this.$nuxt.$router.replace({ path: '/patient' })
        }
      },
      data () {
        return {
          doctorid: this.$store.getters.getDoctorID || '',
          date: this.$store.getters.getAppointmentDate || '',
          booktime: this.$store.getters.getAppointmentTime || '',
          duration: 1,
          appointmentTimes: [{time: '09:00:00'}, {time: '10:00:00'}, {time: '11:00:00'}, {time: '12:00:00'}, {time: '13:00:00'}, {time: '14:00:00'}, {time: '15:00:00'}, {time: '16:00:00'}]
        }
      },
      methods: {
        update () {
          let self = this

          axios.post('/api/patient/updateAppointment/143', {
            headers:
                    {
                      'Content-Type': 'application/json'
                    },
            data:
                    {
                      doctorid: self.doctorid,
                      date: self.date,
                      booktime: self.booktime,
                      duration: self.duration,
                      appointmentdatetime: this.$store.getters.getAppointmentDate + ' ' + this.$store.getters.getAppointmentTime

                    }})
            .catch((e) => {
              console.log(e)
            })
          self.$nuxt.$router.replace({ path: '/patient' })
        }

      }
    }
</script>

<style lang="stylus" scoped>
    .user-view
        padding-top 0

    .content {
        position absolute
        width 100%
    }

    .expand-enter-active {
        transition: all .3s ease;
    }
    .expand-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        overflow: hidden;
    }
    .expand-enter, .expand-leave-to  {
        transform: translateX(10px);
        height: 0;
        opacity: 0;
    }

</style>