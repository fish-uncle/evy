-- 菜单表
CREATE TABLE IF NOT EXISTS `evy-menu`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `menu_id` CHAR(36) NOT NULL COMMENT 'id.',
  `title` CHAR(30) NOT NULL COMMENT '标题。',
  `icon` CHAR(30) COMMENT '图标。',
  `url` CHAR(30) NOT NULL COMMENT '链接地址。',
  `type` TINYINT UNSIGNED DEFAULT 1 COMMENT '跳转类型：内部/外部 ：1/2',
  `sort` CHAR(30) DEFAULT NULL COMMENT '排序。',
  `nexus` int(36) NOT NULL COMMENT '关联菜单',
  `soft_delete` TINYINT UNSIGNED DEFAULT 1 COMMENT '记录：未删除/已删除：1/2。',
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` DATETIME NOT NULL COMMENT '更新时间',
  `delete_time` DATETIME COMMENT '删除时间',
  PRIMARY KEY (`id`, `menu_id`)
)
ENGINE=InnoDB
COMMENT '菜单表'
DEFAULT CHARSET=utf8;