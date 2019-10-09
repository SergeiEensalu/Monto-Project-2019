package ee.ut.monto.controller;

import ee.ut.monto.model.Transaction;
import ee.ut.monto.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public final class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/transactions")
    List<Transaction> getTransactions() {
        return transactionRepository.findAll();
    }

    @GetMapping("/transactions/expenses")
    List<Transaction> getExpenses() {
        return transactionRepository.findAllExpenses();
    }

    @GetMapping("/transactions/incomes")
    List<Transaction> getIncomes() {
        return transactionRepository.findAllIncomes();
    }

    @DeleteMapping("/transactions/{id}")
    ResponseEntity<?> deleteIncome(@PathVariable Long id) {
        transactionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/transactions")
    ResponseEntity<Transaction> createIncome(@Valid @RequestBody Transaction transaction) throws URISyntaxException {
        Transaction savedTransaction = transactionRepository.save(transaction);
        return ResponseEntity.created(new URI("/api/transactions/" + savedTransaction.getId())).body(savedTransaction);
    }
}
