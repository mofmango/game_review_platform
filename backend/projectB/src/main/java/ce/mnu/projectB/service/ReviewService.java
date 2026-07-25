package ce.mnu.projectB.service;

import ce.mnu.projectB.domain.Review;
import ce.mnu.projectB.domain.Game;
import ce.mnu.projectB.domain.SiteUser;
import ce.mnu.projectB.repository.GameRepository;
import ce.mnu.projectB.repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private GameRepository gameRepository;

    public void saveReview(Review review) {
        reviewRepository.save(review);
    }

    public List<Review> getReviewsByGame(Game game) {
        return reviewRepository.findByGameWithUser(game); // 수정된 메서드 호출
    }

    public Page<Review> getReviewsByGamePaged(Game game, Pageable pageable) {
        return reviewRepository.findByGame(game, pageable);
    }

    public List<Review> getReviewsByUser(SiteUser user) {
        return reviewRepository.findByUser(user);
    }

    public Page<Review> getReviewsByUserPaged(SiteUser user, Pageable pageable) {
        List<Review> allReviews = reviewRepository.findByUser(user);
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), allReviews.size());
        return new PageImpl<>(allReviews.subList(start, end), pageable, allReviews.size());
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public Double getAverageRatingByGameId(Long gameId) {
        return reviewRepository.findAverageRatingByGameId(gameId);
    }
    
    

    public List<Game> getRecommendedGamesByGenre(Long genreId) {
        return reviewRepository.findTopRatedGamesByGenre(genreId);
    }


    public List<Review> getReviewsByGameId(Long gameId) {
        Game game = gameRepository.findById(gameId).orElse(null);
        return reviewRepository.findByGame(game);
    }

    public boolean hasUserReviewedGame(SiteUser user, Game game) {
        return reviewRepository.findByUserAndGame(user, game).isPresent();
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    
    
}