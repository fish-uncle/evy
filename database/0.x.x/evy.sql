/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50617
Source Host           : 127.0.0.1:3306
Source Database       : evy

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2019-05-06 16:07:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for evy-app
-- ----------------------------
DROP TABLE IF EXISTS `evy-app`;
CREATE TABLE `evy-app` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id.',
  `app_id` char(36) NOT NULL COMMENT 'id.',
  `cn_title` char(30) NOT NULL COMMENT '中文标题。',
  `en_title` char(30) NOT NULL COMMENT '英文标题。',
  `version` char(30) NOT NULL COMMENT '版本。',
  `icon` text COMMENT '图标。',
  `description` text NOT NULL COMMENT '描述。',
  `update` tinyint(3) DEFAULT '0' COMMENT '强制更新：不强制/强制：0/1。',
  `associate_url` text COMMENT '关联网址',
  `soft_delete` tinyint(3) unsigned DEFAULT '0' COMMENT '记录：未删除/已删除：0/1。',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`,`app_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='应用表';

-- ----------------------------
-- Records of evy-app
-- ----------------------------
INSERT INTO `evy-app` VALUES ('1', 'c17bf4e8-a748-4cb1-a953-e9990c83f1a8', '测试应用', 'test_app', '1.0.0', null, '测试应用1号', '2', null, '0', '2019-04-18 18:40:25', '2019-05-05 20:33:04', null);

-- ----------------------------
-- Table structure for evy-auth
-- ----------------------------
DROP TABLE IF EXISTS `evy-auth`;
CREATE TABLE `evy-auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id.',
  `auth_id` char(36) NOT NULL COMMENT 'id.',
  `title` char(30) NOT NULL COMMENT '权限中文名。',
  `url` text COMMENT '链接地址。',
  `remark` text COMMENT '备注。',
  `menu` char(36) DEFAULT NULL COMMENT '所属页面。',
  `soft_delete` tinyint(3) unsigned DEFAULT '1' COMMENT '记录：未删除/已删除：1/2。',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`,`auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='功能表';

-- ----------------------------
-- Records of evy-auth
-- ----------------------------
INSERT INTO `evy-auth` VALUES ('1', '21018ee0-1d2f-4743-b070-4292d17d1cba', '添加员工', '/api/user/insert', null, '9c46e81f-6c22-4fa9-aea0-bcf5425e183a', '0', '2019-04-19 17:56:16', '2019-04-22 18:20:10', null);
INSERT INTO `evy-auth` VALUES ('2', '3eab07e8-3ebf-43ff-957c-2711379490bf', '修改员工', '/api/user/update', null, '9c46e81f-6c22-4fa9-aea0-bcf5425e183a', '0', '2019-04-30 16:21:55', '2019-04-30 16:21:55', null);
INSERT INTO `evy-auth` VALUES ('3', '2041a6e2-1aca-4ace-8d39-2bbe7cd7a7f1', '删除员工', '/api/user/delete', null, '9c46e81f-6c22-4fa9-aea0-bcf5425e183a', '0', '2019-04-30 16:23:08', '2019-04-30 16:23:08', null);
INSERT INTO `evy-auth` VALUES ('4', 'febbde72-57c8-43b3-ad5d-40b3d1d51f30', '恢复员工', '/api/user/recover', null, 'cb075873-89c8-4644-8846-e0d8ed1cd7de', '0', '2019-04-30 16:49:10', '2019-04-30 16:49:10', null);
INSERT INTO `evy-auth` VALUES ('5', '15c3a63b-a8b3-4068-8c73-8ef60fe253e7', '添加模块', '/api/module/insert', null, 'dcaaa76a-db27-4326-b86e-da0d53b2d311', '0', '2019-04-30 17:02:56', '2019-04-30 17:02:56', null);
INSERT INTO `evy-auth` VALUES ('6', '6b974b8f-c0d5-483b-83f6-f2daebeef947', '删除模块', '/api/module/delete', null, 'dcaaa76a-db27-4326-b86e-da0d53b2d311', '0', '2019-04-30 17:03:11', '2019-04-30 17:03:11', null);
INSERT INTO `evy-auth` VALUES ('7', '4c379b27-7128-4285-8515-fe5b16721a14', '更新模块', '/api/module/update', null, 'dcaaa76a-db27-4326-b86e-da0d53b2d311', '0', '2019-04-30 17:03:28', '2019-04-30 17:03:28', null);
INSERT INTO `evy-auth` VALUES ('8', '0bc745a3-31e2-4880-a16e-a85cfec3d73d', '恢复模块', '/api/module/recover', null, 'e04c6837-65ae-4040-bc7d-443068503412', '0', '2019-04-30 17:06:16', '2019-04-30 17:06:16', null);
INSERT INTO `evy-auth` VALUES ('9', 'b4008ae1-b90d-4a22-b445-270a1a67adf0', '添加应用', '/api/application/insert', null, 'a2e494bf-ee3e-4e06-8427-7c5ee2f07289', '0', '2019-04-30 17:10:10', '2019-04-30 17:10:10', null);
INSERT INTO `evy-auth` VALUES ('10', '637581e8-b409-4746-99c8-834bfa6e881b', '删除应用', '/api/application/delete', null, 'a2e494bf-ee3e-4e06-8427-7c5ee2f07289', '0', '2019-04-30 17:10:24', '2019-04-30 17:10:24', null);
INSERT INTO `evy-auth` VALUES ('11', '88b3415e-dd63-4bfc-ab14-2cbfbdfd8539', '更新应用', '/api/application/update', null, 'a2e494bf-ee3e-4e06-8427-7c5ee2f07289', '0', '2019-04-30 17:12:45', '2019-04-30 17:12:45', null);
INSERT INTO `evy-auth` VALUES ('12', '171e250d-45a7-47d4-bd83-fb81b0afb069', '恢复应用', '/api/application/recover', null, '8cba4644-374c-4de2-8901-19b40fd984a7', '0', '2019-04-30 17:15:10', '2019-04-30 17:15:10', null);
INSERT INTO `evy-auth` VALUES ('13', 'fb1499ca-1a84-4abd-998f-81f04d16bcad', '添加菜单', '/api/menu/insert', null, 'd3ed276e-dce4-4dbc-8487-5bb9047deb8a', '0', '2019-04-30 17:19:05', '2019-04-30 17:19:05', null);
INSERT INTO `evy-auth` VALUES ('14', '45c730e7-98c7-4cc4-8eba-8ef03b2358d4', '更新菜单', '/api/menu/update', null, 'd3ed276e-dce4-4dbc-8487-5bb9047deb8a', '0', '2019-04-30 17:19:27', '2019-04-30 17:19:27', null);
INSERT INTO `evy-auth` VALUES ('15', 'ac41f389-79e5-4834-903c-ba344584fcec', '删除菜单', '/api/menu/delete', null, 'd3ed276e-dce4-4dbc-8487-5bb9047deb8a', '0', '2019-04-30 17:19:50', '2019-04-30 17:19:50', null);
INSERT INTO `evy-auth` VALUES ('16', '1472b235-be9f-4e4f-91e4-9d87e82bde45', '恢复菜单', '/api/menu/recover', null, 'ca84ab2a-1c11-4733-b430-61c4f4ac777c', '0', '2019-04-30 17:20:09', '2019-04-30 17:20:09', null);
INSERT INTO `evy-auth` VALUES ('17', '77682417-3092-4f82-8ab7-95581563d202', '添加角色', '/api/role/insert', null, '682056a3-7b39-46e6-8d88-3b847d1c8cdc', '0', '2019-04-30 17:20:36', '2019-04-30 17:20:36', null);
INSERT INTO `evy-auth` VALUES ('18', '6459959e-3c1c-43d9-81f8-996f767cbd34', '更新角色', '/api/role/update', null, '682056a3-7b39-46e6-8d88-3b847d1c8cdc', '0', '2019-04-30 17:20:54', '2019-04-30 17:20:54', null);
INSERT INTO `evy-auth` VALUES ('19', '723c62e7-7758-4e20-a293-0ea96de2bb3f', '删除角色', '/api/role/delete', null, '682056a3-7b39-46e6-8d88-3b847d1c8cdc', '0', '2019-04-30 17:21:10', '2019-04-30 17:21:10', null);
INSERT INTO `evy-auth` VALUES ('20', '70592bc1-90ae-4b52-89c4-1af0dd5ee51f', '恢复角色', '/api/role/recover', null, '97cbcd4d-6b97-42c2-8bd7-2c20f91136db', '0', '2019-04-30 17:21:43', '2019-04-30 17:21:43', null);
INSERT INTO `evy-auth` VALUES ('21', 'efd9748a-1ad9-404d-a1fd-2b9344f1bf67', '添加权限', '/api/auth/insert', null, '38ff3475-ea45-48ba-87c1-83dcb6350b61', '0', '2019-04-30 17:23:09', '2019-04-30 17:23:09', null);
INSERT INTO `evy-auth` VALUES ('22', '85fc8e34-3512-44a5-bf67-a7141a8ae347', '更新权限', '/api/auth/update', null, '38ff3475-ea45-48ba-87c1-83dcb6350b61', '0', '2019-04-30 17:23:31', '2019-04-30 17:23:31', null);
INSERT INTO `evy-auth` VALUES ('23', 'ae2e3abe-34fb-45e2-b34d-a96567caf16c', '删除权限', '/api/auth/delete', null, '38ff3475-ea45-48ba-87c1-83dcb6350b61', '0', '2019-04-30 17:23:49', '2019-04-30 17:23:49', null);
INSERT INTO `evy-auth` VALUES ('24', 'f32f0e9f-ab6c-4cb0-9cbd-22c306c651da', '恢复权限', '/api/auth/recover', null, 'd3034942-ffd3-4763-bfbd-a3577ce9ee13', '0', '2019-04-30 17:24:09', '2019-04-30 17:24:09', null);
INSERT INTO `evy-auth` VALUES ('25', '92334cdb-fd5b-41f7-a262-f1eb0e9b1a3c', '更新左侧栏权限', '/api/power/update/menu', null, '878e2601-6267-45ea-b784-2f199e2afb8a', '0', '2019-04-30 17:25:10', '2019-04-30 17:25:10', null);
INSERT INTO `evy-auth` VALUES ('26', '3127c753-270e-46ed-87ca-ef1020711bc6', '更新页面内部权限', '/api/power/update/auth', null, '878e2601-6267-45ea-b784-2f199e2afb8a', '0', '2019-04-30 17:25:31', '2019-04-30 17:25:31', null);
INSERT INTO `evy-auth` VALUES ('27', '3801db70-852c-47b9-b3c2-40ae0fd21008', '恢复H5', '/api/h5/recover', null, 'd7c167bf-cb9c-428c-8fe7-718988976a57', '0', '2019-04-30 18:27:50', '2019-04-30 18:27:50', null);
INSERT INTO `evy-auth` VALUES ('28', 'afa30927-ff9b-4b49-b58f-944525cd9919', '添加H5', '/api/h5/insert', null, 'e44e156c-3fce-4076-a74a-6ce51a92c869', '0', '2019-04-30 18:28:20', '2019-04-30 18:28:20', null);
INSERT INTO `evy-auth` VALUES ('29', '90c08e95-1f92-469f-bfde-061d72005528', '更新H5', '/api/h5/update', null, 'e44e156c-3fce-4076-a74a-6ce51a92c869', '0', '2019-04-30 18:28:54', '2019-04-30 18:28:54', null);
INSERT INTO `evy-auth` VALUES ('30', '4af3663c-e799-436a-af93-3d3bea495cc5', '删除H5', '/api/h5/delete', null, 'e44e156c-3fce-4076-a74a-6ce51a92c869', '0', '2019-04-30 18:29:14', '2019-04-30 18:29:14', null);

-- ----------------------------
-- Table structure for evy-h5
-- ----------------------------
DROP TABLE IF EXISTS `evy-h5`;
CREATE TABLE `evy-h5` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id.',
  `h5_id` char(36) NOT NULL COMMENT 'id.',
  `name` char(30) NOT NULL COMMENT '名称。',
  `title` char(30) NOT NULL COMMENT '网页标题。',
  `version` char(30) NOT NULL COMMENT '版本。',
  `description` text NOT NULL COMMENT '描述。',
  `put` tinyint(3) DEFAULT '0' COMMENT '上架：未上架/已上架：0/1。',
  `env` char(30) NOT NULL COMMENT '环境：测试环境/本地环境/开发环境/生产环境:test/local/dev/prod',
  `js_url` text COMMENT 'js',
  `css_url` text COMMENT 'css',
  `soft_delete` tinyint(3) unsigned DEFAULT '0' COMMENT '记录：未删除/已删除：0/1。',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`,`h5_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='H5表';

-- ----------------------------
-- Records of evy-h5
-- ----------------------------
INSERT INTO `evy-h5` VALUES ('1', 'f06b7e49-ec00-43f8-937c-0484cd8f48dd', '测试H5', '测试H5', '1.0.0', '这是一个描述文本', '1', 'prod', 'http://www.cdn.com/test.js', 'http://www.cdn.com/test.css', '0', '2019-04-30 18:32:27', '2019-05-05 20:24:22', null);

-- ----------------------------
-- Table structure for evy-menu
-- ----------------------------
DROP TABLE IF EXISTS `evy-menu`;
CREATE TABLE `evy-menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id.',
  `menu_id` char(36) NOT NULL COMMENT 'id.',
  `title` char(30) NOT NULL COMMENT '标题。',
  `icon` char(30) DEFAULT NULL COMMENT '图标。',
  `url` text,
  `type` tinyint(3) unsigned DEFAULT '1' COMMENT '跳转类型：内部/外部 ：1/2',
  `display` tinyint(3) DEFAULT '0' COMMENT '菜单显示问题：显示/隐藏 1/0。',
  `sort` char(30) DEFAULT NULL COMMENT '排序。',
  `nexus` char(36) DEFAULT NULL,
  `soft_delete` tinyint(3) unsigned DEFAULT '0' COMMENT '记录：未删除/已删除：0/1。',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`,`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Records of evy-menu
-- ----------------------------
INSERT INTO `evy-menu` VALUES ('1', '06ec7f5c-091d-4d84-8e5c-360a2822a891', '仪表盘', 'dashboard', '/', '1', '1', '1', null, '0', '2019-03-22 14:23:34', '2019-04-30 16:41:12', null);
INSERT INTO `evy-menu` VALUES ('2', '9c46e81f-6c22-4fa9-aea0-bcf5425e183a', '员工列表', 'user', '/user', '1', '1', '2', null, '0', '2019-03-22 14:24:00', '2019-04-30 16:41:18', null);
INSERT INTO `evy-menu` VALUES ('3', '2920641f-7e52-4537-9545-7b9180e85afc', '应用列表', 'apple', '/app', '1', '1', '3', 'a2e494bf-ee3e-4e06-8427-7c5ee2f07289', '0', '2019-04-17 14:24:00', '2019-04-30 16:41:21', null);
INSERT INTO `evy-menu` VALUES ('4', 'dcaaa76a-db27-4326-b86e-da0d53b2d311', '模块列表', 'appstore', '/module', '1', '1', '3', 'a2e494bf-ee3e-4e06-8427-7c5ee2f07289', '0', '2019-04-17 14:24:00', '2019-04-30 16:41:34', null);
INSERT INTO `evy-menu` VALUES ('5', 'bb49372a-c137-478f-9cc6-72f7b9c366d0', '示例列表', 'book', null, '1', '1', '5', null, '0', '2019-04-17 14:24:00', '2019-04-30 16:41:52', null);
INSERT INTO `evy-menu` VALUES ('6', 'a7c4a88c-b8dc-4252-bfd9-160cae6dcae8', '403页面', 'book', '/403', '1', '1', '5', 'bb49372a-c137-478f-9cc6-72f7b9c366d0', '0', '2019-04-17 14:24:00', '2019-04-30 16:41:57', null);
INSERT INTO `evy-menu` VALUES ('7', '673ac57f-236a-4946-9061-653c43602f87', '404页面', 'book', '/404', '1', '1', '5', 'bb49372a-c137-478f-9cc6-72f7b9c366d0', '0', '2019-04-17 14:24:00', '2019-04-30 16:42:01', null);
INSERT INTO `evy-menu` VALUES ('8', '28fabe27-c415-412b-b108-98fee738749f', '500页面', 'book', '/500', '1', '1', '5', 'bb49372a-c137-478f-9cc6-72f7b9c366d0', '0', '2019-04-17 14:24:00', '2019-04-30 16:42:08', null);
INSERT INTO `evy-menu` VALUES ('9', 'a8039d68-53a8-459d-8874-88191a1ec14f', '关于开发者', 'github', 'https://github.com/fish-uncle/evy', '2', '1', '99', null, '0', '2019-04-17 14:24:00', '2019-04-30 16:42:15', null);
INSERT INTO `evy-menu` VALUES ('10', 'd3ed276e-dce4-4dbc-8487-5bb9047deb8a', '菜单列表', 'database', '/menu', '1', '1', '6', '419d6315-10b8-4ef8-a170-9da4a26c663e', '0', '2019-04-17 14:24:00', '2019-04-30 16:42:30', null);
INSERT INTO `evy-menu` VALUES ('11', '419d6315-10b8-4ef8-a170-9da4a26c663e', '系统设置', 'setting', null, '1', '1', '6', null, '0', '2019-04-17 14:24:00', '2019-04-30 16:42:18', null);
INSERT INTO `evy-menu` VALUES ('12', 'a2e494bf-ee3e-4e06-8427-7c5ee2f07289', '应用管理', 'apple', null, '1', '1', '3', null, '0', '2019-04-17 14:24:00', '2019-04-30 16:41:39', null);
INSERT INTO `evy-menu` VALUES ('13', 'e44e156c-3fce-4076-a74a-6ce51a92c869', 'H5列表', 'apple', '/h5', '1', '1', '3', 'a2e494bf-ee3e-4e06-8427-7c5ee2f07289', '0', '2019-04-17 14:24:00', '2019-04-30 16:41:44', null);
INSERT INTO `evy-menu` VALUES ('14', 'c118f311-c956-4fd3-a0c9-059c162fdcd2', 'Example页面', 'book', '/example', '1', '1', '5', 'bb49372a-c137-478f-9cc6-72f7b9c366d0', '0', '2019-04-18 14:24:00', '2019-04-30 16:41:49', null);
INSERT INTO `evy-menu` VALUES ('15', '682056a3-7b39-46e6-8d88-3b847d1c8cdc', '角色列表', 'setting', '/role', '1', '1', '6', '419d6315-10b8-4ef8-a170-9da4a26c663e', '0', '2019-04-19 15:34:33', '2019-04-30 16:42:26', null);
INSERT INTO `evy-menu` VALUES ('16', '38ff3475-ea45-48ba-87c1-83dcb6350b61', '权限列表', 'setting', '/auth', '1', '1', '6', '419d6315-10b8-4ef8-a170-9da4a26c663e', '0', '2019-04-19 17:37:20', '2019-04-30 16:42:21', null);
INSERT INTO `evy-menu` VALUES ('17', '878e2601-6267-45ea-b784-2f199e2afb8a', '授权管理', 'setting', '/power', '1', '1', '6', '419d6315-10b8-4ef8-a170-9da4a26c663e', '0', '2019-04-19 18:05:46', '2019-04-30 16:42:11', null);
INSERT INTO `evy-menu` VALUES ('18', 'cb075873-89c8-4644-8846-e0d8ed1cd7de', '员工列表-回收站', null, '/user/recovery', '1', '0', null, '23a5a339-7576-415d-b3f6-d56467cb55e8', '0', '2019-04-30 16:46:42', '2019-04-30 17:08:59', null);
INSERT INTO `evy-menu` VALUES ('19', 'e04c6837-65ae-4040-bc7d-443068503412', '模块列表-回收站', null, '/module/recovery', '1', '0', null, '23a5a339-7576-415d-b3f6-d56467cb55e8', '0', '2019-04-30 17:05:52', '2019-04-30 17:09:04', null);
INSERT INTO `evy-menu` VALUES ('20', '23a5a339-7576-415d-b3f6-d56467cb55e8', '回收站', null, '/recovery', '1', '0', null, null, '0', '2019-04-30 17:08:35', '2019-04-30 17:08:35', null);
INSERT INTO `evy-menu` VALUES ('21', '8cba4644-374c-4de2-8901-19b40fd984a7', '应用列表-回收站', null, '/app/recovery', '1', '0', null, '23a5a339-7576-415d-b3f6-d56467cb55e8', '0', '2019-04-30 17:14:34', '2019-04-30 17:14:34', null);
INSERT INTO `evy-menu` VALUES ('22', 'ca84ab2a-1c11-4733-b430-61c4f4ac777c', '菜单列表-回收站', null, '/menu/recovery', '1', '0', null, '23a5a339-7576-415d-b3f6-d56467cb55e8', '0', '2019-04-30 17:17:42', '2019-04-30 17:17:42', null);
INSERT INTO `evy-menu` VALUES ('23', '97cbcd4d-6b97-42c2-8bd7-2c20f91136db', '角色列表-回收站', null, '/role/recovery', '1', '0', null, '23a5a339-7576-415d-b3f6-d56467cb55e8', '0', '2019-04-30 17:18:16', '2019-04-30 17:18:16', null);
INSERT INTO `evy-menu` VALUES ('24', 'd3034942-ffd3-4763-bfbd-a3577ce9ee13', '权限列表-回收站', null, '/auth/recovery', '1', '0', null, '23a5a339-7576-415d-b3f6-d56467cb55e8', '0', '2019-04-30 17:22:34', '2019-04-30 17:22:34', null);
INSERT INTO `evy-menu` VALUES ('25', 'd7c167bf-cb9c-428c-8fe7-718988976a57', 'H5列表-回收站', null, '/h5/recovery', '1', '0', null, '23a5a339-7576-415d-b3f6-d56467cb55e8', '0', '2019-04-30 18:23:17', '2019-04-30 18:23:17', null);

-- ----------------------------
-- Table structure for evy-module
-- ----------------------------
DROP TABLE IF EXISTS `evy-module`;
CREATE TABLE `evy-module` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id.',
  `module_id` char(36) NOT NULL COMMENT 'id.',
  `cn_title` char(30) NOT NULL COMMENT '中文标题。',
  `en_title` char(30) NOT NULL COMMENT '英文标题。',
  `description` text NOT NULL COMMENT '描述。',
  `content` text COMMENT '富文本内容。',
  `app` char(36) NOT NULL COMMENT '所属应用。',
  `put` tinyint(3) DEFAULT '0' COMMENT '上架：未上架/已上架：0/1。',
  `label` text COMMENT '标签。',
  `timing` tinyint(3) DEFAULT '0' COMMENT '是否是定时活动：不是/是：0/1',
  `soft_delete` tinyint(3) unsigned DEFAULT '0' COMMENT '记录：未删除/已删除：0/1。',
  `start_time` datetime DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`,`module_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='模块表';

-- ----------------------------
-- Records of evy-module
-- ----------------------------
INSERT INTO `evy-module` VALUES ('1', '4933e130-4d52-40d1-bab1-6414ee4548e0', '测试模块', 'test_module', '测试模块1号', null, 'c17bf4e8-a748-4cb1-a953-e9990c83f1a8', '1', '', '1', '0', '2019-04-04 14:33:29', '2019-04-20 14:33:31', '2019-04-19 14:28:25', '2019-05-05 20:08:21', null);
INSERT INTO `evy-module` VALUES ('2', '4f9dd848-fe0a-4c37-99bb-ff69b576c1ce', '测试模式——2', 'test_module2', '测试魔块2号', null, 'c17bf4e8-a748-4cb1-a953-e9990c83f1a8', '0', '', '0', '0', '2019-04-30 16:58:40', '2019-04-30 16:58:48', '2019-04-19 14:36:16', '2019-05-06 10:26:17', null);

-- ----------------------------
-- Table structure for evy-role
-- ----------------------------
DROP TABLE IF EXISTS `evy-role`;
CREATE TABLE `evy-role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id.',
  `role_id` char(36) NOT NULL COMMENT 'id.',
  `title` char(10) NOT NULL COMMENT '角色名。',
  `soft_delete` tinyint(3) unsigned DEFAULT '1' COMMENT '记录：未删除/已删除：1/2。',
  `admin` char(1) DEFAULT '2' COMMENT '是否是管理员：是/否：1/2。',
  `create_time` datetime NOT NULL COMMENT '创建时间。',
  `update_time` datetime NOT NULL COMMENT '更新时间。',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间。',
  PRIMARY KEY (`id`,`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='权限角色表';

-- ----------------------------
-- Records of evy-role
-- ----------------------------
INSERT INTO `evy-role` VALUES ('1', '648f4bb7-8147-4a49-b042-4f32da30c893', '开发者', '0', '0', '2019-04-19 16:03:45', '2019-05-06 10:54:59', null);
INSERT INTO `evy-role` VALUES ('2', '2fc0fcbc-2cf2-40f7-8893-ef6b270b0b36', '管理员', '0', '1', '2019-04-19 16:23:37', '2019-05-06 10:54:55', null);
INSERT INTO `evy-role` VALUES ('3', 'c26e5dd0-ae17-4eb1-b1a4-0dcb69d0b055', '观察者', '0', '0', '2019-04-19 16:24:28', '2019-05-06 10:54:52', null);
INSERT INTO `evy-role` VALUES ('4', '9b9b44b1-4058-4e21-a5df-91929380baab', '报告者', '0', '0', '2019-04-19 16:24:40', '2019-05-06 10:54:48', null);

-- ----------------------------
-- Table structure for evy-role-auth
-- ----------------------------
DROP TABLE IF EXISTS `evy-role-auth`;
CREATE TABLE `evy-role-auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id.',
  `auth` char(36) NOT NULL COMMENT 'auth_id.',
  `role` char(36) NOT NULL COMMENT 'role_id.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='功能权限关联表';

-- ----------------------------
-- Records of evy-role-auth
-- ----------------------------
INSERT INTO `evy-role-auth` VALUES ('1', '90c08e95-1f92-469f-bfde-061d72005528', '9b9b44b1-4058-4e21-a5df-91929380baab');

-- ----------------------------
-- Table structure for evy-role-menu
-- ----------------------------
DROP TABLE IF EXISTS `evy-role-menu`;
CREATE TABLE `evy-role-menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id.',
  `menu` char(36) NOT NULL COMMENT 'menu_id.',
  `role` char(36) NOT NULL COMMENT 'role_id.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='菜单权限关联表';

-- ----------------------------
-- Records of evy-role-menu
-- ----------------------------
INSERT INTO `evy-role-menu` VALUES ('2', '06ec7f5c-091d-4d84-8e5c-360a2822a891', '9b9b44b1-4058-4e21-a5df-91929380baab');
INSERT INTO `evy-role-menu` VALUES ('3', '9c46e81f-6c22-4fa9-aea0-bcf5425e183a', '9b9b44b1-4058-4e21-a5df-91929380baab');

-- ----------------------------
-- Table structure for evy-user
-- ----------------------------
DROP TABLE IF EXISTS `evy-user`;
CREATE TABLE `evy-user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id.',
  `user_id` char(36) NOT NULL COMMENT 'id.',
  `employee_id` char(10) NOT NULL COMMENT '工号。',
  `username` char(30) NOT NULL COMMENT '用户名。',
  `password` char(50) NOT NULL COMMENT '密码。',
  `nick_name` char(30) DEFAULT NULL COMMENT '昵称。',
  `job_name` char(30) DEFAULT NULL COMMENT '职称。',
  `real_name` char(30) NOT NULL COMMENT '真实姓名。',
  `sex` tinyint(3) DEFAULT '1' COMMENT '性别：男/女 1/2。',
  `pay` char(10) DEFAULT NULL COMMENT '薪酬。',
  `type` tinyint(3) DEFAULT '0' COMMENT '用户类别。',
  `role` char(36) DEFAULT NULL COMMENT '用户角色。',
  `station` tinyint(3) DEFAULT '0' COMMENT '用户岗位。',
  `status` tinyint(3) unsigned DEFAULT '1' COMMENT '用户状态：可用/禁用 1/0。',
  `quit` tinyint(3) unsigned DEFAULT '1' COMMENT '用户状态：在岗/离职 1/2。',
  `birth_time` datetime DEFAULT NULL COMMENT '出生日期。',
  `join_time` datetime DEFAULT NULL COMMENT '入职日期。',
  `nation` char(20) DEFAULT NULL COMMENT '民族。',
  `marriage` tinyint(3) DEFAULT '1' COMMENT '婚姻情况：未婚/已婚/离异 1/2/3。',
  `native_address` text COMMENT '籍贯。',
  `native_address_detail` text COMMENT '籍贯-详细地址。',
  `bank_address` text COMMENT '银行开户行。',
  `bank_card` char(40) DEFAULT NULL COMMENT '银行卡。',
  `id_card` char(20) DEFAULT NULL COMMENT '身份证。',
  `avatar` text COMMENT '头像。',
  `language` char(10) DEFAULT NULL COMMENT '语言。',
  `remark` text COMMENT '备注。',
  `email` char(30) DEFAULT NULL COMMENT 'E-mail。',
  `phone` char(30) DEFAULT NULL COMMENT '手机号。',
  `wechat` char(30) DEFAULT NULL COMMENT '微信号。',
  `qq` char(30) DEFAULT NULL COMMENT 'qq号。',
  `sina` char(30) DEFAULT NULL COMMENT '新浪号。',
  `origin_system` char(1) DEFAULT '1' COMMENT '注册来源系统：evy 1（多系统注册用户）。',
  `origin_user` char(36) DEFAULT NULL COMMENT '注册来源用户（邀友）。',
  `soft_delete` tinyint(3) unsigned DEFAULT '0' COMMENT '记录：未删除/已删除：0/1。',
  `create_time` datetime NOT NULL COMMENT '创建时间。',
  `update_time` datetime NOT NULL COMMENT '更新时间。',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间。',
  PRIMARY KEY (`id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='员工表';

-- ----------------------------
-- Records of evy-user
-- ----------------------------
INSERT INTO `evy-user` VALUES ('1', 'd3e934a2-df71-4673-be53-fb1ac7b8dfb8', 'T0001', '', '12fd5a8786005d13ffec89035674ff1a', null, null, '张三', '2', '3420', '0', '648f4bb7-8147-4a49-b042-4f32da30c893', '0', '1', '1', '2009-03-22 17:58:39', '2019-03-22 17:58:07', '汉族', '1', '', null, null, null, null, null, null, null, 'test@163.com', '13964445123', null, null, null, '1', null, '0', '2019-03-22 16:54:31', '2019-04-19 16:20:10', null);
INSERT INTO `evy-user` VALUES ('2', 'c7d9dcbe-5c67-4c7c-a0ce-513e6b45dba7', 'T0002', '', '12fd5a8786005d13ffec89035674ff1a', null, null, '赵武', '2', '3200', '0', '2fc0fcbc-2cf2-40f7-8893-ef6b270b0b36', '0', '0', '1', '2004-03-22 17:58:46', '2019-03-22 17:58:05', '汉族', '1', null, null, null, null, null, null, null, null, 'admin@163.com', '15367945313', null, null, null, '1', null, '0', '2019-03-22 17:53:54', '2019-05-06 10:12:03', null);
INSERT INTO `evy-user` VALUES ('3', 'e5885e9a-6dfa-4082-8e98-ff9a4f7703d3', 'T0003', '', '12fd5a8786005d13ffec89035674ff1a', null, null, '李希', '1', '3590', '0', '648f4bb7-8147-4a49-b042-4f32da30c893', '0', '1', '1', '1999-03-22 17:50:58', '2019-03-22 17:50:58', '汉族', '1', '浙江省,杭州市,下城区', null, 'xx银行', '0000000000000000', null, null, null, null, '5@163.com', '18868945733', null, null, null, '1', null, '0', '2019-03-22 17:50:58', '2019-04-19 16:20:04', null);
