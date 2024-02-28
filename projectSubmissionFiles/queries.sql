-- Contain a join of at least three tables
-- What are all the skills and their proficiency of the team members in team with ID 2
SELECT skill_level, skill_type, first_name, user_id
FROM User
NATURAL JOIN Team
NATURAL JOIN Skill
NATURAL JOIN SkillLevel
NATURAL JOIN SkillType
WHERE team_id == 2

-- One must contain a subquery
-- Gets the first and last name of all users who are in a team with an associated project
SELECT first_name, last_name
FROM User
JOIN Team ON Team.team_id = User.team_id
WHERE User.team_id IN (SELECT team_id FROM Project);

-- One must be a group by with a having clause
-- Gets all the skill levels that have greater than 30 users
SELECT skill_level, COUNT(*) AS total_users
FROM Skill
NATURAL JOIN SkillLevel
GROUP BY skill_level_id
HAVING COUNT(*) > 30;

-- One must contain a complex search criterion (more than one expression with logical connectors). Experiment with advanced query mechanisms such as RCTE, PARTITION BY, or SELECT CASE/WHEN
-- Shows the first and last name of all users, and says whether they have a team or not
SELECT first_name, last_name ,
       CASE
           WHEN team_id IS NULL THEN 'No Team'
           ELSE 'Has Team'
       END AS team_status
FROM User;

-- Shows the number of users in each skill at each proficiency level
SELECT skill_type AS skill, skill_level AS skill_level, COUNT(user_id)
FROM Skill
NATURAL JOIN User
NATURAL JOIN SkillType
NATURAL JOIN SkillLevel
GROUP BY skill_type, skill_level;