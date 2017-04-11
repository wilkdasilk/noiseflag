//= require webpack-bundle

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).on('turbolinks:load', function() {
  $('form.search-tracks').on('submit', function(e) {
    e.preventDefault();
    console.log("I'm submitting");
    $.ajax({
      url: $('.search-tracks-btn').attr('ajax-path'),
      data: $('form').serialize(),
      async: true,
      method: 'GET',
      success: onSuccess
    })
  });

  function onSuccess(res) {
    var base_url = $('#path_input').val();
    var query = $('#search_query').val();
    window.location.replace(base_url + "?q=" + query );
  }

});

//for setting user geolocation
function getGeoLocation() {
  navigator.geolocation.getCurrentPosition(setGeoQuery);
}

function setGeoQuery(position) {
  //reload the page with full location functionality
  var base_url = location.href;
  if (base_url.substring(-1) =="/") {
    base_url = base_url.substring(0, base_url.length -1);
  }
  window.location.replace(base_url + `?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
}
