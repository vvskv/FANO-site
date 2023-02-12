(function () {
      "use strict";
      const table = document.querySelector(".sp-table");
      const warehouse = document.querySelector(".table-warehouse").children;
      const media1100 = window.matchMedia("(max-width: 1100px)");
      const media650 = window.matchMedia("(max-width: 650px)");
      let numberOfColumns = 3;

      // if (table) fillingColumn(numberOfColumns);
      if (window.innerWidth > 1100) {
            fillingColumn(3);
      } else if (window.innerWidth > 650) {
            fillingColumn(2);
      } else {
            fillingColumn(1);
      };

      media1100.addEventListener("change", () => {
            // console.log("!!!");
            if (window.innerWidth > 1100) {
                  fillingColumn(3);
            } else if (window.innerWidth < 1100) {
                  fillingColumn(2);
            }
      });
      // media1100.addListener(()=> {
      //       if (window.innerWidth > 1100) {
      //             fillingColumn(3);
      //       } else if (window.innerWidth < 1100) {
      //             fillingColumn(2);
      //       }
      // });

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
            const tableColumn = table.children;
            let temp = 0;
            const warehouseLength = warehouse.length;
            for (let index = 0; index < warehouseLength; index++) {
                  if (index % n === 0 && index != 0) {
                        temp += n;
                  }
                  tableColumn[index - temp].append(
                        warehouse[index].cloneNode(true)
                  );
            }
      }
      function createColumn(n) {
            let column = document.createElement("div");
            column.classList.add("sp-table__column");
            column.style.width = `calc(${100 / n}% - ${(50 * (n - 1)) / n}px)`;
            table.append(column);
      }
})();
