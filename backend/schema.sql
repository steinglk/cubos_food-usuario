
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

CREATE TABLE IF NOT EXISTS itens(
  id SERIAL PRIMARY KEY NOT NULL,
  pedido_id INT NOT NULL,
  produto_id INT NOT NULL,
  quantidade INT NOT NULL,
  preco_produto INT NOT NULL, 
  FOREIGN KEY (produto_id) REFERENCES produto (id),
  FOREIGN KEY (pedido_id) REFERENCES pedido (id)
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
  entregue BOOLEAN,
  FOREIGN KEY (cliente_id) REFERENCES cliente (id),
  FOREIGN KEY (restaurante_id) REFERENCES restaurante (id),
);

-- Alterando tabela de itens
ALTER TABLE itens ADD COLUMN imagem_produto text;
ALTER TABLE itens ADD COLUMN nome_produto text;






