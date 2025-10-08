package com.kuikops.users_microservice.restControllers;

import com.kuikops.users_microservice.entities.User;
import com.kuikops.users_microservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserRestController {
    @Autowired
    UserService userService;

    //on peut faire aussi  avec @RequestMapping
    @GetMapping("all")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }
}
