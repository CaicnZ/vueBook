<template>
    <div :class="$style.menu" @click='cancle'>
      <div :class="$style.menuItem" @click="(e)=>{e.stopPropagation()}">
          <div :class="$style.navbar">
              <button @click='this.btnClick' id="0" :class="index===0?$style['seleted']:''">搜索</button>
              <button @click='this.btnClick' id="1" :class="index===1?$style['seleted']:''">跳转</button>
          </div>
          <input type="text" v-model="InputValue">
          <button @click="this.handleSureClick">确定</button>
      </div>
    </div>
</template>
  
<script>
  export default {
    props:['search','jump', 'cancle'],
    data(){
      return {
        InputValue:'',
        index:0,
      }
    },
    methods: {
      btnClick(e){
        const ind = Number.parseInt(e.target.id);
        this.index = ind;
      },
      handleSureClick(){
        if(this.index === 1){
          try {
            const Index = Number.parseInt(this.InputValue);
            this.jump(Index);
          } catch (error) {
            console.log(error);
          }
        }else{
          this.search(this.InputValue);
        }
      }
    },
  }
</script>
  
<style lang="scss" rel="stylesheet/scss" module>
  .menu{
    position: fixed;
    top: 0;
    bottom:0;
    left:0;
    right:0;
    width: 100%;
    height: 100%;
    background: rgba($color:gray, $alpha: 0.8);
    z-index:9999;
    .menuItem{
      width: 300px;
      height: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -150px;
      margin-left: -150px;
      .navbar{
        display: flex;
        .seleted{
          background-color: #409eff!important;
        }
      }
      button{
        padding: 12px 23px;
        width: 100px;
        border-radius: 4px;
        margin: 0 25px;
        background-color: #ecf5ff;
        outline: none;
        border: 0px;
        cursor:pointer;
      }
      &>button{
        background-color: #c2e7b0;
      }
      input{
        box-sizing: border-box;
        width: 300px;
        padding: 10px 12px;
        margin: 20px 0;
        outline: none;
        border: none;
      }
    }
  }
</style>