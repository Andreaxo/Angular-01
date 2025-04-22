package com.springboot.backend.usersapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;

import com.springboot.backend.usersapp.users_backend.entities.User;

public interface UserService {
    List<User> findAll();

    Optional<User> findById(@NonNull Long id); //es un String pero de un solo Objeto (contiene un solo usuario)

    User save(User user); //es  un update

    void deleteById(Long id); // elimina por id
}
