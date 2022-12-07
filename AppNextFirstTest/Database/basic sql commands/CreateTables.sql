CREATE TABLE Users (UserId int PRIMARY KEY NOT NULL, 
                    Username varchar(255) NOT NULL);

CREATE Table Tasks (TaskId int PRIMARY KEY NOT NULL,
                    Title varchar(255) NOT NULL,
                    Description varchar(255) NOT NULL,
                    UserId int int NOT NULL,
                    FOREIGN KEY(UserId) REFERENCES Users(UserId));