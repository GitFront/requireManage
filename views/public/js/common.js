
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