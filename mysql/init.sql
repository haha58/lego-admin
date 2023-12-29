-- mysql\init.sql
-- docker-compose 启动 mysql 时的初始化代码

select "init start...";

-- 设置 root 用户可外网访问
use mysql;
SET SQL_SAFE_UPDATES=0; -- 解除安全模式，测试环境，没关系
update user set host='%' where user='root';
--关闭所有打开的表并释放它们的锁定
flush privileges;
-- 密码参考 docker-compose.yml
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456'; 
flush privileges;

select "init end...";   
