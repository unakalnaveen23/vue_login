<template>
  <div class="container">
    <h1 style = "text-decoration:underline;">Login To Employee's Protal</h1>
    <br>
    <br>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
          <p v-if="err.length>0" class="text-danger">
            <b>Please fill the below details!</b>
            <ul>
              <li v-for="i in err" v-bind:key="i">{{ i }}
              </li>
            </ul>
          </p>
      <form @submit.prevent="submit">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="Email"
              v-model="form.Email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="Password"
              v-model="form.Password"
              placeholder="Password"
             required
            />
            <div v-if="form.Password.length >0 && form.Password.length <6" class="text-danger">Your Password must have 6 letters!  </div>
          </div>
        
          <button v-on:click="login" class="btn btn-primary">Login</button>
        
        <br>
        <br>
        <a href="/forgotpwd">Forgot Password?</a>
        <br>
        Don't Have an Account?<a href="/register">Click Here</a>
      </form>
    
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: "Login",
  data() {
    return {
      form: {
        Email: "",
        Password: "",
      },
      err: [],
    };
  },
  methods: {
    login() {
      this.err = [];
      for (const i in this.form) {
        if (this.form[i] === "" || this.form[i].length === 0) {
          this.err.push(i);
        }
      }
      if (this.err.length === 0) {
        alert("login successfull!");
        router.push("/admin")
      }
      console.warn(this.err);
    },
  },
};
</script>

<style scoped>
.col-md-6 {
  background-color: rgb(229, 235, 241);
}
</style>