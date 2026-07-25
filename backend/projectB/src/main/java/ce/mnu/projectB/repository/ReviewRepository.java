package ce.mnu.projectB.repository;

import ce.mnu.projectB.domain.Review;
import ce.mnu.projectB.domain.Game;
import ce.mnu.projectB.domain.SiteUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	Optional<Review> findByUserAndGame(SiteUser user, Game game);
    List<Review> findByGame(Game game);
    List<Review> findByUser(SiteUser user);

    Page<Review> findByGame(Game game, Pageable pageable);
    Page<Review> findByUser(SiteUser user, Pageable pageable);
    

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.game.id = :gameId")
    Double findAverageRatingByGameId(@Param("gameId") Long gameId);

    @Query("""
    	    SELECT r.game FROM Review r
    	    WHERE r.game.genre.id = :genreId
    	    GROUP BY r.game
    	    ORDER BY AVG(r.rating) DESC
    	""")
    List<Game> findTopRatedGamesByGenre(@Param("genreId") Long genreId);
    
    @Query("SELECT r FROM Review r JOIN FETCH r.user WHERE r.game = :game")
    List<Review> findByGameWithUser(@Param("game") Game game);
}