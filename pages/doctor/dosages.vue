<template>
    <section class="users-view">
        <div class="content">
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Max Dosage Prescribed</span>
                </div>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li v-for="(patient, patientid) in dosages" :key="patientid" style="padding: 10px 20px; margin: 0 25px; position: relative;">
                        {{'Medication Name: ' + patient.medicationname}} <br>
                        {{'Dosage: ' + patient.max}}
                    </li>
                </ul>
            </div>
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Min Dosage Prescribed</span>
                </div>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li v-for="(patient, patientid) in dosagesmin" :key="patientid" style="padding: 10px 20px; margin: 0 25px; position: relative;">
                        {{'Medication Name: ' + patient.medicationname}} <br>
                        {{'Dosage: ' + patient.min}}
                    </li>
                </ul>
            </div>
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Max Dosage of Min Prescription of Any Drug Sorted by Doctor</span>
                </div>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li v-for="(patient, patientid) in dosagesavg" :key="patientid" style="padding: 10px 20px; margin: 0 25px; position: relative;">
                        {{'Dosage: ' + patient.max}}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {

      name: 'username',
      async asyncData () {
        let dosagemax = await axios.get('/api/doctor/dosages')
        let dosagemin = await axios.get('/api/doctor/dosagesmin')
        let dosageavg = await axios.get('/api/doctor/dosagesavg')
        return { dosages: dosagemax.data, dosagesmin: dosagemin.data, dosagesavg: dosageavg.data }
      },
      head () {
        return {
          title: `Patient dosages`
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