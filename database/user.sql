-- 用户表
CREATE TABLE IF NOT EXISTS `ddm-user`
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
  `type` CHAR(36) DEFAULT 0 COMMENT '用户类别。',
  `role` CHAR(36) DEFAULT 0 COMMENT '用户角色。',
  `status` TINYINT UNSIGNED DEFAULT 1 COMMENT '用户状态：可用/禁用 1/2。',
  `birth_time` DATETIME DEFAULT NULL COMMENT '出生日期。',
  `join_time` DATETIME DEFAULT NULL COMMENT '入职日期。',
  `nation` CHAR(20) DEFAULT NULL COMMENT '民族。',
  `marriage` CHAR(1) DEFAULT 0 COMMENT '婚姻情况：未婚/已婚/离异 1/2/3。',
  `id_card` CHAR(20) DEFAULT NULL COMMENT '身份证。',
  `avatar` CHAR(100) DEFAULT NULL COMMENT '头像。',
  `language` CHAR(10) DEFAULT NULL COMMENT '语言。',
  `remark` CHAR(100) DEFAULT NULL COMMENT '备注。',
  `email` CHAR(30) DEFAULT NULL COMMENT 'E-mail。',
  `phone` CHAR(30) DEFAULT NULL COMMENT '手机号。',
  `wechat` CHAR(30) DEFAULT NULL COMMENT '微信号。',
  `qq` CHAR(30) DEFAULT NULL COMMENT 'qq号。',
  `sina` CHAR(30) DEFAULT NULL COMMENT '新浪号。',
  `origin_system` CHAR(1) DEFAULT 1 COMMENT '注册来源系统：DDM 1（多系统注册用户）。',
  `origin_user` CHAR(36) DEFAULT NULL COMMENT '注册来源用户（邀友）。',
  `soft_delete` TINYINT UNSIGNED DEFAULT 1 COMMENT '记录：未删除/已删除：1/2。',
  `create_time` DATETIME NOT NULL COMMENT '创建时间。',
  `update_time` DATETIME NOT NULL COMMENT '更新时间。',
  `delete_time` DATETIME DEFAULT NULL COMMENT '删除时间。',
  KEY(sina),
  KEY(qq),
  KEY(id_card),
  KEY(employee_id),
  KEY(username),
  KEY(phone),
  KEY(email),
  PRIMARY KEY (`id`,`user_id`)
)
ENGINE=InnoDB
COMMENT '用户表'
DEFAULT CHARSET=utf8;