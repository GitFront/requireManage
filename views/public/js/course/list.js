/**
 * Created by Administrator on 2017/8/20.
 */
define(['jquery','template'],function ($,template){
     //发请求 获取数据，渲染模板
  $.ajax({
    url:'/api/course',
    type:'get',
    success:function (info){
      if(info.code == 200){
        var htmlStr = template('tpl_cs_list',info);
        $('.courses').html(htmlStr);
      }
    }
  })
})