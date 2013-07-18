//bypeb!
(function($) {/*
var paparazzi = paparazzi || {};

paparazzi.createPaparazzi = */
$.fn.createPaparazzi = function( config ) {
  return this.each( function () {
      var
        paparazziTemplate = '' +
          '<div class="paparazzi">\n' +
          '  <video autoplay></video>\n' +
          '  <img src="">\n' +      
          '  <canvas></canvas>\n' +
          '</div>',
        hasGetUserMedia = false,
        $container = $( this ),
        html = paparazziTemplate,
        $paparazzi,

        $video,
        $img,
        $canvas,

        video,
        img,
        canvas,
        ctx;

      navigator.getUserMedia =  ( navigator.getUserMedia ||
                                  navigator.webkitGetUserMedia ||
                                  navigator.mozGetUserMedia ||
                                  navigator.msGetUserMedia );
      hasGetUserMedia = !!navigator.getUserMedia;

      function takePhoto ( config ) {
        if (  hasGetUserMedia && config.success ) {
            ctx.drawImage( video, 0, 0 );
            config.success({ dataUrl: canvas.toDataURL() });
            img.src = canvas.toDataURL();
        } else { config.error && config.error( 'no Media' ); }

        return this;
      };

      function initialize( config ) {

        //rendering
        $container.html( html );

        //detections
        $paparazzi = $( 'div.paparazzi', $container );

        $video = $( 'video', $paparazzi );
        $img = $( 'img', $paparazzi );
        $canvas = $( 'canvas', $paparazzi );

        video = $video[ 0 ];
        img = $img[ 0 ];
        canvas = $canvas[ 0 ];

        ctx = canvas.getContext('2d');


        if (  hasGetUserMedia ) {
          navigator.getUserMedia( { video: true }, function ( stream ) {
            video.src = window.URL.createObjectURL( stream );
            setTimeout(function () {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
          }, 100);

          }, function ( err ) { config.error && config.error( err ); } );

        } else { config.error && config.error( 'no Media' ); }    
      } 

      initialize();

      config.$button.on( 'click', function () { takePhoto( config ); } );

     //$container.takePhoto = takePhoto; 
     /* $container.paparazzi = {
        takePhoto: takePhoto
        //TODO: add destroy, destroy, at the end must do: delete $container.paparazzi
      };*/
  });


};
} ( jQuery ));