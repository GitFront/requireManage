/**
 * Created by Administrator on 2017/8/15.
 */
require.config({
  baseUrl: '/views/public',
  paths: {
    'jquery': 'assets/jquery/jquery',
    'cookie': 'assets/jquery-cookie/jquery.cookie',
    'bootstrap': 'assets/bootstrap/js/bootstrap.min',
    'template': 'assets/artTemplate/template',
    'nprogress': 'assets/nprogress/nprogress',
    'form': 'assets/jquery-form/jquery.form',
//      'common': 'js/common'
    'common': 'js/dashboard/common',
    'login': 'js/dashboard/login'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    }
  }
});
require(['common']);
