require("dotenv").config();

// Require npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Set up connection to MySQL database
var connection = mysql.createConnection({
    host: "127.0.0.1",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: process.env.MY_PASSWORD,
    database: "bamazon_db"
});

// Connect to database
connection.connect(function(err) {
    if (err) throw err;
    start();
});

// Function that shows the customer what is available to buy
function start() {
    connection.query("SELECT * FROM products", function(err, results) {
        console.log("\nWelcome to Bamazon! Here is a list of our current products: ");
        for(var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " " + results[i].product_name + " $" + results[i].price);
        };
        console.log("========================================\n")
        askCustomer();
    });
};

// Function that asks the customer for the id of the item they would like to buy and how much they
// would like to buy. If the customer requests more than the quantity available they are told 
// "Insufficient Quantity", otherwise the quantity of the product is updated in the database and the customer
// is given a total price.
function askCustomer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the id of the product that you would like to purchase?",
            name: "choice",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
            }
        },
        {
            type: "input",
            message: "How many would you like to purchase?",
            name: "quantity",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }
    ]).then(function(response){
        connection.query("SELECT * FROM products", function(err, results) {
            if(response.quantity > results[response.choice - 1].stock_quantity) {
                console.log("\nInsufficient Quantity!\n");
                askCustomer();
            }
            else {
                var quantityLeft = results[response.choice - 1].stock_quantity - response.quantity;
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: quantityLeft
                      },
                      {
                        item_id: response.choice
                      }
                    ],
                    function(err, res) {
                        var cost = response.quantity * results[response.choice - 1].price;
                        console.log("\nThank you for your purchase! Your total is $" + cost + "\n");
                        askAgain();
                    }
                );
            };
        });
    });
};

// Function that asks the customer if they would like to continue shopping
function askAgain() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to continue shopping?",
            name: "choice"
        }
    ]).then(function(response){
        if(response.choice === true) {
            askCustomer();
        }
        else {
            console.log("\nThank you for shopping with us today. Have a great day!\n");
            console.log("=====================================");
            connection.end();
        }
    });
}