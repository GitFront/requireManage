/**
 * Created by Administrator on 2017/8/18.
 */
// 模块化   获取 id  发请求  渲染模板
define(['utils','jquery','template'],function (utils,$,template){
     //1. 获取url中的id
  var cs_id = utils.queryString().cs_id;
  //2. 发送请求，获取数据
  $.ajax({
    url:'/api/course/picture',
    type:'get',
    data:{
      cs_id:cs_id
    },
    success:function (info){
      if(info.code == 200){
        // 3. 渲染模板
        var htmlStr = template('tpl_cs_pic',info.result);
        $('.steps').html(htmlStr);

        //4. 开户图片上传的功能
        . uploadify();
      }

    }
  })

})