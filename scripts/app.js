
(function () {
      "use strict";
      const allMenuLink = document.querySelectorAll(".fixed-menu a");
      const hamburger = document.querySelector("#hamburger-toggle");

      for (let item of allMenuLink) {
            item.addEventListener("click", () => {
                  hamburger.checked = false;
            });
      }
})();

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
                  this.scrollBox.addEventListener("scroll", () => {
                        document.documentElement.style.setProperty(
                              "--scroller-color",
                              "#a3b3c9"
                        );
                  });
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
                  this.openedMenu.addEventListener("click", this.clickToggle);
                  this.openedMenu.addEventListener("mouseout", this.hide);
                  this.openedMenu.addEventListener("mouseover", this.show);
            }
            clickToggle(e) {
                  e.preventDefault();

                  if (
                        getComputedStyle(this.hamburgerCheck).display === "flex"
                  ) {
                        const subMenuShowCheck =
                              this.subMenu.classList.contains(
                                    "submenu__wrap--show"
                              );
                        if (!subMenuShowCheck) {
                              // Проверка на открытые пункты меню и их закрытие
                              const openSubMenuArr =
                                    document.querySelectorAll(".submenu__wrap");
                              for (let item of openSubMenuArr) {
                                    item.classList.remove(
                                          "submenu__wrap--show"
                                    );
                              }
                              this.subMenu.classList.add("submenu__wrap--show");
                        } else {
                              this.subMenu.classList.remove(
                                    "submenu__wrap--show"
                              );
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

// Действия при открытии и закрытии меню

(function () {
      "use strict";
      let isMenuOpen = false;
      let pageYOffset = 0;
      const hamburger = document.querySelector("#hamburger-toggle");
      const allSubMenu = document.querySelectorAll(".submenu__wrap");
      const media1100 = window.matchMedia("(min-width: 1100px)");

      hamburger.addEventListener("change", () => {
            isMenuOpen = hamburger.checked;
            pageYOffset = window.pageYOffset;
            if (hamburger.checked === false) closeAllSubMenu();
      });
      function resetMenu() {
            hamburger.checked = false;
            isMenuOpen = false;
            closeAllSubMenu();
      }
      function closeAllSubMenu() {
            for (let item of allSubMenu) {
                  item.classList.remove("submenu__wrap--show");
            }
      }
      function onScroll() {
            if (isMenuOpen) {
                  window.scrollTo(0, pageYOffset);
            }
      }
      document.addEventListener("scroll", onScroll);
      media1100.addListener(resetMenu);
})();

// Управление прозрачностью меню
(function () {
      "use strict";
      const menu = document.querySelector(".mp-header > .fixed-menu");
      let pageYOffset = 0;
      if (menu) {
            window.addEventListener("scroll", () => {
                  pageYOffset = window.pageYOffset;
                  if (pageYOffset > 1) {
                        menu.classList.add("fixed-menu--no-opacity");
                  } else {
                        menu.classList.remove("fixed-menu--no-opacity");
                  }
            });
      }
})();


document.addEventListener("DOMContentLoaded", function () {
      var lazyloadImages;

      if ("IntersectionObserver" in window) {
            lazyloadImages = document.querySelectorAll(".lazy");
            var imageObserver = new IntersectionObserver(function (
                  entries,
                  observer
            ) {
                  entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                              var image = entry.target;
                              image.src = image.dataset.src;
                              image.classList.remove("lazy");
                              imageObserver.unobserve(image);
                        }
                  });
            });

            lazyloadImages.forEach(function (image) {
                  imageObserver.observe(image);
            });
      } else {
            var lazyloadThrottleTimeout;
            lazyloadImages = document.querySelectorAll(".lazy");

            function lazyload() {
                  if (lazyloadThrottleTimeout) {
                        clearTimeout(lazyloadThrottleTimeout);
                  }

                  lazyloadThrottleTimeout = setTimeout(function () {
                        var scrollTop = window.pageYOffset;
                        lazyloadImages.forEach(function (img) {
                              if (
                                    img.offsetTop <
                                    window.innerHeight + scrollTop
                              ) {
                                    img.src = img.dataset.src;
                                    img.classList.remove("lazy");
                              }
                        });
                        if (lazyloadImages.length == 0) {
                              document.removeEventListener("scroll", lazyload);
                              window.removeEventListener("resize", lazyload);
                              window.removeEventListener(
                                    "orientationChange",
                                    lazyload
                              );
                        }
                  }, 20);
            }

            document.addEventListener("scroll", lazyload);
            // window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);
      }
});

(function () {
      "use strict";
      class Tab {
            constructor(input) {
                  this.radioInput = input;
                  this.tabContentId = "#content-" + input.value;
                  this.tabContent = document.querySelector(this.tabContentId);
                  this.init();
            }
            init() {
                  if(this.radioInput.checked) {
                        this.tabContent.style.display = "flex";
                  }
            }
            resetDisplay() {
                  this.tabContent.style.display = "none";
            }
            switcher() {
                  if(this.radioInput.checked) {
                        this.tabContent.style.display = "flex";
                  }
            }
      }
      const allTabs = [];
      const allInput = document.querySelectorAll(".sp-tabs__label-list input");
      
      for(let item of allInput) {
            const inputObject = new Tab(item);
            allTabs.push(inputObject);
      }
      for(let item of allTabs) {
            item.radioInput.addEventListener("change", ()=> {
                  resetAllTabsDisplay(allTabs);
                  item.switcher();
            })
      }
      function resetAllTabsDisplay(arr) {
            for(let item of arr) {
                  item.resetDisplay();
            }
      }        
})();

