/**
 * Created by Administrator on 2017/8/15.
 */
define(['jquery', 'template','bootstrap'], function ($, template) {
  // 首先去后台请求数据库，加载当前页面
  $.ajax({
    url: '/api/teacher',
    type: 'get',
    success: function (data) {
      if (data.code == 200) {
        // 要把当前请求回来的数据渲染到html当中
        var html = template('tpl_tc_list', data); // 模板的第二个参数是一个对象 ，不要用其它的数据
        $('#tc_list').html(html);
      }
    }
  });

  // $('#tc_info').on('click',function (){
  //        alert(123);
  // })
  $('#tc_list').on('click', 'a.check-info', function () {
    alert(123);
    var id = $(this).parent().attr('data-id');
    // var id = $(this).parent().data('id'); //也是可以获取到对应的id值的
    // console.log(id);
    $.ajax({
      url: '/api/teacher/view',
      type: 'get',
      data: {
        tc_id: id
      },
      success: function (res) {
          if(res.code==200){
            var htmlStr = template('tpl_tc_modul',res.result);
            $('#teacherModal tbody').html(htmlStr);
            $('#teacherModal').modal();  // 让模态框显示出来
          }
      }
    })
  })
})