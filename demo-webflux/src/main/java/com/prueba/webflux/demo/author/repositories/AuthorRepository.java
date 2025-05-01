package com.prueba.webflux.demo.author.repositories;

import com.prueba.webflux.demo.author.domain.Author;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface AuthorRepository extends ReactiveMongoRepository<Author, String> {
}