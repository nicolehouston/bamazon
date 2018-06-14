# bamazon

## Instructions

* This is a CLI App involving node, javascript, and MySQL.
* There are two applications (Customer and Manager).
* npm packages used include 'dotenv', 'inquirer', and 'mysql'.

* The MySQL database stores a table with the following information: id#, product name, department name, quantity, and price.

### bamazonCustomer application

* When bamazonCustomer is run the user is first shown a display of the items for sale in the shop.
* Each item displays with an id number, the name of the product, and the price of the product.
* The user is then asked what the id of the item is that she would like to buy.
* Once the user gives the id she is then asked what quantity she would like to purchase.
* If the user selects an amount beyond what is available, a message is displayed saying "Insufficient Quantity" and the transaction does not go through.
* If the user selects an amount that is possible then the purchase is successful and the user is shown the total price. The quantity of the item then gets updated in the MySQL database.
* Finally, the user is asked if she would like to continue shopping, which if she replies yes, will bring her back to the start.

* Here is the link to see bamazonCustomer in action! 
https://drive.google.com/file/d/1bwbasMuSKTJMsCU9flSsXjruOJqibJqq/view?usp=sharing

### bamazonManager application

* When bamazonManager is run the user is shown a main menu with the following options: 
    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

* If the user selects the first option then the information from the table stored in MySQL is displayed for the user to see.
* If the user selects option two then she is shown only the items that have a quantity less than 5. If there are no products with a quantity less than 5, the message "No low inventory" is displayed.
* If the user selects option three she can update the quantity of any items that are currently in the table.
* If the user selects option four she is prompted to fill out the information for the new product and then a new row is inserted into the MySQL database with the new information.

* Here is the link to see bamazonManager in action!
https://drive.google.com/file/d/1fcRhl6Zh3eIfgkr5XKAbIiYuNg0u4XdN/view?usp=sharing