-- 用户表
CREATE TABLE IF NOT EXISTS `evy-user`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `role_id` CHAR(36) NOT NULL COMMENT 'id.',
  `title` CHAR(10) NOT NULL COMMENT '角色名。',
  `admin` TINYINT UNSIGNED DEFAULT 2 COMMENT '是否是管理员：是/否：1/2。',
  `soft_delete` TINYINT UNSIGNED DEFAULT 1 COMMENT '记录：未删除/已删除：1/2。',
  `create_time` DATETIME NOT NULL COMMENT '创建时间。',
  `update_time` DATETIME NOT NULL COMMENT '更新时间。',
  `delete_time` DATETIME DEFAULT NULL COMMENT '删除时间。',
  PRIMARY KEY (`id`,`role_id`)
)
ENGINE=InnoDB
COMMENT '用户表'
DEFAULT CHARSET=utf8;