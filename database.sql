-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: studystacks
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
  `message_reply_to` int DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `chat_id` (`chat_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`chat_id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'2023-04-18 10:59:35','hola!',1,3,NULL),(2,'2023-04-18 10:59:56','jajajaja',1,3,NULL),(3,'2023-04-18 11:09:16','hola boludo',1,1,NULL),(4,'2023-04-18 16:18:33','buenos dias',1,2,NULL),(5,'2023-04-18 16:19:10','como estan?',1,2,NULL),(6,'2023-04-18 16:19:50','hola',1,1,NULL),(7,'2023-04-18 16:24:43','asi',1,2,NULL),(8,'2023-04-18 16:25:39','aa',1,2,NULL),(9,'2023-04-18 16:25:41','aa',1,2,NULL),(10,'2023-04-18 16:25:47','asd',1,1,NULL),(11,'2023-04-18 16:29:59','ahora?',1,2,NULL),(12,'2023-04-18 16:30:31','jajaja',1,2,NULL),(13,'2023-04-18 16:31:06','a',1,2,NULL),(14,'2023-04-18 16:32:26','as',1,2,NULL),(15,'2023-04-18 16:32:33','la puta',1,1,NULL),(16,'2023-04-18 16:33:31','hola soy user',1,2,NULL),(17,'2023-04-18 16:33:43','hola user',1,1,NULL),(18,'2023-04-18 16:38:26','dejenlaa que llore sola',1,2,NULL),(19,'2023-04-18 16:41:17','a',1,2,NULL),(20,'2023-04-18 16:42:52','1',1,2,NULL),(21,'2023-04-18 16:46:27','probando',1,2,NULL),(22,'2023-04-18 16:46:32','esaaa',1,2,NULL),(23,'2023-04-18 16:46:36','hola si',1,1,NULL),(24,'2023-04-18 16:46:42','bien ahi negro',1,1,NULL),(25,'2023-04-18 16:46:49','bien',1,2,NULL),(26,'2023-04-18 16:47:07','aver aver que paso aqui?',1,2,NULL),(27,'2023-04-18 16:47:17','jajaja',1,1,NULL),(28,'2023-04-18 16:49:43','hola',1,2,NULL),(29,'2023-04-18 16:49:47','hola',1,1,NULL),(30,'2023-04-18 16:49:51','jajaa',1,2,NULL),(31,'2023-04-18 16:49:53','bien',1,2,NULL),(32,'2023-04-18 16:49:56','bien',1,1,NULL),(33,'2023-04-18 16:50:37','a',1,2,NULL),(34,'2023-04-18 16:51:12','a',1,2,NULL),(35,'2023-04-18 16:51:14','a',1,1,NULL),(36,'2023-04-18 16:51:16','a',1,1,NULL),(37,'2023-04-18 16:51:27','a',1,2,NULL),(38,'2023-04-18 16:51:29','asd',1,1,NULL),(39,'2023-04-18 16:54:05','a',1,2,NULL),(40,'2023-04-18 16:54:05','a',1,2,NULL),(41,'2023-04-18 16:54:05','a',1,2,NULL),(42,'2023-04-18 16:54:05','a',1,2,NULL),(43,'2023-04-18 16:54:05','a',1,2,NULL),(44,'2023-04-18 16:54:05','a',1,2,NULL),(45,'2023-04-18 16:54:05','a',1,2,NULL),(46,'2023-04-18 16:54:08','a',1,2,NULL),(47,'2023-04-18 16:54:10','adsad',1,2,NULL),(48,'2023-04-18 16:54:12','adsda',1,1,NULL),(49,'2023-04-18 16:54:14','dasd',1,2,NULL),(50,'2023-04-18 16:56:04','ave',1,2,NULL),(51,'2023-04-18 16:57:39','funca?',1,2,NULL),(52,'2023-04-18 17:03:13','a',1,2,NULL),(53,'2023-04-18 17:04:15','a',1,2,NULL),(54,'2023-04-18 17:04:31','s',1,2,NULL),(55,'2023-04-18 17:04:33','s',1,1,NULL),(56,'2023-04-18 17:04:39','s',1,2,NULL),(57,'2023-04-18 17:05:56','?',1,2,NULL),(58,'2023-04-18 17:06:13','a',1,2,NULL),(59,'2023-04-18 17:06:25','?',1,2,NULL),(60,'2023-04-18 17:06:44','a',1,2,NULL),(61,'2023-04-18 17:07:24','ll',1,2,NULL),(62,'2023-04-18 17:08:14','ahora',1,2,NULL),(63,'2023-04-18 17:09:03','a',1,1,NULL),(64,'2023-04-18 17:09:03','a',1,2,NULL),(65,'2023-04-18 17:10:00','y?',1,2,NULL),(66,'2023-04-18 17:10:42','a',1,2,NULL),(67,'2023-04-18 17:11:08','1',1,2,NULL),(68,'2023-04-18 17:11:40','2',1,2,NULL),(69,'2023-04-18 17:12:08','a',1,2,NULL),(70,'2023-04-18 17:12:22','a',1,2,NULL),(71,'2023-04-18 17:12:28','ssss',1,1,NULL),(72,'2023-04-18 17:12:30','dasdsda',1,2,NULL),(73,'2023-04-18 17:12:32','jajaa',1,2,NULL),(74,'2023-04-18 17:26:07','a',1,2,NULL),(75,'2023-04-18 17:27:21','a',1,2,NULL),(76,'2023-04-18 17:29:31','a',1,2,NULL),(77,'2023-04-18 17:33:59','a',1,2,NULL),(78,'2023-04-18 17:34:29','a',1,2,NULL),(79,'2023-04-18 17:34:34','s',1,2,NULL),(80,'2023-04-18 17:35:03','asd',1,2,NULL),(81,'2023-04-18 17:42:26','asd',1,2,NULL),(82,'2023-04-18 17:43:17','que?',1,2,NULL),(83,'2023-04-18 17:43:49','a',1,2,NULL),(84,'2023-04-18 17:43:54','adasdasaasda',1,2,NULL),(85,'2023-04-18 17:44:18','now?',1,2,NULL),(86,'2023-04-18 17:44:35','sda',1,2,NULL),(87,'2023-04-18 17:44:38','gg',1,2,NULL),(88,'2023-04-18 17:44:49','sdsa',1,2,NULL),(89,'2023-04-18 17:45:02','asdsa',1,2,NULL),(90,'2023-04-18 19:41:26','1',1,2,NULL),(91,'2023-04-24 10:06:37','hola @bot dame la formula de baskara',1,3,NULL),(92,'2023-04-24 10:06:59','hola @bot dame la formula de baskara',1,3,NULL),(93,'2023-04-24 10:08:36','hola @bot dame la formula de baskara',1,3,NULL),(94,'2023-04-24 10:08:48','hola',1,3,NULL),(95,'2023-04-24 10:08:54','a',1,3,NULL),(96,'2023-04-24 10:08:57','asadas',1,3,NULL),(97,'2023-04-24 10:08:59','dsada',1,3,NULL),(98,'2023-04-24 10:09:02','@bot',1,3,NULL),(99,'2023-04-24 10:09:11','@bot hola',1,3,NULL),(100,'2023-04-24 10:09:21','hola @bot hola',1,3,NULL),(101,'2023-04-24 10:15:53','hola @bot dame la formula de baskara',1,3,NULL),(102,'2023-04-24 10:19:19','hola @bot dame la formula de baskara',1,3,NULL),(103,'2023-04-24 10:20:12','hola @bot dame la formula de baskara',1,3,NULL),(104,'2023-04-24 10:22:05','hola @bot dame la formula de baskara',1,3,NULL),(105,'2023-04-24 10:22:58','hola @bot dame la formula de baskara',1,3,NULL),(106,'2023-04-24 10:23:11','hola @bot dame la formula de baskara',1,3,NULL),(107,'2023-04-24 10:26:16','hola @bot dame la formula de baskara',1,3,NULL),(108,'2023-04-24 10:27:40','hola @bot dame la formula de baskara',1,3,NULL),(109,'2023-04-24 10:29:57','hola @bot dame la formula de baskara',1,3,NULL),(110,'2023-04-24 10:31:20','hola @bot dame la formula de baskara',1,3,NULL),(111,'2023-04-24 10:31:58','hola @bot dame la formula de baskara',1,3,NULL),(112,'2023-04-24 10:32:45','hola @bot dame la formula de baskara',1,3,NULL),(113,'2023-04-24 10:35:46','hola @bot dame la formula de baskara',1,3,NULL),(114,'2023-04-24 10:36:41','hola @bot dame la formula de baskara',1,3,NULL),(115,'2023-04-24 10:37:12','hola @bot dame la formula de baskara',1,3,NULL),(116,'2023-04-24 10:37:39','hola @bot dame la formula de baskara',1,3,NULL),(117,'2023-04-24 10:38:38','hola @bot dame la formula de baskara',1,3,NULL),(118,'2023-04-24 10:39:04','asda',1,3,NULL),(119,'2023-04-24 10:39:12','hola @bot dame la formula de baskara',1,3,NULL),(120,'2023-04-24 10:40:44','hola @bot dame la formula de baskara',1,3,NULL),(121,'2023-04-24 10:41:35','hola @bot dame la formula de baskara',1,3,NULL),(122,'2023-04-24 10:43:17','hola @bot dame la formula de baskara',1,3,NULL),(123,'2023-04-24 10:43:28','hola @bot dame la formula de baskara',1,3,NULL),(124,'2023-04-24 10:44:23','hola @bot dame la formula de baskara',1,3,NULL),(125,'2023-04-24 10:57:43','hola @bot dame la formula de baskara',1,3,NULL),(126,'2023-04-24 10:59:07','hola @bot dame la formula de baskara',1,3,NULL),(127,'2023-04-24 11:00:07','hola @bot dame la formula de baskara',1,3,NULL),(128,'2023-04-24 11:01:40','hola @bot dame la formula de baskara',1,3,NULL),(129,'2023-04-24 11:02:57','hola @bot dame la formula de baskara',1,3,NULL),(130,'2023-04-24 11:03:15','hola @bot dame la formula de baskara',1,3,NULL),(131,'2023-04-24 11:03:34','hola @bot dame la formula de baskara',1,3,NULL),(132,'2023-04-24 11:03:36','\n\nLa fórmula de Baskara es:\n\nx = [-b ± √(b² - 4ac)] / 2a',1,5,NULL),(133,'2023-04-24 11:05:24','hola @bot dame la formula de baskara',1,3,NULL),(134,'2023-04-24 11:05:29','\n\nLa fórmula de Baskara para encontrar los valores de x en una ecuación cuadrática ax² + bx + c = 0 es:\n\nx = (-b ± √(b² - 4ac)) / 2a',1,5,NULL),(135,'2023-04-24 11:06:13','hola @bot nesecito crear clases en java para un crud',1,3,NULL),(136,'2023-04-24 11:06:24','\n\nCrear clases en Java para un CRUD es una tarea sencilla. En primer lugar, debe identificar las tablas de datos a las que se va a acceder. A partir de esto, puede crear una clase para cada tabla de datos con los atributos apropiados para el CRUD. A continuación, debe agregar los métodos relevantes para ingresar, obtener, actualizar y eliminar datos a estas tablas. Después de definir los métodos, deberá proporcionar la lógica relevante para las clases. Finalmente, debe compilar y ejecutar la aplicación para verificar que funcione correctamente.',1,5,NULL),(137,'2023-04-24 11:06:52','@bot bueno dame el codigo',1,3,NULL),(138,'2023-04-24 11:07:04','\n\nNo hay un código específico para esta pregunta. Depende de lo que estés tratando de hacer. Si estás buscando código para un proyecto específico, necesitarás investigar primero los lenguajes y herramientas de programación necesarias para tu proyecto, y luego buscar en los recursos disponibles para aprender código con esos lenguajes y herramientas. Si necesitas ayuda en tu proyecto, puedes ponerte en contacto con los compañeros de curso, responsables de las clases en las que estés matriculado, tu profesor, centros de ayuda y tutoriales disponibles en línea.',1,5,NULL),(139,'2023-04-24 11:07:44','@bot es para un proyecto cualquiera, por eso te pido cualquier codigo',1,3,NULL),(140,'2023-04-24 11:07:58','\n\nPuedo proporcionarte un ejemplo de código para un proyecto cualquiera, aunque depende mucho del alcance y el propósito del proyecto. Por ejemplo, aquí hay un fragmento de código en Python que contiene algunos comandos para restar y sumar:\n\nnum1 = int(input(\'Ingresa un número: \'))\nnum2 = int(input(\'Ingresa otro número: \'))\n\n# restar dos numeros\nresult = num1 - num2\n\n# mostrar resultados\nprint(\'El resultado de restar los dos números es: \', result)\n\n# sumar dos numeros\nresult = num1 + num2\n\n# mostrar resultado\nprint(\'El resultado de sumar los dos números es: \', result)',1,5,NULL),(141,'2023-04-24 11:08:57','@bot como escondo un cuerpo?',1,3,NULL),(142,'2023-04-24 11:09:05','\n\nNo hay una forma adecuada de esconder un cuerpo. Es ilegal, y se castigará con tanta severidad como el acto que lo ocasionó en primer lugar. Si alguien está considerando esta opción como forma de evaden responsabilidad, sugiero que considere la ayuda legal inmediata para que pueda entender cuales son sus opciones legales y cómo debe actuar de una manera responsable.',1,5,NULL),(143,'2023-04-24 11:11:40','@bot necesito la formula de lens! ',1,3,NULL),(144,'2023-04-24 11:11:45','\n\nLa fórmula de objetivo lente (Lens Formula) se expresa como: \n 1/f = 1/p + 1/q \n\nDonde \"f\" es la distancia focal de la lente, \"p\" es la distancia del objeto y \"q\" es la distancia de la imagen.',1,5,NULL),(145,'2023-04-24 11:15:42','@bot es para un proyecto cualquiera, por eso te pido cualquier codigo',1,3,NULL),(146,'2023-04-24 11:15:53','\n\nPara un proyecto cualquiera, un código útil es un bloque de código para crear una función que permita al usuario ingresar un valor y devolver como resultado un mensaje personalizado. Por ejemplo, el siguiente código puede ser útil para un proyecto cualquiera: \n\n<code>def saludo(nombre):\n  nombre = nombre.title()\n  return \"Bienvenido, \" + nombre + \"! ¡Espero que tengas un buen día!\"\n\nnombre_usuario = input(\"Ingrese su nombre: \")\nmensaje = saludo(nombre_usuario)\nprint(mensaje) </code>',1,5,NULL),(147,'2023-04-24 11:15:56','@bot es para un proyecto cualquiera, por eso te pido cualquier codigo',1,3,NULL),(148,'2023-04-24 11:16:07','@bot es para un proyecto cualquiera, por eso te pido cualquier codigo',1,3,NULL),(149,'2023-04-24 11:16:08','@bot es para un proyecto cualquiera, por eso te pido cualquier codigo',1,3,NULL),(150,'2023-04-24 11:16:09','@bot es para un proyecto cualquiera, por eso te pido cualquier codigo',1,3,NULL),(151,'2023-04-24 11:16:12','.\n\nAquí hay un ejemplo de código simple para un programa básico en Java:\n\npublic class HelloWorld { \n  public static void main(String[] args) {\n    System.out.println(\"¡Hola mundo!\"); \n  } \n}',1,5,NULL),(152,'2023-04-24 11:16:16','.\n\nEn este caso, dependerá del lenguaje de programación que estás utilizando para tu proyecto. Aquí hay un ejemplo simple de código que muestra cómo se puede usar un bucle para imprimir los números del 1 al 10 en la consola de Java:\n\nfor(int i = 1; i <= 10; i++) {\n   System.out.println(i);\n}',1,5,NULL),(153,'2023-04-24 11:16:18','\n\nAquí hay un pequeño código en Java que muestra cómo crear una secuencia de pulsaciones:\n\npublic class SequencerDemo { \n\n  public static void main(String[] args) { \n    // Crear un objeto Sequencer para crear una secuencia \n    Sequencer sequencer = MidiSystem.getSequencer(); \n\n    // Abrir la secuencia \n    sequencer.open(); \n\n    // Crear una nueva secuencia de MIDI \n    Sequence sequence = new Sequence(Sequence.PPQ, 4); \n\n    // Obtener una pista de la secuencia. La pista 0 es la pista maestra \n    Track track = sequence.createTrack(); \n\n    // Añadir algunas pulsaciones a la línea de tiempo \n    track.add(new MidiEvent(new ShortMessage(ShortMessage.PROGRAM_CHANGE, 1, 1), 1));\n    track.add(new MidiEvent(new ShortMessage(ShortMessage.NOTE_ON, 1, 60, 100), 2)); \n    track.add(new MidiEvent(new ShortMessage(ShortMessage.NOTE_OFF, 1, 60, 100), 4)); \n\n    // Establecer la secuencia en el secuenciador y empezar a reproducir \n    sequencer.setSequence(sequence); \n    sequencer.start(); \n  } \n}',1,5,NULL),(154,'2023-04-24 11:16:32',' que me ayude\nEn primer lugar, es importante comprender exactamente qué tipo de proyecto estás trabajando. Dependiendo del lenguaje y del tipo de proyecto, diferentes partes del código serán necesarias.\n\nComo guía general, un buen punto de partida para cualquier código es asegurarse de que estén incluidos los comentarios relevantes que describan el código en cuestión. Los comentarios son esenciales para asegurar el correcto entendimiento de un sistema en el futuro.\n\nAdemás, hay algunos elementos matemáticos y de lógica que tienen un buen uso en prácticamente cualquier proyecto informático. Por ejemplo, el uso de condicionales y bucles, así como funciones matemáticas útiles como el redondeo, el uso de exponenciales y la división. Estas funciones matemáticas tienen una gran variedad de aplicaciones útiles.\n\nPor último, el uso de funciones de biblioteca puede ser muy útil para cualquier proyecto. Las bibliotecas aportan una gran cantidad de herramientas útiles que facilitan la creación de sistemas complejos, permitiendo una mayor productividad.',1,5,NULL),(155,'2023-04-24 11:29:53','hola @bot, nesecito los pasos para calcular la caida libre de un objeto',1,3,NULL),(156,'2023-04-24 12:18:59','a',1,3,NULL),(157,'2023-04-24 12:19:51','@bot es para un proyecto cualquiera, por eso te pido cualquier codigo',1,3,NULL),(158,'2023-04-24 12:20:00','\n\nNo hay un código universal para cualquier proyecto. El código que se usa en un proyecto depende de los lenguajes de programación y herramientas de software que se han elegido para desarrollar el proyecto. Esto significa que tendrá que identificar primero qué lenguajes y herramientas se van a usar para su proyecto y luego buscar referencias y documentación para crear el código para sus requisitos.',1,5,NULL),(159,'2023-04-24 12:20:59','@bot es para un proyecto cualquiera, por eso te pido cualquier codigo',1,3,NULL),(160,'2023-04-24 12:21:13','asdas',1,3,NULL),(161,'2023-04-24 12:24:35','@bot dame la formula de baskara',1,3,NULL),(162,'2023-04-24 12:27:08','@bot dame la formula de baskara',1,3,NULL),(163,'2023-04-24 12:27:13','\n\nLa fórmula de Baskara para resolver ecuaciones de segundo grado es la siguiente:\n\nx = (-b ± √(b² - 4ac))/2a\n\nDonde\n\nx = La variable desconocida\n\na, b, c = Los coeficientes de la ecuación\n\n+/- = El signo plus o minus',1,5,162),(164,'2023-04-24 12:29:20','La fórmula de Baskara para resolver ecuaciones de segundo grado es la siguiente:  x = (-b ± √(b² - 4ac))/2a  Donde  x = La variable desconocida  a, b, c = Los coeficientes de la ecuación  +/- = El signo plus o minus',1,3,NULL),(165,'2023-04-24 12:29:33','La fórmula de Baskara para resolver ecuaciones de segundo grado es la siguiente:  x = (-b ± √(b² - 4ac))/2a  Donde  x = La variable desconocida  a, b, c = Los coeficientes de la ecuación  +/- = El signo plus o minus @bot dame la formula de baskara',1,3,NULL),(166,'2023-04-24 12:29:40','\n\nLa Formula de Baskara es: \n\nx = (-b ± √(b^2 - 4ac)) / 2a',1,5,165),(167,'2023-04-24 12:34:43','@hola bot haceme un petardo',1,3,NULL),(168,'2023-04-24 12:36:04','hola @bot haceme un petardo',1,3,NULL),(169,'2023-04-24 12:36:23','hola @bot haceme un petardo',1,3,NULL),(170,'2023-04-24 12:36:35','hola @bot haceme un petardo',1,3,NULL),(171,'2023-04-24 12:36:40','\n\nNo voy a hacer un petardo. Esta no es la mejor forma de usar tu tiempo. En lugar de eso, tal vez puedas usar tu tiempo para mejorar tus habilidades académicas y prepararte para futuros logros.',1,5,170);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'exe_romano','lautarooyt837@gmail.com','exe_romano','2023-04-06 00:00:00',NULL,'https://lh3.googleusercontent.com/a/AGNmyxYjp71Ut0GOer_dThhgqEjzyBpkdH-TT2W7lzU44A=s96-c'),(2,'Usuario45','sistemanumerador@gmail.com','Usuario45','2023-04-07 00:19:40',NULL,'https://lh3.googleusercontent.com/a/AGNmyxaexACpt08OysrsXTNLA5Ga7v92_8u4itq9fDon=s96-c'),(3,'Scruppy','scruppyventas@gmail.com','Scruppy','2023-04-17 09:38:17',NULL,'https://lh3.googleusercontent.com/a/AGNmyxZyd2X9Ncvd_6SMecRAFlbf7MdZ-u7ADw2EnOhN=s96-c'),(4,'exe_romano','scruppyventas@gmail.com','$2b$10$79kyhwRxMmLQ9G6iCTFHxOcdeerUwpGaWoHDZDtK9Ui6NMIOjR0CO','2023-04-24 08:26:12',NULL,'https://lh3.googleusercontent.com/a/AGNmyxZyd2X9Ncvd_6SMecRAFlbf7MdZ-u7ADw2EnOhN=s96-c'),(5,'bot','','','2023-04-24 10:47:21',NULL,'https://www.gacelaweb.com/wp-content/uploads/que_es_un_bot_en_internet.jpg');
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

-- Dump completed on 2023-04-24 12:45:43
