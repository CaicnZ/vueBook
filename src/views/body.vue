<template>
    <div :class="$style.showPage">
      <div v-html='dataStr'></div>
    </div>
</template>
  
<script>
  export default {
    props:["pageData"],
    computed: {
      dataStr(){
        return this.pageData;
      }
    },
  }
</script>
  
<style lang="scss" rel="stylesheet/scss" module>
  .showPage{
    width: 800px;
    margin: 20px auto;
    h3{
      text-align: center;
      font-size: 32px;
    }
    p {
      font-size: 26px;
      line-height:1.8;
      overflow:hidden;
      margin: .8em 0;
      word-wrap: break-word;
      word-break: break-all;
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      text-align: left;
    }
  }
</style>
  