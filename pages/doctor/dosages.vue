<template>
    <section class="users-view">
        <div class="content">
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span v-if="dosages"class="subsection-title" style="vertical-align: middle;">{{dosages[0].patientname}}</span>
                </div>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li v-for="(patient, patientid) in dosages" :key="patientid" style="padding: 10px 20px; margin: 0 25px; position: relative;">
                        {{'Medication Name: ' + patient.medicationname}} <br>
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
      asyncData ({ params, error }) {
        return axios.get('/api/doctor/dosages')
          .then((res) => {
            console.log(res.data)
            return { dosages: res.data }
          })
          .catch((e) => {
            error({ statusCode: 404, message: 'User not found' })
          })
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