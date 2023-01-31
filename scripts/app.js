(function () {
      "use strict";

      class ScrollBox {
            constructor(container) {
                  this.scrollBox = container;
                  this.init();
            }

            init() {
                  this.scrollBox.addEventListener("mouseover", () => {
                        document.documentElement.style.setProperty(
                              "--scroller-color",
                              "#a3b3c9"
                        );
                  });
                  this.scrollBox.addEventListener('scroll', () => {
                  	document.documentElement.style.setProperty(
                              "--scroller-color",
                              "#a3b3c9"
                        );
                  })
                  this.scrollBox.addEventListener("mouseout", () => {
                        document.documentElement.style.setProperty(
                              "--scroller-color",
                              "inherit"
                        );
                  });
            }
      }

      const scrollBoxes = document.querySelectorAll(".scroll-box");
      for (let box of scrollBoxes) {
            const scrollBox = new ScrollBox(box);
      }
})();

(function () {
      "use strict";
      class OpenedMenu {
            constructor(menu) {
                  this.openedMenu = menu.querySelector(".submenu__link");
                  this.subMenu = menu.querySelector(".submenu__wrap");
                  this.hamburgerCheck =
                        document.querySelector(".hamburger-wrap");
                  this.hamburgerToggle = document.querySelector('#hamburger-toggle');               
                  this.clickToggle = this.clickToggle.bind(this);
                  this.show = this.show.bind(this);
                  this.hide = this.hide.bind(this);
                  this.init();
            }

            init() {
                  if (getComputedStyle(this.hamburgerCheck).display != "flex") {
                        // console.log('111');
                        this.subMenu.addEventListener("mouseover", this.show);
                        this.subMenu.addEventListener("mouseout", this.hide);
                        this.openedMenu.addEventListener("click", (e) => {
                              e.preventDefault();
                        });
                        this.openedMenu.addEventListener(
                              "mouseover",
                              this.show
                        );
                        this.openedMenu.addEventListener("mouseout", this.hide);
                  } else {
                        this.openedMenu.addEventListener(
                              "click",
                              this.clickToggle
                        );
                  }
            }
            clickToggle(e) {
                  e.preventDefault();
                  const subMenuShowCheck = this.subMenu.classList.contains(
                        "submenu__wrap--show"
                  );
                  if (!subMenuShowCheck) {
                        // Проверка на открытые пункты меню и их закрытие
                        const openSubMenuArr =
                              document.querySelectorAll(".submenu__wrap");
                        for (let item of openSubMenuArr) {
                              item.classList.remove("submenu__wrap--show");
                        }
                        this.subMenu.classList.add("submenu__wrap--show");
                  } else {
                        this.subMenu.classList.remove("submenu__wrap--show");
                  }
            }
            show() {
                  this.subMenu.classList.add("submenu__wrap--show");
            }
            hide() {
                  this.subMenu.classList.remove("submenu__wrap--show");
            }
            resetToggle() {}
      }

      const allOpenedMenu = document.querySelectorAll(".submenu");
      for (let menu of allOpenedMenu) {
            const openedMenu = new OpenedMenu(menu);
      }
})();

(function () {
      "use strict";
	const hamburger = document.querySelector('#hamburger-toggle');
	const allSubMenu = document.querySelectorAll('.submenu__wrap');
	function disableScroll(e) {
			e.preventDefault();
    			e.stopPropagation();
    			return false;
		}
	hamburger.addEventListener('change', ()=> {
		
		if (hamburger.checked) {
			document.body.addEventListener('wheel', disableScroll, {passive:false});
		} else {
			document.body.removeEventListener('wheel', disableScroll);
		}

		if (!hamburger.checked) {
			for (let item of allSubMenu) {
				item.classList.remove('submenu__wrap--show');
			}
		} 
	})
})();