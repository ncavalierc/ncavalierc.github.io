
/***************** Waypoints ******************/

$(document).ready(function() {

	$('.wp1').waypoint(function() {
		$('.wp1').addClass('animated fadeInLeft');
	}, {
		offset: '75%'
	});
	$('.wp2').waypoint(function() {
		$('.wp2').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp3').waypoint(function() {
		$('.wp3').addClass('animated fadeInDown');
	}, {
		offset: '55%'
	});
	$('.wp4').waypoint(function() {
		$('.wp4').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp5').waypoint(function() {
		$('.wp5').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp6').waypoint(function() {
		$('.wp6').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});


	
	var width = $(document).width();
 	var height = $(window).height();
	var path = window.location.pathname;
	var page = path.split("/").pop();
	var year = new Date().getFullYear();

	let copyright = document.getElementById("copyright")
	copyright.textContent=year.toString();
	copyright.style.color = "grey"


	// contact center
	if (page == 'contact.html'){
		var contact = document.getElementById('contact');
		let contactHeight = height - 121 - 74
		contact.style.height = contactHeight.toString() + "px";
	}
	


	// remove dot motim.pictures
	if (page == 'index.html' || page == '') {
		if (width < 800) {
			let titre = document.getElementById("titre")
			titre.textContent="Pictures";
		}
	
	}
    

});

/***************** Slide-In Nav ******************/

$(window).load(function() {

	$('.nav_slide_button').click(function() {
		$('.pull').slideToggle();
	});

});

/***************** Smooth Scrolling ******************/

$(function() {

	// Fonction de défilement avec offset
	function scrollToAnchor(anchor) {
		var target = $(anchor);
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top - 40  // Ajuster l'offset ici
			}, 2000);
		}
	}

	// Déclenche le défilement si un lien avec ancre est cliqué
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			scrollToAnchor(this.hash);
			return false;
		}
	});

	// Vérifie et active le défilement à l'ancre au chargement de la page
	if (window.location.hash) {
		scrollToAnchor(window.location.hash);
	}

});


/***************** Flexsliders ******************/

$(window).load(function() {

	$('#portfolioSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: false,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

	$('#servicesSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

	$('#teamSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

});



$(function(){
    let YouTubeContainers = document.querySelectorAll(".embed-youtube");
	var path = window.location.pathname;
	var page = path.split("/").pop();

    // Iterate over every YouTube container you may have
    for (let i = 0; i < YouTubeContainers.length; i++) {
        let container = YouTubeContainers[i];
		let imageSource= "https://github.com/ncavalierc/images/raw/main/" + container.dataset.videoId.toString().toLowerCase().replace(/_/g, "-")  + ".webp";
        // Load the Thumbnail Image asynchronously
        let image = new Image();
        image.src = imageSource;
        image.addEventListener("load", function() {
            container.appendChild(image);
        });

        // When the user clicks on the container, load the embedded YouTube video
        container.addEventListener("click", function() {
			let iframe = document.createElement( "iframe" );

			iframe.setAttribute("frameborder", "0");
			iframe.setAttribute("allowfullscreen", "");
			iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
			// Important: add the autoplay GET parameter, otherwise the user would need to click over the YouTube video again to play it 
			iframe.setAttribute("src", "https://www.youtube.com/embed/"+ this.dataset.videoId +"?rel=0&showinfo=0&autoplay=1");

			// Clear Thumbnail and load the YouTube iframe
			this.innerHTML = "";
			this.appendChild( iframe );

        });
    }
});