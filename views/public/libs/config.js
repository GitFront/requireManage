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
    'datepicker': 'assets/bootstrap-datepicker/js/bootstrap-datepicker',
    'datepickerzh': 'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
    'uploadify': 'assets/uploadify/jquery.uploadify',
    'region': 'assets/jquery-region/jquery.region',
//      'common': 'js/common'
    'common': 'js/dashboard/common',
    'login': 'js/dashboard/login'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    datepickerzh: {
      deps: ['jquery']
    },
    uploadify: {
      deps: ['jquery']
    }
  }
});
require(['common']);
