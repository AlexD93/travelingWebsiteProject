$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {

            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        }
        else {
            if (this.value > '') {
                o[this.name] = this.value || '';
            }
        }
    });
    return o;
};



$(function () {
    $('.datepick').datepicker({
        dateFormat: "yy-mm-dd"
    });

    var markers = [],
        bounds = new google.maps.LatLngBounds();

    var map = new google.maps.Map(document.getElementById("g-map"),
        {
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(0, 0)
        });

    /*if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);

            new google.maps.Marker({
                map: map,
                draggable: false,
                position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            });
        }, function () {
        });
    }*/

    var $errorBlock = $('#not-found');
    $('form[name=filters]').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serializeObject();

    data.apikey = 'reZAJhNEnPa21AGITqUOv6DbNTbQeNKR';

    $.get('https://api.sandbox.amadeus.com/v1.2/hotels/search-airport', data, function (r) {
        
        if (markers.length > 0) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        }

    

    if (r.results.length) {
        $errorBlock.addClass('hide');

        for (i = 0; i < r.results.length; i++) {
                for(j=0; j < r.results[i].contacts.length; j++){
            var amount = '';
            var currency = '';

            if (typeof r.results[i].min_daily_rate !== 'undefined' && 
            typeof r.results[i].min_daily_rate.amount !== 'undefined' && 
            typeof r.results[i].min_daily_rate.currency !== 'undefined') {

            amount = r.results[i].min_daily_rate.amount;
            currency = r.results[i].min_daily_rate.currency;
            }


            var name = '';
            if (typeof r.results[i].property_name !== 'undefined') {
            name = r.results[i].property_name;
            } 


            var phone = '';
            if (typeof r.results[i].contacts[j] !== 'undefined' && 
            typeof r.results[i].contacts[j].detail !== 'undefined') {
            phone = r.results[i].contacts[j].detail;
            }
        

            var info_address = '';
            if (typeof r.results[i].address !== 'undefined' && 
            typeof r.results[i].address.line1 !== 'undefined' && 
            typeof r.results[i].address.city !== 'undefined' && 
            typeof r.results[i].address.region !== 'undefined' &&
            typeof r.results[i].address.postal_code !== 'undefined' && 
            typeof r.results[i].address.country !== 'undefined') {
            info_address = r.results[i].address.line1 + ', ' + 
                            r.results[i].address.city + ', ' + 
                            r.results[i].address.region + ', ' +
                            r.results[i].address.postal_code + ', ' + 
                            r.results[i].address.country;
            }


            var contentString = '<div>' + '<div>' + '<h5>' + 'Name: ' + name +'</h5>' + '</div>' + 
                                '<div>' + '<h5>' + 'Price: ' + amount + currency +'</h5>' + '</div>' +
                                '<div>' + '<h5>' + 'Phone number or Email address: ' + phone +'</h5>' + '</div>' + '</div>' +
                                '<div>' + '<h5>' + 'Address: ' + info_address +'</h5>' + '</div>' + '</div>';

            var marker = new google.maps.Marker({
                map: map,
                draggable: false,
                position: new google.maps.LatLng(r.results[i].location.latitude, r.results[i].location.longitude),
                desc: contentString, //r.results[i].property_name,
                title: r.results[i].property_name //show info when you put cursor on the marker
            });



            marker.info = new google.maps.InfoWindow({
                content: marker.desc
            });


            google.maps.event.addListener(marker, 'click', function () {
                if (markers.length > 0) {
                    for (var j = 0; j < markers.length; j++) {
                    markers[j].info.close();
                        }
                    }
                this.info.open(map, this);

            });

            bounds.extend(marker.getPosition());
                markers.push(marker);
           }
        }

            if (!bounds.isEmpty()) {
                map.fitBounds(bounds);
            }

            }
            else {
            $errorBlock.removeClass('hide');
            }
    });
    })
    });