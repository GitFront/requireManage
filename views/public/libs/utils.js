/**
 * Created by Administrator on 2017/8/18.
 */
define(function (){

  var obj = {
    queryString:function (){
      // 这是编辑的功能  当跳转到当前页面的时候，页面上得显示当前讲师的信息
      var search = location.search; //"?tc_id=3&name=250&age=20&sex='男'"
      // console.log(search);
      search = search.slice(1);// 有两个参数第一个参数表示截取开始的位置，第二个参数表示结束的位置，如果不写默认是截取到最后
      var searchArr = search.split('&');  //是将字符串切割成数组
      // console.log(searchArr);

      var o ={};
      for(var i=0;i<searchArr.length;i++){
        // 得到数组中第一项，每一个都是一个字符串  tc_id=3  name=250  然后以=再次进行切割
        var temp = searchArr[i].split('=');
        o[temp[0]] = temp[1];
      }
      return o;
    },

  }

    return obj; //返回当前模块里面的对象   假设模块里面的对象 中有很多的方法


})