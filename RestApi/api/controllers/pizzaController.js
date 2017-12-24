'use strict';

// var mongoose = require('mongoose');
// Pizza = mongoose.model('Pizza');

require("underscore");
const path = require('path');

var Pizza = require('../models/Pizza');
var Topping = require('../models/Topping');
var Order = require('../models/Order');
var OrderItem = require('../models/OrderItem');

var connection = require('../../db');


const PRICE_STANDARD = 5.00;
const PRICE_LARGE = 8.50;

// console.log("in controller");
function response(data) {
  dataObj = JSON.parse(data.body);
  let resp;
  if (dataObj.error) {
  }
}

exports.list_all_pizza = function (req, res) {

  var requestParams = req.params;
  if (requestParams) {
    var arr = [];
    Pizza.findAll({ attributes: ['id'], raw: true }).then(result => {
      result.forEach(element => {
        arr.push(element.id);
      });

      if (arr.length > 0)
        res.status(200).send(arr);
      else
        res.status(404).send("No pizza exists.");

    });
  } else {
    res.status(404).send("No pizza exists.");
  }
};

exports.create_pizza = function (req, res) {

  var request = req.body;

  if (request['id'])
    delete request['id'];

  Pizza.create(request)
    .then(function (newModel) {

      console.log(newModel.dataValues);
      if (newModel.dataValues) {
        var uri = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.setHeader('Location', uri + "/" + newModel.dataValues.id);
        res.status(201).send("Created new pizza.");
      } else {
        res.status(400).send("Invalid input.")
      }
    });
};

exports.get_pizza = function (req, res) {

  var request = req.params;
  console.log("in get pizza");

  Pizza.findOne({
    where: {
      id: request.id
    }, raw: true
  }).then(result => {
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(404).send("Pizza not found.");
    }
    // console.log(result);
  });
};


exports.update_pizza = function (req, res) {
  console.log("in update pizza");
  var requestParams = req.params;
  var requestBody = req.body;

  if (requestBody['id'])
    delete requestBody['id'];

  Pizza.find({ where: { id: requestParams.id } })
    .then(function (pizza) {
      // Check if record exists in db
      console.log(pizza);
      if (pizza) {
        pizza.updateAttributes(requestBody)
          .then(function (newPizza) {
            res.status(404).send("Pizza not found.");
            // console.log(newPizza.dataValues);
            res.status(204).send("Update okay.");

          }).catch(function (err) {
            res.status(400).send("Invalid pizza supplied.");
          });
      } else {
        res.status(404).send("Pizza not found.");
      }

    });
};

exports.delete_pizza = function (req, res) {

  var requestBody = req.params.id;
  if (requestBody) {
    Pizza.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      if (result) {
        res.status(204).send("Deleted.");
      } else {
        res.status(404).send("Pizza not found.");
      }
    });
  } else {
    res.status(404).send("Invalid Id supplied.");
  }
};



// // api for toppings

exports.create_topping = function (req, res) {
  var requestParams = req.params;
  var requestBody = req.body;
  Pizza.findOne({
    where: {
      id: requestParams.pizzaId
    }
  }).then(result => {
    // console.log(result);
    if (result != null) {

      if (requestBody['id'])
        delete requestBody['id'];

      requestBody['pizzaId'] = parseInt(requestParams.pizzaId);

      Topping.create(requestBody)
        .then(function (newModel) {
          if (newModel.dataValues) {
            var uri = req.protocol + '://' + req.get('host') + req.originalUrl;
            res.setHeader('Location', uri + "/" + newModel.dataValues.id);
            res.status(201).send("Created new Topping for pizza.");
          } else {

            res.status(404).send("No toppings found.");
          }
          // console.log(newModel.dataValues);
        });
    }

  }).catch(function (err) {
    res.status(400).send("Invalid input.");
  });
};


exports.get_all_toppings = function (req, res) {

  var requestParams = req.params;
  if (requestParams) {
    var arr = [];
    Topping.findAll({ where: { pizzaId: requestParams.pizzaId }, attributes: ['id'], raw: true }).then(result => {
      result.forEach(element => {
        arr.push(element.id);
      });

      if (arr.length > 0)
        res.status(200).send(arr);
      else
        res.status(400).send("Toppings not found.");

    });
  } else {
    res.status(404).send("Specified pizza id not found.");
  }
};


exports.get_topping = function (req, res) {
  // Topping.find({ 'pizzaId': req.params.pizzaId, 'id': req.params.toppingId }, function (err, pizza) {
  //   if (err)
  //     res.send(err);
  //   res.json(pizza);
  // });

  var requestParams = req.params;
  Topping.findOne({ where: { 'pizzaId': req.params.pizzaId, 'id': req.params.toppingId }, raw: true }).then(result => {
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(404).send("Pizza or Topping not found.");
    }
  }).catch(function (err) {
    res.status(400).send("Invalid ID(s) supplied..");
  });

};


exports.delete_topping = function (req, res) {

  Topping.destroy({ where: { 'pizza_id': req.params.pizzaId, 'id': req.params.toppingId }, raw: true }.then(result => {
    console.log(result);

    if (result) {
      res.status(204).send("Deleted.");
    } else {
      res.status(404).send("Pizza not found.");
    }
  })).catch(function (err) {
    res.status(400).send("Invalid IDs.");
  });


};




// // apis for order 

exports.create_order = function (req, res) {

  //  console.log(req.body["orderItems"]);
  // if(req.body["orderItems"]!=null){
  //  req.body["orderItems"]["id"] = 4;
  var totalCost = 0;
  var pId = 0;
  var oId = 0;

  var request = req.body;

  if (request['id'])
    delete request['id'];

  var orderData = {
    "totalPrice": request["totalPrice"],
    "recipient": request["recipient"]
  };

  Order.create(orderData)
    .then(function (newOrder) {
      // console.log(newOrder.dataValues.id);
      oId = newOrder.dataValues.id;

      req.body["orderItems"].forEach(element => {
        element["orderId"] = oId;

        Pizza.findOne({ where: { id: element["pizzaId"] }, attributes: ['size', 'price'], raw: true }).then(function (pizza) {
          // console.log(pizza);
          var pizzaValue = 0;
          if (pizza.size == 'Large')
            pizzaValue = PRICE_LARGE + pizza.price;
          else
            pizzaValue = PRICE_STANDARD + pizza.price;


          totalCost = totalCost + (pizzaValue * element["quantity"]);
          console.log(totalCost);
        });

        OrderItem.create(element)
          .then(function (newModel) {
            // console.log(newModel.dataValues);


            orderData["id"] = oId;
            orderData["totalPrice"] = totalCost;

            Order.findOne({ where: { id: oId } })
              .then(function (order) {
                console.log(order.dataValues);
                // Check if record exists in db
                if (order) {
                  console.log('in update');
                  order.updateAttributes(orderData)
                    .then(function (newOrder) {
                      console.log(newOrder.dataValues);

                    }).catch(function (err) {
                      console.log(err);
                    });
                } else {
                }

              });




          });
      });


      var uri = req.protocol + '://' + req.get('host') + req.originalUrl;
      res.setHeader('Location', uri + "/" + newOrder.dataValues.id);
      res.status(201).send("Order successfully created.");

    })
    .catch(function (err) {
      res.status(400).send("Invalid Order.");
    });
  // }
  // Pizza.find({'id':req}, function(err, pizza) {
  //   if (err)
  //     res.send(err);
  //   res.json(pizza);
  // });
};


exports.get_all_orders = function (req, res) {
  var requestParams = req.params;
  if (requestParams) {
    var arr = [];
    Order.findAll({ attributes: ['id'], raw: true }).then(result => {
      if (result.length > 0) {
        result.forEach(element => {
          arr.push(element.id);
        });
        res.status(200).send(arr);
        // console.log(arr);
      } else {
        res.status(404).send("No orders found.");
      }
    }).catch(function (err) {
      res.status(404).send("Invalid ID.");
    });
  }

};


exports.get_order = function (req, res) {
  var requestParams = req.params;
  if (requestParams) {

    Order.findOne({ where: { id: requestParams.orderId }, raw: true }).then(result => {
      // console.log(result);
      if (result) {
        OrderItem.findAll({ where: { orderId: requestParams.orderId }, raw: true }).then(items => {
          // console.log(items);

          result["orderItems"] = items;

          // console.log(result);
        });

        res.status(200).send(result);
      } else {
        res.status(400).send("Order not found");
      }

    }).catch(function (err) {
      res.status(400).send("Invalid ID supplied");
    });
  }
};


exports.delete_order = function (req, res) {
  var requestBody = req.params.id;
  OrderItem.destroy({
    where: {
      orderId: req.params.orderId
    }
  }).then(function (resultItems) {
    // console.log(resultItems);
    Order.destroy({
      where: {
        id: req.params.orderId
      }
    }).then(function (result) {
      // console.log(result);
      res.status(204).send("Deletion successful");
    }).catch(function (err) {
      res.status(404).send("Order not found.");
    });
  }).catch(function (err) {
    res.status(400).send("Invalid ID supplied");
  });
};