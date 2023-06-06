-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: fooddonationauth
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `donation_req`
--

DROP TABLE IF EXISTS `donation_req`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation_req` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `donation_id` varchar(255) DEFAULT NULL,
  `no_of_hours_after_preparation` int NOT NULL,
  `no_of_people` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  `volunteer_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_req`
--

LOCK TABLES `donation_req` WRITE;
/*!40000 ALTER TABLE `donation_req` DISABLE KEYS */;
INSERT INTO `donation_req` VALUES (1,'ich','na','503ea03c-c905-4f0d-8994-593a4e2e57b4',6,4,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(2,'ich','na','d03fdd6d-8b3c-4dae-8530-142a79c42105',6,4,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(3,'sangli','pick up as soon as possible','4b9fe679-7bf4-4e11-90ed-4273ab736840',6,4,'REJECTED',NULL,'d215d96e-deab-4134-9920-28bd52131d26',NULL),(4,'sangli','pick up now','2c344d48-3e2a-4eb6-86ca-694520cecb4b',7,6,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(5,'sangli','na','89e4916c-379c-49fb-95d4-ae721cff5d35',7,10,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(6,'sangli','na','ebd0f786-65c0-4753-a21e-1b2940b03435',7,11,'REJECTED',NULL,'d215d96e-deab-4134-9920-28bd52131d26',NULL),(7,'sangli','na','92814e03-7a88-4cdf-90ce-60a0e9e00b25',7,12,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(8,'sangli','na','985adb54-f2b7-4d60-ace6-508c7d0c0a34',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(9,'sangli','na','6e07b9a7-9434-4c67-b72b-568682292e9c',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(10,'sangli','na','b2fc31b7-d22f-4b9c-ba30-c93901407c39',7,15,'REJECTED',NULL,'d215d96e-deab-4134-9920-28bd52131d26',NULL),(11,'sangli','na','8572d3c6-5362-49cd-9db8-0e224fcb6cf5',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(12,'sangli','na','e8b024a4-23d6-4d5d-bddd-22b37d7850e2',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(13,'sangli','na','92c035e1-dd98-4f56-909d-1adc52ca8e77',7,15,'REJECTED',NULL,'d215d96e-deab-4134-9920-28bd52131d26',NULL),(14,'sangli','na','9c93bc95-e7b8-49c6-bd56-203da7cd165c',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(15,'sangli','na','bb341b7e-ce2a-4564-aef0-126a1951e82d',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(16,'sangli','na','609054b9-2e6c-4114-bf21-50c2383edbaa',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(17,'sangli','na','4cb0779d-9754-4721-a708-0521be3107a9',7,15,'REJECTED',NULL,'d215d96e-deab-4134-9920-28bd52131d26',NULL),(18,'sangli','na','bb8d318f-eedd-465f-ac1b-c16692b8074d',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(19,'sangli','na','9ed573b4-f584-49fa-820e-a8b54174b779',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(20,'sangli','na','d9861d67-8251-4190-be09-94ca17fab152',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(21,'sangli','na','19160013-e34a-4c28-a137-c957ee3e2daf',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(22,'sangli','na','e1ca72d3-2fbe-4071-aa0f-7f7a55a8654f',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(23,'sangli','na','437941fc-f6c7-43f0-963d-41f89b57fcc2',7,15,'REJECTED',NULL,'d215d96e-deab-4134-9920-28bd52131d26',NULL),(24,'sangli','na','58a52cbe-c49d-4c0e-a465-19e3b577e19d',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(25,'sangli','na','b18ea3cc-9f59-41ce-92ee-7f81e7f7ede9',7,15,'REJECTED',NULL,'d215d96e-deab-4134-9920-28bd52131d26',NULL),(26,'sangli','na','cf038bc2-1e43-4fb0-a029-40a64bf5adcf',7,15,'REJECTED',NULL,'d215d96e-deab-4134-9920-28bd52131d26',NULL),(27,'sangli','na','20505ec6-808a-4c02-b968-310f20479179',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(28,'sangli','na','c22e9429-13bc-4f2f-8ad0-109436970236',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(29,'sangli','na','4efab7a8-5eac-4b69-8777-16f788d9556b',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(30,'sangli','na','4ebac061-05f3-43da-8b48-81d26d524757',7,15,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(31,'Sangli','veg food','77d6e1da-c3fc-4f49-b57d-3f5a5abbdb4f',2,10,'COMPLETED',NULL,'d215d96e-deab-4134-9920-28bd52131d26','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(32,'Ichalkaranji','Pick early','8c455e30-a3b9-4a0a-9479-fa856733b035',5,10,'COMPLETED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(33,'Sangli','Vej food','6ac52da4-f476-47ee-9fbe-483262096cdb',1,5,'REJECTED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2',NULL),(34,'Miraj','Veg','ef2f5654-961d-47c8-a44b-14c1fab34f11',5,12,'COMPLETED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(35,'JSP','pick up','5cb3fc37-122c-4ea3-8810-cd1c004b01d3',1,4,'COMPLETED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(36,'hjg','kg','85ac9873-37e9-4f13-8b8a-5a6a1b31ca95',5,5,'COMPLETED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(37,'gbh','yhj','c9e61992-de54-4d68-a759-7f59a4e3279b',4,45,'COMPLETED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(38,'dhfbls','khglb','55ff603a-4934-43e8-b210-2ee95ecc4aa4',12,54,'COMPLETED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(39,'khv','jvk','96af2f26-432a-4547-b93e-4b69e58849bf',7,7,'COMPLETED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(40,'il','yk','8b57df55-8ded-4d07-a307-9bacadb108d9',4,4,'COMPLETED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(41,'dw','f','df8f60e1-ce3a-4963-9f66-4dfe3efeec37',12,12,'COMPLETED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(42,'efarg','rgtrgae','e8300da7-4e83-49f4-9b3c-e21f6d0bd436',12,12,'ACCEPTED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2',NULL),(43,'Pune','hlgejw','4625a75e-4b22-4e3c-a809-2641ab0941e0',4,10,'COMPLETED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2','718c3118-8d78-4514-9f3b-5d8bb16d826c'),(44,'Mumbai','wjfg','c86cb8d4-1ca6-43be-afcc-ccd1d82302d5',4,45,'ACCEPTED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2',NULL),(45,'jhk','hk','924bda24-3bf2-4b49-a3e8-6c9cdb3463d4',1,4,'ACCEPTED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2',NULL),(46,'MIRAJ','JYHDG','c098b172-91d6-4195-bd9b-400f5d9ae870',4,45,'COMPLETED',NULL,'9fd94d79-4733-417a-b08f-ff785aa915f2','63763309-43fd-4d7b-b98e-0ee2dda813ca');
/*!40000 ALTER TABLE `donation_req` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_a3imlf41l37utmxiquukk8ajc` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ph@gmail.com','p','l','$2a$10$UdclnyrQTT3WsAwkdSih9uEB3vJRRccX7JiszDZWdbcCXzosc7tfC','ROLE_USER','','d215d96e-deab-4134-9920-28bd52131d26',NULL),(2,'admin@gmail.com','admin','admin','$2a$10$0Hd.N1oTnwkboleWnZY8BOKdRiKk9vhyB3fnDGp41D5/6hITjnAl2','ROLE_ADMIN','84b2f2cf-a006-4101-8ddc-cee8a60d4420','e560c987-f99c-4d5b-9b2b-9ddacf453352',NULL),(3,'volunteer1@gmail.com','v1','l1','$2a$10$nMTkMHdBWUkwZV8NM/ZGtu3LIK6BKzVU6/MUJANShgfenEbmelIqK','ROLE_VOLUNTEER',NULL,'2c3ed339-331e-496f-89bb-fb3255dd6b7c',NULL),(4,'a@s','a','a','$2a$10$p7GVUTeo7KfiGj2D.EGOuuheNqbEItDy9y9SORVTlVwS.f/6TWzRK','ROLE_VOLUNTEER',NULL,'005fa6ec-3631-4615-9b1e-0976acbdb7cc',NULL),(5,'v2@gmail.com','v2','l2','$2a$10$R1BGTZz4OFDYSEdCK8XKe.FEF6XvqYrdTCgodPEGk9E7QSqTgNF/e','ROLE_VOLUNTEER','','718c3118-8d78-4514-9f3b-5d8bb16d826c',NULL),(6,'v3@gmail.com','v3','l3','$2a$10$l0GTUjjjszXT/OONw2x./eemkAc.6J4RYvoAXSl67r9xEsqj20Qyy','ROLE_VOLUNTEER','','63763309-43fd-4d7b-b98e-0ee2dda813ca',NULL),(7,'v4@gmail.com','v4','l4','$2a$10$WZXIumGM9IUIovz36y0Sq.ltSZgYEi2FqcgkmGlsyxZBzhAXpcHeq','ROLE_VOLUNTEER',NULL,'c46e08f0-9949-4dbb-8a56-fc96221b9b01',NULL),(8,'v5@gmail.com','v5','l5','$2a$10$VWYpeg85nu0TVYA1hKtlZubaFrFGtrFgD3bchMObRAJ/G.6fMYx7S','ROLE_VOLUNTEER',NULL,'f3ef5446-8209-4cfe-9747-e3eed3079723',NULL),(9,'rohit@gmail.com','as','sd','$2a$10$fcXyIf7hB0uBWc.LvSzzXu9ZZ0YWtkei6DitkbC0p8cwt5YmLP9fW','ROLE_USER','','9fd94d79-4733-417a-b08f-ff785aa915f2',NULL),(10,'v6@gmail.com','v6','l6','$2a$10$HrYaY9VVKcRtG8/HDi8mLO/2wr2Vbme4LR/.LPoQLN9i2X3bqZKDS','ROLE_VOLUNTEER',NULL,'7f947380-9ed1-4ee0-a982-5172621b697f',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 16:12:48
