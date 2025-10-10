package com.kuikops.users_microservice.restControllers;

import com.kuikops.users_microservice.entities.User;
import com.kuikops.users_microservice.register.RegistationRequest;
import com.kuikops.users_microservice.repos.UserRepository;
import com.kuikops.users_microservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserRestController {
    @Autowired
    UserService userService;

    @Autowired
    UserRepository UserRep;

    //on peut faire aussi  avec @RequestMapping
    @GetMapping("all")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @PostMapping("/register")
    public User register(@RequestBody RegistationRequest request){
        return userService.registerUser(request);
    }

    @GetMapping("/verifyEmail/{token}")
    public User verifyEmail(@PathVariable("token") String token){
        return userService.validateToken(token);
    }

}
