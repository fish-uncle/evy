-- 应用表
CREATE TABLE IF NOT EXISTS `ddm-app`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `app_id` CHAR(36) NOT NULL COMMENT 'id.',
  `cn_title` CHAR(30) NOT NULL COMMENT '中文标题。',
  `en_title` CHAR(30) NOT NULL COMMENT '英文标题。',
  `icon` CHAR(30) COMMENT '图标。',
  `description` CHAR(30) NOT NULL COMMENT '描述。',
  `owner_id` int(36) NOT NULL COMMENT '应用所有者ID',
  `associate_url` varchar(1024) DEFAULT NULL COMMENT '关联网址',
  `soft_delete` TINYINT UNSIGNED DEFAULT 1 COMMENT '记录：未删除/已删除：1/2。',
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` DATETIME NOT NULL COMMENT '更新时间',
  `delete_time` DATETIME COMMENT '删除时间',
  PRIMARY KEY (`id`, `app_id`)
)
ENGINE=InnoDB
COMMENT '应用表'
DEFAULT CHARSET=utf8;