package ee.ut.monto.repository;

import ee.ut.monto.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query(value = "select * from transaction as t where t.sum < 0", nativeQuery = true)
    List<Transaction> findAllExpenses();

    @Query(value = "select * from transaction as t where t.sum > 0", nativeQuery = true)
    List<Transaction> findAllIncomes();
}
