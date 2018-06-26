jQuery(function ($) {
    "use strict";

    var gglMap;

    function initialize() {
        var lat = $('#map').attr('data-lat'),
            
            lng = $('#map').attr('data-lng'),
            text = $('.map-box .info').html();
        lat = parseFloat(lat) || 0;
        lng = parseFloat(lng) || 0;
        var latlng = new google.maps.LatLng(lat, lng);
        var myOptions = {
            zoom: 10,
            center: latlng,
            //disableDefaultUI: true,
            //zoomControl: true,
            streetViewControl: false,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        gglMap = new google.maps.Map(document.getElementById("map"), myOptions);
        var marker = new google.maps.Marker({
            map: gglMap,
            position: latlng,
            visible: false
        });
        var infowindow = new google.maps.InfoWindow({
            content: text,
            maxWidth: 240
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
        $(window).resize(function () {
            var center = gglMap.getCenter();
            google.maps.event.trigger(gglMap, 'resize');
            gglMap.setCenter(center);
        });
    }

    if ($('#map').length) {
        initialize('map');
    }

});
