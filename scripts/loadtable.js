(function () {
      "use strict";
      const table = document.querySelector(".incorrect-table");
      const warehouse = document.querySelector(".incorrect-table-warehouse").children;
      const media1100 = window.matchMedia("(max-width: 1100px)");
      const media650 = window.matchMedia("(max-width: 650px)");
      let numberOfColumns = 3;
      console.log('<?php echo "$arr_height"; ?>');


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
            let temp = 0;
            const warehouseLength = warehouse.length;
            for (let index = 0; index < warehouseLength; index++) {
                  if(table.classList.contains("mp-news__table") && index > 15) {
                        // console.log(index);
                        let minColHeight = getMinColumn(tableColumns).scrollHeight;
                        let maxColHeight = getMaxColumn(tableColumns).scrollHeight;
                        warehouse[index].style.display = 'flex';
                        let itemHeight = warehouse[index].offsetHeight;
                        // console.log(warehouse[index].offsetHeight);

                        warehouse[index].style.display = 'none';
                        // console.log("Column: ",maxColHeight - minColHeight);
                        // console.log("Item: ",itemHeight);
                        
                        if ((itemHeight) > (maxColHeight - minColHeight)) {
                              // console.log("Column: ",maxColHeight, minColHeight);
                              // console.log("Item: ",itemHeight);
                              break;
                        } else {
                              getMinColumn(tableColumns).append(warehouse[index].cloneNode(true));
                        }
                  } else {
                        getMinColumn(tableColumns).append(warehouse[index].cloneNode(true));
                        // console.log(getMinColumn(tableColumns).offsetHeight);
                  }

                  // if (index % n === 0 && index != 0) {
                  //       temp += n;
                  // }
                  // tableColumns[index - temp].append(
                  //       warehouse[index].cloneNode(true)
                  // );
            }
            // console.log(getMinColumn(tableColumns));
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
