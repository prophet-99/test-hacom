package com.prueba.webflux.demo.author.infrastructure;

import com.prueba.webflux.demo.author.domain.Author;
import org.springframework.web.bind.annotation.*;
import com.prueba.webflux.demo.author.repositories.AuthorRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/api/author")
@CrossOrigin(
    origins = "*", // Puedes especificar "http://localhost:4200" si quieres restringir
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
public class AuthorController {
    private final AuthorRepository authorRepository;

    public AuthorController(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @PostMapping
    public Mono<Author> create(@RequestBody Author author) {
        return authorRepository.save(author);
    }

    @GetMapping
    public Flux<Author> list() {
        return authorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Mono<Author> get(@PathVariable String id) {
        return authorRepository.findById(id);
    }

    @PutMapping("/{id}")
    public Mono<Author> update(@PathVariable String id, @RequestBody Author author) {
        return authorRepository.findById(id)
                .flatMap(item -> {
                    item.setName(author.getName());
                    item.setGender(author.getGender());
                    return authorRepository.save(item);
                });
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable String id) {
        return authorRepository.deleteById(id);
    }
}
