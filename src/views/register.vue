<template>
  <div class="container">
    <h1 style="text-decoration: underline">Register To Employee's Protal</h1>
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <p v-if="err.length>0" class="text-danger">
          <b>Please fill the Below Details!</b>
      <ul>
        <li v-for="i in err" v-bind:key="i">{{ i }}</li>
      </ul>
    </p>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="exampleInputName">Enter Full Name</label>
            <input
              type="Text"
              class="form-control"
              id="name"
              v-model="form.FullName"
              placeholder="Enter Full Name"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="form.Email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">New Password</label>
            <input
              type="password"
              class="form-control"
              id="NewPassword"
              v-model="form.NewPassword"
              placeholder="New Password"
              required
            />
            <div
              v-if="form.NewPassword.length > 0 && form.NewPassword.length < 6"
              class="text-danger"
            >
              Your Password must have 6 letters!
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="ConfirmPassword"
              v-model="form.ConfirmPassword"
              placeholder="Confirm Password"
              required
            />
            <div v-if="form.NewPassword != form.ConfirmPassword" class="text-danger">
              Password Did Not Mtached!
            </div>
          </div>

          <button v-on:click="register" class="btn btn-primary">
            Register
          </button>
          <div>Already Having an Account?<a href="/login">Click Here</a></div>
        </form>
      </div>

      <div class="col-md-3"></div>
    </div>
  </div>
</template>
  
  <script>
import router from '@/router';
export default {
  name: "register",
  data() {
    return {
      form: {
        FullName: "",
        Email: "",
        NewPassword: "",
        ConfirmPassword: "",
      },
      err: [],
    };
  },
  methods: {
    register() {
      this.err = [];
      for (const i in this.form) {
        if (this.form[i] === "" || this.form[i].length === 0) {
          this.err.push(i);
        }
      }
      if (this.err.length === 0) {
        alert("login successfull!");
        router.push("/Login")
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