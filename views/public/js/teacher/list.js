/**
 * Created by Administrator on 2017/8/15.
 */
define(['jquery','template'],function ($,template){
   // 首先去后台请求数据库，加载当前页面
  $.ajax({
    url:'/api/teacher',
    type:'get',
    success:function (data){
       if(data.code==200){
         // 要把当前请求回来的数据渲染到html当中
         var html = template('tpl_tc_list',data); // 模板的第二个参数是一个对象 ，不要用其它的数据
         $('#tc_list').html(html);
       }
    }
  });

  
})