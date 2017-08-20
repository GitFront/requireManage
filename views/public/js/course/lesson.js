/**
 * Created by Administrator on 2017/8/20.
 */
define(['jquery', 'template', 'utils', 'bootstrap', 'form'], function ($, template, utils) {
  // 获取url中的id 向服务器发送请求，渲染模块
  var cs_id = utils.queryString().cs_id;
  // 1. 根据id向后台发送请求
  renderLesson();
  //2.给添加按钮注册整个的，弹出模态框
  $('.steps').on('click', '#addLesson', function () {

    var obj = {
      title:'课时添加',
      saveTextBtn :'添加',
      actionUrl:'/api/course/chapter/add'
    };
    var htmlStr = template('tpl_cs_modal',obj);
    $('#tpl_modal').html(htmlStr);

    $('#lesson').modal();
  });

  // 3.给保存按钮注册事件
  // $('.btnSave').on('click', function () { // 之前是直接注册的事件，但是现在的按钮是通过模态框渲染出来的了，所以得通过事件委托的方式来注册事件了
  $('#tpl_modal').on('click','.btnSave', function () {
    var ct_is_free = Number($('input[name=ct_is_free]').prop('checked'));
    $('form').ajaxSubmit({    // ajaxSubmit这个按钮，如果你提供了url的话，则是以url进行提交，如果没有url，则是以表单中的action中的接口进行提交
      // url: '/api/course/chapter/add',
      type: 'post',
      data: {
        // 如果在表单里面无法获取的数据，需要我们在这个地方，手动添加
        ct_cs_id: cs_id,  // 当前课程章节的id 是和当前的主课程是有关联的
        ct_is_free: ct_is_free
      },
      success: function (info) {
        if (info.code == 200) {
          alert('添加成功...渲染当前页面...');
          renderLesson();
          $('#lesson').modal('hide');
        }
      }
    })
  });
  //4. 给编辑按钮注册事件，要把当前章节的所有的信息内容 显示在模态框上
  $('.steps').on('click', '#btnEdit', function () {
    $.ajax({
      url: '/api/course/chapter/edit',
      type: 'get',
      data: {
        ct_id: $(this).parent().attr('data-id')
      },
      success: function (info) {
        if(info.code==200){
          // js是动态的弱类型语言   所谓的弱类型，就是指js中对变量中存储的数据类型要求不严格
          // 动态  可以给对象随时的添加属性和方法  js中的数组是动态可变的
          info.result.title = '编辑课时';
          info.result.saveTextBtn = '保 存';
          info.result.actionUrl = '/api/course/chapter/modify';
          var htmlStr = template('tpl_cs_modal',info.result);
          $('#tpl_modal').html(htmlStr);

          $('#lesson').modal();
        }

      }
    })

  })

  /**
   * 根据id渲染当前页面的函数
   */
  function renderLesson() {
    $.ajax({
      url: '/api/course/lesson',
      type: 'get',
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        if (info.code == 200) {
          // 请求成功之后，渲染模板
          var htmlStr = template('tpl_cs_lesson', info.result);
          $('.steps').html(htmlStr);
        }
      }
    })

  }
})