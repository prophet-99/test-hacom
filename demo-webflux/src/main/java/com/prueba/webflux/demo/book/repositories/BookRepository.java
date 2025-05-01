package com.prueba.webflux.demo.book.repositories;

import com.prueba.webflux.demo.book.domain.Book;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface BookRepository extends ReactiveMongoRepository<Book, String> {
}