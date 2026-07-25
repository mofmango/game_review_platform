package ce.mnu.projectB.repository;

import ce.mnu.projectB.domain.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}