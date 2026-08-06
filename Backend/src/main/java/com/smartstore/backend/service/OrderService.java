package com.smartstore.backend.service;

import com.smartstore.backend.model.Order;
import com.smartstore.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrderStatus(Long id, Order.Status status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }
}