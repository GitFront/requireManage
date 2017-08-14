<?php
  header("Content-type:text/html;charset=utf-8");

//   echo '这是一个后台语言中的输出信息。。。';
// 后台语言是可以加载可是解析html代码 的，可以通过include将html代码引入过来
//		include  '/views/dashboard/index.html';
//		include  '/views/dashboard/login.html';
//		include  '/views/teacher/list.html';
//		include  '/views/user/list.html';

	//	$_SERVER 可以获取有关服务器的一切信息，其中就包括用户的访问网址
	//  index.php后面的地址信息，是存在于PATH_INFO这个属性当中的
		//echo $_SERVER['PATH_INFO'];

			//var_dump($_SERVER);
		// 在浏览器中实现一个简化输入的访问方式 比如：
		// studyit.com/index.php/views/dashboard/index
		// studyit.com/index.php/views/index
		// studyit.com/index.php/dashboard/index
		// studyit.com/index.php/index
   $path = '';
   if(array_key_exists('PATH_INFO',$_SERVER)){
   // 判断某个数组当中是否有某个属性  array_key_exists()
   	// 用户输入的内容里面有index.php后面的信息的时候，可以用如下的方式进行判断
   	 $path = $_SERVER["PATH_INFO"];   //   /views/dashboard/index
    		// string.substr   "abc".slice(1)
    		 $path = substr($path,1);    // js中的切割字符串是split() 而PHP中切割字符中是用explode()

    		$arr = explode('/',$path);

    		if(count($arr) ==2){  // dashboard/index  也就是数组中有两个内容的时候
//    			$path = '/views/'.$path;
    			$path = '/views/'.$arr[0].'/'.$arr[1];
    		}else if(count($arr)==1){ // index
    		    $path = '/views/dashboard/'.$path;
    		}
   }else {
   			$path = '/views/dashboard/index';
   }
		//var_dump($arr);

		 // count()

    include  $path.".html";  // 获取用户输入的内容再拼接上.html页面，就可以返回给浏览器供浏览器渲染了

    // 此时的index.php就相当于是一个入口路由或是一个路由导航

    //http://studyit.com/index.php/index

    //studyit.com/index.php/views/dashboard/index
    //studyit.com/index.php/dashboard/index
    //studyit.com/index.php/index
    //studyit.com/index.php
    //studyit.com
    //studyit.com/views/dashboard/index
    // studyit.com/dashboard/index
    //studyit.com/index

?>