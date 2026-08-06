package com.smartstore.backend;

import com.smartstore.backend.model.Category;
import com.smartstore.backend.model.Product;
import com.smartstore.backend.model.User;
import com.smartstore.backend.repository.CategoryRepository;
import com.smartstore.backend.repository.ProductRepository;
import com.smartstore.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        seedProducts();
    }

    private void seedUsers() {
        if (userRepository.count() > 0) return;

        User admin = new User();
        admin.setEmail("admin@smartstore.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setFullName("Admin User");
        admin.setRole(User.Role.ADMIN);
        userRepository.save(admin);

        User user = new User();
        user.setEmail("user@smartstore.com");
        user.setPassword(passwordEncoder.encode("user123"));
        user.setFullName("Demo User");
        user.setRole(User.Role.USER);
        userRepository.save(user);

        log.info("✅ Users seeded: admin@smartstore.com / admin123");
    }

    private void seedProducts() {
        if (productRepository.count() > 0) return;

        Category electronics = saveCategory("Electronics", "Gadgets and devices");
        Category clothing = saveCategory("Clothing", "Fashion and apparel");
        Category books = saveCategory("Books", "Books and literature");
        Category sports = saveCategory("Sports", "Sports and fitness");
        Category home = saveCategory("Home", "Home and kitchen");

        saveProduct("iPhone 15 Pro", "Latest Apple flagship with A17 Pro chip", new BigDecimal("89999"), 15, electronics);
        saveProduct("Samsung Galaxy S24", "Premium Android with 200MP camera", new BigDecimal("74999"), 10, electronics);
        saveProduct("Sony WH-1000XM5", "Industry-leading noise cancelling headphones", new BigDecimal("24990"), 30, electronics);
        saveProduct("Boat Airdopes 141", "True wireless earbuds 42H playtime", new BigDecimal("999"), 200, electronics);
        saveProduct("JBL Charge 5", "Portable waterproof Bluetooth speaker", new BigDecimal("12999"), 25, electronics);
        saveProduct("Apple MacBook Air M2", "Supercharged by M2 chip 13.6-inch display", new BigDecimal("114900"), 8, electronics);
        saveProduct("Nike Air Max 270", "Comfortable everyday running shoes", new BigDecimal("8995"), 40, clothing);
        saveProduct("Levis 501 Jeans", "Original straight fit since 1873", new BigDecimal("3499"), 60, clothing);
        saveProduct("Adidas Ultraboost 22", "High performance running shoes", new BigDecimal("14999"), 20, clothing);
        saveProduct("Atomic Habits", "James Clear - tiny changes remarkable results", new BigDecimal("499"), 80, books);
        saveProduct("The Psychology of Money", "Morgan Housel - timeless lessons on wealth", new BigDecimal("399"), 90, books);
        saveProduct("Rich Dad Poor Dad", "Robert Kiyosaki - financial education classic", new BigDecimal("349"), 70, books);
        saveProduct("Yoga Mat Premium", "Non-slip TPE exercise mat 6mm", new BigDecimal("1299"), 55, sports);
        saveProduct("Whey Protein Gold 2kg", "100% Whey 24g protein per serving", new BigDecimal("3499"), 30, sports);
        saveProduct("Instant Pot Duo 7-in-1", "Multi-use electric pressure cooker 5.7L", new BigDecimal("7999"), 18, home);
        saveProduct("Philips Air Fryer", "2.6L capacity rapid air technology 1400W", new BigDecimal("6999"), 22, home);

        log.info("✅ 16 products seeded across 5 categories!");
    }

    private Category saveCategory(String name, String desc) {
        Category c = new Category();
        c.setName(name);
        c.setDescription(desc);
        return categoryRepository.save(c);
    }

    private void saveProduct(String name, String desc, BigDecimal price, int stock, Category category) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(desc);
        p.setPrice(price);
        p.setStockQuantity(stock);
        p.setCategory(category);
        productRepository.save(p);
    }
}