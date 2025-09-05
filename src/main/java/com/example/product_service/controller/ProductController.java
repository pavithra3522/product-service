package com.example.product_service.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.product_service.dto.ProductResponse;
import com.example.product_service.model.Product;
import com.example.product_service.repository.ProductRepository;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="http://localhost:8081")
public class ProductController {
    @Autowired
    private ProductRepository repo;
    
    @Value("${app.discountRate}")
    private int discountRate;
    
    @GetMapping
    public List<Map<String, Object>> getAllProducts() {
        List<Product> products = repo.findAll();
     
        return products.stream().map(p -> {
            int discountedPrice = p.getPrice() - (p.getPrice() * discountRate / 100);
     
            Map<String, Object> response = new HashMap<>();
            response.put("id", p.getId());
            response.put("name", p.getName());
            response.put("originalPrice", p.getPrice());
            response.put("discountedPrice", discountedPrice);
     
            return response;
        }).toList();
    }
    
    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable String id) {
        Product product = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
     
        int discountedPrice = product.getPrice() - (product.getPrice() * discountRate / 100);
     
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setPrice(product.getPrice());
        response.setDiscountedPrice(discountedPrice);
     
        return response;
    }
    
}