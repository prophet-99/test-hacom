package com.prueba.webflux.demo.book.infrastructure;

import com.prueba.webflux.demo.author.repositories.AuthorRepository;
import com.prueba.webflux.demo.book.domain.Book;
import com.prueba.webflux.demo.book.domain.BookDto;
import com.prueba.webflux.demo.book.repositories.BookRepository;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/book")
@CrossOrigin(
    origins = "*", // Puedes especificar "http://localhost:4200" si quieres restringir
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
public class BookController {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookController(
            BookRepository bookRepository,
            AuthorRepository authorRepository
    ) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @PostMapping
    public Mono<Book> create(@RequestBody Book book) {
        book.setCreateDate(LocalDateTime.now());
        return bookRepository.save(book);
    }

    @GetMapping
    public Flux<BookDto> list() {
        return bookRepository.findAll()
                .flatMap(book ->
                        authorRepository.findById(book.getAutorId())
                                .map(author -> new BookDto(book, author))
                );
    }

    @GetMapping("/{id}")
    public Mono<BookDto> get(@PathVariable String id) {
        return bookRepository.findById(id)
                .flatMap(book ->
                        authorRepository.findById(book.getAutorId())
                                .map(author -> new BookDto(book, author))
                );
    }

    @PutMapping("/{id}")
    public Mono<Book> update(@PathVariable String id, @RequestBody Book book) {
        return bookRepository.findById(id)
                .flatMap(b -> {
                    b.setTitle(book.getTitle());
                    b.setDescription(book.getDescription());
                    b.setYear(book.getYear());
                    b.setAutorId(book.getAutorId());
                    b.setPublished(book.isPublished());
                    return bookRepository.save(b);
                });
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable String id) {
        return bookRepository.deleteById(id);
    }
}
