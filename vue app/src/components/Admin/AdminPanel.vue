<template>
  <div class="box">
    <div class="columns">
      <div class="column is-flex is-flex-direction-column">
        <button class="button is-primary" @click="toggleModalCreateUser = true">
          <span>Create User</span>
          <span class="icon is-small">
            <i class="fas fa-user-plus"></i>
          </span>
        </button>
      </div>
      <div class="column is-flex is-flex-direction-column">
        <button class="button is-dark" @click="downloadData">
          <span>Download data - Temperature in the last days </span>
          <span class="icon is-small">
            <i class="fas fa-download"></i>
          </span>
        </button>
      </div>
    </div>
  </div>

  <!-- loading table -->
  <div class="box has-text-centered is-size-5" v-if="usersLoading">
    Loading users
  </div>

  <div class="box is-flex is-justify-content-center" v-if="!usersLoading">
    <table class="table is-hoverable m-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Username</th>
          <th>Phone number</th>
          <th>Creation time</th>
          <th>Last Sign-In</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="{
            'is-selected': user.uid === 'XCvGaNAKsPR6ADhcvCC9hzFC5po2',
          }"
          v-for="(user, index) in users"
          :key="user[index]"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.displayName }}</td>
          <td>{{ user.phoneNumber }}</td>
          <td>{{ user.metadata.creationTime }}</td>
          <td>{{ user.metadata.lastSignInTime }}</td>

          <td class="has-text-centered">
            <button
              class="button is-danger is-outlined"
              v-if="user.uid != 'XCvGaNAKsPR6ADhcvCC9hzFC5po2'"
              :class="{ 'is-loading': loadingDel[index] }"
              @click="deleteUser(user.uid, index)"
            >
              <span>Delete user</span>
              <span class="icon is-small">
                <i class="fas fa-times"></i>
              </span>
            </button>
          </td>
          <td>
            <div v-if="user.uid != 'XCvGaNAKsPR6ADhcvCC9hzFC5po2'">
              <button
                @click="
                  infoUser(user.uid);
                  toggleModalEdit = true;
                "
                class="button is-outlined is-primary"
              >
                <span>Edit</span>
                <span class="icon is-small">
                  <i class="fas fa-user-edit"></i>
                </span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- edit modal -->
  <div class="modal" :class="{ 'is-active': toggleModalEdit }">
    <div class="modal-background" @click="toggleModalEdit = false"></div>
    <div class="modal-content">
      <div class="box">
        <h2 class="title is-2">Edit user</h2>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label class="label">Username</label>
            <div class="columns">
              <div class="column is-10">
                <div class="control has-icons-left">
                  <input
                    class="input"
                    type="text"
                    placeholder="Username"
                    v-model.trim="username"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user-tag"></i>
                  </span>
                </div>
              </div>
              <div class="column">
                <button
                  class="button is-primary is-outlined"
                  type="button"
                  :class="{ 'is-loading': loadingNameUpdate }"
                  @click="submitName"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Email address</label>
            <div class="columns">
              <div class="column is-10">
                <div class="control has-icons-left">
                  <input
                    class="input"
                    type="email"
                    placeholder="New email address"
                    v-model.trim="email"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </div>
                <p class="help">Must be a valid email address</p>
              </div>
              <div class="column">
                <button
                  class="button is-primary is-outlined"
                  type="button"
                  :class="{ 'is-loading': loadingEmailUpdate }"
                  @click="submitEmail"
                >
                  Update
                </button>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Phone number</label>
            <div class="columns">
              <div class="column is-10">
                <div class="control has-icons-left">
                  <input
                    class="input"
                    type="tel"
                    placeholder="Phone number"
                    v-model.trim="phoneNumber"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-mobile"></i>
                  </span>
                </div>
                <p class="help">Must be in format: +421 901 919 919</p>
              </div>
              <div class="column">
                <button
                  class="button is-primary is-outlined"
                  type="button"
                  :class="{ 'is-loading': loadingNumberUpdate }"
                  @click="submitPhoneNumber"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button is-primary"
                :class="{ 'is-loading': loadingEdit }"
              >
                <span>Edit All</span>
                <span class="icon">
                  <i class="fas fa-check"></i>
                </span>
              </button>
            </div>
            <div class="control">
              <!-- type="button" aby mi nesubmitol form, default je type="submit"-->
              <button
                @click="toggleModalEdit = false"
                type="button"
                class="button is-light"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
  <!-- edit modal -->

  <!-- createUser -->
  <div class="modal" :class="{ 'is-active': toggleModalCreateUser }">
    <div class="modal-background" @click="toggleModalCreateUser = false"></div>
    <div class="modal-content">
      <div class="box">
        <h2 class="title is-2">Create User</h2>
        <form @submit.prevent="createUser">
          <div class="field">
            <label class="label">Username</label>

            <div class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Username"
                v-model.trim="createUserData.username"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user-tag"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Email address</label>

            <div class="control has-icons-left">
              <input
                class="input"
                type="email"
                placeholder="Email address"
                v-model.trim="createUserData.email"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
            <p class="help">Must be a valid email address</p>
          </div>

          <div class="field">
            <label class="label">Password</label>

            <div class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Password"
                v-model.trim="createUserData.password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <p class="help">Must be a atleast 6 characters long!</p>
          </div>
          <div class="field">
            <label class="label">Phone number</label>

            <div class="control has-icons-left">
              <input
                class="input"
                type="tel"
                placeholder="Phone number"
                v-model.trim="createUserData.number"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-mobile"></i>
              </span>
            </div>
            <p class="help">Must be in format: +421 901 919 919</p>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button is-primary"
                :class="{ 'is-loading': loadingCreateUser }"
              >
                <span>Create New User</span>
                <span class="icon">
                  <i class="fas fa-check"></i>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      users: [],
      loadingDel: [],
      loadingEdit: false,
      loadingNameUpdate: false,
      loadingEmailUpdate: false,
      loadingNumberUpdate: false,
      loadingCreateUser: false,
      toggleModalEdit: false,
      toggleModalCreateUser: false,
      email: '',
      phoneNumber: '',
      username: '',
      userId: '',
      usersLoading: false,
      createUserData: {
        email: '',
        password: '',
        username: '',
        number: '',
      },
    };
  },
  methods: {
    createUser() {
      this.loadingCreateUser = true;
      axios
        .post(
          'https://us-central1-vue-http-908f5.cloudfunctions.net/createUser',
          {
            email: this.createUserData.email,
            phoneNumber: this.createUserData.number,
            displayName: this.createUserData.username,
            password: this.createUserData.password,
          }
        )
        .then(() => {
          this.createUserData.email = '';
          this.createUserData.number = '';
          this.createUserData.username = '';
          this.createUserData.password = '';
          this.loadingCreateUser = false;
          this.toggleModalCreateUser = false;
          axios
            .get(
              'https://us-central1-vue-http-908f5.cloudfunctions.net/getUsers'
            )
            .then((response) => {
              this.users = response.data;
            });
        });
    },
    downloadData() {
      this.$store.dispatch('downloadData');
    },
    infoUser(uid) {
      this.userId = uid;
    },
    submitName() {
      this.loadingNameUpdate = true;
      const uid = this.userId;
      const displayName = this.username;
      axios
        .post('https://us-central1-vue-http-908f5.cloudfunctions.net/upUser', {
          uid,
          displayName,
        })
        .then(() => {
          axios
            .get(
              'https://us-central1-vue-http-908f5.cloudfunctions.net/getUsers'
            )
            .then((response) => {
              this.users = response.data;
              this.loadingNameUpdate = false;
              //setting empty string on input values
              this.username = '';
            });
        });
    },
    submitEmail() {
      this.loadingEmailUpdate = true;
      const uid = this.userId;
      const email = this.email;
      axios
        .post('https://us-central1-vue-http-908f5.cloudfunctions.net/upUser', {
          uid,
          email,
        })
        .then(() => {
          axios
            .get(
              'https://us-central1-vue-http-908f5.cloudfunctions.net/getUsers'
            )
            .then((response) => {
              this.users = response.data;
              this.loadingEmailUpdate = false;
              //setting empty string on input values
              this.email = '';
            });
        });
    },
    submitPhoneNumber() {
      this.loadingNumberUpdate = true;
      const uid = this.userId;
      const phoneNumber = this.phoneNumber;
      axios
        .post('https://us-central1-vue-http-908f5.cloudfunctions.net/upUser', {
          uid,
          phoneNumber,
        })
        .then(() => {
          axios
            .get(
              'https://us-central1-vue-http-908f5.cloudfunctions.net/getUsers'
            )
            .then((response) => {
              this.users = response.data;
              this.loadingNumberUpdate = false;
              //setting empty string on input values
              this.phoneNumber = '';
            });
        });
    },
    submitForm() {
      this.loadingEdit = true;
      const uid = this.userId;
      const email = this.email;
      const phoneNumber = this.phoneNumber;
      const displayName = this.username;

      axios
        .post('https://us-central1-vue-http-908f5.cloudfunctions.net/upUser', {
          uid,
          email,
          phoneNumber,
          displayName,
        })
        .then(() => {
          axios
            .get(
              'https://us-central1-vue-http-908f5.cloudfunctions.net/getUsers'
            )
            .then((response) => {
              this.users = response.data;
              this.toggleModalEdit = false;
              this.loadingEdit = false;

              //setting empty string on input values
              this.userId = '';
              this.email = '';
              this.phoneNumber = '';
              this.username = '';
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteUser(uid, index) {
      this.loadingDel[index] = true;
      axios
        .post('https://us-central1-vue-http-908f5.cloudfunctions.net/delUser', {
          uid,
        })
        .then(() => {
          axios
            .get(
              'https://us-central1-vue-http-908f5.cloudfunctions.net/getUsers'
            )
            .then((response) => {
              this.users = response.data;
              this.loadingDel[index] = false;
            });
        });
    },
  },
  mounted() {
    this.usersLoading = true;
    axios
      .get('https://us-central1-vue-http-908f5.cloudfunctions.net/getUsers')
      .then((response) => {
        this.users = response.data;
        this.usersLoading = false;
      });
    setInterval(() => {
      axios
        .get('https://us-central1-vue-http-908f5.cloudfunctions.net/getUsers')
        .then((response) => {
          this.users = response.data;
        });
    }, 5000);
  },
};
</script>
