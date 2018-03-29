<template>
    <section class="user-view">
        <div class="content">
            <button type="button" class="button--grey" v-on:click='show = !show' >Add Patient</button>
            <transition name="expand">
                <div class="subsection" v-if="show" >
                    <form style="margin: 15px 15px;">
                        <div style="margin: 10px 0;">
                            <span class="patient-patientname">Name: </span>
                            <input type="text" v-model="patientname"/>
                        </div>
                        <div style="margin: 10px 0;">
                            <span class="patient-age">Age: </span>
                            <input type="number" v-model="age"/>
                        </div>
                        <div style="margin: 10px 0;">
                            <span class="patient-address">Address: </span>
                            <input type="text" v-model="address"/>
                        </div>
                        <div style="margin: 10px 0;">
                            <span class="patient-phonenum">Phone Number: </span>
                            <input type="text" v-model="phonenum"/>
                        </div>
                        <div style="margin: 10px 0;">
                            <span class="patient-gender">Gender: </span>
                            <input type="text" v-model="gender"/>
                        </div>
                    </form>
                    <button type="button" class="button--grey" @click="submitInsert">Add Patient</button>
                </div>
            </transition>
        </div>
    </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {

  data () {
    return {
      show: false,
      patientname: '',
      age: '',
      address: '',
      phonenum: '',
      gender: ''
    }
  },

  methods: {
    submitInsert () {
      let self = this

      axios.post('/api/users/addPatient', {
        headers:
                    {
                      'Content-Type': 'application/json'
                    },
        data:
                    {
                      patientname: self.patientname,
                      age: self.age,
                      address: self.address,
                      phonenum: self.phonenum,
                      gender: self.gender
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

  head () {
    return {
      title: `Add New Patient`
    }
  }
}
</script>

<style lang="stylus" scoped>
    .user-view
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
            margin 25px 10px
            font-size 26px
            font-weight 500
        .user-username
            font-size 24px
            font-weight 500
            color #707070
        .user-password
            font-size 24px
            font-weight 500
            color #707070
        a
            text-decoration underline
        &:hover
            color #515ec4

    .expand-enter-active, .expand-leave-active {
        transition: all .3s ease;
        height: 30px;
        padding: 10px;
        background-color: #eee;
        overflow: hidden;
      }
    .expand-enter, .expand-leave-to /* .fade-leave-active below version 2.1.8 */ {
        height: 0;
        padding: 0 10px;
        opacity: 0;
    }


</style>