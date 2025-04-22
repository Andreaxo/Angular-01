package com.springboot.backend.usersapp.users_backend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.springboot.backend.usersapp.users_backend.entities.User;

//se hereda de CrudRepository, se crea el objeto(tabla), y el tipo long
public interface UserRepository extends CrudRepository<User, Long>{

}
