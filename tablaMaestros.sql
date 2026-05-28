create database universidad;

use universidad;

create table maestros(
	id int not null auto_increment primary key,
	nombre varchar(35),
	email varchar(150),
    edad int
);


select * from maestros;