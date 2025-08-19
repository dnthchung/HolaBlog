-- Schema: holablog
CREATE DATABASE IF NOT EXISTS holablog
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE holablog;

-- -------------------------
-- USERS (auth + profile)
-- -------------------------
CREATE TABLE users (
  id            VARCHAR(36)  NOT NULL,        -- UUID v4 as text
  email         VARCHAR(255) NOT NULL,
  password      VARCHAR(255) NULL,            -- NULL for Google-only
  name          VARCHAR(100) NOT NULL,
  avatar        VARCHAR(500) NULL,
  role          ENUM('admin','user') NOT NULL DEFAULT 'user',
  provider      ENUM('email','google','both') NOT NULL DEFAULT 'email',
  emailVerified BOOLEAN      NOT NULL DEFAULT FALSE,
  googleId      VARCHAR(255) NULL,
  resetToken        VARCHAR(255) NULL,
  resetTokenExpiry  DATETIME NULL,
  verifyToken       VARCHAR(255) NULL,
  verifyTokenExpiry DATETIME NULL,
  lastLoginAt    DATETIME NULL,
  createdAt      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_users_email (email),
  UNIQUE KEY uk_users_googleId (googleId),
  KEY idx_users_provider (provider),
  KEY idx_users_emailVerified (emailVerified)
) ENGINE=InnoDB;

-- -------------------------
-- POSTS
-- -------------------------
CREATE TABLE posts (
  id             VARCHAR(36)  NOT NULL,
  title          VARCHAR(255) NOT NULL,
  slug           VARCHAR(255) NOT NULL,
  content        LONGTEXT     NOT NULL,       -- Markdown
  excerpt        TEXT         NULL,
  featuredImage  VARCHAR(500) NULL,
  status         ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  authorId       VARCHAR(36)  NOT NULL,       -- Admin user
  publishedAt    DATETIME     NULL,
  createdAt      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_posts_slug (slug),
  KEY idx_posts_status_publishedAt (status, publishedAt),
  KEY idx_posts_author (authorId),
  CONSTRAINT fk_posts_author
    FOREIGN KEY (authorId) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB;

-- -------------------------
-- CATEGORIES & TAGS
-- -------------------------
CREATE TABLE categories (
  id          VARCHAR(36)  NOT NULL,
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(100) NOT NULL,
  description TEXT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_categories_name (name),
  UNIQUE KEY uk_categories_slug (slug)
) ENGINE=InnoDB;

CREATE TABLE tags (
  id   VARCHAR(36)  NOT NULL,
  name VARCHAR(50)  NOT NULL,
  slug VARCHAR(50)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_tags_name (name),
  UNIQUE KEY uk_tags_slug (slug)
) ENGINE=InnoDB;

-- -------------------------
-- N-N: POSTS ↔ CATEGORIES
-- -------------------------
CREATE TABLE post_categories (
  postId     VARCHAR(36) NOT NULL,
  categoryId VARCHAR(36) NOT NULL,
  PRIMARY KEY (postId, categoryId),
  KEY idx_pc_category (categoryId),
  CONSTRAINT fk_pc_post
    FOREIGN KEY (postId) REFERENCES posts(id)
    ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT fk_pc_category
    FOREIGN KEY (categoryId) REFERENCES categories(id)
    ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB;

-- -------------------------
-- N-N: POSTS ↔ TAGS
-- -------------------------
CREATE TABLE post_tags (
  postId VARCHAR(36) NOT NULL,
  tagId  VARCHAR(36) NOT NULL,
  PRIMARY KEY (postId, tagId),
  KEY idx_pt_tag (tagId),
  CONSTRAINT fk_pt_post
    FOREIGN KEY (postId) REFERENCES posts(id)
    ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT fk_pt_tag
    FOREIGN KEY (tagId) REFERENCES tags(id)
    ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB;

-- -------------------------
-- COMMENTS (nested with parentId)
-- -------------------------
CREATE TABLE comments (
  id        VARCHAR(36) NOT NULL,
  content   TEXT        NOT NULL,
  authorId  VARCHAR(36) NOT NULL,
  postId    VARCHAR(36) NOT NULL,
  parentId  VARCHAR(36) NULL,
  status    ENUM('pending','approved','rejected') NOT NULL DEFAULT 'approved',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_comments_post (postId),
  KEY idx_comments_author (authorId),
  KEY idx_comments_parent (parentId),
  KEY idx_comments_status_created (status, createdAt),
  CONSTRAINT fk_comments_author
    FOREIGN KEY (authorId) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT fk_comments_post
    FOREIGN KEY (postId) REFERENCES posts(id)
    ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT fk_comments_parent
    FOREIGN KEY (parentId) REFERENCES comments(id)
    ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB;

-- -------------------------
-- MEDIA (Cloudinary metadata) - Admin only per API
-- -------------------------
CREATE TABLE media (
  id            VARCHAR(36)  NOT NULL,
  provider      VARCHAR(32)  NOT NULL DEFAULT 'cloudinary',
  publicId      VARCHAR(255) NOT NULL,   -- cloudinary public_id
  url           VARCHAR(500) NOT NULL,
  format        VARCHAR(20)  NULL,
  width         INT NULL,
  height        INT NULL,
  bytes         BIGINT NULL,
  uploadedBy    VARCHAR(36)  NOT NULL,   -- user id (admin)
  createdAt     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_media_publicId (publicId),
  KEY idx_media_uploader (uploadedBy),
  CONSTRAINT fk_media_user
    FOREIGN KEY (uploadedBy) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE=InnoDB;

-- -------------------------
-- USER FAVORITES (for future /profile/favorites)
-- -------------------------
CREATE TABLE user_favorites (
  userId VARCHAR(36) NOT NULL,
  postId VARCHAR(36) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (userId, postId),
  KEY idx_fav_post (postId),
  CONSTRAINT fk_fav_user FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT fk_fav_post FOREIGN KEY (postId) REFERENCES posts(id)
    ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB;

-- -------------------------
-- OPTIONAL: REFRESH TOKENS store (rotation / revoke list)
-- -------------------------
CREATE TABLE refresh_tokens (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  userId     VARCHAR(36) NOT NULL,
  tokenHash  CHAR(64)    NOT NULL,           -- SHA-256 of token
  expiresAt  DATETIME    NOT NULL,
  revokedAt  DATETIME    NULL,
  createdAt  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  userAgent  VARCHAR(255) NULL,
  ip         VARBINARY(16) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_rt_tokenHash (tokenHash),
  KEY idx_rt_user_expires (userId, expiresAt),
  CONSTRAINT fk_rt_user FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB;

-- -------------------------
-- READ-HEAVY HELPERS (views)
-- -------------------------
CREATE OR REPLACE VIEW v_public_posts AS
SELECT p.id, p.title, p.slug, p.excerpt, p.featuredImage,
       p.publishedAt, p.createdAt, p.updatedAt, u.name AS authorName
FROM posts p
JOIN users u ON u.id = p.authorId
WHERE p.status = 'published';

CREATE OR REPLACE VIEW v_post_comment_counts AS
SELECT postId, COUNT(*) AS commentCount
FROM comments
WHERE status = 'approved'
GROUP BY postId;

-- -------------------------
-- SEED: admin user (đổi email/password sau)
-- -------------------------
INSERT INTO users (id, email, password, name, role, provider, emailVerified)
VALUES (UUID(), 'admin@example.com', '$2b$12$replace_me', 'Admin', 'admin', 'email', TRUE);
