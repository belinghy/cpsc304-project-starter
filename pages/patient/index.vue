<template>
    <section class="users-view">
        <div class="content">
            <div class="subsection">
                <button type="button" class="button--grey" v-on:click='show = !show' >Make Appointment</button>
                <makeAppointment :show="show"/>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li v-for="(appointment, appointmentdatetime) in appointments" :key="appointmentdatetime" style="padding: 10px 20px; margin: 0 25px; position: relative;">
                        {{ 'Appointment with ' + appointment.doctorname + ' on ' +appointment.appointmentdatetime +  ' for '+ appointment.duration + 'hour'}}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from '~/plugins/axios'
    import makeAppointment from './makeAppointment'

    export default {
      async asyncData () {
        let { data } = await axios.get('/api/patient/appointments/143')
        return { appointments: data }
      },

      components: {
        'makeAppointment': makeAppointment
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