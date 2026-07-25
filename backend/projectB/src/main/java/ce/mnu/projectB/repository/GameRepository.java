package ce.mnu.projectB.repository;

import ce.mnu.projectB.domain.Game;
import ce.mnu.projectB.domain.Genre;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {

    Page<Game> findByGenre(Genre genre, Pageable pageable);

    Page<Game> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Game> findAllByOrderByReleaseYearDesc(Pageable pageable); // 최신순 정렬

    List<Game> findByGenre(Genre genre); // 기존 장르 객체 기반

    List<Game> findByGenreId(Long genreId); // 추가: 장르 ID 기반
}