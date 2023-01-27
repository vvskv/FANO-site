;(function() {
	'use strict'

	class ScrollBox {

		constructor(container) {
			this.scrollBox = container;
			this.init();
		};
		
		init() {
			this.scrollBox.addEventListener('mouseover', ()=> {
				document.documentElement.style.setProperty("--scroller-color", '#a3b3c9');
			});
			this.scrollBox.addEventListener('mouseout', ()=> {
				document.documentElement.style.setProperty("--scroller-color", 'inherit');
			})
		}

	}

	const scrollBoxes = document.querySelectorAll('.scroll-box');
	for (let box of scrollBoxes) {
		const scrollBox = new ScrollBox(box);
	}
})();

;(function() {
	'use strict'
	class OpenedMenu {
		
		constructor(menu) {
			this.openedMenu = menu.querySelector('.submenu__link');
			this.subMenu = menu.querySelector('.submenu__wrap');
			this.hamburgerCheck = document.querySelector('.hamburger-wrap');
			this.screenWidth = document.body.clientWidth;
			this.clickToggle = this.clickToggle.bind(this);
			this.show = this.show.bind(this);
			this.hide = this.hide.bind(this);
			this.init();
		};

		init() {
			if (getComputedStyle(this.hamburgerCheck).display != 'flex') {
				// console.log('111');
				this.subMenu.addEventListener('mouseover', this.show);
				this.subMenu.addEventListener('mouseout', this.hide);	
				this.openedMenu.addEventListener('click', (e)=> {e.preventDefault()});
				this.openedMenu.addEventListener('mouseover', this.show);
				this.openedMenu.addEventListener('mouseout', this.hide);
			} else {
				this.openedMenu.addEventListener('click', this.clickToggle);
			}			
			
		}
		clickToggle(e) {
			e.preventDefault();
			const openSubMenuArr = document.querySelectorAll('.submenu__wrap');
				for (let item of openSubMenuArr) {
					item.classList.remove('submenu__wrap--show');
				}			 
			this.subMenu.classList.toggle('submenu__wrap--show');
		}
		show() {
			this.subMenu.classList.add('submenu__wrap--show');
		}
		hide() {
			this.subMenu.classList.remove('submenu__wrap--show');
		}
		resetToggle() {
			
		}
	}

	const allOpenedMenu = document.querySelectorAll('.submenu');
	for (let menu of allOpenedMenu) {
		const openedMenu = new OpenedMenu(menu);
	}
})();


