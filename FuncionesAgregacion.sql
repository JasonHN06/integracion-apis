use graficos;

select * from product;

-- 1. Contar productos en la tabla 
select count(*) as total_productos from product;

-- 2. Calcular el valor total de todos los productos
select sum(value) as valor_total from product;

-- 3. Obtener el valor promedio de los productos
select avg(value) as valor_promedio from product;

-- 4. Encontrar el producto con el valor más alto
select max(value) as producto_valor_max from product;

-- 5. Encontrar el producto con el valor más bajo
select min(value) as producto_valor_min from product;

-- 6. Contar el número de productos de cada tipo de moneda (valueCurrency)
select valueCurrency, count(*) as cantidad from product
group by valueCurrency;

-- 7. Calcular el valor promedio de los productos por cada tipo de moneda (valueCurrency)
select valueCurrency, avg(value) as promedio from product
group by valueCurrency;

-- 8. Obtener el valor total de los productos por productType
select productType, sum(value) as valor_total from product
group by productType;

-- 9. Encontrar el valor máximo y mínimo por productType
select productType, max(value) as valor_max,
min(value) as valor_min from product
group by productType;

-- 10. Calcular el valor promedio de productos por cada categoryCode
select categoryCode, avg(value) as promedio from product
group by categoryCode;

-- 11. Contar productos disponibles en cada status
select status, count(*) as cantidad from product
group by status;

-- 12. Calcular el valor total de productos en cada brandCode
select brandCode, sum(value) as valor_total from product
group by brandCode;

-- 13. Obtener el número total de códigos de productos únicos (partNumber)
select count(distinct partNumber) as codigo_unico from product;

-- 14. Calcular el valor promedio y la cantidad de productos por cada lineCode
select lineCode, avg(value) as promedio, count(*) as cantidad
from product group by lineCode;

-- 15. Encontrar el producto con el valor más alto por cada plannerCode
SELECT p.*
FROM product p
INNER JOIN (
    SELECT plannerCode, MAX(value) AS max_value
    FROM product
    GROUP BY plannerCode
) 
sub
ON p.plannerCode = sub.plannerCode
AND p.value = sub.max_value;
