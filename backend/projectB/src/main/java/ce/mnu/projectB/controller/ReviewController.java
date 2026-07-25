package ce.mnu.projectB.controller;

import ce.mnu.projectB.domain.Game;
import ce.mnu.projectB.domain.Review;
import ce.mnu.projectB.domain.SiteUser;
import ce.mnu.projectB.service.GameService;
import ce.mnu.projectB.service.ReviewService;
import ce.mnu.projectB.service.SiteUserService;
import jakarta.servlet.http.HttpSession;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/projectB/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private GameService gameService;

    @Autowired
    private SiteUserService siteUserService;

    // 리뷰 작성
    @PostMapping
    public ResponseEntity<?> createReview(
            @RequestBody ReviewRequest request,
            HttpSession session) {

        String email = (String) session.getAttribute("email");
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        SiteUser user = siteUserService.findByEmail(email);
        Game game = gameService.getGameById(request.getGameId());

        if (reviewService.hasUserReviewedGame(user, game)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 리뷰를 작성하셨습니다.");
        }

        Review review = new Review();
        review.setGame(game);
        review.setUser(user);
        review.setRating(request.getRating());
        review.setContent(request.getContent());
        reviewService.saveReview(review);

        return ResponseEntity.ok(review);
    }

    // 리뷰 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(
            @PathVariable Long id,
            @RequestBody ReviewRequest request,
            HttpSession session) {

        String email = (String) session.getAttribute("email");
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        Review review = reviewService.getReviewById(id);
        if (review == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("리뷰를 찾을 수 없습니다.");
        }

        if (!review.getUser().getEmail().equals(email)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다.");
        }

        review.setRating(request.getRating());
        review.setContent(request.getContent());
        reviewService.saveReview(review);

        return ResponseEntity.ok(review);
    }
    
    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        String email = (String) session.getAttribute("email");
        if(email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        SiteUser user = siteUserService.findByEmail(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<List<Review>> getReviewsByGame(
        @RequestParam Long gameId
    ) {
        Game game = gameService.getGameById(gameId);
        List<Review> reviews = reviewService.getReviewsByGame(game);
        return ResponseEntity.ok(reviews);
    }
    
    // 리뷰 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(
            @PathVariable Long id,
            HttpSession session) {

        String email = (String) session.getAttribute("email");
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        Review review = reviewService.getReviewById(id);
        if (review == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("리뷰를 찾을 수 없습니다.");
        }

        if (!review.getUser().getEmail().equals(email)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다.");
        }

        reviewService.deleteReview(id);
        return ResponseEntity.ok().build();
    }

    // DTO for Request Body
    static class ReviewRequest {
        private Long gameId;
        private int rating;
        private String content;

        // Getters and Setters
        public Long getGameId() { return gameId; }
        public void setGameId(Long gameId) { this.gameId = gameId; }
        public int getRating() { return rating; }
        public void setRating(int rating) { this.rating = rating; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
    }
}
