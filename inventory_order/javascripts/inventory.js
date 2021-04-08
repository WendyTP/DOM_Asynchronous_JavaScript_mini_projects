var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],

    setDate: function() {
      var date = new Date();
      document.getElementById('order_date').textContent = date.toUTCString();
    },

    cacheTemplate: function() {
      let itemScript = document.getElementById('inventory_item');
      this.template = Handlebars.compile(itemScript.innerHTML); // returns function
      itemScript.remove();
    },

    // increment lastId, create an item obj, then push to collection arr, then return this new item
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;  // an object
    },

    // remove item from collection arr
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },

    // get selected item (obj) from collection arr
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },

    //
    update: function(trElement) {
      var id = this.findID(trElement);
      var item = this.get(id);

      item.name = trElement.querySelector(`input[name="item_name_${id}"]`).value;
      item.stock_number = trElement.querySelector(`input[name="item_stock_number_${id}"]`).value;
      item.quantity = trElement.querySelector(`input[name="item_quantity_${id}"]`).value;
    },

    //
    newItem: function(e) {
      e.preventDefault();
      var item = this.add();  // returns an object
      let itemHtml = this.template({id: item.id});
      document.getElementById('inventory').insertAdjacentHTML('beforeend', itemHtml);
    },

    // find nearest ancestor tr element
    findParent: function(e) {
      return e.target.closest("tr");
    },
    // return string int
    findID: function(trElement) {
      let itemId = trElement.querySelector('input[type="hidden"]').value;
      return Number(itemId);
    },

    // delete item from both collection arr and inventory table
    deleteItem: function(e) {
      e.preventDefault();
      var item = this.findParent(e);
      item.remove(); 
      this.remove(this.findID(item));
    },

    //
    updateItem: function(e) {
      var trElement = this.findParent(e);

      this.update(trElement);
    },

    bindEvents: function() {
      let inventoryTable = document.getElementById('inventory');
      // when click on 'Add item', add a new empty form to table
      document.getElementById('add_item').addEventListener('click', this.newItem.bind(this));
      
      // click event on table: when click on 'delete' link, delete item from to table
      inventoryTable.addEventListener('click', event => {
        if (event.target.tagName ==='A') {
          let func = this.deleteItem.bind(this);
          func(event);
        }
      });

      // blur event on table: when moving focus out of input cells, update item (tr)
     inventoryTable.addEventListener('focusout', event => {
       if (event.target.tagName === 'INPUT') {
         let func = this.updateItem.bind(this);
         func(event);
       }
     })
    },

    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

let inventoryFunc = inventory.init.bind(inventory);
document.addEventListener('DOMContentLoaded', inventoryFunc);

/* 
jQuery.proxy(func, context) === Function.prototype.bind, which returns a new func with 
specific contenxt
$(func) is  DOM ready callback 
*/