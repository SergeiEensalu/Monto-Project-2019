package ee.ut.monto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Entity
@NoArgsConstructor
@Data
@Table(name = "expense")
public class Expense {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private Instant expensedate;
    private String description;
    private Double sum;
    @ManyToOne
    private Category category;
    @JsonIgnore
    @ManyToOne
    private Account account;
}