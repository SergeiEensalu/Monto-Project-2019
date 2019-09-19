package ee.ut.monto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@NoArgsConstructor
@Data
@Table(name="account")
public class Account {
    @Id
    private Long id;
    private String name;
    private String type; // personal or business? might need changing

    @ManyToOne
    @JsonIgnore
    private User user;
}
