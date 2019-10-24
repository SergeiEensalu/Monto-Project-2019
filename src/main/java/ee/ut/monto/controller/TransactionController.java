package ee.ut.monto.controller;

import ee.ut.monto.model.Transaction;
import ee.ut.monto.model.User;
import ee.ut.monto.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Duration;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api")
public final class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/transactions")
    List<Transaction> getTransactions(Authentication authentication) {
        return transactionRepository.findAllByUserAndDateAfter((User) authentication.getPrincipal(), Instant.now().minus(Duration.ofDays(30)));
    }

    @DeleteMapping("/transactions/{id}")
    ResponseEntity<?> deleteIncome(@PathVariable Long id) {
        transactionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/transactions")
    ResponseEntity<Transaction> createIncome(@Valid @RequestBody Transaction transaction, Authentication authentication) throws URISyntaxException {
        transaction.setUser((User) authentication.getPrincipal());
        Transaction savedTransaction = transactionRepository.save(transaction);
        return ResponseEntity.created(new URI("/api/transactions/" + savedTransaction.getId())).body(savedTransaction);
    }
}
