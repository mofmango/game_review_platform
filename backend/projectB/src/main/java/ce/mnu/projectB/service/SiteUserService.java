package ce.mnu.projectB.service;

import ce.mnu.projectB.domain.SiteUser;
import ce.mnu.projectB.domain.Genre;
import ce.mnu.projectB.repository.SiteUserRepository;
import ce.mnu.projectB.repository.GenreRepository;
import org.springframework.stereotype.Service;

@Service
public class SiteUserService {

    private final SiteUserRepository siteUserRepository;
    private final GenreRepository genreRepository;

    public SiteUserService(SiteUserRepository siteUserRepository, 
                          GenreRepository genreRepository) {
        this.siteUserRepository = siteUserRepository;
        this.genreRepository = genreRepository;
    }

    public SiteUser registerUser(SiteUser user) {
    	
        return siteUserRepository.save(user);
    }

    public void updateUser(SiteUser user) {
        siteUserRepository.save(user);
    }

    public SiteUser findByEmail(String email) {
        return siteUserRepository.findByEmail(email).orElse(null);
    }

    public Genre getFavoriteGenre(Long genreId) {
        return genreRepository.findById(genreId).orElse(null);
    }
}
