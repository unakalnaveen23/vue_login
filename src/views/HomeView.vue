<template>
  <div class="home">
    <br>
    <h1 >Welcome to Event Management System</h1>
    <div class="container">
    <br>
    <br>
    <div class="row">
      <div class="col-md-9"></div>
      <div class="col-md-3 pull-right">
        <form @submit.prevent="LoginData">
          <div class="form-group">
            <h2 style="color: black;">Login</h2>
            <br>
            <label for="exampleInputEmail1">User ID</label>
            <input type="text" class="form-control" id="Email" v-model="user.userId" aria-describedby="emailHelp"
              placeholder="Enter UserId" required />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="Password" v-model="user.password" placeholder="Password"
              required />
              
            <div v-if="user.password.length > 0 && user.password.length < 8" class="text-danger">
            Password length must be Minimum 8 & must have Combination of Alphabet, Number & Special Character!</div>
          </div>

          <button class="btn btn-success">Login</button>

        </form>
        <div><button class="btn btn-danger"><a href="/register">Register</a></button></div>
      </div>
      
    </div>
  </div>
  </div>
  
</template>

<script>
import router from '@/router';
import axios from "axios";
export default {
  name: 'HomeView',
  data() {
    return {
      user: {
        userId: '',
        password: '',
        urole:''
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
            console.log(data)
            this.urole = data.role
            if (data.comments == "Invalid User") {
              this.$toast.error("Invalid User or Password!", {
                position: "top-right",
                duration: 5000,
                dismissible: false,
              });
            }
            else{
              this.$toast.success("Login successfull!", {
                position: "top-right",
                duration: 5000,
                dismissible: false,
              });
              //router.push({"/Events",parmas:{data:['urole']}} ) 
              // console.log(this.urole);

              router.push({name: 'Events',params: { state: this.urole }});

            }
          },
        )
    },
  }
}
</script>

<style scoped>
.home{
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-size: cover; 
     height:80vh; 
  background-image: url(https://www.ndiem.in/wp-content/uploads/2021/03/event-1200x600.jpg);
}
.col-md-3 {
  width: 40%;
  align-self: flex-end;
  border-radius: 15px;
  border: 5px solid;
  /* background: -webkit-gradient(linear,left bottom,left top,from(#fbc2eb),to(#a18cd1)); */
  background: -webkit-linear-gradient(top,#7579ff,#b224ef);
  /* background: -webkit-linear-gradient(bottom,#0250c5,#d43f8d); */
  /* background-image: -webkit-linear-gradient( 136deg, rgb(224,195,252) 0%, rgb(142,197,252) 100%); */
}
input{
  border: 1px solid;
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
h1{
  font-weight: 900;
  font-weight: bold;
  font-size: 60px;
  color: white;
}
h2{
  font-weight: bold;
  font-size: 30px;
  color: black;
}
</style>
