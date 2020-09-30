https://askubuntu.com/questions/1029177/error-1698-28000-access-denied-for-user-rootlocalhost-at-ubuntu-18-04
22

I found another way that is much better as we need not to give any password for local system.
It is as followed.

Open terminal and type

sudo mysql -u root -p
It will prompt you in mysql, here you can fire any mysql commands.

Use mysql table for change table type, so we can use empty password. Bellow is command for it

USE mysql;
Now we change type of table by following command

UPDATE user SET plugin='mysql_native_password' WHERE User='root';
now we have to flush the privileges, because we have used UPDATE. If you use INSERT, UPDATE or DELETE on grant tables directly you need use FLUSH PRIVILEGES in order to reload the grant tables.

FLUSH PRIVILEGES;
now exit from mysql by following command

exit;
now restart mysql server by following command

service mysql restart
Hope this may help

Thank you.



tenal to db: gcloud compute ssh --zone us-central1-a instance-1 -- -L 3305:localhost:3306