;(function() {
	'use strict';

	class ScrollBox {

		static #MIN_SCROLLER_HEIGHT = 25;

		constructor(scrollContainer) {
			this.viewport = scrollContainer.querySelector('.viewport');
			this.contentBox = scrollContainer.querySelector('.content-box');
			this.pressed = false;
			this.init();
		}

		init() {
				this.viewportHeight = this.viewport.offsetHeight;
				this.contentHeight = this.contentBox.scrollHeight;
				if(this.viewportHeight >= this.scrollHeight) return;

				this.max = this.viewport.clienntHeight - this.contentHeight;
				this.ratio = this.viewportHeight / this.contentHeight;
				this.createScrollBar();
				this.registerEventsHadler();
			}

			createScrollBar() {
				const scrollbar = document.createElement('div');
				const scroller = document.createElement('div');

				scrollbar.className = 'scrollbar';
				scroller.className = 'scroller';

				scrollbar.appendChild(scroller);
				this.viewport.appendChild(scrollbar);

				this.scroller = this.viewport.querySelector('.scroller');
				this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
				this.scrollerHeight = (this.scrollerHeight <= ScrollBox.#MIN_SCROLLER_HEIGHT) ? ScrollBox.#MIN_SCROLLER_HEIGHT : this.scrollerHeight;
				this.scroller.style.height = this.scrollerHeight + 'px';
			}

			registerEventsHadler(e) {
				this.contentBox.addEventListener('scroll', () => {
					this.scroller.style.top = (this.contentBox.scrollTop * this.ratio) + 'px';
				});

				this.scroller.addEventListener('mousedown', e => {
					this.start = e.clientY;
					this.pressed = true;
				});

				document.addEventListener('mousemove', this.drop.bind(this));
				document.addEventListener('mouseup', ()=> this.pressed = false);
			}

			drop(e) {
				e.preventDefault();
				if(this.pressed === false) return;
				let shiftScroller = this.start = e.clientY;
				this.scroller.style.top = (this.scoller.offsetTop - shiftScroller) + 'px';
				let shiftContent = this.scroller.offsetTop / this.ratio;
				const totalHeightScroller = this.scroller.offsetHeight + this.scroller.offsetTop;
				const maxOffsetScroller = this.viewportHeight - this.scroller.offsetHeight;	
				if(this.scroller.offserTop < 0) this.scroller.style.top = '0px';
				if (totalHeightScroller >= this.viewportHeight) this.scroller.style.top = maxOffsetScroller + 'px';
				this.contentBox.scrollTo(0, shiftContent);
				this.start = e.clientY;			
		}
		
	} 

	const scrollContainerList = document.querySelectorAll('.scroll-container');

	for (let scrollContainer of scrollContainerList) {
		const scrollBox = new ScrollBox(scrollContainer);
	}

})();