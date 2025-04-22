package com.springboot.backend.usersapp.users_backend.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.usersapp.users_backend.entities.User;
import com.springboot.backend.usersapp.users_backend.services.UserService;


@CrossOrigin(origins={"http://localhost:4200"})
@RestController
@RequestMapping("/api/users") //ruta general para todos los endpoind
public class UserController {

    //creamos una variables de acceso a la interface UserService, con @Autowired,
    //se puede reemplazar el @Autowired con el constructor de la interface.
    @Autowired
    private UserService service;

    @GetMapping
    public List<User> list() {
        return service.findAll();
    }
    //se crea el metodo para el mapeo.
    @GetMapping("/{id}")
    //devuelve el objeto DTO y se convierte en un JSON
    public ResponseEntity<?> show(@PathVariable Long id) { //el signo "?" significa que devuelve cualquier tipo de valor
        //al tener un objeto de tipo Optional no se puede devolver directamente, hay que validar
        //return new String();
        Optional<User> userOptional = service.findById(id);
        if(userOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(userOptional.orElseThrow()); //devuelve un status 200, que encuentra el objeto
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "el usuario no se encontro por el id: " + id));
    }
    
    @PostMapping
    //se crea el cuerpo del JSON
    public ResponseEntity<User> create(@RequestBody User user) {
        //se crea el objeto cabecera en formato JSON
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        // Intentamos encontrar al usuario por su ID
        Optional<User> userOptional = service.findById(id);
    
        if(userOptional.isPresent()) {
            // Si el usuario existe, lo actualizamos con los nuevos datos
            User userBd = userOptional.get();
            userBd.setEmail(user.getEmail());
            userBd.setLastname(user.getLastname());
            userBd.setName(user.getName());
            userBd.setPassword(user.getPassword());
            userBd.setUsername(user.getUsername());
    
            // Guardamos los cambios en la base de datos y retornamos el usuario actualizado
            return ResponseEntity.ok(service.save(userBd));
        }
    
        // Si el usuario no se encuentra, devolvemos un 404
        return ResponseEntity.notFound().build();
    }
    
   
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<User> userOptional = service.findById(id);
        if(userOptional.isPresent()){
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    } 

}
