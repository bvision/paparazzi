//bypeb!
(function($) {

var
  paparazziTemplate = '' +
          '<div class="paparazzi">\n' +
          '  <video autoplay></video>\n' +
          '  <img src="">\n' +      
          '  <canvas></canvas>\n' +
          '</div>',
  hasGetUserMedia,
  dummyCallback = function () {},
  Paparazzi;

//detect getUserMedia support
navigator.getUserMedia =  ( navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia );
hasGetUserMedia = !!navigator.getUserMedia;

Paparazzi = function ($container, config) {

  config.success = config.success || dummyCallback;
  config.error = config.error || dummyCallback;

  if (!hasGetUserMedia) {
    config.error("Not supported");
    return;
  }

  this.$container = $container;
  this.config = config;
  this.initialize();
};

$.extend(Paparazzi.prototype, {

  initialize: function () {
    var $paparazzi, video, img, canvas,
        config = this.config,
        that = this;

    //rendering
    this.$container.html( paparazziTemplate );

    //detections
    $paparazzi = $( 'div.paparazzi', this.$container );
    video = this.video = $( 'video', $paparazzi )[0];
    img = this.img = $( 'img', $paparazzi )[0];
    canvas = this.canvas = $( 'canvas', $paparazzi )[0];
    
    this.ctx = canvas.getContext('2d'),

    navigator.getUserMedia( { video: true }, function ( stream ) {
      video.src = window.URL.createObjectURL( stream );

      //set canvas width and height to match video source dimensions
      setTimeout(function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }, 100);

      config.$button.on( 'click', function () {
        that.takePhoto();
      } );

    }, config.error);
  
  },

  takePhoto: function () {
    var dataUrl;
    this.ctx.drawImage( this.video, 0, 0 );
    dataUrl = this.canvas.toDataURL();
    this.img.src = dataUrl;
    this.config.success({ dataUrl: dataUrl });
  }

});

//expose Paparazzi constructor
window.Paparazzi = Paparazzi;

$.fn.paparazzi = function( config ) {
  return this.each( function () {
      var $this = $(this),
          data = $this.data('paparazzi');

      if (!data) {
        $this.data("paparazzi", new Paparazzi($this, config));
      }
  });
};

} ( jQuery ));