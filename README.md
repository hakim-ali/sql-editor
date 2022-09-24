# sql-editor-tool

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Overview

This is simple SQL queries and displaying the results of said query. Sql Editor is based on cvs files data, you can see the all csv files are tables and showing the data of every table.



### `SQL EDITOR`

We can write simple as normal syntax and auto suggestion with tables.

#### Example - 1

```sql
select * from categories.csv
```

#### Example - 2

Query accept the columns names as well

```sql
select [title,city] from employees.csv
```
