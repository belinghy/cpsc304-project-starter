<template>
    <section class="users-view">
        <div class="content">
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span v-if="prescriptions"class="subsection-title" style="vertical-align: middle;">{{prescriptions[0].patientname}}</span>
                </div>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li v-for="(patient, patientid) in prescriptions" :key="patientid" style="padding: 10px 20px; margin: 0 25px; position: relative;">
                        {{'Medication name: '+ patient.medicationname}} <br>
                        {{'Dosage: ' + patient.dosage}}
                    </li>
                </ul>
            </div>
            <div class="links">
                <nuxt-link class="button--grey link" style="margin-left: 15px;" :to="{ path: `/doctor/dosages`}">Dosages</nuxt-link>
            </div>
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Create Prescription</span>
                </div>
                <form style="margin: 15px 15px;">
                    <div style="margin: 10px 0;">
                        <span class="prescription-patientid">Patient ID: </span>
                        <input type="number" v-model="patientid"/>
                    </div>
                    <div style="margin: 10px 0;">
                        <span class="prescription-doctorid">Doctor ID: </span>
                        <input type="number" v-model="doctorid"/>
                    </div>
                    <div style="margin: 10px 0;">
                        <span class="prescription-medicationName">Medication Name: </span>
                        <input type="text" v-model="medicationName"/>
                    </div>
                    <div style="margin: 10px 0;">
                        <span class="prescription-dosage">Dosage: </span>
                        <input type="text" v-model="dosage"/>
                    </div>
                </form>
                <button type="button" class="button--grey" @click="submitInsert">Add Prescription</button>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
      data () {
        return {
          patientid: '',
          doctorid: '',
          medicationName: '',
          dosage: ''
        }
      },

      methods: {
        submitInsert () {
          let self = this

          axios.post('/api/doctor/addPrescription', {
            headers:
                        {
                          'Content-Type': 'application/json'
                        },
            data:
                        {
                          patientid: self.patientid,
                          doctorid: self.doctorid,
                          medicationName: self.medicationName,
                          dosage: self.dosage
                        }})
            .then((res) => {
              // res.data should contain the url for redirecting... bad practice
              self.$nuxt.$router.replace({ path: res.data })
            })
            .catch((e) => {
              console.log(e)
            })
        }
      },

      name: 'username',
      asyncData ({ params, error }) {
        return axios.get('/api/doctor/' + params.username + '/prescription')
          .then((res) => {
            return { prescriptions: res.data }
          })
          .catch((e) => {
            error({ statusCode: 404, message: 'User not found' })
          })
      },
      head () {
        return {
          title: `Patient prescriptions`
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