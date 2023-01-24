// ;(function() {
// 	'use strict'

// 	class ScrollBox {
// 		// минимальная высота ползунка скроллбара
// 		static SCROLLER_HEIGHT_MIN = 25;

// 		constructor(container) {
// 			// область просмотра, в которой находится контент и скроллбар
// 			this.viewport = container.querySelector('.viewport');
// 			// контейнер, в котором будет прокручиваться информация
// 			this.contentBox = container.querySelector('.content-box');
// 			// флаг нажатия на левую кнопку мыши

// 			this.sizeList = container.querySelector('.scroll-list');

// 			this.pressed = false;
// 			this.init();

// 		}

// 		init() {
// 			// высоты полученных элементов
// 			this.viewportHeight = this.viewport.offsetHeight;
// 			// this.contentHeight = this.contentBox.scrollHeight;
// 			this.contentHeight = this.sizeList.offsetHeight;

// 			console.log(this.viewport.offsetHeight);
// 			console.log(this.contentBox.scrollHeight);
// 			console.log(this.sizeList.offsetHeight);
// 			// если высота контента меньше или равна высоте вьюпорта,
// 			// выходим из функции
// 			if (this.viewportHeight >= this.contentHeight) return;
			
// 			// возможная максимальная прокрутка контента
// 			this.max = this.viewport.clientHeight - this.contentHeight;
// 			// соотношение между высотами вьюпорта и контента
// 			this.ratio = this.viewportHeight / this.contentHeight;
// 			// формируем полосу прокрутки и полунок
// 			this.createScrollbar();
// 			// устанавливаем обработчики событий
// 			this.registerEventsHandler();
// 		}

// 		createScrollbar() {
// 			// создаём новые DOM-элементы DIV из которых будет
// 			// сформирован скроллбар
// 			const scrollbar = document.createElement('div'),
// 				  scroller = document.createElement('div');

// 			// присваиваем созданным элементам соответствующие классы
// 			scrollbar.className = 'scrollbar';
// 			scroller.className = 'scroller';

// 			// вставляем созданные элементы в document
// 			scrollbar.appendChild(scroller);
// 			this.viewport.appendChild(scrollbar);

// 			// получаем DOM-объект ползунка полосы прокрутки, вычисляем и
// 			// устанавливаем его высоту
// 			this.scroller = this.viewport.querySelector('.scroller');
// 			this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
// 			this.scrollerHeight = (this.scrollerHeight <= ScrollBox.SCROLLER_HEIGHT_MIN) ? ScrollBox.SCROLLER_HEIGHT_MIN : this.scrollerHeight;
// 			this.scroller.style.height = this.scrollerHeight + 'px';
// 		}

// 		// регистрация обработчиков событий
// 		registerEventsHandler(e) {
// 			// вращение колёсика мыши
// 			this.contentBox.addEventListener('scroll', () => {
// 				this.scroller.style.top = (this.contentBox.scrollTop * this.ratio) + 'px';
// 			});

// 			// нажатие на левую кнопку мыши
// 			this.scroller.addEventListener('mousedown', e => {
// 				// координата по оси Y нажатия левой кнопки мыши
// 				this.start = e.clientY;
// 				// устанавливаем флаг, информирующий о нажатии левой кнопки мыши
// 				this.pressed = true;
// 			});

// 			// перемещение мыши
// 			document.addEventListener('mousemove', this.drop.bind(this));

// 			// отпускание левой кнопки мыши
// 			document.addEventListener('mouseup', () => this.pressed = false);
// 		}

// 		drop(e) {
// 			e.preventDefault();
// 			// если кнопка мыши не нажата, прекращаем работу функции
// 			if (this.pressed === false) return;

// 			// величина перемещения мыши
// 			let shiftScroller = this.start - e.clientY;
// 			// изменяем положение бегунка на величину перемещения мыши
// 			this.scroller.style.top = (this.scroller.offsetTop - shiftScroller) + 'px';

// 			// величина, на которую должен переместиться контент
// 			let shiftContent = this.scroller.offsetTop / this.ratio;
// 			// сумма высоты ползунка и его отступа от верхней границы вьюпорта
// 			const totalheightScroller = this.scroller.offsetHeight + this.scroller.offsetTop;
// 			// максимальный отступ, который может быть у ползунка в зависимости от его
// 			// высоты и высоты вьюпорта
// 			const maxOffsetScroller = this.viewportHeight - this.scroller.offsetHeight;

// 			// ограничиваем перемещение ползунка
// 			// по верхней границе вьюпорта
// 			if (this.scroller.offsetTop < 0) this.scroller.style.top = '0px';
// 			// по нижней границе вьюпорта
// 			if (totalheightScroller >= this.viewportHeight) this.scroller.style.top = maxOffsetScroller + 'px';

// 			// прокручиваем контент на величину пропорциональную перемещению ползунка
// 			this.contentBox.scrollTo(0, shiftContent);
// 			// устанавливаем координату Y начала движения мыши равной текущей координате Y
// 			this.start = e.clientY;
// 		}
// 	}

// 	// выбираем все блоки на странице, в которых может понадобиться
// 	// прокрутка контента
// 	const containers = document.querySelectorAll('.scroll-box');
// 	// перебираем полученную коллекцию элементов
// 	for (let container of containers) {
// 		// создаём экземпляр контейнера, в котором будем прокручивать контент
// 		const scrollbox = new ScrollBox(container);
// 	}
// })();

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
				document.documentElement.style.setProperty("--scroller-color", 'white');
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
			this.openedMenu = menu;
			this.subMenu = menu.querySelector('.menu__submenu');
			this.init();
		};

		init() {
			this.openedMenu.addEventListener('mouseover', ()=> {
				this.subMenu.style.display = 'block';
			});
			this.openedMenu.addEventListener('mouseout', ()=> {
				this.subMenu.style.display = 'none';
			})
		}
	}

	const allOpenedMenu = document.querySelectorAll('.menu__opened-menu');
	for (let menu of allOpenedMenu) {
		const openedMenu = new OpenedMenu(menu);
	}
})();

const hamburgerMenu = document.querySelector('.hamburger');
// console.log(hamburgerMenu.style.display);
const menu = document.querySelector('.menu');
if (menu.style.display === 'block') {
	console.log('!!!!!!!');
}
if (getComputedStyle(hamburgerMenu).display === 'block') {
	hamburgerMenu.addEventListener('click', ()=> {

	// hamburgerMenu.style.display = 'none';
	hamburgerMenu.classList.toggle('hamburger--is-active');
	// menu.classList.toggle('hamburger-menu');
	// menu.style.display = "block";
	// console.log(hamburgerMenu.classList);
})

}
