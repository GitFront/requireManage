/**
 * Created by Administrator on 2017/8/18.
 */
define(['jquery','form'],function ($,form){

  // 当单击保存按钮的时候，保存当前添加或是创建出来的课程
    $('.btnCreate').on('click',function (){
        $('form').ajaxSubmit({
          url:'/api/course/create',
          type:'post',
          success:function (info){
             if(info.code == 200){
               alert('添加成功');
               location.href='/course/basic?cs_id='+info.result.cs_id;
             }
          }//success
        });//ajaxSubmit
        return false;
    })//on

  // 向服务器发送请求，获取数据 ，渲染页面   根据id向服务器获取数据，渲染当前的页面

})