const images = document.querySelectorAll('.inner.gallery img');
			images.forEach((el, index) => {
				console.log(el,index);
				el.setAttribute('index',index);
			})

			const numOfImages = $('.inner.gallery img[index]').length - 1;
			$(document).ready(function() {
				let i = 0;
				let top = '';
				let bottom = '';
				const lightBox = $('.lightbox');
				$('.image').each(function(index ) {
					if (i === 0){
						top = '100px';
						bottom = '100px';
						i = 1;
					} else if (i === 1){
						top = '200px';
						bottom = '100px';
						i = 2;
					} else {
						top = '300px';
						bottom = '100px';
						i = 0;
					}
					$(this).scrollex({
						top: top,
						bottom: bottom,
						enter: function() {
							$(this).css('opacity', '1'); // Change opacity to 1 when scrolled into view
						},
						mode: 'default',
						leave: function() {
							$(this).css('opacity', '0'); // Change opacity back to 0 when scrolled out of view
						},
						// Additional options for the reveal effect
					});
					$(this).click(function(){
						console.log(lightBox.find('figure img'));
						lightBox.find('figure img').attr('src',$(this).children('img').attr('src'));
						lightBox.find('figure img').attr('index',$(this).children('img').attr('index'));
						lightBox.find('figure figcaption').text( ($(this).attr('data-caption')) ? $(this).attr('data-caption') : '')
						lightBox.addClass('active');
					});
				});
			});
			$('.lightbox').click(function(e){
				let i = $(this).find('figure img').attr('index') ? parseInt($(this).find('figure img').attr('index')) : 0;
				let nextImage;
				if(e.target.classList.contains('next')){
					i++;
					if(i >= numOfImages){
						i = 0;
					}
					nextImage = $('.inner.gallery img[index="'+i+'"]');
					$(this).find('figure img').attr('src', nextImage.attr('src'));
					$(this).find('figure img').attr('index', nextImage.attr('index'));
					$(this).find('figure figcaption').text(nextImage.attr('data-caption') ? nextImage.attr('data-caption') : '');
				} else if(e.target.classList.contains('prev')){
					i--;
					if(i < 0){
						i = numOfImages;
					}
					nextImage = $('.inner.gallery img[index="'+i+'"]');
					$(this).find('figure img').attr('src', nextImage.attr('src'));
					$(this).find('figure img').attr('index', nextImage.attr('index'));
					$(this).find('figure figcaption').text(nextImage.attr('data-caption') ? nextImage.attr('data-caption') : '');
				} else if( !e.target.classList.contains('selected')){
					$(this).toggleClass('active');
				} else {
                    //Do nothing
                }
			});