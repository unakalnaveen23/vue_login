<template>
    <form  @submit.prevent="add" style="background-color: rgb(229, 235, 241);">
      <label>Employee Name</label>
      <input type="text" name="Enp name" v-model="Emp_Name"  required              
      />
      <label>Employee Last Name</label>
      <input type="text" name="Emp last name" v-model="Emp_LastName"  required              
      />
      <label>Employee Phone No</label>
      <input type="text" name="Emp phoneno" v-model="Emp_phoneno"  required              
      />
      <label>Employee Desigination</label>
      <input type="text" name="Emp desigination" v-model="Emp_Desigination" required
      />
      <button>Add Employee</button>
      <br>
      <a class="btn btn-primary" href="/employee" role="button">Cancel</a>
  </form>

  </template>
  
  <script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
      name: "employeecreate",
      setup() {
         const Emp_Name = ref(''); 
         const Emp_LastName = ref('');
         const Emp_phoneno = ref('');
         const Emp_Desigination = ref('');
         const router = useRouter();
  
         const add = async () => {
             await fetch('http://localhost:3000/employee', {
                 method: 'POST',
                 headers: {"Content-type": "application/json"},
                 body: JSON.stringify({ 
                    Emp_Name: Emp_Name.value,
                    Emp_LastName: Emp_LastName.value,
                    Emp_phoneno: Emp_phoneno.value,
                    Emp_Desigination: Emp_Desigination.value
                  })
             });
  
             await router.push('/employee');
         }
         
         return {Emp_Name, Emp_LastName, Emp_phoneno, Emp_Desigination, add}
      }
      
      
  }
  </script>
  
  <style scoped>
    form {
  max-width: 350px;
  width: 100%;
  margin: auto;
}
ul {
  list-style: none;
}
.nav-bar {
  background-color: #343a40;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.nav-bar a {
  color: white;
}
.top-nav li {
  display: inline-block;
  padding: 15px 15px 15px 0px;
  
}
.title {
  padding-left: 15px;
  font-size: 20px;
}
.wrraper {
  display: flex;
}
.left-content {
  background-color: #f8f9fa;
  flex: 2;
  min-height: 90vh;
}
.side-menu {
  margin-top: 20px;
}
.side-menu li {
  border-bottom: dashed 1px #cfd3d8;
}
.side-menu a {
  display: block;
  padding: 10px 15px;
  color: #343a40;
  text-decoration: none;
}
.right-content {
  padding: 20px;
  flex: 9;
}
table {
  width: 100%;
  max-width: 100%;
  background-color: transparent;
  border-collapse: collapse;
  border-top: 1px solid #dee2e6;
  border-left: 1px solid #dee2e6;
}
table thead th {
  vertical-align: bottom;
}

td,
th {
  padding: 0.3rem;
  border-bottom: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
}
table td,
table th {
  padding: 0.75rem;
  vertical-align: top;
}
.btn,
button {
  display: inline-block;
  background: #007bff;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 30px;
  margin-bottom: 15px;
  text-align: center;
  border: none;
  place-items: right;
}
.btn-del {
  background: #dc3545;
}
/* form {
  max-width: 350px;
  width: 100%;
  margin: auto;
} */
label {
  display: block;
  font-size: 18px;
  margin-top: 15px;
  line-height: 30px;
}
input {
  display: block;
  width: 100%;
  height: 35px;
  border: rgb(0, 14, 13) 2px solid;
  margin-bottom: 10px;
  padding-left: 10px;
}
  </style>