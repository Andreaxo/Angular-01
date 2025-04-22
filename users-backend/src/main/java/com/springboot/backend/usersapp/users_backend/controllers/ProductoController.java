package com.springboot.backend.usersapp.users_backend.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.springboot.backend.usersapp.users_backend.entities.Producto;
import com.springboot.backend.usersapp.users_backend.services.ProductoService;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService service;

    @GetMapping
    public List<Producto> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Optional<Producto> productoOptional = service.findById(id);
        if (productoOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(productoOptional.orElseThrow());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("error", "El producto no se encontró por el id: " + id));
    }

    @PostMapping
    public ResponseEntity<Producto> create(@RequestBody Producto producto) {
        producto.setId(null);  // Esto asegura que el id no se envíe
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(producto));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Producto> update(@PathVariable Long id, @RequestBody Producto producto) {
        Optional<Producto> productoOptional = service.findById(id);
        if (productoOptional.isPresent()) {
            Producto productoBd = productoOptional.get();
            productoBd.setNombre(producto.getNombre());
            productoBd.setDescripcion(producto.getDescripcion());
            productoBd.setPrecio(producto.getPrecio());
            productoBd.setCategoria(producto.getCategoria());
            return ResponseEntity.ok(service.save(productoBd));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Producto> productoOptional = service.findById(id);
        if (productoOptional.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
