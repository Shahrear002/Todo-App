<template>
  <div id="signin">
    <div class="signin-form">
      <h1 style="text-align: center">To-Do App</h1>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Email</label>
          <p v-if="errors.email" class="alert alert-danger">{{ errors.email }}</p>
          <input 
            type="email"
            id="email"
            v-model="email">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <p v-if="errors.password" class="alert alert-danger">{{ errors.password }}</p>
          <input 
            type="password"
            id="password"
            v-model="password">
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <p style="text-align: center; padding-top: 10px">Don't have an account ? <a href="/signup">Register</a></p>
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
        user: null,
        errors: {}
      }
    },
    methods: {
      ...mapMutations([
        'setUser',
        'setToken'
        ]),
      async onSubmit() {
        const formData = {
          email: this.email,
          password: this.password
        }
        // console.log(formData)
        try {
          let response = await axios.post('/users/login', formData)
          // console.log(response.data.user)
          this.user = response.data.user
          localStorage.setItem('token', response.data.token)
          this.setUser(response.data.user)
          this.setToken(response.data.token)
          this.$store.dispatch('autoLogout')
          this.$router.push("/")
        } catch (error) {
            this.errors = error.response.data
            console.log(this.errors)
        }
      }
    },
    // created() {
    //   this.$store.dispatch('autoLogout')
    // },
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