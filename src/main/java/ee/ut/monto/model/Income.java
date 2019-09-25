package ee.ut.monto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.Instant;

@Entity
@NoArgsConstructor
@Data
@Table(name = "income")
public class Income {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private Instant incomeDate;
    private String description;
    private Double sum;
    @ManyToOne
    private Category category;
    @JsonIgnore
    @ManyToOne
    private Account account;
}