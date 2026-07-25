package ce.mnu.projectB.repository;

import ce.mnu.projectB.domain.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SiteUserRepository extends JpaRepository<SiteUser, Long> {
    Optional<SiteUser> findByEmail(String email); // 로그인 시 이메일로 사용자 조회
}