<template>
    <section class="users-view">
        <div class="content">
            <div class="subsection">
            </div>
        </div>
    </section>
</template>

<script>
    import axios from '~/plugins/axios'
    export default {
      async asyncData () {
        let { data } = await axios.get('/patient/prescription')
        return { prescriptions: data }
      },
      head () {
        return {
          title: 'Prescriptions'
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