-- 地址表
CREATE TABLE IF NOT EXISTS `ddm-address`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `address_id` CHAR(36) NOT NULL COMMENT 'id.',
  `user_id` CHAR(36) NOT NULL COMMENT 'id.',
  `native_address_detail` CHAR(100) DEFAULT NULL COMMENT '籍贯-详细地址。',
  `native_address_country` CHAR(50) DEFAULT 'China' COMMENT '籍贯-国家。',
  `native_address_province` CHAR(50) DEFAULT NULL COMMENT '籍贯-省。',
  `native_address_city` CHAR(50) DEFAULT NULL COMMENT '籍贯-市。',
  `native_address_area` CHAR(50) DEFAULT NULL COMMENT '籍贯-区。',
  `work_address_detail` CHAR(100) DEFAULT NULL COMMENT '工作-详细地址。',
  `work_address_country` CHAR(50) DEFAULT 'China' COMMENT '工作-国家。',
  `work_address_province` CHAR(50) DEFAULT NULL COMMENT '工作-省。',
  `work_address_city` CHAR(50) DEFAULT NULL COMMENT '工作-市。',
  `work_address_area` CHAR(50) DEFAULT NULL COMMENT '工作-区。',
  `soft_delete` TINYINT UNSIGNED DEFAULT 1 COMMENT '记录：未删除/已删除：1/2。',
  `create_time` DATETIME NOT NULL COMMENT '创建时间。',
  `update_time` DATETIME NOT NULL COMMENT '更新时间。',
  `delete_time` DATETIME DEFAULT NULL COMMENT '删除时间。',
  PRIMARY KEY (`id`,`address_id`)
)
ENGINE=InnoDB
COMMENT '地址表'
DEFAULT CHARSET=utf8;