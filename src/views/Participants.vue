<template>
  <div id="app">
    <h1><u>Participant Details</u></h1>
  </div>
  <br>
  <div class="search pull-right">
  <input type="text" v-model="search" placeholder="Search By Name,EmailId,Booking Date...">
</div>
<br>
<br>
<br>
  <download-csv class="btn btn-success active pull-left" @click="download">
    <span class="glyphicon glyphicon-download-alt"></span>
    Export to Excel
  </download-csv>
  <button class="btn btn-primary active pull-right" ><a @click="$router.back()">Events List</a></button>
  <!-- <button class="btn btn-lg active pull-right" data-toggle="modal" data-target="#add">
    <span class="glyphicon glyphicon-plus"></span> New Booking
  </button> -->

  <table>
    <thead>
      <tr style="background: -webkit-gradient(linear,left bottom,right top,from(#fc2c77),to(#6c4079));">
        <!-- <th>Booking Id</th> -->
        <th v-on:click="sorteventname()">Event name <span class="glyphicon glyphicon-arrow-up pull-right"></span></th>
        <th v-on:click="sortparticipantname()">Participant Name <span class="glyphicon glyphicon-arrow-up pull-right"></span></th>
        <th>Participant Email</th>
        <th v-on:click="sortbookeddate()">Booked Date <span class="glyphicon glyphicon-arrow-up pull-right"></span></th>
        <th>Participant Phone</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="participant in filtersearch" :key="participant.bookingId">
        <!-- <td>{{ participant.bookingId }}</td> -->
        <td>{{ participant.eventName }}</td>
        <td>{{ participant.participantName }}</td>
        <td>{{ participant.participantEmail }}</td>
        <td>{{ participant.bookedDate }}</td>
        <td>{{ participant.participantPhone }}</td>
        <td>
          <button class="btn btn-warning active" data-toggle="modal" data-target="#edit" @click="editbooking(participant)">
            <span class="glyphicon glyphicon-edit"></span> Edit
          </button>
        </td>
        <td>
          <button class="btn btn-danger active" data-toggle="modal" data-target="#delete"
            @click="selectedbookingdelelte(participant.bookingId)">
            <span class="glyphicon glyphicon-trash"></span>
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <br>


  <!-- add model -->
  <div class="container">
    <div class="modal fade" id="add" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">New Booking</h4>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addbooking">
              <label>Event Name</label>
              <select v-model="eventName" required @change="getselect($event)">
                <option v-for="(event, index) in events" :key="index">
                  {{ event.eventName }}
                </option>
              </select>
              <label>Participant Name</label>
              <input type="text" name="Participant Name" v-model="participantName" required />
              <label>Participant Email</label>
              <input type="email" name="Participant Email" v-model="participantEmail" required />
              <!-- <label >Booked Date</label>
              <input type="date" name="Booked Date" v-model="bookedDate" required /> -->
              <label>Participant Phone</label>
              <input type="text" name="Participant Phone" v-model="participantPhone" required />
              <div class="modal-footer">
                <button class="btn btn-primary active pull-left">
                  <span class="glyphicon glyphicon-plus"></span> Confirm Booking 
                </button>
                <button type="button" class="btn btn-danger active" data-dismiss="modal">
                  <span class="glyphicon glyphicon-remove"></span>Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit model -->
  <div class="container">
    <div class="modal fade" id="edit" role="dialog" v-if="currentid">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title">Edit Participant Details</h1>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updatebooking">
              <!-- <label>Event Name</label>
              <select v-model="currentid.eventName" required @change="getselect($event)">
                <option v-for="(event, index) in events" :key="index">
                  {{ event.eventName }}
                </option>
              </select> -->
              <label>Participant Name</label>
              <input type="text" name="Participant Name" v-model="currentid.participantName" required />
              <label>Participant Email</label>
              <input type="email" name="Participant Email" v-model="currentid.participantEmail" required />
              <!-- <label >Booked Date</label>
              <input type="date" name="Booked Date" v-model="currentid.bookedDate" required /> -->
              <label>Participant Phone</label>
              <input type="text" name="Participant Phone" v-model="currentid.participantPhone" required />
              <div class="modal-footer">
                <button class="pull-left btn-warning active">
                  <span class="glyphicon glyphicon-pencil"></span> Update Changes
                </button>
                <button type="button" class="btn btn-danger active" data-dismiss="modal">
                  <span class="glyphicon glyphicon-remove"></span>Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Modal -->

  <div class="container">
    <div class="modal fade" id="delete" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title alert alert-danger">
              Delete Participant !
            </h1>
          </div>
          <div class="modal-body">
            <h3>Are You Sure You Want to delete ?</h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger active pull-left" @click="deletebooking(selectedbookingdelelte)"
              data-dismiss="modal">
              <span class="glyphicon glyphicon-trash"></span>Delete
            </button>
            <button type="button" class="btn btn-primary active" data-dismiss="modal">
              <span class="glyphicon glyphicon-remove"></span>Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios
import axios from "axios";

export default {
  name: "paticipants",
  data() {
    return {
      
      selectedValues: [],
      selectedOptions:[],
      id:"",
      currentid: {},
      showDeleteModal: false,
      participants: [],
      search:"",
      events: [],
      checked: false,
      evename:"",
      participants: {
        eventId: "",
        eventName: "",
        bookedDate: "",
        participantName: "",
        participantEmail: "",
        participantPhone: "",
      },
    };
  },
  computed:{
    filtersearch: function(){
      return this.participants.filter((participant) =>{
        return participant.participantName.match(this.search) || participant.bookedDate.match(this.search) || participant.participantEmail.match(this.search)
      })
    }
  },
  created() {
    this.getparticipants();
    this.getEvent();
  },

  methods: {
    sorteventname (){
        this.participants = this.participants.sort(
          function (eventA , eventB) {
            return eventA["eventName"].localeCompare(eventB["eventName"]);
          }
          
        )
        
      },
      sortparticipantname (){
        this.participants = this.participants.sort(
          function (eventA , eventB) {
            return eventA["participantName"].localeCompare(eventB["participantName"]);
          }
          
        )
        
      },
      sortbookeddate (){
        this.participants = this.participants.sort(
          function (eventA , eventB) {
            return eventA["bookedDate"].localeCompare(eventB["bookedDate"]);
          }
          
        )
        
      },
    //get event name
    getEvent() {
      axios.get('http://localhost:8081/events').then((response) => {
        this.events = response.data;
        console.log(response.data);
        
      }).catch((err) => {
        console.log(err);
      })
    },
    // Get All participants
     getparticipants() {
      axios.get('http://localhost:8081/participants').then((response) => {
        this.participants = response.data;
        console.log(response.data);
      }).catch((err) => {
        console.log(err);
      })
    },
    getselect(event){
      console.log(event.target.value);
      this.evename = event.target.value;
    },
    // add participants
    async addbooking() {
      try {
        console.log(this.evename);
        for(let i=0; i<this.events.length; i++){
            if(this.evename === this.events[i].eventName){
              this.id = this.events[i].id;
              console.log(this.id);
            }
        }
        console.log(this.evename);
        console.log(this.events.eventName);
        await axios.post("http://localhost:8081/participants", {
          eventId: this.id,
          eventName: this.evename,
          participantName: this.participantName,
          participantEmail: this.participantEmail,
          bookedDate: this.bookedDate,
          participantPhone: this.participantPhone,
        });

        this.eventId = "";
        this.eventName = "";
        this.participantName = "";
        this.participantEmail = "";
        this.bookedDate = "";
        this.participantPhone = "";
        this.$router.go()
        
        // alert("Data Added Successfully");
        this.$toast.success("Booking was Successfully", {
              position:"top-right",
          duration:15000,
          dismissible:false,
          });
        
      } catch (err) {
        console.log(err);
      }
    },


    //edit booking
    editbooking: function (participants) {
      this.currentid = participants;
    },
    async updatebooking() {
      console.log(this.currentid.eventName);
      try {
        for(let i=0; i<this.events.length; i++){
            if(this.currentid.eventName === this.events[i].eventName){
              this.id = this.events[i].id;
              console.log(this.id);
            }
        }
        console.log(this.currentid.bookingId);
        console.log(this.id);
        console.log(this.currentid.eventName);
        console.log(this.currentid.participantName);
        console.log(this.currentid.participantEmail);
        console.log(this.currentid.bookedDate);
        console.log(this.currentid.participantPhone);
        await axios.put(
          `http://localhost:8081/participants`,
          {
          bookingId: this.currentid.bookingId,
          eventId: this.id,
          eventName: this.currentid.eventName,
          participantName: this.currentid.participantName,
          participantEmail: this.currentid.participantEmail,
          bookedDate: this.currentid.bookedDate,
          participantPhone: this.currentid.participantPhone,

          }
        );
        this.$router.go();
        this.$toast.info("Booking Details Updated", {
              position:"top-right",
          duration:15000,
          dismissible:false,
          });
      } catch (err) {
        console.log(err);
      }
    },

    selectedbookingdelelte(participants) {
      this.selectedbookingdelelte = participants;
    },

    // // Delete employee
    async deletebooking(bookingId) {
      try {
        await axios.delete(`http://localhost:8081/participants/${bookingId}`);
        this.getparticipants();
        
        this.$toast.error("Booking Deleted", {
              position:"top-right",
          duration:15000,
          dismissible:false,
          });
          this.$router.go();
      } catch (err) {
        console.log(err);
      }
    },

    // download
    download() {
      this.$toast.success("Downloading File.......", {
          position: "top-right",
          duration: 15000,
          dismissible: false,
        });
      import("../views/export.js").then((excel) => {
        axios.get("http://localhost:8081/participants").then(response => {
          //console.log(response.data);
          const obj = response.data;
          const header = ["Booking Id", "Event ID", "Participant Name", "Participant Email", "Booked Date", "Participant Phone"];
          const field = ["bookingId", "eventId", "participantName", "participantEmail", "bookedDate", "participantPhone"];
          const Data = this.formatejson(field, obj);
          excel.export_json_to_excel({
            header: header,
            data: Data,
            sheetName: "Participants Details",
            filename: "Participants List",
            autoWidth: true,
            bookType: "xlsx",
          })
        })
      })
    },

    //formate json
    formatejson(filter, json) {
      return json.map((v) => filter.map((j) => {
        return v[j];
      }))
    }
  },
};
</script>
  <style scoped>
   form {
  max-width: 500px;
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
a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: white;
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

thead {
  background-color: #5b5c5e;
}

th {
  color: white;
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
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 15px;
  text-align: center;
  border: none;
  place-items: right;
}

.btn-del {
  background: #dc3545;
}
.modal-content{
  background: -webkit-gradient(linear,left bottom,left top,from(#fbc2eb),to(#a18cd1));
}
/* form {
  background: -webkit-gradient(linear,left bottom,left top,from(#fbc2eb),to(#a18cd1));
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

select {
  display: block;
  width: 100%;
  height: 35px;
  border: rgb(0, 14, 13) 2px solid;
  margin-bottom: 10px;
  padding-left: 10px;
  background:  url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='black'/></g></svg>") no-repeat;
  background-position: right 5px top 50%;
}
h1{
  font-weight: bold;
  font-size: 500;
}
.search{
  width: 25%;
}
  </style>