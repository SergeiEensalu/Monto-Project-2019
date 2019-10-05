package ee.ut.monto.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Entity
@NoArgsConstructor
@Data
@Table(name = "transaction")
public final class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Instant date;

    private String description;

    private Double sum;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Account account;
}
