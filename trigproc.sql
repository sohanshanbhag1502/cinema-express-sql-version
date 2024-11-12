USE CINEMAEXPRESS;

DROP PROCEDURE addUser;
DROP PROCEDURE addAdmin;
DROP FUNCTION authUser;
DROP FUNCTION authAdmin;
DROP PROCEDURE addUser;
DROP PROCEDURE addAdmin;
DROP TRIGGER checkUniqueUserMail;
DROP TRIGGER checkUniqueAdminMail;

DELIMITER //
CREATE PROCEDURE addUser(
	IN userId VARCHAR(255),
    IN name VARCHAR(255),
    IN email VARCHAR(255),
    IN phNum CHAR(10),
    IN dob DATE,	
    IN passwd TEXT,
    IN gender ENUM('Male', 'Female')
)
BEGIN
    DECLARE hashedPasswd TEXT;
	SET hashedPasswd = SHA2(passwd, 256);
    INSERT INTO User (userId, name, email, phNum, dob, passwd, gender) 
    VALUES(userId, name, email, phNum, dob, hashedPasswd, gender);
END //

CREATE PROCEDURE addAdmin(
	IN adminId VARCHAR(255),
    IN name VARCHAR(255),
    IN email VARCHAR(255),
    IN passwd TEXT
)
BEGIN
    DECLARE hashedPasswd TEXT;
	SET hashedPasswd = SHA2(passwd, 256);
    INSERT INTO Admin (adminId, name, email, passwd)
	VALUES (adminId, name, email, hashedPasswd);
END //

CREATE FUNCTION authUser(
    in_userId VARCHAR(255),
    in_passwd TEXT
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE isValid BOOLEAN DEFAULT FALSE;
    IF EXISTS (
        SELECT 1 FROM User u
        WHERE u.userId COLLATE utf8mb4_unicode_ci = in_userId COLLATE utf8mb4_unicode_ci
        AND u.passwd COLLATE utf8mb4_unicode_ci = SHA2(in_passwd, 256) COLLATE utf8mb4_unicode_ci
    ) THEN
        SET isValid = TRUE;
    END IF;

    RETURN isValid;
END //

CREATE FUNCTION authAdmin(
    in_adminId VARCHAR(255),
    in_passwd TEXT
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE isValid BOOLEAN DEFAULT FALSE;
    IF EXISTS (
        SELECT 1 FROM Admin a
        WHERE a.adminId COLLATE utf8mb4_unicode_ci = in_adminId COLLATE utf8mb4_unicode_ci
        AND a.passwd COLLATE utf8mb4_unicode_ci = SHA2(in_passwd, 256) COLLATE utf8mb4_unicode_ci
    ) THEN
        SET isValid = TRUE;
    END IF;

    RETURN isValid;
END //

CREATE TRIGGER checkUniqueUserMail
BEFORE INSERT ON User
FOR EACH ROW
BEGIN
    DECLARE email_count INT;

    SELECT COUNT(*) INTO email_count
    FROM User
    WHERE email = NEW.email;

    IF email_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email already exists in the User table.';
    END IF;
END //

CREATE TRIGGER checkUniqueAdminMail
BEFORE INSERT ON Admin
FOR EACH ROW
BEGIN
    DECLARE email_count INT;

    SELECT COUNT(*) INTO email_count
    FROM Admin
    WHERE email = NEW.email;

    IF email_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email already exists in the User table.';
    END IF;
END //
DELIMITER ;