package com.login.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.login.Entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}

