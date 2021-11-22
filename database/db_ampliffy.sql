-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: db_ampliffy
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblDependency`
--

DROP TABLE IF EXISTS `tblDependency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblDependency` (
  `idDependency` int unsigned NOT NULL AUTO_INCREMENT,
  `idRepository` int unsigned NOT NULL,
  `idRepositoryDependency` int unsigned NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idDependency`),
  KEY `idRepository` (`idRepository`),
  KEY `idRepositoryDependency` (`idRepositoryDependency`),
  CONSTRAINT `tblDependency_ibfk_1` FOREIGN KEY (`idRepository`) REFERENCES `tblRepository` (`idRepository`),
  CONSTRAINT `tblDependency_ibfk_2` FOREIGN KEY (`idRepositoryDependency`) REFERENCES `tblRepository` (`idRepository`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblDependency`
--

LOCK TABLES `tblDependency` WRITE;
/*!40000 ALTER TABLE `tblDependency` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblDependency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblRepository`
--

DROP TABLE IF EXISTS `tblRepository`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblRepository` (
  `idRepository` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(214) NOT NULL,
  `description` varchar(254) NOT NULL,
  `version` varchar(11) NOT NULL,
  `author` varchar(10) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idRepository`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblRepository`
--

LOCK TABLES `tblRepository` WRITE;
/*!40000 ALTER TABLE `tblRepository` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblRepository` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-22 11:50:25
