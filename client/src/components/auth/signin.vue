<template>
  <div id="signin">
    <div class="signin-form">
      <h1>To-Do App</h1>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Email</label>
          <input 
            type="email"
            id="email"
            v-model="email">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input 
            type="password"
            id="password"
            v-model="password">
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapMutations } from 'vuex'

  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: {}
      }
    },
    methods: {
      ...mapMutations(["setUser","setToken"]),
      onSubmit() {
        const formData = {
          email: this.email,
          password: this.password
        }
        // console.log(formData)
        axios.post('/users/login', formData)
          .then(res => {
            // console.log(res.data.user)
            const token = res.data.token
            const user = res.data.user
            delete user.password
            console.log(token)
            this.setToken(token)
            this.setUser(user)
          }).catch(error => {
              if(error.response) {
                this.errors = error.response.data
              }
          })
      }
    }
  }

</script>

<style scoped>
  .signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
    text-align: center;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>