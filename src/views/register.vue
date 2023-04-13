<template>
  <div class="container">

    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">

        <form @submit.prevent="register">
          <div class="form-group">
            <h1>New Register</h1>
            <br>
            <br>
            <label for="exampleInputName">Enter Full Name</label>
            <input type="Text" class="form-control" id="name" v-model="reg.fullName" placeholder="Enter Full Name"
              required />
          </div>
          <div class="form-group">
            <label for="exampleuserid">Enter UserID</label>
            <input type="Text" class="form-control" id="userId" v-model="reg.userId" placeholder="Enter Full Name"
              required />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="email" v-model="reg.email" aria-describedby="emailHelp"
              placeholder="Enter email" required />
          </div>
          <div class="form-group">
            <label for="examplerole">Select Role</label>
            <select v-model="reg.role" required placeholder="Select">
              <option>Admin</option>
              <option>User</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">New Password</label>
            <input type="password" class="form-control"  v-model="reg.password" placeholder="New Password" required />
            <div v-if="reg.password.length > 0 && reg.password.length < 8" class="text-danger">
            Password length must be Minimum 8 & must have Combination of Alphabet, Number & Special Character!
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input type="password" class="form-control" id="ConfirmPassword" v-model="reg.ConfirmPassword"
              placeholder="Confirm Password" required />
            <div v-if="reg.password != reg.ConfirmPassword" class="text-danger">
              Password Did Not Matched !
            </div>
          </div>

          <button class="btn btn-success">Register</button>
          <div><button class="btn btn-danger"><a href="/">Login</a></button></div>
        </form>
      </div>

      <div class="col-md-3"></div>
    </div>
  </div>
</template>
  
<script>
import router from "@/router";
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      reg:{
        fullName: "",
        userId: "",
        email: "",
        password: "",
        ConfirmPassword: "",
        role:""
    },
      err: [],
    };
  },
  created() {

},
  methods: {
    register() {
      axios.post("http://localhost:8081/saveUser", this.reg)
        .then(
          ({ data }) => {
            console.log(data)
              if(data.comments == "User Id is not Unique"){
              this.$toast.error("User Id Already Exists!", {
                position: "top-right",
                duration: 5000,
                dismissible: false,
              });}
              else if(data.comments == "Admin User Limit Reached"){
                this.$toast.error("Admin User Limit Reached!", {
                position: "top-right",
                duration: 5000,
                dismissible: false,
              });
              }
            else{
              this.$toast.success("Register successfull!", {
                position: "top-right",
                duration: 5000,
                dismissible: false,
              });
              router.push("/")
            }
          },
        )
    }
  }
}
</script>
  
<style scoped>
.col-md-6 {
  width: 60%;
  padding-left: 10%;
  
}
input{
  border: 1px solid;
}
.container{
  background-repeat: no-repeat;
  background-size: cover; 
  width: 100%;
  height:100vh; 
  background-image: url(https://www.ndiem.in/wp-content/uploads/2021/03/event-1200x600.jpg);

}
form{
  width: 70%;
  border: 5px solid;
  /* background: -webkit-gradient(linear,left bottom,left top,from(#fbc2eb),to(#a18cd1)); */
  background: -webkit-gradient(linear,left bottom,left top,from(#fbc2eb),to(#a18cd1));
  /* background: -webkit-linear-gradient(top,#7579ff,#b224ef); */
  /* background-image: -webkit-linear-gradient( 136deg, rgb(224,195,252) 0%, rgb(142,197,252) 100%); */

}
a{
  color: white;
}
.btn-danger,.btn-success {
  border-radius: 50rem;
  margin: 5px;
  width: 50%;
  color: white;
}
select {
  display: block;
  width: 100%;
  height: 35px;
  border: 1px solid;
  margin-bottom: 10px;
  padding-left: 10px;
  background: url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='black'/></g></svg>") no-repeat;
  background-position: right 5px top 50%;
  background-color: white;
}
h1{
  font-weight: bold;
  font-size: 40px;
  color: black;
}
</style>