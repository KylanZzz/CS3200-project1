CREATE TABLE "Team" (
	"team_id"	INTEGER,
	"team_name"	TEXT,
	PRIMARY KEY("team_id")
);

CREATE TABLE "User" (
	"user_id"	INTEGER,
	"team_id"	INTEGER,
	"email"	TEXT,
	"first_name"	TEXT,
	"last_name"	TEXT,
	"phone_number"	INTEGER,
	"address"	BLOB,
	"bio"	INTEGER,
	FOREIGN KEY("team_id") REFERENCES "Team"("team_id"),
	PRIMARY KEY("user_id")
);

CREATE TABLE "SkillLevel" (
	"skill_level_id"	INTEGER,
	"skill_level"	INTEGER,
	PRIMARY KEY("skill_level_id")
);

CREATE TABLE "SkillType" (
	"skill_type_id"	INTEGER,
	"skill_type"	TEXT,
	PRIMARY KEY("skill_type_id")
);

CREATE TABLE "Skill" (
	"skill_id"	INTEGER,
	"skill_type_id"	INTEGER,
	"skill_level_id"	INTEGER,
	"user_id"	INTEGER,
	FOREIGN KEY("skill_level_id") REFERENCES "SkillLevel"("skill_level_id"),
	FOREIGN KEY("user_id") REFERENCES "User"("user_id"),
	FOREIGN KEY("skill_type_id") REFERENCES "SkillType"("skill_type"),
	PRIMARY KEY("skill_id")
);

CREATE TABLE "Project" (
	"project_id"	INTEGER,
	"project_name"	TEXT,
	"description"	TEXT,
	"github_link"	TEXT,
	"demo_link"	TEXT,
	"team_id"	INTEGER,
	FOREIGN KEY("team_id") REFERENCES "Team"("team_id"),
	PRIMARY KEY("project_id")
);

CREATE TABLE "ProjectSubmission" (
	"submission_id"	INTEGER,
	"project_id"	INTEGER,
	"submission_date"	INTEGER,
	PRIMARY KEY("submission_id"),
	FOREIGN KEY("project_id") REFERENCES "Project"("project_id")
);