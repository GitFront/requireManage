/**
 * Created by Administrator on 2017/8/18.
 */
// 模块化   获取 id  发请求  渲染模板
define(['utils', 'jquery', 'template', 'uploadify', 'Jcrop'], function (utils, $, template, uploadify) {
  //1. 获取url中的id
  var cs_id = utils.queryString().cs_id;
  var Jcrop_api = null;
  //2. 发送请求，获取数据
  $.ajax({
    url: '/api/course/picture',
    type: 'get',
    data: {
      cs_id: cs_id
    },
    success: function (info) {
      if (info.code == 200) {
        // 3. 渲染模板
        var htmlStr = template('tpl_cs_pic', info.result);
        $('.steps').html(htmlStr);

        //4. 开启图片上传的功能
        $('#btnSelect').uploadify({
          swf: '/views/public/assets/uploadify/uploadify.swf',
          uploader: '/api/uploader/cover',
          fileObjName: 'cs_cover_original',
          formData: {cs_id: cs_id},
          buttonText: '选择图片',
          buttonClass: 'btn btn-success btn-sm',
          width: 85,
          height: 'auto',
          itemTemplate: '<span></span>',
          onUploadSuccess: function (file, data, response) {
            //  var path = JSON.parse(data).result.path;
            // $('.preview img').attr('src',path);
            $('.preview img').attr('src', JSON.parse(data).result.path);

            $('#btnJcrop').prop('disabled', false); // 图片上传成功之后要把图片裁切的功能的按钮启用出来
          }//onUploadSuccess
        });// uploadify


        // //5. 开启裁切图片的功能
        // $('#btnJcrop').on('click',function (){
        //   $('.preview img').Jcrop({
        //     aspectRatio: 2,
        //     setSelect: [100,100,240,120],
        //     boxWidth: 400
        //   });
        //        // alert(123);
        // })
      }//if

    }
  })//ajax

  //5.添加裁切图片功能 的话，就得使用事件委托
  $('.steps').on('click', '#btnJcrop', function () {
     // 因为当前只有一个按钮，第一次单击的时候，是裁切的功能，第二次再单击的时候，才是保存的功能
    // 要想区分这两个功能的话，最好是做一个标识
    if(!$(this).attr('data-status')){  //第一次单击按钮，没有这个属性，则是空
      $(this).attr('data-status',123).text('保 存');
      $('.preview img').Jcrop({
        aspectRatio: 2,
        setSelect: [100, 100, 240, 120],
        boxWidth: 400
      },function (){
        Jcrop_api = this;
        this.initComponent('Thumbnailer', { width: 240, height: 120 });
        $('.thumb').append($('.jcrop-thumb'));
      });
    }else {  // 到了这一步的时候，说明此时的按钮是一个保存的功能
      // 获取当前的数据，提交给服务器
      var result = Jcrop_api.getSelection();
      console.log(result);
      $.ajax({
        url:'/api/course/update/picture',
        type:'post',
        data:{
          cs_id:cs_id,
          x: result.x,
          y:result.y,
          w:result.w,
          h:result.h
        },
        success:function (info){
          // 如果上传成功的话 跳转到下一个页面
          if(info.code == 200){
            alert('保存成功。。。');
            location.href='/course/lesson?cs_id='+info.result.cs_id;
          }
        }
      })

    }
  })
})