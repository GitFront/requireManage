/**
 * Created by Administrator on 2017/8/17.
 */
define(['jquery','template'],function ($,template){
    // 发送请求，获取数据，渲染页面
   $.ajax({
     url:'/api/teacher/profile',
     type:'get',
     success:function (info){
       if(info.code==200){
         var htmlStr = template('tpl_tc_profile',info.result);
         $('.settings').html(htmlStr);
       }
     }
   })
})