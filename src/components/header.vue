<template>
  <header>
    <div class="title">{{msg}}</div>
    <input type="text" class="n-input" v-model="content" placeholder="搜索" @keyup.enter="submit">
    <a class="t-btn" @click="showTools"></a> 
  </header>
</template>

<script>
export default {
  data(){
    return{
      msg:"凡人修仙传",
      content:'',
    }
  },
  methods:{
    showTools(){
      console.log(1);
    },
    submit(){
      alert(this.msg);
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  header{
    width: 100%;
    height: 60px;
    z-index: 999;
    background: red;
    display:flex;
    .title{
      font-size: 20px;
      line-height: 30px;
      margin:15px 100px;
      max-width: 300px;
      color: pink;
    }
    input{
      width: 40%;
      min-width: 200px;
      max-width: 500px;
      height: 40px;
      margin: 10px;
      padding: 7px 10px;
      line-height: 26px;
      border: 1px solid #c0ccda;
      border-radius: 4px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      box-sizing: border-box;
      font-size: inherit;
      outline: none;
    }
    a{
      display: block;
      width: 40px;
      height: 40px;
      margin: 10px 50px;
      background:url('../assets/list.png');
      background-repeat:no-repeat;
      background-size:cover
    }
  }
</style>