delimiter \\
CREATE TABLE IF NOT EXISTS `product` (
  `cod` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  `cost` float(3,3),
  `price` float(3,3) NOT NULL,
  `supplier` int(11),
  `category` int(11)
  PRIMARY KEY (`cod`)
);

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `corporate_id` varchar(11) UNIQUE,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `market` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `name` varchar(40),
  `cnpj` varchar(11),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `name` varchar(40),
  `email` varchar(40),
  `cpf` varchar(11),
  `phone_number` varchar(11),
  `address` varchar(30)
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `sell` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `products` JSON,
  `total` FLOAT(3, 2),
  `discount` FLOAT(3, 2),
  `client` int(11),
  `user` int(11),
  `date` datetime,
  `payment_method` int(11)
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `payment_method` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `description` varchar(40),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `name` varchar(40),
  `company` varchar(11),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `promotion` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `product` JSON,
  `category` JSON,
  PRIMARY KEY (`id`)
);