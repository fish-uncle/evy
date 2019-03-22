-- 模块表
CREATE TABLE IF NOT EXISTS `evy-module`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `module_id` CHAR(36) NOT NULL COMMENT 'id.',
  `cn_title` CHAR(30) NOT NULL COMMENT '中文标题。',
  `en_title` CHAR(30) NOT NULL COMMENT '英文标题。',
  `description` CHAR(30) NOT NULL COMMENT '描述。',
  `content` TEXT DEFAULT NULL COMMENT '富文本内容。',
  `label` TEXT DEFAULT NULL COMMENT '标签。',
  `soft_delete` TINYINT UNSIGNED DEFAULT 1 COMMENT '记录：未删除/已删除：1/2。',
  `timing` TINYINT UNSIGNED DEFAULT 1 COMMENT '是否是定时活动：不是/是：1/2',
  `start_time` DATETIME NOT NULL COMMENT '开始时间',
  `end_time` DATETIME NOT NULL COMMENT '结束时间',
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` DATETIME NOT NULL COMMENT '更新时间',
  `delete_time` DATETIME COMMENT '删除时间',
  PRIMARY KEY (`id`, `module_id`)
)
ENGINE=InnoDB
COMMENT '模块表'
DEFAULT CHARSET=utf8;