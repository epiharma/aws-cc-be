drop table if exists stocks;
drop table if exists products;

create table products (
	id uuid primary key default gen_random_uuid(),
	title text not null,
	description text,
	price integer
);

create table stocks (
	product_id uuid,
	count integer,
	foreign key (product_id) references products(id)
);

with product as
 (insert into products(title,description,price) values ('Product 1','Description 1', 1) returning id)
  insert into stocks(product_id, count) select product.id, 1 from product;

with product as
 (insert into products(title,description,price) values ('Product 2','Description 2', 2) returning id)
  insert into stocks(product_id, count) select product.id, 2 from product;

with product as
 (insert into products(title,description,price) values ('Product 3','description 3', 3) returning id)
  insert into stocks(product_id, count) select product.id, 3 from product;
