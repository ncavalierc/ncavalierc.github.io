
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


	var width = $(document).width();
 	var height = $(window).height();
	var path = window.location.pathname;
	var page = path.split("/").pop();
	var year = new Date().getFullYear();

	let copyright = document.getElementById("copyright")
	copyright.textContent=year.toString();
	copyright.style.color = "grey"


	// Masquer le menu au chargement de la page
    $('.pull').hide();

    $('.nav_slide_button').click(function() {
        $('.pull').slideToggle();
    });

	// Masquer le sous-menu par défaut au chargement de la page
    $('.submenu').hide();

    // Gestion du sous-menu pour Prestations avec un effet de glissement
    $('.has-submenu > a').click(function(e) {
        e.preventDefault(); // Empêche le lien d'agir comme une ancre
        
        var parent = $(this).parent(); // Récupère le parent (li)
        var submenu = $(this).next('.submenu'); // Récupère le sous-menu

        // Vérifie si le sous-menu est actuellement visible
        if (submenu.is(':visible')) {
            // Si visible, le fermer avec un effet de glissement
            submenu.stop(true, true).slideUp();
            parent.removeClass('active');
        } else {
            // Si caché, l'ouvrir avec un effet de glissement
            submenu.stop(true, true).slideDown();
            parent.addClass('active');
        }
    });

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

	// Lightbox – photos page only
	if (page == 'photos.html') {
		var $overlay   = $('<div id="lightbox-overlay"></div>');
		var $container = $('<div id="lightbox-container"></div>');
		var $img       = $('<img id="lightbox-img" alt="">');
		var $closeBtn  = $('<button id="lightbox-close" aria-label="Fermer">&#x2715;</button>');

		$container.append($closeBtn).append($img);
		$overlay.append($container);
		$('body').append($overlay);

		function openLightbox(src, alt) {
			$img.attr({ src: src, alt: alt });
			$overlay.addClass('lb-active');
			$('body').css('overflow', 'hidden');
		}

		function closeLightbox() {
			$overlay.removeClass('lb-active');
			$('body').css('overflow', '');
		}

		$('.photos .photo .img').on('click', function() {
			var $i = $(this).find('img');
			openLightbox($i.attr('src'), $i.attr('alt'));
		});

		$closeBtn.on('click', function(e) {
			e.stopPropagation();
			closeLightbox();
		});

		$overlay.on('click', function(e) {
			if ($(e.target).is('#lightbox-overlay')) closeLightbox();
		});

		$(document).on('keydown', function(e) {
			if (e.key === 'Escape') closeLightbox();
		});
	}



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

$(window).on('load', function() {

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


});



$(function(){
    let YouTubeContainers = document.querySelectorAll(".embed-youtube");
	var path = window.location.pathname;
	var page = path.split("/").pop();

    // Iterate over every YouTube container you may have
    for (let i = 0; i < YouTubeContainers.length; i++) {
        let container = YouTubeContainers[i];
		let imageSource= "img/videos/" + container.dataset.videoId.toString().toLowerCase().replace(/_/g, "-")  + ".webp";
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
			iframe.setAttribute("src", "https://www.youtube.com/embed/"+ this.dataset.videoId +"?rel=0&autoplay=1&modestbranding=1&vq=hd1080&controls=1");

			// Clear Thumbnail, remove pointer cursor so the iframe receives hover events natively
			this.innerHTML = "";
			this.style.cursor = "default";
			this.appendChild( iframe );

        });
    }
});