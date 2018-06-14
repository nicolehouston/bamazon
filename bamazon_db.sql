DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (

    item_id INT NOT NULL AUTO_INCREMENT,

    product_name VARCHAR(50),

    department_name VARCHAR(50),

    price DECIMAL(10,2),

    stock_quantity INTEGER(10),

    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ice cream", "food", 2.50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("desk", "furniture", 125.00, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("candy bar", "food", 1.20, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("couch", "furniture", 300.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirt", "clothing", 10.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jacket", "clothing", 25.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("granola bar", "food", 1.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("water bottle", "food", 1.15, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("headphones", "electronics", 9.80, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("television", "electronics", 1000.00, 8);