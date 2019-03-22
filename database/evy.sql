CREATE database EVY DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 所有id 都是 自然数排序
-- 所有xx_id 都是 36位uuid
USE EVY;

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
  `nexus` int(36) DEFAULT NULL COMMENT '关联菜单',
  `soft_delete` TINYINT UNSIGNED DEFAULT 1 COMMENT '记录：未删除/已删除：1/2。',
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` DATETIME NOT NULL COMMENT '更新时间',
  `delete_time` DATETIME COMMENT '删除时间',
  PRIMARY KEY (`id`, `menu_id`)
)
ENGINE=InnoDB
COMMENT '菜单表'
DEFAULT CHARSET=utf8;

-- 员工表
CREATE TABLE IF NOT EXISTS `evy-user`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `user_id` CHAR(36) NOT NULL COMMENT 'id.',
  `employee_id` CHAR(10) NOT NULL COMMENT '工号。',
  `username` CHAR(30) NOT NULL COMMENT '用户名。',
  `password` CHAR(50) NOT NULL COMMENT '密码。',
  `nick_name` CHAR(30) DEFAULT NULL COMMENT '昵称。',
  `job_name` CHAR(30) DEFAULT NULL COMMENT '职称。',
  `real_name` CHAR(30) NOT NULL COMMENT '真实姓名。',
  `sex` CHAR(1) DEFAULT 1 COMMENT '性别：男/女 1/2。',
  `pay` CHAR(10) DEFAULT NULL  COMMENT '薪酬。',
  `type` CHAR(36) DEFAULT 0 COMMENT '用户类别。',
  `role` CHAR(36) DEFAULT 0 COMMENT '用户角色。',
  `status` TINYINT UNSIGNED DEFAULT 1 COMMENT '用户状态：可用/禁用 1/2。',
  `quit` TINYINT UNSIGNED DEFAULT 1 COMMENT '用户状态：在岗/离职 1/2。',
  `birth_time` DATETIME DEFAULT NULL COMMENT '出生日期。',
  `join_time` DATETIME DEFAULT NULL COMMENT '入职日期。',
  `nation` CHAR(20) DEFAULT NULL COMMENT '民族。',
  `marriage` CHAR(1) DEFAULT 0 COMMENT '婚姻情况：未婚/已婚/离异 1/2/3。',
  `native_address` TEXT DEFAULT NULL COMMENT '籍贯-详细地址。',
  `bank_address`TEXT DEFAULT NULL COMMENT '银行开户行。',
  `bank_card` CHAR(40) DEFAULT NULL COMMENT '银行卡。',
  `id_card` CHAR(20) DEFAULT NULL COMMENT '身份证。',
  `avatar` CHAR(100) DEFAULT NULL COMMENT '头像。',
  `language` CHAR(10) DEFAULT NULL COMMENT '语言。',
  `remark` TEXT DEFAULT NULL COMMENT '备注。',
  `email` CHAR(30) DEFAULT NULL COMMENT 'E-mail。',
  `phone` CHAR(30) DEFAULT NULL COMMENT '手机号。',
  `wechat` CHAR(30) DEFAULT NULL COMMENT '微信号。',
  `qq` CHAR(30) DEFAULT NULL COMMENT 'qq号。',
  `sina` CHAR(30) DEFAULT NULL COMMENT '新浪号。',
  `origin_system` CHAR(1) DEFAULT 1 COMMENT '注册来源系统：evy 1（多系统注册用户）。',
  `origin_user` CHAR(36) DEFAULT NULL COMMENT '注册来源用户（邀友）。',
  `soft_delete` TINYINT UNSIGNED DEFAULT 1 COMMENT '记录：未删除/已删除：1/2。',
  `create_time` DATETIME NOT NULL COMMENT '创建时间。',
  `update_time` DATETIME NOT NULL COMMENT '更新时间。',
  `delete_time` DATETIME DEFAULT NULL COMMENT '删除时间。',
  PRIMARY KEY (`id`,`user_id`)
)
ENGINE=InnoDB
COMMENT '员工表'
DEFAULT CHARSET=utf8;