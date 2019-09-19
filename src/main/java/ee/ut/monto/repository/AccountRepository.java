package ee.ut.monto.repository;

import ee.ut.monto.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByName(String name);
}
