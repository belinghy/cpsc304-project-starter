<template>
    <section class="users-view">
        <div class="content">
            <div class="subsection">
                <H3 >
                    Appointments
                    <button type="button" v-on:click='show = true' >new</button>
                </H3>
                <makeAppointment :show="show" :doctors="doctors"/>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li v-for="(appointment, date, aptime) in appointments" :key="date + aptime" style="padding: 10px 20px; margin: 0 25px; position: relative; display: flex;">
                        {{ appointment.duration + ' hour appointment with ' + appointment.doctorname }}
                        {{' on ' + appointment.date }}
                        {{'@ ' + appointment.aptime }}
                        {{'location: ' + appointment.address}}
                        <button type="button" class="button--grey" v-on:click='update(appointment.doctorid, appointment.date, appointment.aptime)' style="flex: 10%">update</button>
                        <button type="button" class="button--grey" v-on:click='cancel(appointment.appointmentdatetime )' style="flex: 10%">cancel</button>
                    </li>
                </ul>
            </div>
            <div class="subsection">
                <H3 >
                    Referrals
                    <nuxt-link type="button" class="button--grey" to="/patient/referral" style="postion: right;">View Referrals</nuxt-link>
                </H3>
            </div>
            <div class="subsection">
                <H3 >
                    Prescriptions
                    <nuxt-link type="button" class="button--grey" to="/patient/prescription" style="flex: 10%">My Prescriptions</nuxt-link>
                </H3>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from '~/plugins/axios'
    import makeAppointment from './makeAppointment'

    export default {

      async asyncData () {
        let appointmentData = await axios.get('/api/patient/appointments/143')
        let doctorData = await axios.get('/api/doctors')
        return { appointments: appointmentData.data, doctors: doctorData.data }
      },

      components: {
        'makeAppointment': makeAppointment
      },
    
      methods: {
        update (doctorid, date, time) {
          this.$store.commit('setDoctorID', doctorid)
          this.$store.commit('setAppointmentDate', date)
          this.$store.commit('setAppointmentTime', time)
          self.$nuxt.$router.replace({ path: '/patient/appointment' })
        },
        cancel (datetime) {
          axios.post('/api/patient/cancelAppointment/143', {
            headers:
                    {
                      'Content-Type': 'application/json'
                    },
            data:
                    {
                      datetime: datetime
                    }})
          self.$nuxt.$router.go({ path: '/patient', force: true })
        }
      },

      data () {
        return {
          show: false
        }
      }
    }
</script>

<style lang="stylus" scoped>
    .users-view
        padding-top 0

    .content
        position absolute
        width 100%

    .subsection
        background-color #fff
        border-radius 2px
        margin 25px 0
        transition all .5s cubic-bezier(.55,0,.1,1)
        padding 10px 30px 10px 30px
        position relative
        line-height 20px
        .subsection-title
            font-size 26px
            font-weight 500
        .title
            font-size 18px
            font-weight 500
        a
            text-decoration underline
            &:hover
                color #515ec4

</style>