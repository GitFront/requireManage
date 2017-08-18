/**
 * Created by Administrator on 2017/8/18.
 */
// 模块化   获取 id  发请求  渲染模板
define(['utils','jquery','template','uploadify'],function (utils,$,template,uploadify){
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

        //4. 开启图片上传的功能
        $('#btnSelect').uploadify({
           swf:'/views/public/assets/uploadify/uploadify.swf',
          uploader:'/api/uploader/cover',
          fileObjName:'cs_cover_original',
          formData:{cs_id:cs_id},
          buttonText:'选择图片',
          buttonClass:'btn btn-success btn-sm',
          width:85,
          height:'auto',
          itemTemplate:'<span></span>',
          onUploadSuccess:function (file,data,response){
            //  var path = JSON.parse(data).result.path;
            // $('.preview img').attr('src',path);
            $('.preview img').attr('src',JSON.parse(data).result.path);

            $('#btnJcrop').prop('disabled',false);
          }
        })
      }

    }
  })

})