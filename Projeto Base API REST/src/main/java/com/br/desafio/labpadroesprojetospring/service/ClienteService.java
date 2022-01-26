package com.br.desafio.labpadroesprojetospring.service;

import com.br.desafio.labpadroesprojetospring.model.Cliente;

public interface ClienteService {
    Iterable<Cliente> buscaTodos();
    Cliente buscoPorId(Long id);
    void inserir(Cliente cliente);
    void atualiza(long id,Cliente cliente);
    void deletar(Long id);
}
