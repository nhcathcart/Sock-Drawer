--This is the file to create the database tables--
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  username VARCHAR(50) PRIMARY KEY,
  passwordhash VARCHAR(256) NOT NULL,
  token VARCHAR(256)
);

DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) REFERENCES users(username),
  status VARCHAR(50) NOT NULL,
  task_text TEXT NOT NULL,
  notes TEXT[]
);

DROP TABLE IF EXISTS sub_tasks CASCADE;
CREATE TABLE sub_tasks (
  id SERIAL PRIMARY KEY,
  task_id INT REFERENCES tasks(id),
  completed BOOLEAN NOT NULL,
  task_text TEXT NOT NULL
);