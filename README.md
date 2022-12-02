# Q&A API Service
This project is a back-end follow-up to the L77 Online Clothing Store project in which a front-end web app was built using an external API for its data needs. Of the front-end web app's 4 pages (Product Information, Related Products, Q&A, and Ratings/Reviews), I took Q&A and built an API service for it from scratch. My API service is interchangable on the front-end with the previous external API.

## Tech Stack


## How to Use
The server is deployed at x. Feel free to use the routes below to explore. For POST routes, made-up body, name, and email values are fine. It is running on a 12GB EC2 instance however so please don't go crazy with posting. 

## API Reference Doc
* Route: GET /qa/questions
  * Description: Retrieves a list of questions for a particular product, with each question containing nested answers
    | parameter | type | description
    | :--       | :--  | :--
    |product_id | integer | product for which to retrieve questions. Valid, existing ids you may try range from 1 to 1000011.
   
* Route: GET /qa/questions/:question_id/answers
  * Description: Retrieves a list of answers for a particular question
    | parameter | type | description
    | :--       | :--  | :--
    |question_id | integer | Question for which to retrieve answers. Valid, existing ids you may try range from 1 to 3518963.

* Route: POST /qa/questions
  * Description: Add a question for a particular product
    | parameter | type | description
    | :--       | :--  | :--
    |body | text | Text of question being asked
    |name | text | username of question asker
    |email | text | email of question asker
    |product_id | integer | Product for which question is being asked. Valid, existing ids you may try range from 1 to 1000011.

* Route: POST /qa/questions/*/answers
  * Description: Add an answer to a particular question
    | parameter | type | description
    | :--       | :--  | :--
    |body | text | Text of answer
    |name | text | username of question answerer
    |email | text | email of question answerer
    |question_id | integer | Question for which answer is being added. Valid, existing ids you may try range from 1 to 3518963.

* Route: PUT /qa/questions/*/helpful
  * Description: Increment a question's helpfulness count by 1
    | parameter | type | description
    | :--       | :--  | :--
    |question_id | integer | Question to be upvoted as helpful. Valid, existing ids you may try range from 1 to 3518963.

* Route: PUT /qa/answers/*/helpful
  * Description: Increment an answer's helpfulness count by 1
    | parameter | type | description
    | :--       | :--  | :--
    |answer_id | integer | Answer to be upvoted as helpful. Valid, existing ids you may try range from 1 to 6879309.
  
* Route: PUT /qa/questions/*/report
  * Description: Report a question to make it no longer show in future GETs
    | parameter | type | description
    | :--       | :--  | :--
    |question_id | integer | Question to flag as reported. Valid, existing ids you may try range from 1 to 3518963.
  
* Route: PUT /qa/answers/*/report
  * Description: Report an answer to make it no longer show in future GETs
    | parameter | type | description
    | :--       | :--  | :--
    |answer_id | integer | Answer to flag as reported. Valid, existing ids you may try range from 1 to 3518963.
