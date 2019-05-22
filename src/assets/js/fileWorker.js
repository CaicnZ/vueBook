
let index = 0,length=0,lastStr='';
const skip = 10000;
let secondArr = [];
const replaceStr = (str)=>{
  let rplcArr = str.split(/\r\n/);
  rplcArr = rplcArr.filter(item=>item.length>1);
  rplcArr = rplcArr.map((item,index)=>{
    if(!index&&item.length<100){
      return `<h3>${item}</h3>`
    }
    return `<p>${item}</p>`;
  })
  return rplcArr.join('');
}
const changFile2Array = (file)=>{
  for( index=0; index + skip < length; index=index+skip){
    const fileSlice = lastStr + file.slice(index,index+skip);
    const fileArr = fileSlice.split(/\r\n\r\n/);
    const len = fileArr.length;
    lastStr = fileArr[len-1];
    const newFileArr = fileArr.slice(0,len-1).map(item=>replaceStr(item));
    if(index==0){
      let strFirst = '',arrFirst=[],temp=false;
      newFileArr.forEach((item,index)=>{
        if(!temp&&item.length<1000){
          strFirst += item;
        }else{
          if(!temp){
            arrFirst.push(strFirst);
            temp = true;
          }
          arrFirst.push(item);
        }
      });
      postMessage(arrFirst);
    }else{
      secondArr.push(...newFileArr);
    }
  }
  postMessage(secondArr);
}
onmessage = function (e) {

  const buffer = e.data;
  const blob = new Blob([buffer]);
  const reader = new FileReader();
  reader.readAsText(blob, 'utf-8');
  reader.onload = function (e){
    const file = e.target.result;
    length = file.length;
    changFile2Array(file);
  }
};