-- Try both variants so the repair works across MySQL/MariaDB versions
ALTER TABLE `user` DROP CHECK `user_chk_1`;
ALTER TABLE `user` DROP CONSTRAINT `user_chk_1`;
ALTER TABLE `user` MODIFY COLUMN `role` VARCHAR(40) NOT NULL;
UPDATE `user` SET `role`='CUSTOMER' WHERE `role` IN ('CUSTOMER', 'ROLE_CUSTOMER');
UPDATE `user` SET `role`='RESTAURANT_OWNER' WHERE `role` IN ('RESTAURANT_OWNER', 'ROLE_RESTAURANT_OWNER');
UPDATE `user` SET `role`='ADMIN' WHERE `role` IN ('ADMIN', 'ROLE_ADMIN');

