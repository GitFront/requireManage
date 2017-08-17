/**
 * Created by Administrator on 2017/8/15.
 */
define(['jquery', 'template','bootstrap'], function ($, template) {
  // 首先去后台请求数据库，加载当前页面
  // 显示所有的讲师信息
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
  //查看讲师信息
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

  // 按钮的注销和启用功能
  $('#tc_list').on('click','a.btnHandle',function (){
    var _this = $(this);  // 将当前对象 先存起来
    $.ajax({
      url:'/api/teacher/handle',
      type:'post',
      data:{
        tc_id: $(this).parent().attr('data-id'),
        tc_status:$(this).attr('data-status')
      },
      success:function (res){
        if(res.code==200){
          if(res.result.tc_status==1){
            // 如果返回来的数据是1的话，表示当前按钮的状态是注销的状态，显示的文字是启用
            _this.text('启 用');  // 因为此处是回调函数，不能直接使用this，得使用之前存起来的对象
          } else {
            _this.text('注 销');
          }
          //将返回来的状态值，重新赋值给按钮的data-status属性
          _this.attr('data-status',res.result.tc_status);
          // 如果更新此属性的话，则此按钮无法正常切换
        }

      }
    })
  })

})