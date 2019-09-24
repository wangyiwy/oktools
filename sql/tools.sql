/*
 Navicat Premium Data Transfer

 Source Server         : pgsql-localhost
 Source Server Type    : PostgreSQL
 Source Server Version : 110002
 Source Host           : localhost:5432
 Source Catalog        : oktools
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 110002
 File Encoding         : 65001

 Date: 24/09/2019 12:51:40
*/


-- ----------------------------
-- Table structure for tools
-- ----------------------------
DROP TABLE IF EXISTS "public"."tools";
CREATE TABLE "public"."tools" (
  "path" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "icon" varchar(255) COLLATE "pg_catalog"."default",
  "category" int2 NOT NULL DEFAULT 0,
  "usage_count" int4 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Records of tools
-- ----------------------------
INSERT INTO "public"."tools" VALUES ('/json2yaml', 'JSON/YAML转换', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/json2go', 'JSON转Go Struct', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/unicode', 'Unicode编码转换', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/url', 'URL编码解码', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/hash', 'Hash计算', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/morse', '摩斯电码', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/number', '进制转换', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/websocket', 'WebSocket测试', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/timestamp', 'Unix时间戳', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/regex', '正则表达式测试', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/qrcode', '二维码制作', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/ip', 'IP地址信息', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/file-hash', '文件Hash计算', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/rsa', 'RSA加密解密', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/des', 'DES加密解密', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/aes', 'AES加密解密', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/color', '颜色值转换', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/image2base64', '图片Base64编码', '', 0, 0);
INSERT INTO "public"."tools" VALUES ('/base64', 'Base64编码解码', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/json', 'JSON格式化', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/placeholder', 'SVG占位图', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/tinyimg', '图片压缩', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/json2xml', 'JSON/XML转换', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/clocks', 'CSS时钟', NULL, 0, 0);
INSERT INTO "public"."tools" VALUES ('/pdf2img', 'PDF转图片', NULL, 0, 0);

-- ----------------------------
-- Primary Key structure for table tools
-- ----------------------------
ALTER TABLE "public"."tools" ADD CONSTRAINT "tools_pkey" PRIMARY KEY ("path");
