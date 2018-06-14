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
    menu();
});

function menu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function(response){
        switch (response.choice){
        case "View Products for Sale":
        listItems();
        break;

        case "View Low Inventory":
        lowInventory();
        break;

        case "Add to Inventory":
        addToInventory();
        break;

        case "Add New Product":
        addProduct();
        break;
        }
    });
};

// Function that lists the items currently in the inventory
function listItems() {
    connection.query("SELECT * FROM products", function(err, results){
        console.log("\nHere is the Current Inventory: \n");
        for(var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " " + results[i].product_name + " $" + results[i].price + " quantity: " + results[i].stock_quantity);
        };
        console.log("\n============================================\n");
        askIfDone();
    });
}

// Function that lists only the inventory that has an inventory less than 5
function lowInventory() {
    connection.query("SELECT * FROM products", function(err, results){
        var low = false;
        for(var i = 0; i < results.length; i++) {
            if(results[i].stock_quantity < 5) {
                console.log("\n" + results[i].item_id + " " + results[i].product_name + " $" + results[i].price + " quantity: " + results[i].stock_quantity);
                low = true;
            }
        }
        if(low === false) {
            console.log("\nNo low inventory.");
        }
        askIfDone();
    });
};

// Function that adds to the inventory of a product currently available
function addToInventory() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the id of the item you would like to stock?",
            name: "item",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
            }
        },
        {
            type: "input",
            message: "What would you like to set the quantity to?",
            name: "amount",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
            }
        }
    ]).then(function(response){
        connection.query("UPDATE products SET ? WHERE ?", 
        [
            {
                stock_quantity: response.amount
            },
            {
                item_id: response.item
            }
        ],
        function(err, res) {
            console.log("Inventory Updated!");
            askIfDone();
        });
    });
};

// Function that adds a new product to the inventory
function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the product that you would like to add?",
            name: "name"
        },
        {
            type: "input",
            message: "In what department will this product be listed?",
            name: "department"
        },
        {
            type: "input",
            message: "What will the price be set at?",
            name: "price",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
            }
        },
        {
            type: "input",
            message: "What is the amount of inventory available?",
            name: "amount",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
            }
        }
    ]).then(function(response){
        connection.query("INSERT INTO products SET ?",
            {
                product_name: response.name,
                department_name: response.department,
                price: response.price,
                stock_quantity: response.amount
            },
            function(err, res) {
                console.log(res.affectedRows + " product added!\n");
                askIfDone();
            }
    )
    });
};

// Function that is run after each action asking if the user would like to return to the main menu
function askIfDone() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to return to the main menu?",
            name: "decision"
        }
    ]).then(function(response){
        if(response.decision === true) {
            menu();
        }
        else {
            console.log("\nThank you. Goodbye.");
            console.log("\n============================================");
            connection.end();
        }
    });
};