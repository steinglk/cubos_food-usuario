CREATE DATABASE app_food;

CREATE TABLE IF NOT EXISTS categoria(
  id SERIAL PRIMARY KEY NOT NULL,  
  nome VARCHAR(30) NOT NULL,
  COLUMN imagem_categoria TEXT
);

CREATE TABLE IF NOT EXISTS usuario(
  id SERIAL PRIMARY KEY NOT NULL,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha TEXT NOT NULL
); 

CREATE TABLE IF NOT EXISTS restaurante(
  id SERIAL PRIMARY KEY NOT NULL, 
  usuario_id INT NOT NULL, 
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(100),
  categoria_id INT NOT NULL, 
  taxa_entrega INT NOT NULL DEFAULT 0, 
  tempo_entrega_minutos INT NOT NULL DEFAULT 30, 
  valor_minimo_pedido INT NOT NULL DEFAULT 0, 
  imagem_restaurante text,
  FOREIGN KEY (usuario_id) REFERENCES usuario (id),
  FOREIGN KEY (categoria_id) REFERENCES categoria (id)
); 

CREATE TABLE IF NOT EXISTS produto (
	id SERIAL PRIMARY KEY NOT NULL,
  	restaurante_id INT NOT NULL, 
  	nome VARCHAR(50) NOT NULL, 
  	descricao VARCHAR(100),
  	preco INT NOT NULL,
  	ativo BOOLEAN NOT NULL DEFAULT TRUE, 
  	permite_observacoes BOOLEAN NOT NULL DEFAULT FALSE, 
    imagem_produto text,
  	FOREIGN KEY (restaurante_id) REFERENCES restaurante (id)
); 

insert into categoria (nome) values ('Diversos');
insert into categoria (nome) values ('Lanches');
insert into categoria (nome) values ('Carnes');
insert into categoria (nome) values ('Massas');
insert into categoria (nome) values ('Pizzas');
insert into categoria (nome) values ('Japonesa');
insert into categoria (nome) values ('Chinesa');
insert into categoria (nome) values ('Mexicano');
insert into categoria (nome) values ('Brasileira');
insert into categoria (nome) values ('Italiana');
insert into categoria (nome) values ('Árabe');

UPDATE categoria 
SET imagem_categoria = 'https://thumbs.dreamstime.com/b/culin%C3%A1ria-de-pa%C3%ADses-diferentes-67572653.jpg' 
WHERE nome = 'Diversos';
UPDATE categoria 
SET imagem_categoria = 'https://www.assai.com.br/sites/default/files/styles/blog_destaque/public/blog/shutterstock_361890518.jpg?itok=AhYXJ2NI' 
WHERE nome = 'Lanches';
UPDATE categoria 
SET imagem_categoria = 'https://www.barbosasupermercados.com.br/wp-content/uploads/2019/11/IMAGEM-BLOG_Novembro-c%C3%B3pia-1-1024x680.png' 
WHERE nome = 'Carnes';
UPDATE categoria 
SET imagem_categoria = 'https://conteudo.imguol.com.br/c/entretenimento/00/2020/03/10/molhos-de-macarrao-1583872618524_v2_450x337.jpg' 
WHERE nome = 'Massas'; 
UPDATE categoria 
SET imagem_categoria = 'https://blog.praticabr.com/wp-content/uploads/2019/06/Pizza-Pizzaria-Forno-Forza-Express.jpg' 
WHERE nome = 'Pizzas'; 
UPDATE categoria 
SET imagem_categoria = 'https://www.djapa.com.br/wp-content/uploads/2019/11/IMGP3652.jpg' 
WHERE nome = 'Japonesa'; 
UPDATE categoria 
SET imagem_categoria = 'http://brasileirosnachina.com/wp-content/uploads/2017/03/dimsum4.jpg' 
WHERE nome = 'Chinesa'; 
UPDATE categoria 
SET imagem_categoria = 'https://img.itdg.com.br/tdg/images/blog/uploads/2016/07/84c201d463572018fc73c00535101cf5-600x500.jpg' 
WHERE nome = 'Mexicano'; 
UPDATE categoria 
SET imagem_categoria = 'https://cdn.falauniversidades.com.br/wp-content/uploads/2019/10/comida-brasileira.jpg' 
WHERE nome = 'Brasileira'; 
UPDATE categoria
SET imagem_categoria = 'http://www.bituruna.pr.gov.br/img_news/cache/not003469-01-1000x0.jpg' 
WHERE nome = 'Italiana'; 
UPDATE categoria 
SET imagem_categoria = 'https://p2.trrsf.com/image/fget/cf/460/0/images.terra.com/2020/04/09/shutterstock563091901-768x512.jpg' 
WHERE nome = 'Árabe'; 



CREATE TABLE IF NOT EXISTS cliente(
  id SERIAL PRIMARY KEY NOT NULL,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL, 
  telefone VARCHAR(20) NOT NULL,
  senha TEXT NOT NULL
);


--ATAULIZAÇÃO NO BD PARA ATENDER A 4ª SPRINT 

CREATE TABLE IF NOT EXISTS endereco_cliente(
  id SERIAL PRIMARY KEY NOT NULL,
  cliente_id INT NOT NULL, 
  cep VARCHAR(100) NOT NULL,
  endereco TEXT NOT NULL, 
  complemento TEXT NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES cliente (id)
);

CREATE TABLE IF NOT EXISTS pedido(
  id SERIAL PRIMARY KEY NOT NULL,
  cliente_id INT NOT NULL,
  nome_cliente VARCHAR(100) NOT NULL,
  restaurante_id INT NOT NULL,
  endereco VARCHAR(100) NOT NULL,
  cep VARCHAR(100) NOT NULL,
  complemento VARCHAR(100),
  subtotal TEXT NOT NULL,
  total TEXT NOT NULL, 
  entrega TEXT NOT NULL,
  enviado BOOLEAN DEFAULT false,
  FOREIGN KEY (cliente_id) REFERENCES cliente (id),
  FOREIGN KEY (restaurante_id) REFERENCES restaurante (id),
);

CREATE TABLE IF NOT EXISTS itens(
  id SERIAL PRIMARY KEY NOT NULL,
  pedido_id INT NOT NULL,
  quantidade INT NOT NULL,
  preco_produto INT NOT NULL, 
  nome_produto TEXT NOT NULL,
  imagem_produto TEXT NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedido (id)
);






