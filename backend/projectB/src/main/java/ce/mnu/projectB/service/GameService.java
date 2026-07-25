package ce.mnu.projectB.service;

import ce.mnu.projectB.domain.Game;
import ce.mnu.projectB.domain.Genre;
import ce.mnu.projectB.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public Page<Game> getAllGames(Pageable pageable) {
        return gameRepository.findAll(pageable);
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll(); 
    }

    public Game getGameById(Long id) {
        return gameRepository.findById(id).orElse(null);
    }

    public Page<Game> searchByTitle(String keyword, Pageable pageable) {
        return gameRepository.findByTitleContainingIgnoreCase(keyword, pageable);
    }

    public Page<Game> findByGenre(Genre genre, Pageable pageable) {
        return gameRepository.findByGenre(genre, pageable);
    }

    
    public List<Game> getGamesByGenreId(Long genreId) {
        Genre genre = new Genre();
        genre.setId(genreId);
        return gameRepository.findByGenre(genre);
    }
    
}