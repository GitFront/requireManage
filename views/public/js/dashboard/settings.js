/**
 * Created by Administrator on 2017/8/17.
 */
define(['jquery','template','uploadify','datepicker','datepickerzh','region','ckeditor'],function ($,template,upload,datepicker,datepickerzh,region,CKEDITOR){
    // 发送请求，获取数据，渲染页面
   $.ajax({
     url:'/api/teacher/profile',
     type:'get',
     success:function (info){
       if(info.code==200){
         var htmlStr = template('tpl_tc_profile',info.result);
         $('.settings').html(htmlStr);

         // 加载图片上传的插件
         $('#upfile').uploadify({
           'swf':'/views/public/assets/uploadify/uploadify.swf',
           'uploader':'/api/uploader/avatar', //提交的接口
           'width':120,
           'height':120,
           'buttonText':'',
            'fileObjName':'tc_avatar',//上传到服务器的文件名，也就是当前的input标签的name属性值
           onUploadSuccess:function (file,data,response){
             // var obj = JSON.parse(data);
             // // obj.result.path
             //  // 图片上传成功之后，服务器会返回一个图片在服务器的地址
             // $('.preview img').attr('src',obj.result.path);
             $('.preview img').attr('src',JSON.parse(data).result.path);
           }
         });

         // 日期插件
         // 使用日期插件
         $('input[name=tc_join_date],input[name=tc_birthday]').datepicker({
           format:'yyyy/mm/dd',
           language:'zh-CN'
         });

         // 三级联动模块插件的使用
         $('#region').region({
           url:'/views/public/assets/jquery-region/region.json'  // 配置数据信息
         });

         // 富文本编辑器的使用
         CKEDITOR.replace('tc_introduce',{
           toolbarGroups:[
             { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
             { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
             { name: 'links' },
             { name: 'insert' },
             { name: 'forms' },
             { name: 'tools' },
             { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] }
           ]
         });
       }
     }
   });




})