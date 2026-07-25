package ce.mnu.projectB.controller;

import ce.mnu.projectB.domain.*;
import ce.mnu.projectB.service.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projectB/game")
public class GameController {

    @Autowired
    private GameService gameService;

    @Autowired
    private GenreService genreService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private SiteUserService siteUserService;

    @GetMapping("/list")
    public ResponseEntity<?> listGames(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long genreId,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "0") int page) {

        Pageable pageable = PageRequest.of(page, 8);
        Page<Game> games;

        if ("popular".equals(sort)) {
            Page<Game> allGames = gameService.getAllGames(PageRequest.of(0, 1000));
            for (Game g : allGames) {
                g.setAvgRating(reviewService.getAverageRatingByGameId(g.getId()));
            }
            List<Game> filtered = allGames.getContent();
            if (genreId != null) {
                filtered = filtered.stream()
                        .filter(g -> g.getGenre() != null && genreId.equals(g.getGenre().getId()))
                        .collect(Collectors.toList());
            }
            if (keyword != null && !keyword.isEmpty()) {
                filtered = filtered.stream()
                        .filter(g -> g.getTitle().toLowerCase().contains(keyword.toLowerCase()))
                        .collect(Collectors.toList());
            }
            List<Game> sorted = filtered.stream()
                    .sorted(Comparator.comparingDouble((Game g) -> g.getAvgRating() != null ? g.getAvgRating() : 0.0).reversed())
                    .collect(Collectors.toList());

            int start = Math.min(page * 8, sorted.size());
            int end = Math.min((page + 1) * 8, sorted.size());
            games = new PageImpl<>(sorted.subList(start, end), pageable, sorted.size());

        } else if ("recent".equals(sort)) {
            pageable = PageRequest.of(page, 8, Sort.by(Sort.Direction.DESC, "releaseYear"));
            if (genreId != null && keyword != null && !keyword.isEmpty()) {
                Genre genre = genreService.getById(genreId);
                games = gameService.findByGenre(genre, PageRequest.of(0, 1000));
                List<Game> filtered = games.getContent().stream()
                        .filter(g -> g.getTitle().toLowerCase().contains(keyword.toLowerCase()))
                        .collect(Collectors.toList());
                int start = Math.min(page * 8, filtered.size());
                int end = Math.min((page + 1) * 8, filtered.size());
                games = new PageImpl<>(filtered.subList(start, end), pageable, filtered.size());
            } else if (genreId != null) {
                Genre genre = genreService.getById(genreId);
                games = gameService.findByGenre(genre, pageable);
            } else if (keyword != null && !keyword.isEmpty()) {
                games = gameService.searchByTitle(keyword, pageable);
            } else {
                games = gameService.getAllGames(pageable);
            }
        } else {
            if (genreId != null && keyword != null && !keyword.isEmpty()) {
                Genre genre = genreService.getById(genreId);
                games = gameService.findByGenre(genre, PageRequest.of(0, 1000));
                List<Game> filtered = games.getContent().stream()
                        .filter(g -> g.getTitle().toLowerCase().contains(keyword.toLowerCase()))
                        .collect(Collectors.toList());
                int start = Math.min(page * 8, filtered.size());
                int end = Math.min((page + 1) * 8, filtered.size());
                games = new PageImpl<>(filtered.subList(start, end), pageable, filtered.size());
            } else if (genreId != null) {
                Genre genre = genreService.getById(genreId);
                games = gameService.findByGenre(genre, pageable);
            } else if (keyword != null && !keyword.isEmpty()) {
                games = gameService.searchByTitle(keyword, pageable);
            } else {
                games = gameService.getAllGames(pageable);
            }
        }

        // 각 게임별 평균 평점 반영
        for (Game game : games) {
            Double avg = reviewService.getAverageRatingByGameId(game.getId());
            game.setAvgRating(avg);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("games", games.getContent());
        response.put("genres", genreService.getAllGenres());
        response.put("currentPage", page);
        response.put("totalPages", games.getTotalPages());
        response.put("selectedSort", sort);
        response.put("keyword", keyword);
        response.put("genreId", genreId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> gameDetail(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int reviewPage,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) Long genreId,
            @RequestParam(required = false) Integer page,
            HttpSession session) {

        Game game = gameService.getGameById(id);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }

        Double avgRating = reviewService.getAverageRatingByGameId(id);
        Pageable pageable = PageRequest.of(reviewPage, 4);
        Page<Review> reviewPageResult = reviewService.getReviewsByGamePaged(game, pageable);

        boolean hasReviewed = false;
        String email = (String) session.getAttribute("email");
        if (email != null) {
            SiteUser user = siteUserService.findByEmail(email);
            if (user != null) {
                hasReviewed = reviewService.hasUserReviewedGame(user, game);
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("game", game);
        response.put("avgRating", avgRating);
        response.put("reviews", reviewPageResult.getContent());
        response.put("reviewPage", reviewPageResult);
        response.put("hasReviewed", hasReviewed);
        response.put("page", page);
        response.put("keyword", keyword);
        response.put("sort", sort);
        response.put("genreId", genreId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/main")
    public ResponseEntity<?> startPage(HttpSession session) {
        String email = (String) session.getAttribute("email");
        Map<String, Object> response = new HashMap<>();

        if (email != null) {
            SiteUser user = siteUserService.findByEmail(email);
            if (user != null && user.getFavoriteGenre() != null) {
                Long favoriteGenreId = user.getFavoriteGenre().getId();
                List<Game> genreGames = gameService.getGamesByGenreId(favoriteGenreId);

                for (Game g : genreGames) {
                    g.setAvgRating(reviewService.getAverageRatingByGameId(g.getId()));
                }

                List<Game> top3 = genreGames.stream()
                        .sorted((a, b) -> Double.compare(
                                b.getAvgRating() != null ? b.getAvgRating() : 0.0,
                                a.getAvgRating() != null ? a.getAvgRating() : 0.0
                        ))
                        .limit(3)
                        .collect(Collectors.toList());

                response.put("recommendedGames", top3);
            }
        }

        return ResponseEntity.ok(response);
    }
    @GetMapping("/genres")
    public ResponseEntity<?> getAllGenres() {
        try {
            List<Genre> genres = genreService.getAllGenres();
            return ResponseEntity.ok(genres);
        } catch (Exception e) {
            return errorResponse(e);
        }
    }

	private ResponseEntity<?> errorResponse(Exception e) {
		// TODO Auto-generated method stub
		return null;
	}
}
