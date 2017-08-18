/**
 * Created by Administrator on 2017/8/18.
 */
define(['utils', 'jquery', 'template','ckeditor'], function (utils, $, template,CKEDITOR) {
  // 向服务器发送请求，获取数据 ，渲染页面   根据id向服务器获取数据，渲染当前的页面
  var cs_id = utils.queryString().cs_id;
  //发送ajax请求
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
    }
  })
})