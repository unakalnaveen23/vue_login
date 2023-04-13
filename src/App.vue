<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary">
      <div class="pull-left">
    <h2>Event Management System</h2>
  </div>
      <div class="pull-right">
    <!-- <a class="btn btn-lg pull-right "><h3><span class="glyphicon glyphicon-user"></span></h3></a> -->
    <!-- <a href="/about" class="btn btn-lg pull-right "><h3>About</h3></a> -->
    <a href="/" class="btn btn-lg pull-right"><h3><span class="glyphicon glyphicon-user"></span>LogOut</h3></a>
    <!-- <a class="btn btn-lg pull-right "><h3><span class="glyphicon glyphicon-user"></span></h3></a> -->
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
  color: white;
}

nav a.router-link-exact-active {
  color: white;
}

</style>
