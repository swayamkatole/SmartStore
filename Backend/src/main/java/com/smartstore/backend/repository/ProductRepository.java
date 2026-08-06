package com.smartstore.backend.repository;

import com.smartstore.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByNameContainingIgnoreCase(String name);
}
