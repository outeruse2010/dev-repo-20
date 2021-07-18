createdb -h localhost -p 5432 -U postgres malini_db
password: admin

create schema malini_schema;

--uuid-ossp module provides some handy functions that implement standard algorithms for generating UUIDs.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop TABLE malini_schema.cus_area;

CREATE TABLE malini_schema.cus_area(
   area_id uuid  DEFAULT uuid_generate_v4(),
   area_name text not null,
   description text,
   updated_on timestamp default now(),
   updated_by text,
   PRIMARY KEY(area_id),
   UNIQUE(area_name)
);


drop TABLE malini_schema.customer;

CREATE TABLE malini_schema.customer(
   cus_id uuid  DEFAULT uuid_generate_v4(),
   cus_sr text not null,
   first_name text not null,
   mid_name text,
   last_name text not null,
   address text,
   area_id uuid,
   email text,
   phone text,
   comments text,
   updated_on timestamp default now(),
   updated_by text,
   PRIMARY KEY(cus_id),
   UNIQUE(cus_sr, first_name, last_name)
);

drop TABLE malini_schema.cus_due;

CREATE TABLE malini_schema.cus_due(
   cus_due_id uuid  DEFAULT uuid_generate_v4(),
   cus_id uuid not null,
   mkt_amount decimal DEFAULT 0,
   credit_amt decimal DEFAULT 0,
   due_amt decimal DEFAULT 0,
   comments text,
   updated_on timestamp default now(),
   updated_by text,
   PRIMARY KEY(cus_due_id)
);
