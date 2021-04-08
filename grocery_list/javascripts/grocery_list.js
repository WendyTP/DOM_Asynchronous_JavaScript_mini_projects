 /*
    validate input (quantity : positive integer)
    validate input(name: a-z and space )
    when click add:
      - check if item name is empty (if empty, alert)
      - check if qunatity is empty, if not empty, validate input; if empty, set qty to 1
      - create a li with text of qty + item name
      - add li to ul 
      - clear form
    
    */

   function validPositiveQuantity(input) {
    let num = Number(input);
    return Number.isInteger(num) && num > 0; 
  }

  function validItemName(input) {
    return /^[a-zA-Z]+[a-zA-Z\s]*$/.test(input);
  }

  
  document.addEventListener('DOMContentLoaded', event => {
    let form = document.querySelector('form');
    let ul = document.querySelector('ul');

    form.addEventListener('submit', event => {
      event.preventDefault();
      let itemName = document.getElementById('item_name').value;
      let qty = document.getElementById('quantity').value;
      
      if (qty.length === 0 || /^\s+$/.test(qty)) {
        qty = '1';
      }

      if (!validItemName(itemName) || !validPositiveQuantity(qty)) {
        alert('input is not valid');
      } else {
        let li = document.createElement('li');
        li.textContent = qty + ' ' + itemName;
        ul.appendChild(li);
        form.reset();


      }
    });
  });