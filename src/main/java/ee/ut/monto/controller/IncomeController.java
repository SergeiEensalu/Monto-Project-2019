package ee.ut.monto.controller;

import ee.ut.monto.model.Income;
import ee.ut.monto.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class IncomeController {
    @Autowired
    private IncomeRepository incomeRepository;

    @GetMapping("/incomes")
    List<Income> getIncomes() {
        return incomeRepository.findAll();
    }

    @DeleteMapping("/incomes/{id}")
    ResponseEntity<?> deleteIncome(@PathVariable Long id) {
        incomeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/incomes")
    ResponseEntity<Income> createIncome(@Valid @RequestBody Income income) throws URISyntaxException {
        Income savedIncome = incomeRepository.save(income);
        return ResponseEntity.created(new URI("/api/incomes" + savedIncome.getId())).body(savedIncome);
    }
}