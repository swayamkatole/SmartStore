package com.smartstore.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.io.Serializable;

@Data
@Entity
@Table(name = "products")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private Integer stockQuantity;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private LocalDateTime createdAt = LocalDateTime.now();
}
