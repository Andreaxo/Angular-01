package com.springboot.backend.usersapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.usersapp.users_backend.entities.User;
import com.springboot.backend.usersapp.users_backend.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

   
  
    private UserRepository repository;
    //se inyecta el atributo repository creando un constructor.
    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    
    @SuppressWarnings({ "unchecked", "rawtypes" })
    @Override
    @Transactional(readOnly = true) //para consultas solamente
    public List<User> findAll() {
        //devuelve un iterable, una lista por eso hay que hacer un cast
        return (List) this.repository.findAll();

    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(@NonNull Long id) {
        return repository.findById(id);
    }

    @Transactional //para update
    @Override
    
    public User save(User user) {
        return repository.save(user);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

}
