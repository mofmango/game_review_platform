package ce.mnu.projectB.controller;

import ce.mnu.projectB.domain.*;
import ce.mnu.projectB.service.*;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projectB")
public class MainController {

    @Autowired
    private SiteUserService siteUserService;

    @Autowired
    private GenreService genreService;

    @Autowired
    private ReviewService reviewService;

    // 메인 페이지 추천 게임
    @GetMapping("/")
    public ResponseEntity<?> getRecommendedGames(@RequestParam(required = false) String email) {
        try {
            Map<String, Object> response = new HashMap<>();
            
            if(email != null) {
                SiteUser user = siteUserService.findByEmail(email);
                if(user != null && user.getFavoriteGenre() != null) {
                    List<Game> games = reviewService.getRecommendedGamesByGenre(user.getFavoriteGenre().getId());
                    
                    games.forEach(game -> 
                        game.setAvgRating(reviewService.getAverageRatingByGameId(game.getId()))
                    );
                    
                    List<Game> top3 = games.stream()
                        .sorted((g1, g2) -> Double.compare(
                            g2.getAvgRating() != null ? g2.getAvgRating() : 0.0, 
                            g1.getAvgRating() != null ? g1.getAvgRating() : 0.0
                        ))
                        .limit(4)
                        .collect(Collectors.toList());
                        
                    response.put("recommendedGames", top3);
                }
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return errorResponse(e);
        }
    }

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> userData) {
        try {
            SiteUser user = new SiteUser();
            user.setName((String) userData.get("name"));
            user.setEmail((String) userData.get("email"));
            user.setPasswd((String) userData.get("passwd"));
            user.setAddress((String) userData.get("address"));
            user.setPhone((String) userData.get("phone"));
            
            if (userData.get("favoriteGenreId") != null) {
                Long genreId = Long.valueOf(userData.get("favoriteGenreId").toString());
                Genre genre = genreService.getById(genreId);
                if (genre != null) {
                    user.setFavoriteGenre(genre);
                }
            }
            
            SiteUser newUser = siteUserService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            return errorResponse(e);
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
        @RequestBody Map<String, String> credentials,
        HttpSession session // 세션 주입 추가
    ) {
        try {
            SiteUser user = siteUserService.findByEmail(credentials.get("email"));
            if (user == null || user.getPasswd() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
            if (user.getPasswd().equals(credentials.get("passwd"))) {
                session.setAttribute("email", user.getEmail()); // 세션에 이메일 저장
                Map<String, Object> response = new HashMap<>();
                response.put("email", user.getEmail());
                response.put("name", user.getName());
                response.put("favoriteGenre", user.getFavoriteGenre());
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e) {
            return errorResponse(e);
        }
    }

    // 로그아웃 메서드 수정
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpSession session) {
        session.invalidate(); // 세션 무효화
        return ResponseEntity.ok("Logged out successfully");
    }
    
    // 마이페이지 정보
    @GetMapping("/mypage")
    public ResponseEntity<?> getMyPage(
        @RequestParam(defaultValue = "0") int page,
        HttpSession session // 세션에서 이메일 추출
    ) {
        String email = (String) session.getAttribute("email");
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        try {
            SiteUser user = siteUserService.findByEmail(email);
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            Pageable pageable = PageRequest.of(page, 4);
            Page<Review> reviews = reviewService.getReviewsByUserPaged(user, pageable);

            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("reviews", reviews);
            response.put("genres", genreService.getAllGenres());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return errorResponse(e);
        }
    }

    // 사용자 정보 업데이트
    @PutMapping("/user")
    public ResponseEntity<?> updateUser(
        @RequestBody Map<String, Object> updates,
        HttpSession session
    ) {
        String email = (String) session.getAttribute("email");
        try {
            SiteUser user = siteUserService.findByEmail(email);
            if(user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            if(updates.containsKey("passwd")) {
                user.setPasswd((String) updates.get("passwd"));
            }

            if(updates.containsKey("favoriteGenreId")) {
                Genre genre = new Genre();
                genre.setId(Long.valueOf(updates.get("favoriteGenreId").toString()));
                user.setFavoriteGenre(genre);
            }

            SiteUser updatedUser = (SiteUser) siteUserService.registerUser(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return errorResponse(e);
        }
    }

    // 공통 에러 처리
    private ResponseEntity<?> errorResponse(Exception e) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.put("error", e.getClass().getSimpleName());
        response.put("message", e.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }
}
