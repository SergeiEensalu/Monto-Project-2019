package ee.ut.monto.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor
@Data
@Table(name="category")
public class Category {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    @NotNull
    private String name;

    public Category(@NotNull String name) {
        this.name = name;
    }
    @ManyToOne
    private User user;
    // some icon maybe?
}
