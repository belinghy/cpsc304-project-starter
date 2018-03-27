<template>
  <section class="container">
    <div>
      <h1 class="title">
        Login here
      </h1>
      <div class="links">
        <nuxt-link class="button--grey link" style="margin-left: 15px;" to="/patient">Patient</nuxt-link>
        <nuxt-link class="button--grey link" style="margin-left: 15px;" to="/doctor/">Doctor</nuxt-link>
        <nuxt-link class="button--grey link" style="margin-left: 15px;" to="/admin">Admin</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style lang="stylus" scoped>
.container
  min-height 90vh
  display flex
  justify-content center
  align-items center
  text-align center

@media (min-height 1080px)
  .container
    margin-top -200px

.title
  font-family "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif /* 1 */
  display block
  font-weight 300
  font-size 100px
  color #35495e
  letter-spacing 1px

.subtitle
  font-weight 300
  font-size 42px
  color #526488
  word-spacing 5px
  padding-bottom 15px

.links
  padding-top 15px

@media (max-width 860px)
  .title
    font-size 64px
  .subtitle
    font-size 32px

@media (max-width 860px)
  .links
    .link
      width 50%
      margin-bottom 15px
      display relative
</style>
