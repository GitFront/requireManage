
	// NProgress.start();
  //
	// NProgress.done();
  //ih w
	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });

	define(['jquery','cookie','template','nprogress'],function ($,ck,template,NProgress){
    // 验证是否登陆，如果没有登陆的话，则跳转到登陆页面
    // 登陆
    if(!$.cookie('PHPSESSID')&&location.pathname!='/login'){
      ///views/dashboard/login
      window.location.href= '/login';
    }

    // 判断  因为login页面是没有侧边栏和顶部的  因此需要排队掉首页面
    // 渲染用户名和头像
    if(location.pathname!='/login'&&location.pathname!='/dashboard/login'&&location.pathname!='/views/dashboard/login'){
      var html = template('tpl_profile',JSON.parse($.cookie('tcInfo')));
      $('.aside>.profile').html(html);
    }
    // 退出功能
    $('#logout').on('click',function (){
           $.ajax({
             url:'/api/logout',
             type:'post',
             success:function (){
                    alert('退出成功');
               location.href='/login';
             }
           })
    });
    // 侧边栏的交互功能
     $('.navs a+ul').prev().on('click',function (){
          // 这是给a标签注册的事件
       $(this).next().slideToggle();
     });

     NProgress.start();
     NProgress.done();

    $(document).ajaxStart(function (){
      NProgress.start();
    });
    $(document).ajaxStop(function (){
      NProgress.done();
    })

	})

