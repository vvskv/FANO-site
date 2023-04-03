(function () {
      "use strict";
      const table = document.querySelector(".incorrect-table");
      const warehouse = document.querySelector(".incorrect-table-warehouse").children;
      const media1100 = window.matchMedia("(max-width: 1100px)");
      const media650 = window.matchMedia("(max-width: 650px)");
      // получение массива с размера картинок
      const strIgmRatio = document.querySelector(".data-php").getAttribute("data-attr");
      let arrImgRatio = JSON.parse(strIgmRatio);
      arrImgRatio.unshift(0);
      arrImgRatio.push(0);

      const warehouseMap = getWarehouse([...warehouse]);

      // console.log(getWarehouse([...warehouse], arrImgRatio));

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
      
      function fillingColumn(n) {
            // console.log(n);
            let maxCountItem;
            switch (n) {
                  case 1:
                        maxCountItem = 5;                        
                        break;
                  case 2:
                        maxCountItem = 7;                       
                        break;
                  case 3:
                        maxCountItem = 11;                    
                        break;
                  default:
                        maxCountItem = 11;                        
                        break;
            }
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
            const warehouseLength = warehouseMap.length;
            for (let index = 0; index < warehouseLength; index++) {
                  let curCol = getMinColumn(tableColumnsMap); //Добавляем в колонку мин размера
                  let curItem = warehouseMap[index];
                  const curItemHtml = curCol.column.appendChild(curItem.item.cloneNode(true));
                  curItemHtml.style.display = 'flex';
                  // console.log('flex');

                  // const curItemHtmlImg = curItemHtml.querySelector('img');
                  // curItemHtmlImg.src = curItemHtmlImg.getAttribute("data-src");

                  // console.log(curItem.size);
                  if(curItem.size === null) {
                        if(arrImgRatio[index]===0) {
                              curItem.size = curItemHtml.offsetHeight;
                              // console.log("test");
                        // console.log(curItem.size); 

                        } else {
                              // Добавляем путь загрузки из атрибута
                              const curItemHtmlImg = curItemHtml.querySelector('img');
                              // console.log('add src');
                              // console.log(curItemHtmlImg.getAttribute("data-src"));
                              curItemHtmlImg.src = curItemHtmlImg.getAttribute("data-src");
                              // console.log(curItemImg.complete);
                              // Если изображения уже загружены, то размер поста - offset, если нет, то добавляется размер из соотношения
                              if(curItemHtmlImg.complete) {
                                    curItem.size = curItemHtml.offsetHeight;
                              } else {
                                    const widthCurCol = curCol.column.offsetWidth;
                                    let curIgmHeight = widthCurCol / arrImgRatio[index];
                                    curIgmHeight = curIgmHeight > 500 ? 500 : curIgmHeight;
                                    curItem.size = curItemHtml.offsetHeight + curIgmHeight;
                                    // console.log(curItem.size); 
                              }
                        }
                  } else {
                        if(arrImgRatio[index] != 0) {
                             const curItemHtmlImg = curItemHtml.querySelector('img');
                              curItemHtmlImg.src = curItemHtmlImg.getAttribute("data-src");  
                        }
                        
                        
                  }
                  //Добавление gap расстояния к высоте колонки
                  if(curCol.size != 0) {
                        if(n === 3) {
                              curCol.size += 100;
                        } else {
                              curCol.size += 50;
                        }
                  }
                  curCol.size +=curItem.size;
                  if(index > maxCountItem && table.classList.contains("mp-news__table")) {
                        const maxColSize = getMaxColumn(tableColumnsMap).size;
                        const minColSize = getMinColumn(tableColumnsMap).size;
                        // console.log(maxColSize, minColSize, warehouseMap[index].size);
                        if (maxColSize - minColSize + 100 < warehouseMap[index].size) break;
                  }
            }
      }

      function getWarehouse(warehouse) {
            const warehouseMap = warehouse.map(item=> {
                  return {
                        size: null,
                        item: item,
                  }
            })
            for (let i = 0; i < warehouse.length; i++) {
                  const element = warehouse[i];  
                  warehouseMap[i].item = element;
            }
            return warehouseMap;
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
