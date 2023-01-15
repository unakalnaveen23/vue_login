<template>
  <br>
  <br>
    <router-link :to="{ name: 'employeecreate'}" class="btn">Add Employee</router-link>
      <table>
        <thead>
          <tr>
            <th>Emp_id</th>
            <th>Emp_Name</th>
            <th>Emp_LastName</th>
            <th>Emp_Phone No</th>
            <th>Emp_Desigination</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employee" :key="employee.id">
            <td>{{employee.id}}</td>
            <td>{{employee.Emp_Name}}</td>
            <td>{{employee.Emp_LastName}}</td>
            <td>{{employee.Emp_phoneno}}</td>
            <td>{{employee.Emp_Desigination}}</td>
            <td>
              <router-link :to="{ name: 'employeeedit', params: { id: employee.id }}" class="btn">Edit</router-link>
              <button @click="del(employee.id)" class="btn btn-del">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    
    <script>
    import {onMounted, ref} from 'vue';
    
    export default {
      name: 'employee',
      setup() {
        const employee = ref([]);
    
        onMounted( async () => {
          const res = await fetch('http://localhost:3000/employee');
    
          employee.value = await res.json();
        })
    
        const del = async (id) => {
          await fetch(`http://localhost:3000/employee/${id}`, {
            method: 'DELETE'
          })
    
          employee.value = employee.value.filter(p => p.id !== id);
        }
    
        return { employee, del }
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
  padding: 0.5rem;
  border-bottom: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  text-align: center;
}
table td,
table th {
  padding: 0.5rem;
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