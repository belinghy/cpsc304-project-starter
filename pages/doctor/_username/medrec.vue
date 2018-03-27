<template>
    <section class="users-view">
        <div class="content">
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span v-if="records"class="subsection-title" style="vertical-align: middle;">{{records[0].patientname}}</span>
                </div>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                    <li v-for="(patient, patientid) in records" :key="patientid" style="padding: 10px 20px; margin: 0 25px; position: relative;">
                            {{patient.datecreated + ' : ' +patient.summary}}
                    </li>
                </ul>
            </div>
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Create Medical Record</span>
                </div>
                <form style="margin: 15px 15px;">
                    <div style="margin: 10px 0;">
                        <span class="record-id">Record ID: </span>
                        <input type="number" v-model="recordID"/>
                    </div>
                    <div style="margin: 10px 0;">
                        <span class="record-date">Date Created: </span>
                        <input type="text" v-model="dateCreated"/>
                    </div>
                    <div style="margin: 10px 0;">
                        <span class="record-summary">Summary: </span>
                        <textarea type="text" v-model="summary" rows="10" cols="30"></textarea>
                    </div>
                    <div style="margin: 10px 0;">
                        <span class="record-doctorid">Doctor ID: </span>
                        <input type="number" v-model="doctorid"/>
                    </div>
                    <div style="margin: 10px 0;">
                        <span class="record-patientid">Patient ID: </span>
                        <input type="number" v-model="patientid"/>
                    </div>
                </form>
                <button type="button" class="button--grey" @click="submitInsert">Add Record</button>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
      data () {
        return {
          recordID: '',
          dateCreated: '',
          summary: '',
          doctorid: '',
          patientid: ''
        }
      },

      methods: {
        submitInsert () {
          let self = this

          axios.post('/api/doctor/addRec', {
            headers:
                        {
                          'Content-Type': 'application/json'
                        },
            data:
                        {
                          recordID: self.recordID,
                          dateCreated: self.dateCreated,
                          summary: self.summary,
                          doctorid: self.doctorid,
                          patientid: self.patientid
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
      asyncData: function ({params, error}) {
        return axios.get('/api/doctor/' + params.username + '/medrec')
          .then((res) => {
            console.log(res.data)
            return {records: res.data}
          })
          .catch((e) => {
            error({statusCode: 404, message: 'User not found'})
          })
      },
      head () {
        return {
          title: `Patient Records`
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