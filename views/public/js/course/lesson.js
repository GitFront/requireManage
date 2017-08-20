/**
 * Created by Administrator on 2017/8/20.
 */
define(['jquery','template','utils','bootstrap','form'],function ($,template,utils){
   // 获取url中的id 向服务器发送请求，渲染模块
  var cs_id = utils.queryString().cs_id;
  // 1. 根据id向后台发送请求
    renderLesson();
  //2.给添加按钮注册整个的，弹出模态框
  $('.steps').on('click','#addLesson',function (){
         $('#lesson').modal();
  });

   // 3.给保存按钮注册事件
  $('.btnSave').on('click',function (){
    var ct_is_free =Number($('input[name=ct_is_free]').prop('checked')) ;
        $('form').ajaxSubmit({
          url:'/api/course/chapter/add',
          type:'post',
          data:{
            // 如果在表单里面无法获取的数据，需要我们在这个地方，手动添加
            ct_cs_id: cs_id,  // 当前课程章节的id 是和当前的主课程是有关联的
            ct_is_free:ct_is_free
          },
          success:function (info){
            if(info.code == 200){
              alert('添加成功...渲染当前页面...');
              renderLesson();
              $('#lesson').modal('hide');
            }
          }
        })
  });

  function renderLesson(){
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

  }
})