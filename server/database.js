const {Pool} = require('pg');
const {POSTGRESQL_USER, POSTGRESQL_PASSWORD, POSTGRESQL_PORT} = require('../config.js');

const pool = new Pool({
  user: POSTGRESQL_USER,
  host: 'localhost',
  database: 'qanda',
  password: POSTGRESQL_PASSWORD,
  port: POSTGRESQL_PORT,
})

const getQuestions = function (product_id, count) {
  return pool.query(`SELECT * FROM questions WHERE product_id='${product_id}' AND reported = false LIMIT ${count}`)
}

const getQuestionAnswers = function (product_id, count) {
  return pool.query(`SELECT * FROM answers WHERE reported = false AND question_id IN (SELECT question_id FROM questions WHERE product_id='${product_id}' AND reported = false LIMIT ${count})`)
}

const getQuestionAnswersPhotos = function (product_id, count) {
  return pool.query(`SELECT * FROM photos WHERE answer_id IN (SELECT answer_id FROM answers WHERE reported = false AND question_id IN (SELECT question_id FROM questions WHERE product_id='${product_id}' AND reported = false LIMIT ${count}))`)
}

const getAnswers = function (question_id, count) {

  return pool.query(`SELECT * FROM answers WHERE reported = false AND question_id='${question_id}' LIMIT ${count}`)
}

const getAnswersPhotos = function (question_id, count) {
  return pool.query(`SELECT * FROM photos WHERE answer_id IN (SELECT answer_id FROM answers WHERE reported = false AND question_id='${question_id}' LIMIT ${count})`)
}

const saveQuestion = function(formData) {
  return pool.query('INSERT INTO questions (product_id, question_body, asker_name, asker_email) VALUES ($1, $2, $3, $4)', [formData.product_id, formData.body, formData.name, formData.email])
}

const saveAnswer = function(question_id, {body, name, email}) {
  return pool.query('INSERT INTO answers (question_id, body, answerer_name, answerer_email) VALUES ($1, $2, $3, $4) RETURNING answer_id', [question_id, body, name, email])
}

const savePhotos = function(answer_id, photos) {
  photos = photos.map((photo)=> {
    return `(${answer_id}, '${photo}')`
  })
  photos = photos.join(',')
  return pool.query(`INSERT INTO photos (answer_id, url) VALUES ${photos}`)
}

function incrementQuestionHelpfulnessCount (question_id) {
  return pool.query(`UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${question_id}`)
}

function flagQuestionAsReported (question_id) {
  return pool.query(`UPDATE questions SET reported = true WHERE question_id = ${question_id}`)
}

function incrementAnswerHelpfulnessCount(answer_id) {
  return pool.query(`UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = ${answer_id}`)
}

function flagAnswerAsReported(answer_id) {
  return pool.query(`UPDATE answers SET reported = true WHERE answer_id = ${answer_id}`)
}

module.exports = {
  getQuestions: getQuestions,
  getQuestionAnswers: getQuestionAnswers,
  getQuestionAnswersPhotos: getQuestionAnswersPhotos,
  getAnswers: getAnswers,
  getAnswersPhotos: getAnswersPhotos,
  saveQuestion: saveQuestion,
  saveAnswer: saveAnswer,
  savePhotos: savePhotos,
  incrementQuestionHelpfulnessCount: incrementQuestionHelpfulnessCount,
  flagQuestionAsReported: flagQuestionAsReported,
  incrementAnswerHelpfulnessCount: incrementAnswerHelpfulnessCount,
  flagAnswerAsReported: flagAnswerAsReported
}