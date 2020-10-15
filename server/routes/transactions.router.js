const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  queryText = `SELECT "category"."name" as "category", "category"."budgetedAmount", SUM("transaction"."amount") as "categoryAmount" FROM "user"
  JOIN "transaction"
  ON "transaction"."userId" = "user"."id"
  JOIN "category"
  ON "category"."id" = "transaction"."categoryId"
  WHERE "transaction"."date" BETWEEN '2020/10/01' AND '2020/10/31'
  GROUP BY "category"."name", "category"."budgetedAmount"
  ORDER BY "category"."name" ASC
  ;`;
  pool
    .query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('we got an error in transactions router', err);
      res.sendStatus(500);
    });
});

module.exports = router;