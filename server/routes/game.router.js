const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {

    // Info to GET from game table
    // ! May need to adjust req.params.id
    let queryText = 

    `SELECT "game"."id",
	   "player_one_id", "user1"."first_name" as "player_one_first_name",
	   "player_two_id", "user"."first_name" as "player_two_first_name", 
	   "is_ongoing", "active_respondent_id", "active_scene", "winner_id", 
	   to_char("game"."date_created", 'MM-dd-yy') AS "date_created" 
	 
	 FROM "game"
	 
	 INNER JOIN "user" as "user1" on "user1"."id" = "game"."player_one_id"
     INNER JOIN "user" on "user"."id" = "game"."player_two_id" 
    
     WHERE "player_one_id" = $1 OR "player_two_id" = $1;`;
    
    
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in game.router GET', error);
            res.sendStatus(500);
        });

});

module.exports = router;