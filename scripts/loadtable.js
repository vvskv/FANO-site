(function () {
      "use strict";
      const table = document.querySelector(".incorrect-table");
      const warehouse = document.querySelector(".incorrect-table-warehouse").children;
      const media1100 = window.matchMedia("(max-width: 1100px)");
      const media650 = window.matchMedia("(max-width: 650px)");
      // получение массива с размера картинок
      const strHeightImg = document.querySelector(".data-php").getAttribute("data-attr");
      const arrHeightImg = JSON.parse(strHeightImg);

      // console.log(arrHeightImg[0]);

      if (window.innerWidth > 1100) {
            fillingColumn(3);
      } else if (window.innerWidth > 650) {
            fillingColumn(2);
      } else {
            fillingColumn(1);
      };

      media1100.addEventListener("change", () => {
            if (window.innerWidth > 1100) {
                  fillingColumn(3);
            } else if (window.innerWidth < 1100) {
                  fillingColumn(2);
            }
      });

      media650.addEventListener("change", () => {
            if (window.innerWidth > 650) {
                  fillingColumn(2);
            } else {
                  fillingColumn(1);
            }
      });
      
      function fillingColumn(n, m) {
            table.innerHTML = "";
            for (let index = 0; index < n; index++) {
                  createColumn(n);
            }
            const tableColumns = table.children;
            const warehouseLength = warehouse.length;
            for (let index = 0; index < warehouseLength; index++) {
                  if(table.classList.contains("mp-news__table") && index > 15) {
                        // console.log(index);
                        let minColHeight = getMinColumn(tableColumns).scrollHeight;
                        let maxColHeight = getMaxColumn(tableColumns).scrollHeight;
                        warehouse[index].style.display = 'flex';
                        let itemHeight = warehouse[index].offsetHeight;

                        warehouse[index].style.display = 'none';
                        
                        if ((itemHeight) > (maxColHeight - minColHeight)) {
                              break;
                        } else {
                              getMinColumn(tableColumns).append(warehouse[index].cloneNode(true));
                        }
                  } else {
                        getMinColumn(tableColumns).append(warehouse[index].cloneNode(true));
                  }
            }
      }

      function getMinColumn(arr) {
            let result = arr[0];
            for (let i = 1; i < arr.length; i++) {
                  
                  if(arr[i].offsetHeight < result.offsetHeight) {
                        result = arr[i];
                  }                   
            }            
            return result;
      }
      function getMaxColumn(arr) {
            let result = arr[0];
            for (let i = 1; i < arr.length; i++) {
                  if(arr[i].offsetHeight > result.offsetHeight) {
                        result = arr[i];
                  }                   
            }            
            return result;
      }
      function createColumn(n) {
            let column = document.createElement("div");
            column.classList.add("incorrect-table__column");
            column.style.width = `calc(${100 / n}% - ${(50 * (n - 1)) / n}px)`;
            table.append(column);
      }
})();
