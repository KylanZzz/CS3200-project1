const express = require('express');
const server = express();
const port = 4004;
const path = require('path');
const sqlite = require('sqlite3').verbose();
const dbPath = 'db/project1.db';
const cors = require('cors');

//open database connection
let db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("error");
        return;
    }
    console.log("connected to sqlite database");
})

server.use(express.json());
server.use(cors());


server.post('/addUser', (req, res) => {
    const {email, first_name, last_name, phone_number, address, bio, skill_level_list, skill_type_list} = req.body;
    const insertUserSql = 'INSERT INTO User (email, first_name, last_name, phone_number, address, bio) VALUES (?, ?, ?, ?, ?, ?)';

    db.run(insertUserSql, [email, first_name, last_name, phone_number, address, bio], function (err) {
        if (err) {
            console.log("error inserting into user");
        } else {
            const userId = this.lastID;
            for (let i = 0; i < skill_level_list.length; i++) {
                const selectSkillTypeIdSql = 'SELECT skill_type_id FROM SkillType WHERE skill_type = ?';
                let skillTypeId;
                db.get(selectSkillTypeIdSql, [skill_type_list[i]], (err, typeRow) => {
                    if (err) {
                        console.log("error getting skillType");
                    }
                    skillTypeId = typeRow.skill_type_id;
                    const selectSkillLevelIdSql = 'SELECT skill_level_id FROM SkillLevel WHERE skill_level = ?';
                    let skillLevelId
                    db.get(selectSkillLevelIdSql, [skill_level_list[i]], (err, levelRow) => {
                        if (err) {
                            console.log("error getting skillType");
                        }
                        skillLevelId = levelRow.skill_level_id;
                        console.log("skill level id: " + skillLevelId);
                        console.log("skill type id: " + skillTypeId);
                        console.log("user id: " + userId);
                        const insertSkillSql = 'INSERT INTO Skill (skill_type_id, skill_level_id, user_id) VALUES (?, ?, ?)';
                        db.run(insertSkillSql, [skillTypeId, skillLevelId, userId], (err) => {
                            if (err){
                                console.log("error inserting into skills");
                            }
                        })
                    })
                })
            }
        }
    })
})

server.get("/getSkillType", (req, res) => {
    const sql = 'SELECT skill_type FROM SkillType';

    db.all(sql, [], (err, rows) => {
        res.json(rows);
    });
});

server.get("/getSkillLevel", (req, res) => {
    const sql = 'SELECT skill_level FROM SkillLevel';

    db.all(sql, [], (err, rows) => {
        res.json(rows);
    });
});

server.use(express.static(path.join(__dirname, 'client')));

server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
})

// start server
server.listen(port, (error) => {
    console.log("Server is running on http://127.0.0.1:" + port);
})

