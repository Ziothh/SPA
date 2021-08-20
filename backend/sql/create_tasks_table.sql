CREATE TABLE tasks (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    taskset VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    tags VARCHAR(6500),
    deadline VARCHAR(255),
    is_bookmarked BOOLEAN NOT NULL,
    sub_tasks VARCHAR(6500),
    PRIMARY KEY (id)
)