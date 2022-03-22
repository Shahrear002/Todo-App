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
        password: ''
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
          console.log(response.data.user)
          localStorage.setItem('token', response.data.token)
          this.setUser(response.data.user)
          this.setToken(response.data.token)
          this.$router.push("/")
        } catch (error) {
            console.log(error.response.data)
        }
      }
    },
    created() {
      setTimeout(() => {
        this.$store.dispatch('logout')
      }, 1200000)
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