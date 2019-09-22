insert into User values (1, 'Artur', 'artur.aralov@gmail.com')
insert into User values (2, 'Artjom', 'artjom.aralov@gmail.com')
insert into User values (3, 'Sergei', 'sergei.aralov@gmail.com')

insert into category values (1, 'Rent', 1)
insert into category values (2, 'Sports', 3)
insert into category values (3, 'Groceries', 1)

insert into Account values (1, 'Swedbank', 'Business', 1)
insert into Account values (2, 'MMM Boss', 'Personal', 2)
insert into Account values (3, 'Olybet', 'Business', 3)

-- insert into Account values (1, true, 1, 'Swedbank')
-- insert into Account values (2, false, 2, 'MMM Boss')
-- insert into Account values (3, true, 3, 'Groceries')

insert into expense values (100, '2019-06-16T17:00:00.000Z', 'Kinnisvara', 'Income', 1, 1)
insert into expense values (101, '2019-06-15T15:00:00.000Z', 'MyFitness', 'Income', 2, 3)
insert into expense values (102, '2019-06-15T15:00:00.000Z', 'Rimi', 'Expense', 1, 1)