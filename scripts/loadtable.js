(function () {
      "use strict";
      const table = document.querySelector(".sp-table");
      const warehouse = document.querySelector(".table-warehouse").children;
      const media1100 = window.matchMedia("(min-width: 1100px)");
      let numberOfColumns = 3;
      
      if (table) fillingColumn(numberOfColumns);
      media1100.addListener( () => {
            console.log("!!!!!!!");
            numberOfColumns = 2;
      });
      function fillingColumn(n) {
            for (let index = 0; index < n; index++) {
                  createColumn(n);
            }
            const tableColumn = table.children;
            let temp = 0;
            const warehouseLength = warehouse.length;
            for (let index = 0; index < warehouseLength; index++) {
                  if (index % n === 0 && index != 0) {
                        temp += n;
                  }
                  tableColumn[index - temp].append(warehouse[0]);
            }
      }
      function createColumn(n) {
            let column = document.createElement("div");
            column.classList.add("sp-table__column");
            // column.style.width = `calc(${100/n}% - ${50*(n-1)/n}px)`;
            table.append(column);

      }
})();
