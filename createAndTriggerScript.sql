DROP TRIGGER if exists trigger_update_total_amount_and_apply_discount ON orderitems;
DROP FUNCTION if exists update_total_amount_and_apply_discount

DROP TRIGGER if exists update_stock_trigger ON payments;
DROP FUNCTION if exists update_stock_level;

drop table if exists payments cascade;
drop table if exists orderItems cascade;
drop table if exists orders cascade;
drop table if exists shippingInfo cascade;
drop table if exists products cascade;
drop table if exists category cascade;
drop table if exists manufacturer cascade;
drop table if exists users cascade;




CREATE TABLE users (
    user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name varchar(20) not null,
    last_name varchar(20) not null,
	email varchar(40) not null,
	password_hash varchar(60) not null,
	phone_number varchar(13),
	user_role varchar(8) default "Customer"
);

CREATE TABLE category (
    category_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name varchar(30) not null
);
CREATE TABLE manufacturer (
    manufacturer_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    manufacturer_name varchar(30) not null
);
CREATE TABLE products (
    product_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_name varchar(40) not null,
    description varchar(150),
	price numeric(10,2),
	stock_level integer not null,
	serial_code varchar(20) not null,
	manufacturer_id integer references manufacturer(manufacturer_id) on delete cascade,
	category_id integer references category(category_id) on delete cascade
);

CREATE TABLE shippingInfo (
    shipping_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    address varchar(40),
	city varchar(30),
	country varchar(25),
	zip_code varchar(6)
);
CREATE TABLE orders (
    order_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer references users(user_id) on delete set null,
	order_date date default now(),
    status varchar(15),
	shipping_id integer references shippingInfo(shipping_id) on delete cascade,
	total_amount numeric(10,2)
);
CREATE TABLE orderItems (
    order_item_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id integer references orders(order_id) on delete cascade,
	product_id integer references products(product_id) on delete cascade,
    quantity integer
);
CREATE TABLE payments (
    payment_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id integer references orders(order_id) on delete set null,
    payment_date date default now(),
	amount numeric(10,2),
	stripe_transaction_id varchar(30)
);

CREATE OR REPLACE FUNCTION update_stock_level() RETURNS TRIGGER AS $$
BEGIN
    -- Check if the payment status is successful
    IF EXISTS(SELECT * FROM payments WHERE order_id = NEW.order_id) THEN
        -- Update the stock level of the product for the correct quantity
        UPDATE products 
        SET stock_level = stock_level - (SELECT quantity FROM orderItems WHERE order_id = NEW.order_id AND product_id = products.product_id)
        WHERE product_id IN (SELECT product_id FROM orderItems WHERE order_id = NEW.order_id);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stock_trigger AFTER INSERT ON payments
FOR EACH ROW
EXECUTE FUNCTION update_stock_level();



--triger koji azurira kada se doda 
CREATE OR REPLACE FUNCTION update_total_amount_and_apply_discount()
RETURNS TRIGGER AS $$
DECLARE
    total_quantity INTEGER;
    amount NUMERIC(10,2);
BEGIN
    -- Update the total_amount based on the new orderItem
    UPDATE orders
    SET total_amount = (
        SELECT SUM(orderItems.quantity * products.price)
        FROM orderItems
        JOIN products ON orderItems.product_id = products.product_id
        WHERE orderItems.order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;

    -- Get the updated total_amount
    SELECT total_amount
    INTO amount
    FROM orders
    WHERE order_id = NEW.order_id;

    -- Calculate the discount
    total_quantity := (
        SELECT SUM(quantity)
        FROM orderItems
        WHERE order_id = NEW.order_id
    );

    -- Apply the discount if necessary
    IF total_quantity >= 2 THEN
        amount := amount * 0.85;
    END IF;

    -- Update the total_amount with the discount applied
    UPDATE orders
    SET total_amount = amount
    WHERE order_id = NEW.order_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trigger_update_total_amount_and_apply_discount
AFTER INSERT ON orderItems
FOR EACH ROW
EXECUTE FUNCTION update_total_amount_and_apply_discount();




-- triger koji update total amount ako se ukloni 
CREATE OR REPLACE FUNCTION update_total_amount()
RETURNS TRIGGER AS $$
DECLARE
    total_quantity INTEGER;
    amount NUMERIC(10,2);
BEGIN
    -- Update the total_amount based on the orderItems in the order
    UPDATE orders
    SET total_amount = (
        SELECT COALESCE(SUM(orderItems.quantity * products.price), 0)
        FROM orderItems
        JOIN products ON orderItems.product_id = products.product_id
        WHERE orderItems.order_id = OLD.order_id
    )
    WHERE order_id = OLD.order_id;

    -- Get the updated total_amount
    SELECT total_amount
    INTO amount
    FROM orders
    WHERE order_id = OLD.order_id;

    -- Calculate the discount
    total_quantity := (
        SELECT SUM(quantity)
        FROM orderItems
        WHERE order_id = OLD.order_id
    );

    -- Apply the discount if necessary
    IF total_quantity >= 2 THEN
        amount := amount * 0.85;
    END IF;

    -- Update the total_amount with the discount applied
    UPDATE orders
    SET total_amount = amount
    WHERE order_id = OLD.order_id;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_total_amount
AFTER DELETE ON orderItems
FOR EACH ROW
EXECUTE FUNCTION update_total_amount();