(function () {
      "use strict";
      const table = document.querySelector(".incorrect-table");
      const warehouse = document.querySelector(".incorrect-table-warehouse").children;
      const media1100 = window.matchMedia("(max-width: 1100px)");
      const media650 = window.matchMedia("(max-width: 650px)");
      // получение массива с размера картинок
      const strHeightImg = document.querySelector(".data-php").getAttribute("data-attr");
      let arrHeightImg = JSON.parse(strHeightImg);
      arrHeightImg.unshift(0);
      arrHeightImg.push(0);

      // console.log(arrHeightImg);
      // console.log(warehouse);

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

            let tableColumnsMap = [...tableColumns].map(function(column) {
                  return {
                        size: 0,
                        column: column,
                  }
            })

            const warehouseLength = warehouse.length;
            for (let index = 0; index < warehouseLength; index++) {
                  let curCol = getMinColumn(tableColumnsMap); //Колонка минимального размера
                  // let item = warehouse[index].cloneNode(true);
                  // curCol.column.append(warehouse[index].cloneNode(true));
                  // curCol.column.append(item.style.display = "flex");


                  // warehouse[index].style.display = 'flex';
                  let itemHeight = warehouse[index].offsetHeight; //Размер добавляемого поста (без изображения)
                  // warehouse[index].style.display = 'none';
                  curCol.column.append(warehouse[index].cloneNode(true));

                  console.log(itemHeight);

                  const itemHeightAll = itemHeight + arrHeightImg[index]; // Полный размер поста
                  curCol.size += itemHeightAll;
                  if(index > 10 && table.classList.contains("mp-news__table")) {
                        const maxColSize = getMaxColumn(tableColumnsMap).size;
                        const minColSize = getMinColumn(tableColumnsMap).size;
                        if (maxColSize - minColSize + 150< itemHeightAll) break;
                  }
            }
      }

      function getMinColumn(arr) {
            let result = arr[0];
            arr.forEach(element => {
                  if(element.size < result.size ) {
                        result = element;
                  }
            });
            return result;
      }
      function getMaxColumn(arr) {
            let result = arr[0];
            arr.forEach(element => {
                  if(element.size > result.size ) {
                        result = element;
                  }
            });
            return result;
      }
      function createColumn(n) {
            let column = document.createElement("div");
            column.classList.add("incorrect-table__column");
            column.style.width = `calc(${100 / n}% - ${(50 * (n - 1)) / n}px)`;
            table.append(column);
      }
})();
