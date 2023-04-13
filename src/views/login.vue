<template>
  <div class="container">
    <h1 style="text-decoration:underline;">Login</h1>
    <br>
    <br>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <form @submit.prevent="LoginData">
          <div class="form-group">
            <label for="exampleInputEmail1">User ID</label>
            <input type="text" class="form-control" id="Email" v-model="user.userId" aria-describedby="emailHelp"
              placeholder="Enter UserId" required />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="Password" v-model="user.password" placeholder="Password"
              required />
              
            <div v-if="user.password.length > 0 && user.password.length < 6" class="text-danger">
              Your Password length must be 8 min & must have comination letters Alphabet number!</div>
          </div>

          <button class="btn btn-primary">Login</button>

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
      user: {
        userId: '',
        password: ''
      },

    };
  },
  created() {

  },
  methods: {
    LoginData() {
      axios.post("http://localhost:8081/user/Authenticate", this.user)
        .then(
          ({ data }) => {
            console.log(data);
            if (data.role == "Admin" || data.role == "User") {
              this.$toast.success("Login successfull!", {
                position: "top-right",
                duration: 5000,
                dismissible: false,
              });
              router.push("/Events")
            }
            else{
              this.$toast.error("Invalid User or Password!", {
                position: "top-right",
                duration: 5000,
                dismissible: false,
              });
            }
          },
        )
    },
  }
}
</script>

<style scoped>
.col-md-6 {
  background-color: rgb(229, 235, 241);
}
</style>