/**
 * Created by Administrator on 2017/8/14.
 */
define(['jquery','cookie'],function ($){
  $('#formLogin').submit(function (e){
    var data =  $(this).serializeArray(); // 获取表单数据
    $.ajax({
      url:'/api/login',
      type:'post',
      data:data,
      success:function (result){
        alert('登陆成功...');
        $.cookie('tcInfo',JSON.stringify(result.result));
        location.href = '/' ;// 登陆成功之后要跳转到主页面
      },
      error:function (errInfo){
        alert('用户名或是密码错误...');
      }
    })
    return false;  // 不但可以阻止冒泡，还可以阻止默认行为

    //1. common文件夹中的script.html文件改造一下，将原来的文件按模块化的方式 引入进来
    //2. 将commm.js文件改造成模块化，注意模块的引入
    //3. 将登陆改造成模块化 在public/js 下新建一个login.js文件，并进行模块化
    //4. 在dashboard/login.html文件中，调用login.js模块  require();
  })
})