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
                  this.clickToggle = this.clickToggle.bind(this);
                  this.show = this.show.bind(this);
                  this.hide = this.hide.bind(this);
                  this.init();
            }

            init() {
            	this.subMenu.addEventListener("mouseover", this.show);
                  this.subMenu.addEventListener("mouseout", this.hide);
                  this.openedMenu.addEventListener("click",this.clickToggle);     
                  this.openedMenu.addEventListener("mouseout", this.hide);      
                  this.openedMenu.addEventListener("mouseover",this.show);
            }
            clickToggle(e) {
                  e.preventDefault();

                  if (getComputedStyle(this.hamburgerCheck).display === "flex") {
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

                  
            }
            show() {
            	if (getComputedStyle(this.hamburgerCheck).display != "flex") {
            		this.subMenu.classList.add("submenu__wrap--show");
            	}
            }
            hide() {
            	if (getComputedStyle(this.hamburgerCheck).display != "flex") {
                  this.subMenu.classList.remove("submenu__wrap--show");
            	}
            }
      }

      const allOpenedMenu = document.querySelectorAll(".submenu");
      for (let menu of allOpenedMenu) {
            const openedMenu = new OpenedMenu(menu);
      }
})();

(function () {
      "use strict";
	const hamburger = document.querySelector('#hamburger-toggle');
	const media1100 = window.matchMedia('(min-width: 1100px)');
	const allSubMenu = document.querySelectorAll('.submenu__wrap');
	function disableScroll(e) {
			e.preventDefault();
    			e.stopPropagation();
    			return false;
		}
	function onScroll(e) {
		if (e.matches) {
			hamburger.checked = false;
			document.body.removeEventListener('wheel', disableScroll);
			for (let item of allSubMenu) {
				item.classList.remove('submenu__wrap--show');
			};
		}
	}
	
	media1100.addListener(onScroll);	
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
(function () {
      "use strict";
	const media1100 = window.matchMedia('(min-width: 1100px)');
	const hamburger = document.querySelector('#hamburger-toggle');
	

})();


document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})