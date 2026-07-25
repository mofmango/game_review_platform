package ce.mnu.projectB.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "site_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SiteUser {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "site_user_seq_gen")
    @SequenceGenerator(name = "site_user_seq_gen", sequenceName = "site_user_seq", allocationSize = 1)
    private Long id;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 50, unique = true, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
    private String passwd;

    private String address;
    private String phone;

    @ManyToOne
    @JoinColumn(name = "favorite_genre_id")
    private Genre favoriteGenre;
}