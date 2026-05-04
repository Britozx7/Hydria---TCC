use bumkjka48vvsbt4ejiy5;

create table usuario (
idUsuario int not null auto_increment,
nome varchar(50) not null,
email varchar(50) not null,
senha varchar(255) not null,
constraint pkidUsuario primary key (idUsuario)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


create table telefone (
numero varchar(20) not null,
ddd char(3) not null,
pais varchar(30) not null,
idUsuario int not null,
constraint pknumero primary key (numero),
constraint fkidUsuarioTel foreign key (idUsuario) references usuario (idUsuario)
);

create table contato
(
   idContato int not null,
   dataEnvio date not null,
   mensagem text not null,
   usuarioContato varchar(50),
   idUsuario int not null,
   constraint pkidContato primary key (idContato),
   constraint fkidUsuarioCont foreign key (idUsuario) references usuario (idUsuario)
);

create table doacao
(
   idDoacao int not null,
   valor decimal(10,2) not null,
   data_doacao date not null,
   idUsuario int not null,
   constraint pkidDoacao primary key (idDoacao),
   constraint fkidUsuarioDoa foreign key (idUsuario) references usuario (idUsuario)
);


/*insert*/

INSERT INTO usuario (idUsuario, nome, email, senha)
VALUES
(1, 'Bianca Nunes', 'bianca.nunes@example.com', 'senha123'),
(2, 'Joao Silva', 'joao.silva@example.com', 'senha456');

insert into doacao values
(101, 50.00, '2024-03-20', 1),
(102, 120.50, '2024-03-21', 2);

