
    var posX = 0,
        posY = 60,
        scale = 1,
        last_scale = 1,
        transform = "translate3d(" + posX + "px," + posY + "px, 0) " +
                                "scale3d(" + scale + ", " + scale + ", 1)",
        last_posX = 0,
        last_posY = 0,
        max_pos_x = 0,
        max_pos_y = 0;

function attachHammer() {
    hammertime = new Hammer($( '#pdf_source' )[ 0 ], {});
    hammertime.get('pinch').set({
        enable: true
    });

    var el = $( '#pdf_source' )[ 0 ];

    hammertime.on('doubletap pan pinch panend pinchend', function(ev) {
        //pan
        posX = last_posX + ev.deltaX;
        posY = last_posY + ev.deltaY;
        max_pos_x = Math.ceil((scale) * el.clientWidth);
        max_pos_y = Math.ceil((scale) * el.clientHeight);
        if (posX > max_pos_x) {
            posX = max_pos_x;
        }
        if (posX < -max_pos_x) {
            posX = -max_pos_x;
        }
        if (posY > max_pos_y) {
            posY = max_pos_y;
        }
        if (posY < -max_pos_y) {
            posY = -max_pos_y;
        }

        //pinch
        if (ev.type == "pinch") {
            scale = Math.max(.5, Math.min(last_scale * (ev.scale), 4));
        }
        if(ev.type == "pinchend"){last_scale = scale;}

        //panend
        if(ev.type == "panend"){
        last_posX = posX < max_pos_x ? posX : max_pos_x;
        last_posY = posY < max_pos_y ? posY : max_pos_y;
        }

        transform =
            "translate3d(" + posX + "px," + posY + "px, 0) " +
            "scale3d(" + scale + ", " + scale + ", 1)";

        el.style.webkitTransform = transform;

    });
}

function resetData(){
    posX = 0,
    posY = 60,
    scale = 1,
    last_scale = 1,
    transform = "",
    last_posX = 0,
    last_posY = 0;

    el = $( '#pdf_source' )[ 0 ];

    transform =
        "translate3d(" + posX + "px," + posY + "px, 0) " +
        "scale3d(" + scale + ", " + scale + ", 1)";
    el.style.webkitTransform = transform;
    el.style.webkitTransform = transform;

transform = "";
}

attachHammer();