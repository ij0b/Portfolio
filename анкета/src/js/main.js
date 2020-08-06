import './vendor';
import './helpers';

// The angle of rotation of the arrow determines the level of ownership js number
function levelJs() {
	let number = $('.profile__level-js-number');
	let numberMin = 0;
	let numberCurrent = numberMin;
	let numberMax = 100;
	let rotateMax = 180;
	let rotateStep = rotateMax / 100;
	let arrow = $('.profile__level-js-arrow');
	let arrowRotate = -rotateMax / 2;
	let arrowMousedown = false;
	let xPrevious;
	let xCurrent;
	let numberAnimationMax = parseInt($('[data-level-js-animate-to]').data('level-js-animate-to'), 10);
	let numberAnimationTimeStep = 2000 / numberAnimationMax;

	function handlersAnimation() {
		function arrowMousemove() {
			$('html').on('mousemove touchmove', (event) => {
				if (arrowMousedown) {
					if (event.type === 'mousemove') {
						xCurrent = event.pageX;
					} else {
						xCurrent = event.originalEvent.touches[0].pageX;
					}
					numberCurrent = parseInt(number.attr('value'), 10);
					if (numberCurrent >= numberMin && numberCurrent <= numberMax
					&& arrowRotate <= rotateMax / 2 && arrowRotate >= -rotateMax / 2) {
						if (xPrevious < xCurrent && numberCurrent + 1 <= numberMax) {
							arrowRotate = rotateStep * ++numberCurrent - rotateMax / 2;
						} else if (xPrevious > xCurrent && numberCurrent - 1 >= numberMin) {
							arrowRotate = rotateStep * --numberCurrent - rotateMax / 2;
						}
						number.attr('value', numberCurrent);
						arrow.css('transform', `rotate(${parseInt(arrowRotate, 10)}deg)`);
					}
					xPrevious = xCurrent;
				}
			});
		}

		arrow.on('mousedown touchstart', (event) => {
			if (event.type === 'mousedown') {
				xPrevious = event.pageX;
			} else {
				xPrevious = event.originalEvent.touches[0].pageX;
			}
			arrowMousedown = true;
			arrowMousemove();
		});

		arrow.on('touchmove', (event) => {
			event.preventDefault();
		});

		$('html').on('mouseup mouseleave touchend', () => {
			$('html').unbind('mousemove');
			arrowMousedown = false;
		});
	}

	// When the page loads, the animation of the arrow and js level to the angle
	// corresponding to the number of attribute data-level-js-animate-to = "20"
	function startAnimation() {
		setTimeout(() => {
			if (numberCurrent < numberAnimationMax) {
				if (!arrow.hasClass('is-animate')) {
					arrow.addClass('is-animate');
				}
				number.attr('value', ++numberCurrent);
				arrowRotate = rotateStep * numberCurrent - rotateMax / 2;
				startAnimation();
			} else {
				arrow.css('transform', `rotate(${parseInt(arrowRotate, 10)}deg)`);
				arrow.removeClass('is-animate');
				handlersAnimation();
			}
		}, numberAnimationTimeStep);
	}
	startAnimation();
}

function checkbox() {
	$('.profile__label').on('click', (event) => {
		if ($(event.target).hasClass('profile__checkbox-hidden')) {
			$(event.target).closest('.profile__label').find('.profile__checkbox').toggleClass('is-checked');
		}
	});
}

$(document).ready(() => {
	levelJs();
	checkbox();
});
