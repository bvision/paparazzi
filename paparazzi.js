//bypeb!
(function($) {/*
var paparazzi = paparazzi || {};

paparazzi.createPaparazzi = */
$.fn.createPaparazzi = function( config ) {
  return this.each( function () {
      var
        //_ = config._ || window._ , saco dependencia underscore
        paparazziTemplate = '' +
          '<div class="paparazzi">\n' +
          '  <div class="video">\n' +
          '    <video autoplay></video>\n' +
          '    <div class="hotspot"></div>\n' +
          '  </div>\n' +
          '  <canvas></canvas>\n' +
          '  <img src="">\n' +      
          '</div>',
        getMedia =  navigator.getMedia =  ( navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia ),
        hasGetUserMedia = !!getMedia,
        $container = $( this ),
        //htmlId = config.id || 'papparazzi-314',//TODO: sacar id, ubicar por padre
        html = paparazziTemplate,//_.template( paparazziTemplate, { id: htmlId }),
        $paparazzi,

        $video,
        $img,
        $canvas,

        video,
        img,
        canvas,
        ctx,
        $hotspot,
        dragging = false,
        clipper = {
          sx: 0,
          sy: 0,
          swidth: 240,
          sheight: 180,
          x: 0,
          y: 0,
          width: 200,
          height: 100
        };

      function takePhoto ( config ) {
        if (  hasGetUserMedia && config.success ) {
            ctx.drawImage( video, 
              clipper.sx,
              clipper.sy,
              clipper.swidth,
              clipper.sheight,
              clipper.x,
              clipper.y,
              clipper.width,
              clipper.height );
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

        $video = $( '.video', $paparazzi );
        $img = $( 'img', $paparazzi );
        $canvas = $( 'canvas', $paparazzi );

        $hotspot = $( '.hotspot', $paparazzi );

        $hotspot.on( 'mousedown', function () {
          dragging = true;
        });

        $video.on( 'mousemove', function ( e ) {
          var
            x = e.pageX - 60,
            y = e.pageY - 45,
            minx = 0,
            miny = 0,
            maxx = 300,
            maxy = 250;

          if ( dragging && x > minx && y > miny && x < maxx && y < maxy ) {
            $hotspot.offset({
              left: x ,//todo:calibrar
              top: y //todo:calibrar
            });
            clipper.sx = ( x ) * 1.35; //todo:calibrar
            clipper.sy = ( y  ) * 1.75;//todo:calibrar
          }
        });

        $('body').on( 'mouseup', function () {
          dragging = false;
        });

        video = $video.find('video')[ 0 ];
        img = $img[ 0 ];
        canvas = $canvas[ 0 ];

        ctx = canvas.getContext('2d');


        if (  hasGetUserMedia ) {
          navigator.getMedia( { video: true }, function ( stream ) {
            video.src = window.URL.createObjectURL( stream );
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