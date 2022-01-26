package com.br.desafio.labpadroesprojetospring.model;



import javax.persistence.*;

@Entity
public class Endereco {
    @Id
    private String cep;
    private String logradouro;
    private String complemento;
    private String bairo;
    private String localodade;
    private String uf;
    private String ibge;
    private String gia;
    private String ddd;
    private String siafi;
}
