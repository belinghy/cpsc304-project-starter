<template>
    <section class="users-view">
        <div class="content">
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span v-if="appointments"class="subsection-title" style="vertical-align: middle;">{{appointments[0].patientname}}</span>
                </div>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li v-for="(patient, patientid) in appointments" :key="patientid" style="padding: 10px 20px; margin: 0 25px; position: relative;">
                        {{'Appointment Date Time: '+ patient.appointmentdatetime}}
                        <br>
                        {{'Duration: ' + patient.duration}}
                    </li>
                </ul>
            </div>
            <!--<div class="subsection">-->
                <!--<form style="margin: 15px 15px;">-->
                    <!--<div style="margin: 10px 0;">-->
                        <!--<span class="appointment-patientid">Patient ID: </span>-->
                        <!--<input type="number" v-model="patientid"/>-->
                    <!--</div>-->
                    <!--<div style="margin: 10px 0;">-->
                        <!--<span class="appointment-doctorid">Doctor ID: </span>-->
                        <!--<input type="number" v-model="doctorid"/>-->
                    <!--</div>-->
                    <!--<div style="margin: 10px 0;">-->
                        <!--<span class="appointment-appointmentDateTime">Appointment Date Time: </span>-->
                        <!--<input type="datetime" v-model="appointmentDateTime"/>-->
                    <!--</div>-->
                    <!--<div style="margin: 10px 0;">-->
                        <!--<span class="appointment-duration">Duration: </span>-->
                        <!--<input type="number" v-model="duration"/>-->
                    <!--</div>-->
                <!--</form>-->
                <!--<button type="button" class="button&#45;&#45;grey" @click="submitInsert">Add Appointment</button>-->
            <!--</div>-->
        </div>
    </section>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
      // data: function () {
      //   return {
      //     patientid: '',
      //     doctorid: '',
      //     appointmentDateTime: '',
      //     duration: ''
      //   }
      // },
      //
      // methods: {
      //   submitInsert: function () {
      //     let self = this
      //
      //     axios.post('/api/doctor/addAppointment', {
      //       headers:
      //                 {
      //                   'Content-Type': 'application/json'
      //                 },
      //       data:
      //                 {
      //                   patientid: self.patientid,
      //                   doctorid: self.doctorid,
      //                   appointmentDateTime: self.appointmentDateTime,
      //                   duration: self.duration
      //                 }
      //     })
      //       .then((res) => {
      //         // res.data should contain the url for redirecting... bad practice
      //         self.$nuxt.$router.replace({path: res.data})
      //       })
      //       .catch((e) => {
      //         console.log(e)
      //       })
      //   }
      // },

      name: 'username',
      asyncData ({ params, error }) {
        return axios.get('/api/doctor/' + params.username + '/appointment')
          .then((res) => {
            return { appointments: res.data }
          })
          .catch((e) => {
            error({ statusCode: 404, message: 'User not found' })
          })
      },
      head () {
        return {
          title: `Patient appointments`
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