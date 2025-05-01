package com.prueba.webflux.demo.book.domain;

import com.prueba.webflux.demo.author.domain.Author;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private String id;
    private String title;
    private String description;
    private int year;
    private Author author;
    private boolean published;
    private LocalDateTime createDate;

    public BookDto(Book book, Author author){
        this.id = book.getId();
        this.title = book.getTitle();
        this.description = book.getDescription();
        this.year = book.getYear();
        this.published = book.isPublished();
        this.createDate = book.getCreateDate();
        this.author = author;
    }
}
