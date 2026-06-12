ALTER TABLE users
    ADD CONSTRAINT uc_users_login UNIQUE (login);