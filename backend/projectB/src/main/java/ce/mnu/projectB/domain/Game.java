package ce.mnu.projectB.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Temporal(TemporalType.DATE)
    private Date releaseYear;

    @Column(length = 1000)
    private String imageUrl;

    @Transient
    private Double avgRating;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    public Double getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(Double avgRating) {
        this.avgRating = avgRating;
    }
}