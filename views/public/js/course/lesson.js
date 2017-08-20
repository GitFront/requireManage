/**
 * Created by Administrator on 2017/8/20.
 */
define(['jquery','template','utils','bootstrap'],function ($,template,utils){
   // 获取url中的id 向服务器发送请求，渲染模块
  var cs_id = utils.queryString().cs_id;
  // 1. 根据id向后台发送请求
   $.ajax({
      url:'/api/course/lesson',
     type:'get',
     data:{
        cs_id:cs_id
     },
     success:function (info){
       if(info.code==200){
         // 请求成功之后，渲染模板
         var htmlStr = template('tpl_cs_lesson',info.result);
         $('.steps').html(htmlStr);
       }
     }
   })

  //2.给添加按钮注册整个的，弹出模态框
  $('.steps').on('click','#addLesson',function (){
         $('#lesson').modal();
  });
})