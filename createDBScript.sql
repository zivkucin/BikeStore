DROP TRIGGER if exists apply_discount ON orders;
DROP FUNCTION if exists calculate_discount;

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



