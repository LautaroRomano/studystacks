CREATE database studystacks;
use studystacks;

CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  registration_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_date DATETIME
);

CREATE TABLE Communities (
  community_id INT PRIMARY KEY AUTO_INCREMENT,
  community_name VARCHAR(255) NOT NULL,
  community_description TEXT NOT NULL,
  creation_date DATETIME NOT NULL,
  creator_user_id INT NOT NULL,
  FOREIGN KEY (creator_user_id) REFERENCES Users (user_id)
);

CREATE TABLE Section (
  section_id INT PRIMARY KEY AUTO_INCREMENT,
  section_name VARCHAR(255) NOT NULL,
  section_description TEXT NOT NULL,
  creation_date DATETIME NOT NULL,
  creator_user_id INT NOT NULL,
  community_id INT NOT NULL,
  FOREIGN KEY (creator_user_id) REFERENCES Users (user_id),
  FOREIGN KEY (community_id) REFERENCES Communities (community_id)
);

CREATE TABLE Posts (
  post_id INT PRIMARY KEY AUTO_INCREMENT,
  post_title VARCHAR(255) NOT NULL,
  post_body TEXT NOT NULL,
  creation_date DATETIME NOT NULL,
  creator_user_id INT NOT NULL,
  community_id INT NOT NULL,
  section_id INT,
  FOREIGN KEY (creator_user_id) REFERENCES Users (user_id),
  FOREIGN KEY (community_id) REFERENCES Communities (community_id),
  FOREIGN KEY (section_id) REFERENCES Section (section_id)
);

CREATE TABLE Comments (
  comment_id INT PRIMARY KEY AUTO_INCREMENT,
  comment_text TEXT NOT NULL,
  creation_date DATETIME NOT NULL,
  creator_user_id INT NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (creator_user_id) REFERENCES Users (user_id),
  FOREIGN KEY (post_id) REFERENCES Posts (post_id)
);

CREATE TABLE Votes (
  vote_id INT PRIMARY KEY AUTO_INCREMENT,
  vote_value INT NOT NULL,
  creation_date DATETIME NOT NULL,
  creator_user_id INT NOT NULL,
  post_id INT,
  comment_id INT,
  FOREIGN KEY (creator_user_id) REFERENCES Users (user_id),
  FOREIGN KEY (post_id) REFERENCES Posts (post_id),
  FOREIGN KEY (comment_id) REFERENCES Comments (comment_id)
);

-- Relacionar usuarios en comunidades