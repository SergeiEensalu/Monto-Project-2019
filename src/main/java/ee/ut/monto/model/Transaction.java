package ee.ut.monto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Entity
@NoArgsConstructor
@Data
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private Instant date;
    private String description;
    private String type;


    @ManyToOne
    private Category category;
    @JsonIgnore
    @ManyToOne
    private Account account;
}