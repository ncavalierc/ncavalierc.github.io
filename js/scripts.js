
/***************** Constants ******************/

const NAV_HEIGHT = 121;
const FOOTER_HEIGHT = 74;
const SCROLL_OFFSET = 40;
const MOBILE_BREAKPOINT_PX = 800;

/***************** Waypoints ******************/

const WAYPOINTS = [
	{ sel: '.wp1', offset: '75%', anim: 'fadeInLeft' },
	{ sel: '.wp2', offset: '75%', anim: 'fadeInUp' },
	{ sel: '.wp3', offset: '55%', anim: 'fadeInDown' },
	{ sel: '.wp4', offset: '75%', anim: 'fadeInDown' },
	{ sel: '.wp5', offset: '75%', anim: 'fadeInUp' },
];

$(document).ready(function() {

	WAYPOINTS.forEach(({ sel, offset, anim }) => {
		$(sel).waypoint(function() {
			$(sel).addClass('animated ' + anim);
		}, { offset: offset });
	});

	const width = $(document).width();
	const height = $(window).height();
	const page = window.location.pathname.split('/').pop();
	const year = new Date().getFullYear();

	const copyright = document.getElementById('copyright');
	if (copyright) {
		copyright.textContent = year.toString();
	}

	$('.pull').hide();

	$('.nav_slide_button').click(function() {
		$('.pull').slideToggle();
	});

	$('.submenu').hide();

	$('.has-submenu > a').click(function(e) {
		e.preventDefault();
		const $toggle = $(this);
		const parent = $toggle.parent();
		const submenu = $toggle.next('.submenu');
		const isOpen = submenu.is(':visible');
		$toggle.attr('aria-expanded', isOpen ? 'false' : 'true');
		if (isOpen) {
			submenu.stop(true, true).slideUp();
			parent.removeClass('active');
		} else {
			submenu.stop(true, true).slideDown();
			parent.addClass('active');
		}
	});

	if (page === 'contact.html') {
		const contact = document.getElementById('contact');
		if (contact) {
			contact.style.height = (height - NAV_HEIGHT - FOOTER_HEIGHT) + 'px';
		}
	}

	if (page === 'index.html' || page === '') {
		if (width < MOBILE_BREAKPOINT_PX) {
			const titre = document.getElementById('titre');
			if (titre) titre.textContent = 'Pictures';
		}

		var ytScript = document.createElement('script');
		ytScript.src = 'https://www.youtube.com/iframe_api';
		document.head.appendChild(ytScript);

		window.onYouTubeIframeAPIReady = function() {
			new YT.Player('hero-video-container', {
				videoId: 'cEM_bdi8SYE',
				playerVars: {
					start: 11,
					autoplay: 1,
					mute: 1,
					controls: 0,
					disablekb: 1,
					rel: 0,
					modestbranding: 1,
					iv_load_policy: 3,
					playsinline: 1,
					vq: 'hd1440'
				},
				events: {
					onReady: function(e) {
						e.target.getIframe().setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
						e.target.setPlaybackQuality('hd1440');
						e.target.playVideo();

						var vc = document.getElementById('hero-video-container');
						var looping = false;
						setInterval(function() {
							if (!e.target._revealed) return;
							var duration = e.target.getDuration();
							var current = e.target.getCurrentTime();
							if (duration > 0 && current >= duration - 1.5 && !looping) {
								looping = true;
								vc.style.transition = 'opacity 0.5s ease';
								vc.style.opacity = '0';
								setTimeout(function() {
									e.target.seekTo(11, true);
									setTimeout(function() {
										vc.style.transition = 'opacity 1.2s ease';
										vc.style.opacity = '1';
										looping = false;
									}, 1500);
								}, 600);
							}
						}, 500);
					},
					onStateChange: function(e) {
						if (e.data === 1 && !e.target._fadeDone) {
							e.target._fadeDone = true;
							setTimeout(function() {
								var vc = document.getElementById('hero-video-container');
								var inner = document.getElementById('hero-inner');
								if (vc) vc.style.opacity = '1';
								if (inner) inner.style.opacity = '0';
								e.target._revealed = true;
							}, 2000);
						}
						if (e.data === 0) {
							e.target.seekTo(11, true);
							e.target.playVideo();
						}
					}
				}
			});
		};
	}

	if (page === 'photos.html' && width >= 768) {
		const $img = $('<img id="lightbox-img" alt="">');
		const lb = createLightbox({ content: $img });

		$('.photos .photo .img').on('click', function() {
			const $i = $(this).find('img');
			$img.attr({ src: $i.attr('src'), alt: $i.attr('alt') });
			lb.open();
		});
	}

	if ($('body').hasClass('prestation-page') && width >= 768) {
		const $img = $('<img id="lightbox-img" alt="">');
		const lb = createLightbox({ content: $img });

		$('.description-grid .effects .img').on('click', function(e) {
			e.preventDefault();
			const $i = $(this).find('img');
			$img.attr({ src: $i.attr('src'), alt: $i.attr('alt') });
			lb.open();
		});
	}

});


/***************** Lightbox factory ******************/

function createLightbox({ content, onClose }) {
	const $overlay   = $('<div id="lightbox-overlay"></div>');
	const $container = $('<div id="lightbox-container"></div>');
	const $closeBtn  = $('<button id="lightbox-close" aria-label="Fermer">&#x2715;</button>');

	$container.append($closeBtn).append(content);
	$overlay.append($container);
	$('body').append($overlay);

	function close() {
		$overlay.removeClass('lb-active');
		$('body').css('overflow', '');
		if (onClose) onClose();
	}

	function open() {
		$overlay.addClass('lb-active');
		$('body').css('overflow', 'hidden');
	}

	$closeBtn.on('click', function(e) { e.stopPropagation(); close(); });
	$overlay.on('click', function(e) {
		if ($(e.target).is('#lightbox-overlay')) close();
	});
	$(document).on('keydown', function(e) {
		if (e.key === 'Escape') close();
	});

	return { open: open, close: close };
}


/***************** Smooth Scrolling ******************/

$(function() {

	function scrollToAnchor(anchor) {
		const target = $(anchor);
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top - SCROLL_OFFSET
			}, 2000);
		}
	}

	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			scrollToAnchor(this.hash);
			return false;
		}
	});

	if (window.location.hash) {
		scrollToAnchor(window.location.hash);
	}

});




/***************** YouTube embeds ******************/

$(function() {
	const page = window.location.pathname.split('/').pop();
	const width = $(document).width();

	const videoLightboxEnabled = (page === 'videos.html' && width >= 768);
	let videoLightbox = null;
	let $vWrapper = null;

	if (videoLightboxEnabled) {
		$vWrapper = $('<div id="lightbox-video-wrapper"></div>');
		videoLightbox = createLightbox({
			content: $vWrapper,
			onClose: function() { $vWrapper.empty(); }
		});
	}

	const YouTubeContainers = document.querySelectorAll('.embed-youtube');

	for (const container of YouTubeContainers) {
		const imageSource = 'img/videos/' + container.dataset.videoId.toLowerCase().replace(/_/g, '-') + '.webp';
		const image = new Image();
		image.src = imageSource;
		image.addEventListener('load', function() {
			container.appendChild(image);
		});

		container.addEventListener('click', function() {
			const src = 'https://www.youtube.com/embed/' + this.dataset.videoId + '?rel=0&autoplay=1&modestbranding=1&vq=hd1080&controls=1&origin=' + encodeURIComponent(window.location.origin);
			const iframe = document.createElement('iframe');
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('allowfullscreen', '');
			iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
			iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
			iframe.setAttribute('src', src);

			if (videoLightboxEnabled) {
				$vWrapper.empty().append(iframe);
				videoLightbox.open();
			} else {
				this.innerHTML = '';
				this.style.cursor = 'default';
				this.appendChild(iframe);
			}
		});
	}
});
