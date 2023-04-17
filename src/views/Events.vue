<template>
  <div id="app">
    <div>
    <h1><u>Event Details</u></h1>
    </div>
    <!-- <div>
      <a href="/" class="btn btn-lg "><h3 style="color: black;"><span class="glyphicon glyphicon-user"></span>LogOut</h3></a>
    </div> -->
  </div>
  <div class="search pull-right">
    <input type="text" v-model="search" placeholder="Search By Event Name,Date,Location...">
  </div>
  <br>
  <br>
  <div class="row">
    <div class="col-md-3">
      <div class="linkbtn">
        <button class="btn btn-primary active " data-toggle="modal" data-target="#bookevent"><span
            class="glyphicon glyphicon-plus"></span>Book Event</button>
        <button v-if="isadmin" class="btn btn-info active "><a href="/Participants"><span
              class="glyphicon glyphicon-user "></span>Participant Details</a></button>
      </div>
    </div>
    <div class="col-md-6"></div>
    <div class="col-md-3">
      <div class="linkbtn">
        <button v-if="isadmin" class="btn btn-primary active " data-toggle="modal" data-target="#add">
          <span class="glyphicon glyphicon-plus"></span> Add New Event
        </button>
        <button class="btn btn-success active " @click="download">
          <span class="glyphicon glyphicon-download-alt"></span>
          Export to Excel
        </button>
      </div>
    </div>
  </div>
  <!-- <div class="linkbtn">
    <button v-if="isadmin" class="btn btn-info active pull-left"><a href="/Participants"><span
          class="glyphicon glyphicon-user pull-left"></span>Participant Details</a></button>
    <button class="btn btn-primary active pull-left" data-toggle="modal" data-target="#bookevent">Book Event</button>

    <button class="btn btn-success active pull-right" @click="download">
      <span class="glyphicon glyphicon-download-alt"></span>
      Export to Excel
    </button>
    <button v-if="isadmin" class="btn btn-primary active pull-right" data-toggle="modal" data-target="#add">
      <span class="glyphicon glyphicon-plus"></span> Add New Event
    </button>
  </div> -->

  <table>
    <thead>
      <tr style="background: -webkit-gradient(linear,left bottom,right top,from(#fc2c77),to(#6c4079));">
        <th v-on:click="sorteventname()">Event Name <span class="glyphicon glyphicon-arrow-up pull-right"></span></th>
        <th v-on:click="sorteventdate()">Event Date <span class="glyphicon glyphicon-arrow-up pull-right"></span></th>
        <th>Organizer Email</th>
        <th>Organizer Phone</th>
        <th>Event Description</th>
        <th>Event Type</th>
        <th v-on:click="sortlocation()">Event Location <span class="glyphicon glyphicon-arrow-up pull-right"></span></th>
        <th>Event Status</th>
        <th v-if="isadmin">Maximum Seats</th>
        <th>Remaining Seats</th>
        <th v-if="isadmin">Edit</th>
        <!-- <th v-if="isadmin">Cancel</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="event in filtersearch" :key="event.id">
        <td>{{ event.eventName }}</td>
        <td>{{ event.eventDate }}</td>
        <td>{{ event.organizerEmail }}</td>
        <td>{{ event.organizerPhone }}</td>
        <td>{{ event.description }}</td>
        <td>{{ event.eventType }}</td>
        <td>{{ event.location }}</td>
        <td>{{ event.status }}</td>
        <td v-if="isadmin">{{ event.maxSeat }}</td>
        <td>{{ event.remSeat }}</td>
        <td v-if="isadmin">
          <button class="btn btn-warning active" :id="'edit' + event.id" data-toggle="modal" data-target="#edit"
            @click="editevent(event)">
            <span class="glyphicon glyphicon-edit"></span> Edit
          </button>
        </td>
        <!-- <td v-if="isadmin">
          <button class="btn btn-danger active" data-toggle="modal" data-target="#delete"
            @click="selectedeventdelelte(event.id)">
            <span class="glyphicon glyphicon-trash"></span>
            Cancel
          </button>
        </td> -->
      </tr>
    </tbody>
  </table>
  <br>
  <!-- <pie-chart :data="[['Blueberry', 44], ['Strawberry', 23], ['Apple', 23]]"></pie-chart> -->
  <div>
    <!-- <pie-chart :data="[[data]]"></pie-chart> -->
    <!-- <line-chart :chartData="piechartevent" /> -->
    <!-- <column-chart :data="[[event.eventName, event.remSeat]]"></column-chart> -->
    <!-- <line-chart
          :chartData="arrPositive"
          :options="chartOptions"
          :chartColors="positiveChartColors"
          label="Positive"
        /> -->
  </div>


  <!-- addmodal for participants -->

  <div class="container">
    <div class="modal fade" id="bookevent" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title">New Booking</h1>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addbooking">
              <label>Event Name</label>
              <select v-model="eventName" required @change="getselect($event)">
                <option v-for="(event, index) in eventcancelled" :key="index">
                  {{ event }}

                </option>

              </select>
              <label>Participant Name</label>
              <input type="text" name="Participant Name" v-model="participantName" required />
              <label>Participant Email</label>
              <input type="email" name="Participant Email" v-model="participantEmail" required />
              <!-- <label >Booked Date</label>
              <input type="date" name="Booked Date" v-model="bookedDate" required /> -->
              <label>Participant Phone</label>
              <input type="text" name="Participant Phone" @keyup="validateParticipantPhoneNumber"
                v-model="participantPhone" required />
              <div v-if="!isValidParticipantPhoneNumber">
                Invalid phone number!
              </div>
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

  <!-- addmodal -->

  <div class="container">
    <div class="modal fade" id="add" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title">Add New Event</h1>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addevent">
              <label>Event Name</label>
              <input type="text" name="Event Name" v-model="eventName" required />
              <label>Event Date</label>
              <input type="date" id="date" name="Event Date" v-model="eventDate" required />
              <label>Organizer Email</label>
              <input type="email" name="Organizer Email" v-model="organizerEmail" required />
              <label>Organizer Phone</label>
              <input type="text" name="Organizer Phone" @keyup="validateOrganizerPhoneNumber" v-model="organizerPhone"
                required />
              <div v-if="!isValidOrganizerPhoneNumber">
                Invalid phone number!
              </div>
              <label>Event Description</label>
              <input type="text" name="Event Description" v-model="description" required />
              <label>Event Type</label>
              <select v-model="eventType" required>
                <option v-for="(event_type, index) in event_type" :key="index">
                  <input type="checkbox" :value="event_type" v-model="selectedOptions" />
                  {{ event_type }}
                </option>
              </select>
              <label>Event Location</label>
              <select v-model="location" required>
                <option v-for="(event_location, index) in event_location" :key="index">
                  <input type="checkbox" :value="event_location" v-model="selectedOptions" />
                  {{ event_location }}
                </option>
              </select>
              <label>Event Status</label>
              <select v-model="status" required>
                <option v-for="(event_status, index) in event_status" :key="index">
                  <input type="checkbox" :value="event_status" v-model="selectedOptions" />
                  {{ event_status }}
                </option>
              </select>
              <label>Maximum Seats</label>
              <input type="number" name="Max Seats" v-model="maxSeat" required />
              <div class="modal-footer">
                <button class="btn btn-info active pull-left">
                  <span class="glyphicon glyphicon-plus"></span> Add New Event
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
            <h1 class="modal-title">Edit Event Details</h1>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateevent">
              <label>Event Name</label>
              <input type="text" name="Event Name" v-model="currentid.eventName" required :disabled="true" />
              <label>Event Date</label>
              <input type="date" name="Event Date" v-model="currentid.eventDate" required />
              <label>Organizer Email</label>
              <input type="email" name="Organizer Email" v-model="currentid.organizerEmail" required />
              <label>Organizer Phone</label>
              <input type="text" name="Organizer Phone" v-model="currentid.organizerPhone" required />
              <label>Event Description</label>
              <input type="text" name="Event Description" v-model="currentid.description" required />
              <label>Event Type</label>
              <select v-model="currentid.eventType" required>
                <option v-for="(event_type, index) in event_type" :key="index">
                  <input type="checkbox" :value="event_type" v-model="selectedOptions" />
                  {{ event_type }}
                </option>
              </select>
              <label>Event Location</label>
              <select v-model="currentid.location" required>
                <option v-for="(event_location, index) in event_location" :key="index">
                  <input type="checkbox" :value="event_location" v-model="selectedOptions" />
                  {{ event_location }}
                </option>
              </select>
              <label>Event Status</label>
              <select v-model="currentid.status" required>
                <option v-for="(event_status, index) in event_status" :key="index">
                  <input type="checkbox" :value="event_status" v-model="selectedOptions" />
                  {{ event_status }}
                </option>
              </select>
              <!-- <label>Maximum Seats</label>
              <input type="number" name="Max Seats" v-model="currentid.maxSeat" required /> -->
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
              Cancel Event !
            </h1>
          </div>
          <div class="modal-body">
            <h3>Are You Sure You Want to Cancel Event ?</h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger active pull-left" @click="deleteevent(selectedeventdelelte)"
              data-dismiss="modal">
              <span class="glyphicon glyphicon-trash"></span>Cancel
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
import axios from "axios";
import HomeView from "../views/HomeView.vue";
import moment from 'moment';
import LineChart from "../views/LineChart";
export default {
  name: "Events",
  components: { 
    HomeView,
    LineChart },
  props: [
    'state'
  ],
  data() {
    return {
      arrPositive:[],
      
      isValidParticipantPhoneNumber: true,
      isValidOrganizerPhoneNumber: true,
      event_type: ["On-Premise", "Virtual"],
      event_location: ["Mumbai", "Delhi", "Jaipur", "Zoom", "Whats App", "Google Meet"],
      event_status: ["Live", "Scheduled", "Cancelled", "Completed"],
      selectedValues: [],
      currentid: {},
      isadmin: false,
      events: [],
      search: "",
      events: {
        eventName: "",
        eventDate: "",
        organizerEmail: "",
        organizerPhone: "",
        description: "",
        eventType: "",
        location: "",
        status: "",
        maxSeat: "",
        remSeat: ""
      },
      participants: [],
      evename: "",
      id: "",
      eventcancelled: [],
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
  computed: {
    filtersearch: function () {
      return this.events.filter((event) => {
        return event.eventName.match(this.search) || event.eventDate.match(this.search) || event.location.match(this.search)
      })
    },

  },
  async created() {
    
    this.getparticipants();
    await this.getEvent();
    this.disableedit();
  },
  mounted() {
    console.log(this.$route.path);
    console.log(this.state);
    if (this.state == 'Admin') {
      this.isadmin = true
      
    }
    else {
      this.isadmin = false
    }

  },
  methods: {
    // async pie(){
    //   const { piedata } =  await axios.get('http://localhost:8081/events')
    //   piedata.forEach(d => {
    //    const eventName = d.eventName;
    //   const {
    //     remSeat,
    //   } = d;
    //   this.arrPositive.push({ eventName, total: remSeat });
    //   })
    //   },

    sorteventname() {
      this.events = this.events.sort(
        function (eventA, eventB) {
          return eventA["eventName"].localeCompare(eventB["eventName"]);
        }

      )

    },
    sorteventdate() {
      this.events = this.events.sort(
        function (eventA, eventB) {
          return eventA["eventDate"].localeCompare(eventB["eventDate"]);
        }

      )

    },
    sortlocation() {
      this.events = this.events.sort(
        function (eventA, eventB) {
          return eventA["location"].localeCompare(eventB["location"]);
        }

      )

    },

    check(id) {
      console.log(id);
    },

    validateParticipantPhoneNumber() {
      const validationRegex = /^\d{10}$/;
      if (this.participantPhone.match(validationRegex)) {
        this.isValidParticipantPhoneNumber = true;
      } else {
        this.isValidParticipantPhoneNumber = false;
      }
    },

    validateOrganizerPhoneNumber() {
      const validationRegex = /^\d{10}$/;
      if (this.organizerPhone.match(validationRegex)) {
        this.isValidOrganizerPhoneNumber = true;
      } else {
        this.isValidOrganizerPhoneNumber = false;
      }
    },



    // Get All events
    async getEvent() {
      await axios.get('http://localhost:8081/events').then((response) => {
        this.events = response.data;
        console.log(response.data);
      }).catch((err) => {
        console.log(err);
      })

    },

    disableedit() {

      var disableedit = this.events.filter((event) => {
        if ((event.status.match("Cancelled") || event.status.match("Completed")) && this.state == "Admin") {
          var editid = document.getElementById("edit" + event.id)
          console.log(editid);
          editid.setAttribute("disabled", "true")
          
        }
        if ((!event.status.match("Cancelled") && !event.status.match("Completed") )) {
          this.eventcancelled.push(event.eventName)
          console.log("this is cancelled");
        }
        // else{
        //   this.eventcancelled.push(event.eventName)

        // }
      })
      console.log(disableedit);
      console.log(this.eventcancelled);
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
    getselect(event) {
      console.log(event.target.value);
      this.evename = event.target.value;
    },

    // add participants
    async addbooking() {
      var checkadd = this.participants.filter((participant) => {
        console.log(participant);
        console.log(this.participantName);
        if (participant.participantName == this.participantName || participant.participantEmail == this.participantEmail) {
          return participant.eventName.match(this.eventName) && participant.participantEmail.match(this.participantEmail)
        }
      })

      if (checkadd.length == 0) {
      try {
        console.log(this.evename);
        for (let i = 0; i < this.events.length; i++) {
          if (this.evename === this.events[i].eventName) {
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
        alert("Sending Booking Details to Register Email id")
        this.$toast.success("Booking was Successfully !!", {
          position: "top-right",
          duration: 15000,
          dismissible: false,
        });
        this.$router.go()

      } catch (err) {
        console.log(err);
      }
    }
    else{
      this.$toast.error("Participant Already Exists", {
          position: "top-right",
          duration: 8000,
          dismissible: false,
        });
    }
    },

    // add event
    async addevent() {
      // var checkadd;
      var checkadd = this.events.filter((event) => {
        console.log(event);
        console.log(this.eventName);
        if (event.eventName == this.eventName) {
          return event.location.match(this.location) && event.eventDate.match(this.eventDate)
        }
      })
      // console.log(checkadd);
      // console.log(checkadd.length);
      if (checkadd.length == 0) {
        try {
          await axios.post("http://localhost:8081/events", {
            eventName: this.eventName,
            eventDate: this.eventDate,
            organizerEmail: this.organizerEmail,
            organizerPhone: this.organizerPhone,
            description: this.description,
            eventType: this.eventType,
            location: this.location,
            status: this.status,
            maxSeat: this.maxSeat,
            remSeat: this.maxSeat
          });
          this.eventName = "",
            this.eventDate = "",
            this.organizerEmail = "",
            this.organizerPhone = "",
            this.description = "",
            this.eventType = "",
            this.location = "",
            this.status = "",
            this.maxSeat = "",
            this.remSeat = ""
          this.$router.go()

          // alert("Data Added Successfully");
          this.$toast.success("New Event Added Successfully", {
            position: "top-right",
            duration: 15000,
            dismissible: false,
          });

        } catch (err) {
          console.log(err);
        }
      }
      else {
        this.$toast.error("Event Already Exists", {
          position: "top-right",
          duration: 8000,
          dismissible: false,
        });
      }
    },


    //   //edit event
    editevent: function (events) {
      this.currentid = events;
    },
    async updateevent() {

      try {
        await axios.put(
          `http://localhost:8081/events/${this.currentid.id}`,
          {
            id: this.currentid.id,
            eventName: this.currentid.eventName,
            eventDate: this.currentid.eventDate,
            organizerEmail: this.currentid.organizerEmail,
            organizerPhone: this.currentid.organizerPhone,
            description: this.currentid.description,
            eventType: this.currentid.eventType,
            location: this.currentid.location,
            status: this.currentid.status,
            maxSeat: this.currentid.maxSeat
          }
        );
        this.$router.go();
        alert("Sending Mail on Event Updates! ")
        this.$toast.info("Updated Event Details Successfully", {
          position: "top-right",
          duration: 15000,
          dismissible: false,
        });

      } catch (err) {
        console.log(err);
      }
    },

    selectedeventdelelte(events) {
      this.selectedeventdelelte = events;
    },

    // Delete event
    async deleteevent(id) {
      try {
        await axios.delete(`http://localhost:8081/events/${id}`);
        this.getEvent();
        alert("Sending Mail on Event Cancellation! ")
        this.$toast.error("Deleted Event Successfully", {
          position: "top-right",
          duration: 15000,
          dismissible: false,
        });
        this.$router.go();
      } catch (err) {
        console.log(err);
      }
    },

    //   // download
    download() {
      this.$toast.success("Downloading File.......", {
        position: "top-right",
        duration: 15000,
        dismissible: false,
      });
      import("../views/export.js").then((excel) => {
        axios.get("http://localhost:8081/events").then(response => {
          //console.log(response.data);
          const obj = response.data;
          const header = ["Event Id", "Event Name", "Event Date", "Organizer Email", "Organizer Phone", "Event Description", "Event Type", "Event Location", "Event Status", "Maximum Seats","Remaining Seats"];
          const field = ["id", "eventName", "eventDate", "organizerEmail", "organizerPhone", "description", "eventType", "location", "status", "maxSeat","remSeat"];
          const Data = this.formatejson(field, obj);
          excel.export_json_to_excel({
            header: header,
            data: Data,
            sheetName: "Event Details",
            filename: "Event Details",
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

a {
  font-weight: bold;
  color: rgb(255, 255, 255);
}

nav a.router-link-exact-active {
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

.modal-content {
  /* background: -webkit-gradient(linear,left bottom,right top,from(#fc2c77),to(#6c4079)); */
  background: -webkit-gradient(linear, left bottom, left top, from(#fbc2eb), to(#a18cd1));
}

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
  background: url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='black'/></g></svg>") no-repeat;
  background-position: right 5px top 50%;
}

/* .col-md-3 {
  display: flex;
  justify-content: space-evenly;
  padding: 5px ;
} */

.linkbtn {
  display: flex;
  justify-content: space-evenly;
  padding: 5px;
}

h1 {
  font-weight: bold;
  font-size: 500;
}

.search {
  width: 25%;
}
</style>