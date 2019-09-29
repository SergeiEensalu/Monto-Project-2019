package ee.ut.monto.controller;

import ee.ut.monto.model.Users;
import ee.ut.monto.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class UsersController {
    @Autowired
    private UsersRepository userRepository;

    @GetMapping("/user")
    Collection<Users> users() {
        return userRepository.findAll();
    }

    @PostMapping("/register}")
    ResponseEntity<Users> addUser(@Valid @RequestBody Users user) {
        Users updatedUser = userRepository.save(user);
        return ResponseEntity.ok().body(updatedUser);
    }
}