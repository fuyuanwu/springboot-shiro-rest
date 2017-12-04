-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 192.168.6.119    Database: pobo_mhall
-- ------------------------------------------------------
-- Server version	5.7.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_apply`
--

DROP TABLE IF EXISTS `t_apply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_apply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apply_define_instance_id` int(11) NOT NULL COMMENT '业务申请定义id',
  `apply_name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '业务申请中文名称',
  `apply_code` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '业务申请编码',
  `user_name` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '用户名称',
  `user_card_id` varchar(18) COLLATE utf8_bin DEFAULT NULL COMMENT '用户身份证号码',
  `user_phone_num` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '用户手机号码',
  `extends_json` longtext COLLATE utf8_bin COMMENT 't_apply_extends表的json格式字符串',
  `audit_result` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '审核结果。success（通过），failure（不同）',
  `deal_result` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '处理结果。success（通过），failure（不同）',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='掌厅业务申请表（存放一些公用的信息，还有extends表，用行的方式来存储信息）';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_apply`
--

LOCK TABLES `t_apply` WRITE;
/*!40000 ALTER TABLE `t_apply` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_apply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_apply_define`
--

DROP TABLE IF EXISTS `t_apply_define`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_apply_define` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `define_name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '视频验证的业务中文名称',
  `define_code` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '视频验证的业务编码',
  `funtion_list` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '视频功能列表',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='视频见证业务定义';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_apply_define`
--

LOCK TABLES `t_apply_define` WRITE;
/*!40000 ALTER TABLE `t_apply_define` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_apply_define` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_apply_define_instance`
--

DROP TABLE IF EXISTS `t_apply_define_instance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_apply_define_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `define_name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '视频验证的业务中文名称',
  `define_code` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '视频验证的业务编码',
  `funtion_list` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '视频功能列表',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='视频见证业务定义';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_apply_define_instance`
--

LOCK TABLES `t_apply_define_instance` WRITE;
/*!40000 ALTER TABLE `t_apply_define_instance` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_apply_define_instance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_apply_extends`
--

DROP TABLE IF EXISTS `t_apply_extends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_apply_extends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apply_define_id` int(11) NOT NULL COMMENT '业务申请定义id',
  `apply_id` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '业务申请id',
  `key` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '字段名称',
  `value` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '字段值',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `index_apply_id` (`apply_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='掌厅业务申请扩展表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_apply_extends`
--

LOCK TABLES `t_apply_extends` WRITE;
/*!40000 ALTER TABLE `t_apply_extends` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_apply_extends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_code`
--

DROP TABLE IF EXISTS `t_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '字典分组',
  `name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '字典中文名称',
  `code` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '字典名称',
  `value` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '字典值',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `pk_group_key` (`group`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='代码表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_code`
--

LOCK TABLES `t_code` WRITE;
/*!40000 ALTER TABLE `t_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_ocr_result`
--

DROP TABLE IF EXISTS `t_ocr_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_ocr_result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ocr_token` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '进行ocr用到的token',
  `name` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '身仹证姓名',
  `card_id` varchar(18) COLLATE utf8_bin NOT NULL COMMENT '身仹证号码',
  `real_img` longtext COLLATE utf8_bin COMMENT '活体检测实景图Base64编码',
  `textured_img` longtext COLLATE utf8_bin COMMENT '公安网纹图Base64编码',
  `idcard_img` longtext COLLATE utf8_bin COMMENT '身仹证正面图Base64编码',
  `idcard_img_back` longtext COLLATE utf8_bin COMMENT '身仹证反面图Base64编码',
  `bankcard_no` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '银行卡号',
  `bank_name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '发卡行',
  `bank_card_type` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '卡类型',
  `bank_card_img` longtext COLLATE utf8_bin COMMENT '银行卡正面图Base64编码',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `index_cid` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='身份证OCR';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_ocr_result`
--

LOCK TABLES `t_ocr_result` WRITE;
/*!40000 ALTER TABLE `t_ocr_result` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_ocr_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_ocr_token`
--

DROP TABLE IF EXISTS `t_ocr_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_ocr_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ocr_token` varchar(45) COLLATE utf8_bin NOT NULL COMMENT 'ocr认证的token',
  `ocr_status` varchar(45) COLLATE utf8_bin NOT NULL COMMENT 'ocr识别状态。token_created（toekn已创建ocr未完成）、ocr_finished_success（ocr已完成且成功）、ocr_finished_failure（ocr已完成且失败）',
  `ocr_failure_code` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '失败编码',
  `ocr_failure_context` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '失败原因',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `index_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='ocr认证的token';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_ocr_token`
--

LOCK TABLES `t_ocr_token` WRITE;
/*!40000 ALTER TABLE `t_ocr_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_ocr_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_sys_permission`
--

DROP TABLE IF EXISTS `t_sys_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_sys_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '权限名称',
  `resource_type` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '资源类型',
  `parent_id` int(11) DEFAULT NULL COMMENT '父编号',
  `parent_ids` varchar(1000) COLLATE utf8_bin DEFAULT NULL COMMENT '父编号列表',
  `available` char(1) COLLATE utf8_bin DEFAULT NULL COMMENT '是否可用',
  `permission` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '权限字符串',
  `url` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '资源访问地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='权限表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_sys_permission`
--

LOCK TABLES `t_sys_permission` WRITE;
/*!40000 ALTER TABLE `t_sys_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_sys_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_sys_role`
--

DROP TABLE IF EXISTS `t_sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '角色名称',
  `description` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '角色描述',
  `available` char(1) COLLATE utf8_bin DEFAULT NULL COMMENT '是否可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_sys_role`
--

LOCK TABLES `t_sys_role` WRITE;
/*!40000 ALTER TABLE `t_sys_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_sys_role_permission`
--

DROP TABLE IF EXISTS `t_sys_role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_sys_role_permission` (
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  KEY `fk_t_sys_role_permission_t_sys_permission` (`permission_id`),
  KEY `fk_t_sys_role_permission_t_sys_role` (`role_id`),
  CONSTRAINT `FK74t6b2m3hvcypexhkuinaiu2k` FOREIGN KEY (`permission_id`) REFERENCES `t_sys_permission` (`id`),
  CONSTRAINT `FKbqr2ew547n1y29pyhbm5rmqyj` FOREIGN KEY (`role_id`) REFERENCES `t_sys_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色权限关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_sys_role_permission`
--

LOCK TABLES `t_sys_role_permission` WRITE;
/*!40000 ALTER TABLE `t_sys_role_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_sys_role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_sys_user_role`
--

DROP TABLE IF EXISTS `t_sys_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_sys_user_role` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  KEY `fk_t_sys_user_role_t_sys_role` (`role_id`),
  KEY `fk_t_sys_user_role_t_user` (`id`),
  CONSTRAINT `FKaptt5ab0rnk00ollx1swx8smk` FOREIGN KEY (`id`) REFERENCES `t_user` (`id`),
  CONSTRAINT `FKl2o4hxlyp8d0nt2guqsu1qssr` FOREIGN KEY (`role_id`) REFERENCES `t_sys_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_sys_user_role`
--

LOCK TABLES `t_sys_user_role` WRITE;
/*!40000 ALTER TABLE `t_sys_user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_sys_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL,
  `login_name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '登陆名',
  `name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '用户名称',
  `password` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '密码',
  `salt` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '加密密码用的盐',
  `state` int(11) DEFAULT NULL COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`login_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户登陆信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user`
--

LOCK TABLES `t_user` WRITE;
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` VALUES (1,'admin','管理员','c6243b8ce0f766297904643924afe928','1013167e945533aa9851bf98830ab0c2',1);
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-04 15:47:07
