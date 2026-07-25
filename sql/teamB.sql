-- Genre Table
CREATE TABLE genre (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(50) NOT NULL
);

-- SiteUser Table
CREATE TABLE site_user (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(50),
    email VARCHAR2(100),
    passwd VARCHAR2(100),
    address VARCHAR2(200),
    phone VARCHAR2(50),
    favorite_genre_id NUMBER,
    FOREIGN KEY (favorite_genre_id) REFERENCES genre(id)
);

DROP SEQUENCE site_user_seq;

-- 삭제 후 다시 생성
CREATE SEQUENCE site_user_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

-- Game Table
CREATE TABLE game (
    id NUMBER PRIMARY KEY,
    title VARCHAR2(100),
    description VARCHAR2(1000),
    release_year NUMBER,
    image_url VARCHAR2(500),
    genre_id NUMBER,
    FOREIGN KEY (genre_id) REFERENCES genre(id)
);

ALTER TABLE game MODIFY release_year DATE;

SELECT sequence_name FROM user_sequences WHERE sequence_name = 'GAME_SEQ';

ALTER TABLE game MODIFY image_url VARCHAR2(1000 CHAR);

CREATE SEQUENCE game_seq
START WITH 1
INCREMENT BY 1
NOCACHE;



-- Review Table
CREATE TABLE review (
    id NUMBER PRIMARY KEY,
    user_id NUMBER,
    game_id NUMBER,
    rating NUMBER,
    content VARCHAR2(1000),
    created_at DATE DEFAULT SYSDATE,
    FOREIGN KEY (user_id) REFERENCES site_user(id),
    FOREIGN KEY (game_id) REFERENCES game(id)
);
CREATE SEQUENCE review_seq
START WITH 101
INCREMENT BY 1
NOCACHE
NOCYCLE;



-- 1. 장르 등록
INSERT INTO genre (id, name) VALUES (1, '공포');
INSERT INTO genre (id, name) VALUES (2, 'RPG');
INSERT INTO genre (id, name) VALUES (3, 'FPS');
INSERT INTO genre (id, name) VALUES (4, '전략');
INSERT INTO genre (id, name) VALUES (5, '디펜스');

-- 공포 
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'R.E.P.O.',
    '최대 6명의 플레이어와 함께하는 온라인 협력 호러 게임. 완전한 물리 기반의 값진 물건을 찾아 조심스럽게 다루고, 이를 회수해 탈출하여 창조주의 욕망을 충족시키세요.',
    TO_DATE('2025-02-26', 'YYYY-MM-DD'),
    'https://i.namu.wiki/i/JosyHhXfu-pKAgz7IVlVtJc60a4_l5lqXBpztJXKgqh58KxY2aR8ZLwtbyX6qOaKNI0yME4Zm9etkJhwaDaXQehhzsWxgGkPhA4habkTBnL46uOgOqyD-3WWLRrhP7dS423uC4dSSzIuBny9ny6BUA.webp',
    1
);
SET DEFINE OFF;
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'Five Nights at Freddy''s',
    '수리공을 부르는 것보다 당신을 경비원으로 고용하는 것이 훨씬 저렴했기 때문이죠. 과연 5일 밤을 무사히 살아남을 수 있을까요?',
    TO_DATE('2014-08-18', 'YYYY-MM-DD'),
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDNfMjY4%2FMDAxNjQ4OTg0NDU2NDE1.Gegg1rX5zTyzAFUAu2lGdUg2qi_aTNbJyfIbGaVeR9cg._xCF4d0oFiWWCQtaVO88MipHTqAy3G6YlXKCxK11LiYg.JPEG.eeuu1133%2F%25C7%25C1%25B7%25B9%25B5%25F0%25C0%25C7%25C7%25C7%25C0%25DA%25B0%25A1%25B0%25D4_8.jpg&type=sc960_832',
    1
);

INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'The Exit 8',
    '당신은 끝없는 지하 통로에 갇혀있습니다. 주변을 주의 깊게 관찰하여 "8번 출구"에 도달하세요.',
    TO_DATE('2023-11-29', 'YYYY-MM-DD'),
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAyMDVfNiAg%2FMDAxNzA3MTI5MzAzMTk4.pCp4hqKemFUxjXwkQADddKQscgxbRfSEAWkTnZ8UqPYg.hsglHFVXLLACVUcCvA9oJC9F0FPoRFFF_j2YK7QPSvIg.JPEG.mssixx%2FIMG_5773.jpg&type=sc960_832',
    1
);

INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'Escape the Backrooms',
    '플레이어는 숨어 있는 것의 손아귀에 있으며 탈출하기 위해 필요한 모든 조치를 취해야 합니다.',
    TO_DATE('2022-08-12', 'YYYY-MM-DD'),
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MjNfMjgy%2FMDAxNzI3MDY3OTczMTIz.FGcLjZI0CWah0rjhXgpnsEn-yl77InBLVIC2SEreExcg.813PimIMtMZbmycAk1ycZLtfvxdR7TW0LdB_OwAKuJgg.JPEG%2F1.jpg&type=sc960_832',
    1
);

INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'Poppy Playtime',
    '공포/퍼즐 어드벤처에서 살아남아야 합니다. 버려진 장난감 공장에서 복수심에 불타며 기다리고 있는 장난감에게서 살아남으세요.',
    TO_DATE('2021-10-13', 'YYYY-MM-DD'),
    'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000075091/266a2c89eff8ee813d172a684eae776c00d950d69bc99926064ed2cb5b527bdd',
    1
);

-- rpg
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'Palworld',
    '드넓은 세계에 서식하는 신비한 생물 ''팰''을 수집하여 전투, 건축, 농업에 투입하거나 공장에서 일을 시키는 멀티 지원 오픈월드 서바이벌 크래프트 게임입니다.',
    TO_DATE('2024-01-19', 'YYYY-MM-DD'),
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMzBfMTQ0%2FMDAxNzA2NTk4MTQ2MTUw.hhIRmlOagYPAh4tVRNUMwn2bBzyfg-5ZEtCkFNzueLMg.QKh8w1xMx-aqF-wGQVqhXWC_DJB-abiH0celHSIx6ncg.PNG.gray5004%2F%25C6%25D3%25BF%25F9%25B5%25E5_%252816%2529.png&type=sc960_832',
    2
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'Monster Hunter Wilds',
    '거칠고 치열한 자연의 습격. 시시각각 역동적으로 그 모습을 바꾸는 필드. 양면성을 지닌 세계를 살아가는 몬스터와 사람들의 이야기.',
    TO_DATE('2025-02-28', 'YYYY-MM-DD'),
    'https://i.namu.wiki/i/koVAXbdV9pbcbejyjtw9Svs9reetSxqOyTnewLBR7terlmAAsN6uB94NCG0KBPugXcgGwFx-id4wJyYqLzvXHgbtL-EMMsSBpbGcirTL73hxhvgkySpeSg4NE9rAx8mRlPFr0oFKiBYkw1iIghbv5g.webp',
    2
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'DARK SOULS III',
    '다크 소울3는 액션 롤플레잉 비디오 게임의 하나로, 프롬 소프트웨어가 개발하고 반다이 남코 엔터테인먼트가 배급하는 게임이다.',
    TO_DATE('2016-04-12', 'YYYY-MM-DD'),
    'https://gagadget.com/media/uploads/nwsdarksoulsiiigame1600x900.jpg',
    2
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'terraria',
    '땅을 파고, 싸우고, 탐험하고, 건설하세요! 액션으로 가득 찬 이 모험 게임에서라면 무엇이든 가능합니다. 세상이 곧 캔버스이고, 땅 그 자체가 물감입니다.',
    TO_DATE('2011-05-16', 'YYYY-MM-DD'),
    'https://gaming-cdn.com/images/products/932/orig/terraria-pc-mac-game-steam-cover.jpg?v=1683791474',
    2
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'ELDEN RING',
    '거대한 던전이 경계선 없이 이어지는 드넓은 세계의 탐색 끝에는 미지의 것들을 발견했다는 기쁨과 높은 성취감으로 이어지는 압도적인 위협이 플레이어를 기다립니다.',
    TO_DATE('2022-02-25', 'YYYY-MM-DD'),
    'https://i.ytimg.com/vi/C3fW-LIoDLc/maxresdefault.jpg',
    2
);


-- fps
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'Apex 레전드',
    '이 게임은 프론티어 곳곳의 유명한 인물들이 돈과 명성, 그리고 영광을 차지하기 위해 싸우는 치열한 스포츠입니다.',
    TO_DATE('2019-02-05', 'YYYY-MM-DD'),
    'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fassets.nintendo.com%2Fimage%2Fupload%2Ff_auto%2Fq_auto%2Fdpr_1.5%2Fc_scale%2Cw_600%2Fncom%2Fsoftware%2Fswitch%2F70010000024591%2F066ead069f5ac48a8d893d28b59268b550027c4b6be8f5a597038519d369be66&type=sc960_832',
    3
);

INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'Tom Clancy''s Rainbow Six Siege',
    'Tom Clancy’s Rainbow Six Siege에서 파괴의 예술과 각종 장비를 숙달해보십시오. 매 순간 강렬한 근접 전투, 치열함, 전략적 결정, 팀 플레이, 폭발적인 액션을 경험할 수 있습니다.',
    TO_DATE('2015-12-01', 'YYYY-MM-DD'),
    'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi1.ruliweb.com%2Fimg%2F21%2F05%2F03%2F1793063d5f34ffdac.jpeg&type=sc960_832',
    3
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'Delta Force',
    'Delta Force는 무료 전술 FPS 게임으로, 크로스 플레이를 지원합니다. 짜릿한 액션 FPS 전투를 체험해 보세요.',
    TO_DATE('2024-12-05', 'YYYY-MM-DD'),
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEyMDZfNiAg%2FMDAxNzMzNDU2ODE0NDA4.haGtBNuNUXnSqSb5OVPD9x-ZNOM5EhD6rGIehwqEJRQg.Gh7uDUJYBL6QI-J_je5eY3hHhiJHMImSm4jPUWKu05kg.PNG%2F%25C0%25DA%25BB%25EA_1536.png&type=sc960_832',
    3
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'THE FINALS',
    '전 세계 명소를 배경으로 한 가상의 세계에서 펼쳐지는 전투 중심의 게임쇼, THE FINALS에 참여하세요!',
    TO_DATE('2023-12-08', 'YYYY-MM-DD'),
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5611%2F2024%2F06%2F08%2F0000021507_001_20240608222820592.jpg&type=sc960_832',
    3
);

INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    '오버워치 2',
    '오버워치(Overwatch)는 블리자드 엔터테인먼트가 개발하고 배급하는 다중 사용자 1인칭 슈팅 게임',
    TO_DATE('2022-10-05', 'YYYY-MM-DD'),
    'https://i.namu.wiki/i/2NhbPFwj28v-TPcQp7Cgxy8wKNzT8ET6jvEhMblx5PqPe-lIE1Iu2bT0qVMhCTSoihfXdEcFpeJxsODhycMVyQ.webp',
    3
);

-- 전략 
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    '에이지 오브 엠파이어2',
    '에이지 오브 엠파이어 2는 중세 시대를 배경으로 자원을 수집하고 건물을 건설하며 군대를 양성해 다른 문명과 전투를 벌이는 실시간 전략 시뮬레이션 게임이다. 다양한 문명과 유닛, 전략적 요소가 특징이다.',
    TO_DATE('1999-09-30', 'YYYY-MM-DD'),
    'https://i3.ruliweb.com/ori/23/04/26/187bc1daa4f242da.jpg',
    4  -- 전략 장르의 genre_id (전략 장르가 4번이라고 가정)
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    '슈프림 커맨더',
    '게임의 룰은 간단하게 맵에 양자 게이트웨이를 통해 떨어진, 플레이어의 아바타라 할 수 있는 ACU를 이용해 군 병력을 거의 무한정으로 뽑아내 적과 전쟁을 벌이고 모두 다 전멸시키거나 적의 ACU를 파괴하는 것이 목적',
    TO_DATE('2007-02-16', 'YYYY-MM-DD'),
    'https://i.ytimg.com/vi/YTEK91uEvPo/maxresdefault.jpg',
    4
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    '홈 월드',
    '우주의 3차원에서 싸우는, 기존까지는 그래픽에만 쓰이던 3D라는 소재를 전략적 요소까지 확대시킨 작품.',
    TO_DATE('1999-09-28', 'YYYY-MM-DD'),
    'https://mblogthumb-phinf.pstatic.net/20160112_188/reviewbong_1452573211039HqXlj_JPEG/ByMWEW4E7lT8.840x0.Vdef9Kkm.jpg?type=w966',
    4
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    '워크래프트 3: 리포지드',
    '2002년 실시간 전략 비디오 게임 워크래프트 III: 레인 오브 카오스, 또 해당 게임의 확장팩 프로즌 쓰론의 리마스터 에디션이다.',
    TO_DATE('2020-01-29', 'YYYY-MM-DD'),
    'https://visla.kr/wp/wp-content/uploads/2023/02/20230201_01-2-1.jpg',
    4
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    '스타크래프트 2',
    '먼 미래를 배경으로 다양한 종족 간의 은하계 지배를 둘러싼 투쟁을 중심으로 이야기가 전개됩니다.',
    TO_DATE('2016-03-29', 'YYYY-MM-DD'),
    'https://blz-contentstack-images.akamaized.net/v3/assets/blt0e00eb71333df64e/bltfb62592bc0dec5c4/65ca9d3eab0207a2e556c801/og_image.webp',
    4
);

-- 디펜스 
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'Tower Dominion',
    '외계인의 침략으로부터 요새를 방어하면서, 지형을 건설하고 설계해야 합니다. 다양한 파괴적 타워를 업그레이드하며 방어선을 지켜내세요!',
    TO_DATE('2025-05-08', 'YYYY-MM-DD'),
    'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3226530/13a24325ad5b7f51e25d7a9a2da36b31e05627dc/ss_13a24325ad5b7f51e25d7a9a2da36b31e05627dc.1920x1080.jpg?t=1746823766',
    5
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'Plants vs. Zombies',
    '좀비들이 당신의 집을 침략하려는 마당에, 그에 대한 유일한 방어책은 여러분의 식물 군단입니다! 재빠르게 판단하고 식물을 심어 몰려오는 좀비를 막아내세요.',
    TO_DATE('2009-05-06', 'YYYY-MM-DD'),
    'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/3590/0000008150.1920x1080.jpg?t=1738970324',
    5
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    'Nordhold',
    '히어로를 선택하고 시너지 효과가 가득한 타워 업그레이드를 활용하며 절차적으로 생성된 풍경에서 장대한 전투에 맞서세요.',
    TO_DATE('2025-03-26', 'YYYY-MM-DD'),
    'https://www.premiumcdkeys.com/cdn/shop/files/000_202503190953_nordholdbig.jpg?v=1743093905',
    5
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    '변경의 수호자',
    '변화무쌍한 스테이지에서 도시를 건설하고 적의 맹렬한 공격에 맞서 방어하며, 강력한 방어로 적군을 물리치세요! 국경에서 전설을 세우고 왕국을 확장하세요!',
    TO_DATE('2025-02-06', 'YYYY-MM-DD'),
    'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2346410/ss_cf7edef188361f50dec9d859572671e8b892e9fc.1920x1080.jpg?t=1746724680',
    5
);
INSERT INTO game (id, title, description, release_year, image_url, genre_id)
VALUES (
    game_seq.NEXTVAL,
    '돔 키퍼',
    '외계인들의 물결을 상대로 막아보세요. 자원을 위해 땅을 파고 강력한 업그레이드의 방향을 결정하세요.',
    TO_DATE('2022-09-27', 'YYYY-MM-DD'),
    'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1637320/ss_7e8e99ca62ac48386cfa23b846c413ce311ce6c3.1920x1080.jpg?t=1746703166',
    5
);






SELECT * FROM site_user;
SELECT * FROM review;
SELECT * FROM game;
SELECT * FROM genre;



commit;