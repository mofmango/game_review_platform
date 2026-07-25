package ce.mnu.projectB.domain;

import lombok.Data;

@Data
public class SiteUserDTO {
    private String name;
    private String email;
    private String passwd;
    private String address;
    private String phone;
    private Long favoriteGenreId;
}