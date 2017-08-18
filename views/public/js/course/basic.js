/**
 * Created by Administrator on 2017/8/18.
 */
define(['utils', 'jquery', 'template','ckeditor','form'], function (utils, $, template,CKEDITOR) {
  // 向服务器发送请求，获取数据 ，渲染页面   根据id向服务器获取数据，渲染当前的页面
  var cs_id = utils.queryString().cs_id;
  //1.发送ajax请求
  $.ajax({
    url: '/api/course/basic',
    type: 'get',
    data: {
      cs_id: cs_id
    },
    success: function (info) {
      var htmlStr = template('tpl_cs_basic', info.result);
      $('.steps').html(htmlStr);

      // 添加富文本编辑器
      CKEDITOR.replace('cs_brief');
    }//success
  });//ajax

  //2. 给保存按钮注册事件，将当前的信息添加到数据库当中
  $('.steps').on('click','.btnSave',function (){
         alert(666);
         $('#cs_brief').val(CKEDITOR.instances.cs_brief.getData());
         $('form').ajaxSubmit({
           url:'/api/course/update/basic',
           type:'post',
           success:function (info){
             if(info.code == 200){
               alert('保存成功。。。');
                location.href='/course/pic?cs_id='+info.result.cs_id;//如果更新成功了之后，就会跳转到下一个页面
             }
           }
         })
         return false;
  })
})