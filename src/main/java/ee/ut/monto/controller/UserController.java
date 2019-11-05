package ee.ut.monto.controller;

import ee.ut.monto.model.User;
import ee.ut.monto.repository.UserRepository;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    Collection<User> users() {
        return userRepository.findAll();
    }

    @PostMapping("/email")
    Long findUserId(@Valid @RequestBody UserDto userDto) {
        Optional<User> users = userRepository.findByEmail(userDto.email);
        if (!users.isPresent()) {
            return null;
        }
        return users.get().getId();
    }

    @PutMapping("/update/{id}")
    ResponseEntity<?> updateUser(@Valid @RequestBody UserDto userDto) {
        Optional<User> users = userRepository.findByEmail(userDto.email);

        if (!users.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User user = users.get();

          //check if real old password match with old password which user wrote
        if (!encoder.matches(userDto.oldPassword, user.getHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        user.setHash(encoder.encode(userDto.newPassword));

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok().body(updatedUser);
    }

    @Data
    @NoArgsConstructor
    private static class UserDto {
        @Email
        private String email;

        @Length(min = 8)
        private String oldPassword;

        @Length(min = 8)
        private String newPassword;
    }

}