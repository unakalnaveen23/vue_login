<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light">
  <a class="navbar-brand" href="/">Employee's Management Protal</a>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        
      </li>
      <li class="nav-item active">
       
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <router-link class="nav-link justify-content-end" to="/" style>Home</router-link>
      <router-link class="nav-link justify-content-end" to="/about">About</router-link>
      <!-- <router-link class="nav-link" to="/login"><button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Login</button></router-link>
      <router-link class="nav-link" to="/register"><button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Register</button></router-link> -->
    </form>
  </div>
</nav>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000101;
}

nav {
  padding: 0px;
}

nav a {
  font-weight: bold;
  color: #000000;
}

nav a.router-link-exact-active {
  color: #000000;
}

.navbar{
  background-color: rgb(229, 235, 241);
}


</style>
