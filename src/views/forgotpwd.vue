<template>
     <div class="container">
    <h1 style = "text-decoration:underline;">Forgot Password</h1>
    <br>
    <br>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              v-model="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
          </div>

          <button v-on:click="forgot" class="btn btn-primary">Send Mail</button>
        </form>
        <br>
        Click Here to <a href="/login">Login!</a>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
export default {
    name: "forgotpwd",
    data(){
      return{
          email:"",
          err:[]
      }
    },
    methods:{
      forgot(){
          this.err = []
          if(this.email === ""){
            alert("Please Enter email Adress")
          }
          if(this.email != ""){
            alert("Rest Link Has Been Sent to Register Mail Id!")
          }
      }
    }
}
</script>

<style scoped>
.col-md-6{
  background-color: rgb(229, 235, 241);
}
</style>