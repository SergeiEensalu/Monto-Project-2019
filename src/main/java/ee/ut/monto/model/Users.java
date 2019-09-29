package ee.ut.monto.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data
@Table(name="users")
public class Users {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @NonNull
    private String username;

    @NonNull
    private String password;

    @NonNull
    private String firstname;

    @NonNull
    private String lastname;

}
