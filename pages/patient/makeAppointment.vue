<template>
    <transition name="expand">
        <section class="users-view" v-if="show">
                <form style="margin: 15px 15px;">
                    <div style="margin: 10px 0;">
                        <span class="doctor-doctorid">Doctor </span>
                        <select v-model="doctorid">
                            {{doctors[0].doctorname}}
                            <option disabled value="">Please select one</option>
                            <option v-for="doctor in doctors" v-bind:value="doctor.doctorid">
                                {{doctor.doctorname}}
                            </option>
                        </select>
                    </div>
                    <div style="margin: 10px 0;">
                        <span class="appointment-date">Date </span>
                        <input type="date" v-model="date"/>
                    </div>
                    <div style="margin: 10px 0;">
                        <span class="appointment-time">Time </span>
                        <input type="time" v-model="booktime"/>
                    </div>
                    <div style="margin: 10px 0;">
                        <span class="appointment-duration">Duration (hours): </span>
                        <input type="number" min="1" max="3" v-model="duration"/>
                    </div>
                </form>
                <button type="button" class="button--grey" @click="submitInsert">Book</button>
        </section>
    </transition>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {

      data () {
        return {
          doctorid: '',
          date: '',
          booktime: '',
          duration: ''
        }
      },

      props: ['show', 'doctors'],

      methods: {
        submitInsert () {
          let self = this

          axios.post('/api/patient/makeAppointment/143', {
            headers:
                        {
                          'Content-Type': 'application/json'
                        },
            data:
                        {
                          doctorid: self.doctorid,
                          date: self.date,
                          booktime: self.booktime,
                          duration: self.duration
                        }})
            .catch((e) => {
              console.log(e)
            })
          self.$nuxt.$router.go({ path: '/patient', force: true })
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