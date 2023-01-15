<template>
     <div class="container">
    <h1 style = "text-decoration:underline;">Forgot Password</h1>
    <br>
    <br>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">Send Mail</button>
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
    name: "forgotpwd"
}
</script>

<style scoped>
.col-md-6{
  background-color: rgb(229, 235, 241);
}
</style>