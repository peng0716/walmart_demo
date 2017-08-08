$(function () {
  //内容高度
  var mainBottom_H = $(document).height() - 60 + 'px';
  $('.mainBottom').css('height', mainBottom_H);
  var topHeight = $('.mainTop').height();
  $('#lanPos').css('top', $('.default').offset().top - topHeight);

  $('.nav > li').hover(function () {
      $('#lanPos').css('top', $(this).offset().top - topHeight);
  }, function () {
      $('#lanPos').css('top', $('.default').offset().top - topHeight);
      var $currentDIV = $(this).children('ul');
      $currentDIV.slideUp(200);
  })
  //一级菜单点击图标
  $('.nav > li').click(function () {
      for (var i = 0; i < $('.nav > li').size(); i++) {
          if (this == $('.nav > li').get(i)) {
              $('.nav > li').eq(i).children('a').addClass('default');
              $('.nav > li').eq(i).children('a').removeClass('left' + i);
              $('.nav > li').eq(i).children('a').addClass('left0' + i);
          } else {
              $('.nav > li').eq(i).children('a').removeClass('default');
              $('.nav > li').eq(i).children('a').removeClass('left0' + i);
              $('.nav > li').eq(i).children('a').addClass('left' + i);
          }
      }
  });

})