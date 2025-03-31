create database user_center

create table tb_user
(
    id          bigint auto_increment comment 'id'
        primary key,
    name        varchar(256)                       null comment '用户名',
    login_name  varchar(256)                       null comment '账号',
    avatar_url  varchar(1024)                      null comment '头像链接',
    gender      tinyint                            null comment '性别',
    login_pwd   varchar(512)                       not null comment '密码',
    phone       varchar(128)                       null comment '电话',
    email       varchar(512)                       null comment '邮箱',
    status      int      default 0                 not null comment '用户状态',
    create_time datetime default CURRENT_TIMESTAMP null comment '创建时间',
    update_time datetime default CURRENT_TIMESTAMP null comment '更新时间',
    deleted   tinyint  default 0                 not null comment '是否删除'
)
    comment '用户表';