-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: military_asset_management
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `assignment_date` varchar(255) DEFAULT NULL,
  `base_id` bigint DEFAULT NULL,
  `equipment_id` bigint DEFAULT NULL,
  `personnel_name` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` VALUES (1,'2026-09-29',7,3,'John Kumar',2),(2,'2026-09-29',7,3,'Rahul Sharma',1),(3,'2026-09-29',7,3,'Audit Test Person',1),(4,NULL,6,2,'John',1),(5,NULL,6,2,'Test Personnel',1);
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `timestamp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
INSERT INTO `audit_log` VALUES (1,'PURCHASE','Purchased 1 units of equipment ID 2 for base ID 6','2026-09-29T18:51:59.417612300'),(2,'TRANSFER','Transferred 1 units of equipment ID 2 from base ID 6 to base ID 7','2026-09-29T19:02:33.702510300'),(3,'ASSIGNMENT','Assigned 1 units of equipment ID 3 to Audit Test Person at base ID 7','2026-09-29T21:25:48.349792500'),(4,'EXPENDITURE','Expended 1 units of equipment ID 3 at base ID 7 for reason: Audit test','2026-09-29T21:32:43.349277100'),(5,'PURCHASE','Purchased 2 units of equipment ID 2 for base ID 6','2026-09-30T13:39:03.195875900'),(6,'PURCHASE','Purchased 2 units of equipment ID 2 for base ID 6','2026-09-30T13:40:26.772158700'),(7,'TRANSFER','Transferred 2 units of equipment ID 2 from base ID 6 to base ID 7','2026-09-30T14:07:27.953235800'),(8,'ASSIGNMENT','Assigned 1 units of equipment ID 2 to John at base ID 6','2026-09-30T14:15:24.397830'),(9,'EXPENDITURE','Expended 1 units of equipment ID 2 at base ID 6 for reason: Damaged equipment','2026-09-30T14:22:19.186138500'),(10,'TRANSFER','Transferred 1 units of equipment ID 2 from base ID 6 to base ID 7','2026-09-30T16:00:57.157601200'),(11,'PURCHASE','Purchased 2 units of equipment ID 2 for base ID 6','2026-09-30T17:23:06.947936500'),(12,'PURCHASE','Purchased 1 units of equipment ID 2 for base ID 6','2026-09-30T18:31:38.626334500'),(13,'TRANSFER','Transferred 1 units of equipment ID 2 from base ID 6 to base ID 7','2026-09-30T18:45:06.950020800'),(14,'ASSIGNMENT','Assigned 1 units of equipment ID 2 to Test Personnel at base ID 6','2026-09-30T18:47:49.476736500'),(15,'EXPENDITURE','Expended 1 units of equipment ID 2 at base ID 6 for reason: Damaged equipment','2026-09-30T18:49:15.921627100');
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base`
--

DROP TABLE IF EXISTS `base`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `base` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base`
--

LOCK TABLES `base` WRITE;
/*!40000 ALTER TABLE `base` DISABLE KEYS */;
INSERT INTO `base` VALUES (6,'AB001','Bangalore','Alpha Base'),(7,'BB001','Mysore','Bravo Base');
/*!40000 ALTER TABLE `base` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `base_id` bigint DEFAULT NULL,
  `opening_balance` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (2,'TRK001','Military Truck',9,'Vehicle',6,15),(3,'TRK001','Military Truck',7,'Vehicle',7,5),(68,'WPN001','Service Rifle',50,'Weapon',6,50),(69,'AMM001','Ammunition Box',100,'Ammunition',6,100),(70,'COM001','Radio Set',20,'Communication Equipment',6,20);
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenditure`
--

DROP TABLE IF EXISTS `expenditure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenditure` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `base_id` bigint DEFAULT NULL,
  `equipment_id` bigint DEFAULT NULL,
  `expenditure_date` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenditure`
--

LOCK TABLES `expenditure` WRITE;
/*!40000 ALTER TABLE `expenditure` DISABLE KEYS */;
INSERT INTO `expenditure` VALUES (1,7,3,'2026-09-29',1,'Operational use'),(2,7,3,'2026-09-29',1,'Training exercise'),(3,7,3,'2026-09-29',1,'Testing expenditure'),(4,7,3,'2026-09-29',1,'Audit test'),(5,6,2,NULL,1,'Damaged equipment'),(6,6,2,NULL,1,'Damaged equipment');
/*!40000 ALTER TABLE `expenditure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `base_id` bigint DEFAULT NULL,
  `equipment_id` bigint DEFAULT NULL,
  `purchase_date` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (1,6,2,'2026-09-28',5),(2,6,2,'2026-09-28',5),(3,6,2,'2026-09-29',2),(4,6,2,'2026-09-29',1),(5,6,2,'2026-09-30',2),(6,6,2,'2026-09-30',2),(7,6,2,NULL,2),(8,6,2,NULL,1);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfer`
--

DROP TABLE IF EXISTS `transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `equipment_id` bigint DEFAULT NULL,
  `from_base_id` bigint DEFAULT NULL,
  `quantity` int NOT NULL,
  `to_base_id` bigint DEFAULT NULL,
  `transfer_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfer`
--

LOCK TABLES `transfer` WRITE;
/*!40000 ALTER TABLE `transfer` DISABLE KEYS */;
INSERT INTO `transfer` VALUES (1,2,6,5,7,'2026-09-28'),(2,2,6,5,7,'2026-09-28'),(3,2,6,5,7,'2026-09-28'),(4,2,6,1,7,'2026-09-29'),(5,2,6,1,7,'2026-09-29'),(6,2,6,1,7,'2026-09-29'),(7,2,6,2,7,'2026-09-30'),(8,2,6,1,7,'2026-09-30'),(9,2,6,1,7,'2026-09-30');
/*!40000 ALTER TABLE `transfer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `base_id` bigint DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,NULL,'$2a$10$Gy2/V8G.iW1UYZ9R.gY7Juf6Kdtxw7TP3QV0ol5BUonSKAM/O0ovO','ADMIN','admin2'),(3,6,'$2a$10$TtJBA3kEBsPzMqBtaNoqb.7HogK7axDZogtNg/2c/VWFXpV.jbH3.','BASE_COMMANDER','commander'),(4,6,'$2a$10$wW4chQFeZm.K8MbIkqySCejcb7cK9m/Wfp5szvGdSQePjBDyvVSY2','LOGISTICS_OFFICER','logistics');
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

-- Dump completed on 2026-10-01  0:34:04
