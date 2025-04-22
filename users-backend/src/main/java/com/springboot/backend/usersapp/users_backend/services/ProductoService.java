package com.springboot.backend.usersapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;

import com.springboot.backend.usersapp.users_backend.entities.Producto;

public interface ProductoService {
    List<Producto> findAll();

    Optional<Producto> findById(@NonNull Long id);

    Producto save(Producto producto);

    void deleteById(Long id);
}
