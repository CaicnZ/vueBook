<template>
  <div id="app">
    <input type="file" accept="*.txt" @change="upload">
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    upload(event){
      const files = event.srcElement.files;
      const reader = new FileReader();
      console.log(files);
      reader.readAsText(files[0]);
      reader.onload = function (ev) {
        console.log(ev.target.result);
      }
    },
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  color: #42b983;
}
</style>
