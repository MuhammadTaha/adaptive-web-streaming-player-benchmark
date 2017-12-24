'use strict';

module.exports = function (app) {
  console.log("in controller");
  var pizza = require('../controllers/pizzaController.js');

  console.log("in route");


  // pizza Routes
  app.route('/pizza')
    .get(pizza.list_all_pizza)
    .post(pizza.create_pizza);

  app.route('/pizza/:id')
    .get(pizza.get_pizza)
    .put(pizza.update_pizza)
    .delete(pizza.delete_pizza);

  app.route('/pizza/:pizzaId/topping')
    .post(pizza.create_topping)
    .get(pizza.get_all_toppings);
  // .delete(pizza.delete_pizza);  

  app.route('/pizza/:pizzaId/topping/:toppingId')
  .delete(pizza.delete_topping)
  .get(pizza.get_topping);



  // routes for order
  app.route('/order')
  // .delete(pizza.delete_topping)
  .get(pizza.get_all_orders)
  .post(pizza.create_order);


  app.route('/order/:orderId')
  .delete(pizza.delete_order)
  .get(pizza.get_order);


};
