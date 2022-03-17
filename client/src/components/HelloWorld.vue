<template>
  <div>
    <h1>{{ value }}</h1>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        value: ''
      }
    },
    created() {
      axios.get('/users/test')
        .then(res => {
          console.log(res)
          this.value = res.data
        }).catch(error => console.log(error))
    }
}
</script>
