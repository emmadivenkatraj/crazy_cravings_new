package com.login.controller;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import com.login.Entity.Restaurant;
import com.login.repo.RestaurantRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @PostMapping("/add-restaurant")
    public ResponseEntity<?> addRestaurant(
            @RequestParam("mobile") String mobile,
            @RequestParam("restaurantName") String restaurantName,
            @RequestParam("foodName") String foodName,
            @RequestParam("price") String price,   
            @RequestParam("state") String state,
            @RequestParam("city") String city,
            @RequestParam("image") MultipartFile image
    ) {
        try {
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            File saveFile = new File(uploadDir + imageName);
            image.transferTo(saveFile);

            Restaurant r = new Restaurant();
            r.setMobile(mobile);
            r.setRestaurantName(restaurantName);
            r.setFoodName(foodName);
            r.setPrice(Double.parseDouble(price));  // ✅ Convert safely
            r.setState(state);
            r.setCity(city);
            r.setImagePath(uploadDir + imageName);

            restaurantRepository.save(r);

            return ResponseEntity.ok("Restaurant Data Stored Successfully");

        } catch (Exception e) {
            e.printStackTrace();  
            return ResponseEntity.status(500).body("Server Error: " + e.getMessage());
        }
    }
}
