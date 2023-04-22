-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: studystacks
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `careers`
--

DROP TABLE IF EXISTS `careers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `careers` (
  `career_id` int NOT NULL AUTO_INCREMENT,
  `university_id` int DEFAULT NULL,
  `career_name` varchar(255) DEFAULT NULL,
  `career_description` text,
  PRIMARY KEY (`career_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `careers`
--

LOCK TABLES `careers` WRITE;
/*!40000 ALTER TABLE `careers` DISABLE KEYS */;
INSERT INTO `careers` VALUES (1,1,'Ingenieria en sistemas de informacion',NULL),(2,1,'Ingenieria electronica',NULL),(3,1,'Ingenieria civil',NULL),(4,2,'Ingenieria en computacion',NULL),(5,2,'Arquitectura',NULL);
/*!40000 ALTER TABLE `careers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `section_id` int NOT NULL,
  PRIMARY KEY (`chat_id`),
  KEY `section_id` (`section_id`),
  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (1,1),(2,3),(3,4);
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_text` text NOT NULL,
  `creation_date` datetime NOT NULL,
  `creator_user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commissions`
--

DROP TABLE IF EXISTS `commissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commissions` (
  `commission_id` int NOT NULL AUTO_INCREMENT,
  `career_id` int DEFAULT NULL,
  `commission_name` varchar(255) DEFAULT NULL,
  `commission_description` text,
  PRIMARY KEY (`commission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commissions`
--

LOCK TABLES `commissions` WRITE;
/*!40000 ALTER TABLE `commissions` DISABLE KEYS */;
INSERT INTO `commissions` VALUES (1,1,'1K01',NULL),(2,1,'1K02',NULL),(3,1,'1K03',NULL),(4,1,'1K04',NULL),(5,1,'1K05',NULL);
/*!40000 ALTER TABLE `commissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communities`
--

DROP TABLE IF EXISTS `communities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `communities` (
  `community_id` int NOT NULL AUTO_INCREMENT,
  `community_name` varchar(255) NOT NULL,
  `community_description` text NOT NULL,
  `creation_date` datetime NOT NULL,
  `creator_user_id` int NOT NULL,
  `university_id` int DEFAULT NULL,
  `career_id` int DEFAULT NULL,
  `commission_id` int DEFAULT NULL,
  PRIMARY KEY (`community_id`),
  KEY `creator_user_id` (`creator_user_id`),
  CONSTRAINT `communities_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communities`
--

LOCK TABLES `communities` WRITE;
/*!40000 ALTER TABLE `communities` DISABLE KEYS */;
INSERT INTO `communities` VALUES (1,'UTN - Fisica II','Aqui podras ver los materiales necesarios para Fisica II en la UTN FRT','2023-04-06 00:00:00',1,NULL,NULL,NULL),(2,'Fisica 2','Fisica 2 de la comision 1K01','2023-04-21 21:04:00',2,NULL,NULL,NULL),(3,'Analisis matematico I','Analisis matematico I de la comision 1K01','2023-04-21 21:06:08',2,1,1,1);
/*!40000 ALTER TABLE `communities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communities_users`
--

DROP TABLE IF EXISTS `communities_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `communities_users` (
  `communities_users_id` int NOT NULL AUTO_INCREMENT,
  `community_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `entry_date` datetime NOT NULL,
  PRIMARY KEY (`communities_users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communities_users`
--

LOCK TABLES `communities_users` WRITE;
/*!40000 ALTER TABLE `communities_users` DISABLE KEYS */;
INSERT INTO `communities_users` VALUES (2,1,2,'2023-04-07 00:37:27'),(3,1,1,'2023-04-12 09:21:12'),(4,1,3,'2023-04-17 12:32:17'),(6,3,2,'2023-04-21 21:06:08');
/*!40000 ALTER TABLE `communities_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `message` text NOT NULL,
  `chat_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `chat_id` (`chat_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`chat_id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'2023-04-18 10:59:35','hola!',1,3),(2,'2023-04-18 10:59:56','jajajaja',1,3),(3,'2023-04-18 11:09:16','hola boludo',1,1),(4,'2023-04-18 16:18:33','buenos dias',1,2),(5,'2023-04-18 16:19:10','como estan?',1,2),(6,'2023-04-18 16:19:50','hola',1,1),(7,'2023-04-18 16:24:43','asi',1,2),(8,'2023-04-18 16:25:39','aa',1,2),(9,'2023-04-18 16:25:41','aa',1,2),(10,'2023-04-18 16:25:47','asd',1,1),(11,'2023-04-18 16:29:59','ahora?',1,2),(12,'2023-04-18 16:30:31','jajaja',1,2),(13,'2023-04-18 16:31:06','a',1,2),(14,'2023-04-18 16:32:26','as',1,2),(15,'2023-04-18 16:32:33','la puta',1,1),(16,'2023-04-18 16:33:31','hola soy user',1,2),(17,'2023-04-18 16:33:43','hola user',1,1),(18,'2023-04-18 16:38:26','dejenlaa que llore sola',1,2),(19,'2023-04-18 16:41:17','a',1,2),(20,'2023-04-18 16:42:52','1',1,2),(21,'2023-04-18 16:46:27','probando',1,2),(22,'2023-04-18 16:46:32','esaaa',1,2),(23,'2023-04-18 16:46:36','hola si',1,1),(24,'2023-04-18 16:46:42','bien ahi negro',1,1),(25,'2023-04-18 16:46:49','bien',1,2),(26,'2023-04-18 16:47:07','aver aver que paso aqui?',1,2),(27,'2023-04-18 16:47:17','jajaja',1,1),(28,'2023-04-18 16:49:43','hola',1,2),(29,'2023-04-18 16:49:47','hola',1,1),(30,'2023-04-18 16:49:51','jajaa',1,2),(31,'2023-04-18 16:49:53','bien',1,2),(32,'2023-04-18 16:49:56','bien',1,1),(33,'2023-04-18 16:50:37','a',1,2),(34,'2023-04-18 16:51:12','a',1,2),(35,'2023-04-18 16:51:14','a',1,1),(36,'2023-04-18 16:51:16','a',1,1),(37,'2023-04-18 16:51:27','a',1,2),(38,'2023-04-18 16:51:29','asd',1,1),(39,'2023-04-18 16:54:05','a',1,2),(40,'2023-04-18 16:54:05','a',1,2),(41,'2023-04-18 16:54:05','a',1,2),(42,'2023-04-18 16:54:05','a',1,2),(43,'2023-04-18 16:54:05','a',1,2),(44,'2023-04-18 16:54:05','a',1,2),(45,'2023-04-18 16:54:05','a',1,2),(46,'2023-04-18 16:54:08','a',1,2),(47,'2023-04-18 16:54:10','adsad',1,2),(48,'2023-04-18 16:54:12','adsda',1,1),(49,'2023-04-18 16:54:14','dasd',1,2),(50,'2023-04-18 16:56:04','ave',1,2),(51,'2023-04-18 16:57:39','funca?',1,2),(52,'2023-04-18 17:03:13','a',1,2),(53,'2023-04-18 17:04:15','a',1,2),(54,'2023-04-18 17:04:31','s',1,2),(55,'2023-04-18 17:04:33','s',1,1),(56,'2023-04-18 17:04:39','s',1,2),(57,'2023-04-18 17:05:56','?',1,2),(58,'2023-04-18 17:06:13','a',1,2),(59,'2023-04-18 17:06:25','?',1,2),(60,'2023-04-18 17:06:44','a',1,2),(61,'2023-04-18 17:07:24','ll',1,2),(62,'2023-04-18 17:08:14','ahora',1,2),(63,'2023-04-18 17:09:03','a',1,1),(64,'2023-04-18 17:09:03','a',1,2),(65,'2023-04-18 17:10:00','y?',1,2),(66,'2023-04-18 17:10:42','a',1,2),(67,'2023-04-18 17:11:08','1',1,2),(68,'2023-04-18 17:11:40','2',1,2),(69,'2023-04-18 17:12:08','a',1,2),(70,'2023-04-18 17:12:22','a',1,2),(71,'2023-04-18 17:12:28','ssss',1,1),(72,'2023-04-18 17:12:30','dasdsda',1,2),(73,'2023-04-18 17:12:32','jajaa',1,2),(74,'2023-04-18 17:26:07','a',1,2),(75,'2023-04-18 17:27:21','a',1,2),(76,'2023-04-18 17:29:31','a',1,2),(77,'2023-04-18 17:33:59','a',1,2),(78,'2023-04-18 17:34:29','a',1,2),(79,'2023-04-18 17:34:34','s',1,2),(80,'2023-04-18 17:35:03','asd',1,2),(81,'2023-04-18 17:42:26','asd',1,2),(82,'2023-04-18 17:43:17','que?',1,2),(83,'2023-04-18 17:43:49','a',1,2),(84,'2023-04-18 17:43:54','adasdasaasda',1,2),(85,'2023-04-18 17:44:18','now?',1,2),(86,'2023-04-18 17:44:35','sda',1,2),(87,'2023-04-18 17:44:38','gg',1,2),(88,'2023-04-18 17:44:49','sdsa',1,2),(89,'2023-04-18 17:45:02','asdsa',1,2),(90,'2023-04-18 19:41:26','1',1,2);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_files`
--

DROP TABLE IF EXISTS `post_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_files` (
  `post_file_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `path` varchar(250) DEFAULT NULL,
  `file_name` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`post_file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_files`
--

LOCK TABLES `post_files` WRITE;
/*!40000 ALTER TABLE `post_files` DISABLE KEYS */;
INSERT INTO `post_files` VALUES (1,3,'/pdf/aaaaaa.pdf','Primer parcial.pdf'),(2,4,'/pdf/149d5673a5db708cd19bfd500.pdf','Segundo parcial.pdf'),(3,5,'https://studystacksfiles.s3.sa-east-1.amazonaws.com/Segundo%20parcial.pdf','Segundo parcial.pdf');
/*!40000 ALTER TABLE `post_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_title` varchar(255) NOT NULL,
  `post_body` text NOT NULL,
  `creation_date` datetime NOT NULL,
  `creator_user_id` int NOT NULL,
  `community_id` int NOT NULL,
  `section_id` int DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `community_id` (`community_id`),
  KEY `section_id` (`section_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `communities` (`community_id`),
  CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Primer paracial de fisica 2 anio 2022','Este es el primer parcial que se tomo de fisica 2, se lo tomo en la fecha 06/04/2022 por el profesor araujo.','2023-04-11 00:00:00',1,1,1),(2,'Primer paracial de fisica 2 anio 2022','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','2023-04-12 01:44:40',1,1,1),(3,'Primer paracial de fisica 2 anio 2022','fdssssssssssssssssssssss','2023-04-13 22:47:58',1,1,1),(4,'Segundo parcial','parcial de fisica 2','2023-04-14 09:34:45',1,1,2),(5,'Parcial 2','parcial 2 jaja','2023-04-17 12:32:39',3,1,2);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `section_id` int NOT NULL AUTO_INCREMENT,
  `section_name` varchar(255) NOT NULL,
  `section_description` text NOT NULL,
  `creation_date` datetime NOT NULL,
  `creator_user_id` int NOT NULL,
  `community_id` int NOT NULL,
  PRIMARY KEY (`section_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `community_id` (`community_id`),
  CONSTRAINT `section_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `section_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `communities` (`community_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,'Inicio','Pagina de inicio de la comunidad UTN - Fisica II','2023-04-06 00:00:00',1,1),(2,'Parciales','parciales','2023-04-12 08:58:58',1,1),(3,'Inicio','Pagina de inicio de la comunidad Fisica 2','2023-04-21 21:04:00',2,2),(4,'Inicio','Pagina de inicio de la comunidad Analisis matematico I','2023-04-21 21:06:08',2,3);
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universities`
--

DROP TABLE IF EXISTS `universities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universities` (
  `university_id` int NOT NULL AUTO_INCREMENT,
  `university_name` varchar(255) DEFAULT NULL,
  `university_description` text,
  PRIMARY KEY (`university_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universities`
--

LOCK TABLES `universities` WRITE;
/*!40000 ALTER TABLE `universities` DISABLE KEYS */;
INSERT INTO `universities` VALUES (1,'Universidad Tecnologica Nacional',NULL),(2,'Universidad Nacional Tucuman',NULL);
/*!40000 ALTER TABLE `universities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registration_date` datetime NOT NULL,
  `last_login_date` datetime DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'exe_romano','lautarooyt837@gmail.com','exe_romano','2023-04-06 00:00:00',NULL,'https://lh3.googleusercontent.com/a/AGNmyxYjp71Ut0GOer_dThhgqEjzyBpkdH-TT2W7lzU44A=s96-c'),(2,'Usuario45','sistemanumerador@gmail.com','Usuario45','2023-04-07 00:19:40',NULL,'https://lh3.googleusercontent.com/a/AGNmyxaexACpt08OysrsXTNLA5Ga7v92_8u4itq9fDon=s96-c'),(3,'Scruppy','scruppyventas@gmail.com','Scruppy','2023-04-17 09:38:17',NULL,'https://lh3.googleusercontent.com/a/AGNmyxZyd2X9Ncvd_6SMecRAFlbf7MdZ-u7ADw2EnOhN=s96-c');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `vote_id` int NOT NULL AUTO_INCREMENT,
  `vote_value` int NOT NULL,
  `creation_date` datetime NOT NULL,
  `creator_user_id` int NOT NULL,
  `post_id` int DEFAULT NULL,
  `comment_id` int DEFAULT NULL,
  PRIMARY KEY (`vote_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `post_id` (`post_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  CONSTRAINT `votes_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` VALUES (1,1,'2023-04-17 09:36:00',1,1,NULL),(2,1,'2023-04-17 09:36:03',1,2,NULL),(3,2,'2023-04-17 09:36:05',1,3,NULL),(4,2,'2023-04-17 09:36:07',1,4,NULL);
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-21 21:07:37
