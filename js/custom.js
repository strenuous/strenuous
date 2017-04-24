/*-------------------------------------------------------------------------
 * RENDIFY - Custom jQuery Scripts
 * ------------------------------------------------------------------------

	1.	Plugins Init
	2.	Site Specific Functions
	3.	Shortcodes
	4.      Other Need Scripts (Plugins config, themes and etc)
	
-------------------------------------------------------------------------*/
"use strict";

jQuery(document).ready(function($){
	
	
/*------------------------------------------------------------------------*/
/*	1.	Plugins Init
/*------------------------------------------------------------------------*/


	/************** Single Page Nav Plugin *********************/
	$('.menu').singlePageNav(
		{filter: ':not(.external)'}
	);




	/************** FlexSlider Plugin *********************/
	$('.flexslider').flexslider({
		animation : 'fade',
		controlNav : false,
		nextText : '',
		prevText : '',
	});

	$('.flex-caption').addClass('animated bounceInDown');

	$('.flex-direction-nav a').on('click', function() {
        $('.flex-caption').removeClass('animated bounceInDown');
        $('.flex-caption').fadeIn(0).addClass('animated bounceInDown');
    });


	/************** LightBox *********************/
	$(function(){
		$('[data-rel="lightbox"]').lightbox();
	});

/*------------------------------------------------------------------------*/
/*	2.	Site Specific Functions
/*------------------------------------------------------------------------*/


	/************** Go Top *********************/
	$('#go-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    /************** Responsive Navigation *********************/
	$('.toggle-menu').click(function(){
        $('.menu').stop(true,true).toggle();
        return false;
    });
    $(".responsive-menu .menu a").click(function(){
        $('.responsive-menu .menu').hide();
    });
});

function sendEmail(){
	var isValid = true;
	var contactName = $('#name-id').val();
	var contactEmail = $('#email-id').val();
	var contactSubject = $('#subject-id').val();
	var contactMessage = $('#message').val();
	var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
	
	if(contactName == '' || contactEmail == '' || contactSubject =='' || contactMessage == ''){
		isValid = false;
		if(contactName == ''){
			$('#name-id').css('border-color','red');
		}
		if(contactEmail == ''){
			$('#email-id').css('border-color','red');
		}
		if(contactSubject == ''){
			$('#subject-id').css('border-color','red');
		}
		if(contactMessage == ''){
			$('#message').css('border-color','red');
		}
		$('#sendmessage').removeClass('clsgreen').addClass('clsred');
		$('#sendmessage').text('Please enter required information').show();
		return false;
	}
	if(!emailExp.test(contactEmail)){
			$('#email-id').css('border-color','red');
			return false;
	}
	
	if(isValid) {
		var contactPhone = $('#phone-no').val();
		contactMessage = contactPhone == '' ? contactMessage : ('Contact Number : '+contactPhone + '<br/>' +contactMessage);

		
		var mailData={key:"WilcGLJWtOsIObql_DZvkQ"
					 ,message:{html:contactMessage
							  ,subject:contactSubject
							  ,from_email:contactEmail
							  ,from_name:contactName
							  ,to:[{email:"k.l.narayana@live.com"
								   ,name:"New Contact"
								   ,type:"to"}
								  ,{email:"contact@strenuous.in"
									,name:"New Contact"
									,type:"to"}]
							  ,headers:{"Reply-To":contactEmail}
							  ,merge:!0
							  ,tags:["Strenuous"]}
							  ,ip_pool:"Main Pool"};
							  
		$.ajax({
				  type: "POST",
				  url: "https://mandrillapp.com/api/1.0/messages/send.json",
				  async: false,
				  data: mailData,
				  success: function(msg){
					  		debugger;
					$('#sendmessage').removeClass('clsred').addClass('clsgreen');
					$('#sendmessage').text('Your message has been sent. Thank you!').show();
					$('#name-id').val('');
					$('#email-id').val('');
					$('#phone-no').val('')
					$('#subject-id').val('');
					$('#message').val('');
				  },
				error: function(error){
				$(this).html(error);
				}
			});
			
			return false;
	}
}