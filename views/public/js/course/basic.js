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

      // 渲染对应的讲师信息和课程信息
      // 设置select的值 重新设置一下，获取到返回来数据，显示在对应的位置
      $('#cs_tc_id').val(info.result.cs_tc_id);
      $('#cs_cg_pid').val(info.result.cs_cg_pid);
      $('#cs_cg_id').val(info.result.cs_cg_id);

      // 二级联动的一个效果，给主分支添加事件，当变化的时候，子类信息要重新渲染
      $('#cs_cg_pid').on('change',function (){
        $.ajax({
          url:'/api/category/child',
          type:'get',
          data:{
            cg_id:$(this).val()
          },
          success:function (info){
             if(info.code == 200){
               //渲染模板    先拼接一个模板字符串
               var str = '{{each result as v i}}'+
                 '<option value="{{v.cg_id}}">{{v.cg_name}}</option>'+
               '{{/each}}';
               var render = template.compile(str);
               var htmlStr = render(info);
               $('#cs_cg_id').html(htmlStr);
             }
          }
        })
      })

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