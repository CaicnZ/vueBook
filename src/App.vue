<template>
  <div id="app">
      <input v-if="showUpload" type="file" accept="*.txt" @change="upload">
      <Body :pageData='showPage'></Body>
      <div class="left" @click="leftClick"></div>
      <div class="right" @click="rightClick"></div>
      <div class="bottomMenu" @click="menuClick"></div>
      <div class="backTop" @click="backTopClick"></div>
      <Menu  v-if='showMenu' :cancle='cancle' :jump='jump' :search='search' ></Menu>
  </div>
</template>

<script>
  const BOOK_DATA = "BOOK_DATA";
  const BOOK_INDEX = "BOOK_INDEX";
  import Body from './views/body.vue';
  import Menu from './views/menu.vue';
  import md5 from 'js-md5';
  export default {
    name: 'app',
    components:{
      Body,Menu
    },
    data () {
      return {
        bookArr:[],
        index:1,
        showMenu:false,
        showUpload:true,
        bookDataMd5: '',
      }
    },
    computed: {
      showPage(){
        const b = document.body.scrollTop || document.documentElement.scrollTop;
        if(b>0){
          this.backTopClick();
        }
        return this.bookArr[this.index];
      }
    },
    methods:{
      rightClick(){
        const newIndex = this.index + 1;
        if(this.bookArr[newIndex]){
          this.index = newIndex;
          if(this.bookDataMd5){
            window.localStorage.setItem(this.bookDataMd5,this.index);
          }
        }
      },
      leftClick(){
        const newIndex = this.index - 1;
        if(newIndex>-1&&this.bookArr[newIndex]){
          this.index = newIndex;
          if(this.bookDataMd5){
            window.localStorage.setItem(this.bookDataMd5,this.index);
          }
        }
      },
      backTopClick(){
        cancelAnimationFrame(timer);
        //获取当前毫秒数
        const startTime = +new Date();     
        //获取当前页面的滚动高度
        const b = document.body.scrollTop || document.documentElement.scrollTop;
        const d = 500;
        const c = b;
        var timer = requestAnimationFrame(function func(){
            const t = d - Math.max(0,startTime - (+new Date()) + d);
            document.documentElement.scrollTop = document.body.scrollTop = t * (-c) / d + b;
            timer = requestAnimationFrame(func);
            if(t == d){
              cancelAnimationFrame(timer);
            }
        });
      },
      menuClick(){
        this.showMenu = !this.showMenu;
      },
      jump(val){
        this.showMenu = false;
        if(this.bookArr[val]){
          this.index = val;
          if(this.bookDataMd5){
            window.localStorage.setItem(this.bookDataMd5,this.index);
          }
        }
      },
      search(val){
        console.log(val);
      },
      cancle(){
        this.showMenu = false;
      },
      onMessage(e){
        this.bookArr = this.bookArr.concat(e.data);
        if(this.bookArr.join('').length>20000){
          const bookMd5 =  md5(JSON.stringify(this.bookArr));
          if(window.localStorage.getItem(bookMd5)){
            this.index = Number.parseInt(window.localStorage.getItem(bookMd5));
          }
          this.bookDataMd5 = bookMd5;
        };
      },
      doWithFile(file){
        const worker = new Worker('src/assets/js/fileWorker.js');
        worker.postMessage(file);
        worker.onmessage = this.onMessage;
      },
      upload(event){
        this.showUpload = false;
        const files = event.srcElement.files;
        const reader = new FileReader();
        reader.readAsArrayBuffer(files[0],{encoding: 'utf8'});
        reader.onload = (ev) => {
          const reader = ev.target.result;
          this.doWithFile(reader,[reader]);
        }
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
body {
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  &>.left, &>.right{
    position: fixed;
    width: 60px;
    height: 60px;
    cursor: pointer;
    top: 40%;
    background-size: cover;
  }
  &>.left{
    left: 20px;
    background-image: url('./assets/img/left.png');
  }
  &>.right{
    right: 20px;
    background-image: url('./assets/img/right.png');
  }
  &>.bottomMenu{
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 80px;
    right: 30px;
    background-image: url('./assets/img/menu.png');
    background-size: cover;
  }
  &>.backTop{
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-image:url('./assets/img/top.png');
    background-size: cover;
  }
}
</style>
