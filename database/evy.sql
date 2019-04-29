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
  `url` TEXT NOT NULL COMMENT '链接地址。',
  `type` TINYINT UNSIGNED DEFAULT 1 COMMENT '跳转类型：内部/外部 ：1/2',
  `sort` CHAR(30) DEFAULT NULL COMMENT '排序。',
  `nexus` CHAR(36) DEFAULT NULL COMMENT '关联菜单',
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
  `role` CHAR(36) DEFAULT NULL COMMENT '用户角色。',
  `station` CHAR(2) DEFAULT 0 COMMENT '用户岗位。',
  `status` TINYINT UNSIGNED DEFAULT 1 COMMENT '用户状态：可用/禁用 1/2。',
  `quit` TINYINT UNSIGNED DEFAULT 1 COMMENT '用户状态：在岗/离职 1/2。',
  `birth_time` DATETIME DEFAULT NULL COMMENT '出生日期。',
  `join_time` DATETIME DEFAULT NULL COMMENT '入职日期。',
  `nation` CHAR(20) DEFAULT NULL COMMENT '民族。',
  `marriage` CHAR(1) DEFAULT 0 COMMENT '婚姻情况：未婚/已婚/离异 1/2/3。',
  `native_address` TEXT DEFAULT NULL COMMENT '籍贯。',
  `native_address_detail` TEXT DEFAULT NULL COMMENT '籍贯-详细地址。',
  `bank_address`TEXT DEFAULT NULL COMMENT '银行开户行。',
  `bank_card` CHAR(40) DEFAULT NULL COMMENT '银行卡。',
  `id_card` CHAR(20) DEFAULT NULL COMMENT '身份证。',
  `avatar` TEXT DEFAULT NULL COMMENT '头像。',
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

-- 应用表
CREATE TABLE IF NOT EXISTS `evy-app`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `app_id` CHAR(36) NOT NULL COMMENT 'id.',
  `cn_title` CHAR(30) NOT NULL COMMENT '中文标题。',
  `en_title` CHAR(30) NOT NULL COMMENT '英文标题。',
  `version` CHAR(30) NOT NULL COMMENT '版本。',
  `icon` TEXT COMMENT '图标。',
  `description` TEXT NOT NULL COMMENT '描述。',
  `update` TINYINT UNSIGNED DEFAULT 1 COMMENT '强制更新：不强制/强制：1/2。',
  `associate_url` TEXT DEFAULT NULL COMMENT '关联网址',
  `soft_delete` TINYINT UNSIGNED DEFAULT 1 COMMENT '记录：未删除/已删除：1/2。',
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` DATETIME NOT NULL COMMENT '更新时间',
  `delete_time` DATETIME COMMENT '删除时间',
  PRIMARY KEY (`id`, `app_id`)
)
ENGINE=InnoDB
COMMENT '应用表'
DEFAULT CHARSET=utf8;

-- 模块表
CREATE TABLE IF NOT EXISTS `evy-module`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `module_id` CHAR(36) NOT NULL COMMENT 'id.',
  `cn_title` CHAR(30) NOT NULL COMMENT '中文标题。',
  `en_title` CHAR(30) NOT NULL COMMENT '英文标题。',
  `description` TEXT NOT NULL COMMENT '描述。',
  `content` TEXT DEFAULT NULL COMMENT '富文本内容。',
  `app` CHAR(36) NOT NULL COMMENT '所属应用。',
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

-- 权限角色表
CREATE TABLE IF NOT EXISTS `evy-role`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `role_id` CHAR(36) NOT NULL COMMENT 'id.',
  `title` CHAR(10) NOT NULL COMMENT '角色名。',
  `soft_delete` TINYINT UNSIGNED DEFAULT 1 COMMENT '记录：未删除/已删除：1/2。',
  `admin` TINYINT UNSIGNED DEFAULT 2 COMMENT '是否是管理员：是/否：1/2。',
  `create_time` DATETIME NOT NULL COMMENT '创建时间。',
  `update_time` DATETIME NOT NULL COMMENT '更新时间。',
  `delete_time` DATETIME DEFAULT NULL COMMENT '删除时间。',
  PRIMARY KEY (`id`,`role_id`)
)
ENGINE=InnoDB
COMMENT '权限角色表'
DEFAULT CHARSET=utf8;

-- 功能表
CREATE TABLE IF NOT EXISTS `evy-auth`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `auth_id` CHAR(36) NOT NULL COMMENT 'id.',
  `title` CHAR(30) NOT NULL COMMENT '权限名。',
  `url` TEXT DEFAULT NULL COMMENT '链接地址。',
  `remark` TEXT DEFAULT NULL COMMENT '备注。',
  `menu` CHAR(36) DEFAULT NULL COMMENT '所属页面。',
  `soft_delete` TINYINT UNSIGNED DEFAULT 1 COMMENT '记录：未删除/已删除：1/2。',
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` DATETIME NOT NULL COMMENT '更新时间',
  `delete_time` DATETIME COMMENT '删除时间',
  PRIMARY KEY (`id`, `auth_id`)
)
ENGINE=InnoDB
COMMENT '功能表'
DEFAULT CHARSET=utf8;

-- 功能权限关联表
CREATE TABLE IF NOT EXISTS `evy-role-auth`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `auth` CHAR(36) NOT NULL COMMENT 'auth_id.',
  `role` CHAR(36) NOT NULL COMMENT 'role_id.',
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB
COMMENT '功能权限关联表'
DEFAULT CHARSET=utf8;

-- 菜单权限关联表
CREATE TABLE IF NOT EXISTS `evy-role-menu`
(
  `id` INTEGER auto_increment COMMENT 'id.',
  `menu` CHAR(36) NOT NULL COMMENT 'menu_id.',
  `role` CHAR(36) NOT NULL COMMENT 'role_id.',
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB
COMMENT '菜单权限关联表'
DEFAULT CHARSET=utf8;