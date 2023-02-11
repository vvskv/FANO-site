(function () {
      "use strict";
      const table = document.querySelector(".sp-table");
      const warehouse = document.querySelector(".table-warehouse").children;
      const media1100 = window.matchMedia("(max-width: 1100px)");
      const mediaMain = window.matchMedia("(min-width: 1101px)");
      let numberOfColumns = 3;
      // let arrItems = warehouse;

      // for(let item of warehouse) {
      //       arrItems.push(item);
      // }

      if (table) fillingColumn(numberOfColumns);

      // media1100.addListener( () => {
      //       console.log("!!!!!!!");
      //       numberOfColumns = 2;
      //       fillingColumn(2);
      // });
      mediaMain.addEventListener("change", ()=> {
            // fillingColumn(3);
      })
      media1100.addEventListener("change", ()=> {
            // console.log(window.screen.width);
            if(window.innerWidth > 1100) {
                  fillingColumn(3)
            } else {
            fillingColumn(2);

            }
      });
      function fillingColumn(n) {
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
                  tableColumn[index - temp].append(warehouse[index].cloneNode(true));
            }
      }
      function createColumn(n) {
            let column = document.createElement("div");
            column.classList.add("sp-table__column");
            column.style.width = `calc(${100/n}% - ${50*(n-1)/n}px)`;
            table.append(column);
      }

      // function fillingColumn(n) {
      //       table.innerHTML = "";
      //       for (let index = 0; index < n; index++) {
      //             createColumn(n);
      //       }
      //       const tableColumns = table.children;
      //       const warehouseLength = warehouse.length;

      //       for (let index = 0; index < warehouseLength; index++) {
      //             const element = array[index];
                  
      //       }

      // }

      // class TableItem {
      //       constructor(index, content) {
      //             this.index = index;
      //             this.content = content;
      //       }
      // }
      // for (let index = 0; index < warehouse.length; index++) {
      //       const element = new TableItem(index, warehouse[index]);
      //       arrItems.push(element);
      // }
      
})();
