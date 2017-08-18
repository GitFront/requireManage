/**
 * Created by Administrator on 2017/8/18.
 */
define(['jquery','form'],function ($,form){
    $('.btnCreate').on('click',function (){
        $('form').ajaxSubmit({
          url:'/api/course/create',
          type:'post',
          success:function (info){
             if(info.code == 200){
               alert('添加成功');
               location.href='/course/list?cs_id='+info.result.cs_id;
             }
          }//success
        });//ajaxSubmit
        return false;

        // 向服务器发送请求，获取数据 ，渲染页面
    })
})