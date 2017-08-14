
	// NProgress.start();
  //
	// NProgress.done();
  //ih w
	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });

	// 验证是否登陆，如果没有登陆的话，则跳转到登陆页面
	if(!$.cookie('PHPSESSID')&&location.pathname!='/login'){
	///views/dashboard/login
		 window.location.href= '/login';
	}

	// 判断  因为login页面是没有侧边栏和顶部的  因此需要排队掉首页面

 	if(location.pathname!='/login'&&location.pathname!='/dashboard/login'&&location.pathname!='/views/dashboard/login'){
    var html = template('tpl_profile',JSON.parse($.cookie('tcInfo')));
    $('.aside>.profile').html(html);
	}

