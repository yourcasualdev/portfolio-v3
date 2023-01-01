---
title: Stored Procedures in TSQL
date: 2023-01-01
description: A stored procedure is a pre-compiled SQL program that can be executed to perform a specific task.
tag: SQL, TSQL, MYSQL, POSTGRESQL, Database
author: İbrahim BABAL
---

# Stored Procedures

A stored procedure is a pre-compiled SQL program that can be executed to perform a specific task. It can accept input parameters and return multiple results sets. Stored procedures are typically used to encapsulate a group of SQL statements that are executed together, to improve the performance of the database by reducing the amount of SQL that needs to be parsed and optimized, and to allow for the reuse of code.

Stored procedures are created and stored in a database and are executed using T-SQL (Transact-SQL), which is the proprietary SQL implementation used by Microsoft SQL Server. To create a stored procedure in T-SQL, you can use the `CREATE PROCEDURE` statement. The basic syntax for creating a stored procedure is:

```sql
CREATE PROCEDURE procedure_name
    @parameter1 datatype,
    @parameter2 datatype
AS
BEGIN
    -- SQL statements go here
END
```

For example, you might create a stored procedure that retrieves a list of customers from the database based on a specific country:

```sql
CREATE PROCEDURE get_customers_by_country
    @country nvarchar(50)
AS
BEGIN
    SELECT * FROM customers WHERE country = @country
END
```

You can execute a stored procedure by using the `EXEC`
 statement:

```sql
EXEC procedure_name @parameter1 = value1, @parameter2 = value2
```

For example, to execute the `get_customers_by_country`
 stored procedure and retrieve a list of customers from France, you would use the following T-SQL:

```sql
EXEC get_customers_by_country @country = 'France'
```