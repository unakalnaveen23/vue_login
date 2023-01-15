<template>
  <div class="home">
    <br>
    <h1 style = "text-decoration:underline;">Welocome to Employee Management Protal</h1>
    <br>
    <br>
    <br>
    <br>
    <h6>Use Below link to Login</h6>
    <a href="/login" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Login</a>
    <br>

    <br>
    <h6>Use Below link to Register</h6>
    <a href="/register" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Register</a>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
