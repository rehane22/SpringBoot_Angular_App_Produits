package com.kuikops.users_microservice.service;

import com.kuikops.users_microservice.entities.Role;
import com.kuikops.users_microservice.entities.User;
import com.kuikops.users_microservice.register.RegistationRequest;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    User findUserByUsername (String username);
    Role addRole(Role role);
    User addRoleToUser(String username, String rolename);
    List<User> findAllUsers();
    User registerUser(RegistationRequest request);
    public void sendEmailUser(User u, String code);
    public User validateToken(String code);
}
