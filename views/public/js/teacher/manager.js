/**
 * Created by Administrator on 2017/8/15.
 */
define(['jquery','template','utils','datepicker','datepickerzh','form',],function ($,template,utils,datepicker){

    var id = utils.queryString().tc_id;
  if(id){   // 编辑的功能
    //   // 根据ID发送请求，然后渲染模板   把当前id下面的数据查询出来，渲染在当前的页面上
    $.ajax({
      // url:'/api/teacher/edit?tc_id='+o.tc_id,
      url:'/api/teacher/edit',
      type:'get',
      data:{
        // tc_id:o.tc_id
        // tc_id:utils.queryString().tc_id
        tc_id:id
      },
      success:function (info){
        info.result.title = '讲师编辑';
        info.result.saveBtnText = '保存';
        if(info.code==200){
          var htmlStr = template('tpl_tc_edit',info.result);
          $('.teacher').html(htmlStr);

          // 使用日期插件
          $('input[name=tc_join_date]').datepicker({
            format:'yyyy/mm/dd',
            language:'zh-CN'
          });
        }
      }
    });

    // 给按钮注册事件，保存上面编辑完了的数据   form
      ajaxSubmit('/api/teacher/update');
  }else {  // 添加按钮的功能
      // 跳转过来之后就要显示当前页面的信息，但是这个页面和编辑功能的页面是同一个页面，编辑按钮跳转过来的时候，是使用模板渲染了页面，因此添加按钮跳转过来也需要 使用同一个模板 渲染页面
    var htmlStr = template('tpl_tc_edit',{
      title:'讲师添加',
      saveBtnText:'添加',
      tc_gender:0  // 设置了一个默认的性别
    });
    $('.teacher').html(htmlStr);
    // 使用日期插件
    $('input[name=tc_join_date]').datepicker({
      format:'yyyy/mm/dd',
      language:'zh-CN'
    });

    //单击按钮，将表单中的数据提交给服务器，完成添加的功能
    ajaxSubmit('/api/teacher/add');
  }

  /**
   * 封装了一个按钮的功能
   * @param url
   */
    function ajaxSubmit(url){
      $('.teacher').on('click','.btnSave',function (){
        $('form').ajaxSubmit({ //和ajax的用法是一模一样的，好处是不用自己手动获取表单中的数据值了，会自动 的帮我们获取到，然后进行提交
          // url:'/api/teacher/update',
          url:url, //根据传入的参数不同，实现不同的提交
          type:'post',
          success:function (info){
            if(info.code == 200){
              // alert('更新成功');
              location.href='/teacher/list';// 提交之后，要跳转到列表页面
            }
          }
        })
        return false;
      });
    }
})