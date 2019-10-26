package ee.ut.monto.controller;

import ee.ut.monto.model.User;
import ee.ut.monto.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    Collection<User> users() {
        return userRepository.findAll();
    }
}