package ee.ut.monto.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;
import ee.ut.monto.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ee.ut.monto.repository.AccountRepository;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;

    @GetMapping("/accounts")
    Collection<Account> accounts() {
        return accountRepository.findAll();
    }

    @GetMapping("/accounts/{id}")
    ResponseEntity<?> getAccount(@PathVariable Long id) {
        Optional<Account> account = accountRepository.findById(id);
        return account.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/accounts")
    ResponseEntity<Account> createAccount(@Valid @RequestBody Account account) throws URISyntaxException {
        Account savedAccount = accountRepository.save(account);
        return ResponseEntity.created(new URI("/api/accounts" + savedAccount.getId())).body(savedAccount);
    }

    @PutMapping("/accounts/{id}")
    ResponseEntity<Account> updateAccount(@Valid @RequestBody Account account) {
        Account updatedAccount = accountRepository.save(account);
        return ResponseEntity.ok().body(updatedAccount);
    }

    @DeleteMapping("/accounts/{id}")
    ResponseEntity<?> deleteAccount(@PathVariable Long id) {
        accountRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}