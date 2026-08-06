package com.smartstore.backend.service;

import com.smartstore.backend.model.Product;
import com.smartstore.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Cacheable(value = "products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Cacheable(value = "product", key = "#id")
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> searchProducts(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    @CacheEvict(value = "products", allEntries = true)
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public Product updateProduct(Long id, Product product) {
        Product existing = getProductById(id);
        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setStockQuantity(product.getStockQuantity());
        existing.setImageUrl(product.getImageUrl());
        return productRepository.save(existing);
    }

    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
