// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//= require jquery3
//= require popper
//= require bootstrap-sprockets


import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

// import the bootsrap library.
import "bootstrap"

// import the app/assets/stylesheets/application.css
// file from the previous step.
// import "../../assets/stylesheets/application"

$(document).on('turbolinks:load', function() {

  var show_error, stripeResponseHandler, submithHandler;

  window.setTimeout(function() {
    $('.alert').fadeTo(500, 0).slideUp(500, function() {
      $(this).remove();
    });
  }, 3000);

  submitHandler = function (event) {
    var $form = $(event.target);
    $form.find("input[type=submit]").prop("disabled", true);

    if(Stripe){
      Stripe.card.createToken($form, stripeResponseHandler);
    } else {
      show_error("Failed to load credit card processing functionality. Please reload this page in your browser.")
    }
    return false;
  };

  $(".cc_form").on('submit', submitHandler);

  stripeResponseHandler = function (status, response) {
     var token, $form;

     $form = $('.cc_form');

     if (response.error) {
       console.log(response.error.message);
       show_error(response.error.message);
       $form.find("input[type=submit]").prop("disabled", false);
     } else {
       token = response.id;
       $form.append($("<input type=\"hidden\" name=\"payment[token]\" />").val(token));
       $("[data-stripe=number]").remove();
       $("[data-stripe=cvv]").remove();
       $("[data-stripe=exp-year]").remove();
       $("[data-stripe=exp-month]").remove();
       $("[data-stripe=label]").remove();
       $form.get(0).submit();
     }
     return false;
   };

   show_error = function (message) {
     if($("#flash-messages").size() < 1) {
       $('div.container.main div:first').prepend("<div id='flash-messages'></div>")
     }
     $("#flash-messages").html('div class="alert alert-warning"><a class="close" data-dismiss="alert">x</a><div id="flash_alert">' + message + '</div></div>');
     $('.alert').delay(5000).fadeOut(3000);
     return false;
   };

})
