# Q&A API Service
This project is a back-end follow-up to the L77 Online Clothing Store project in which a front-end web app was built using an external API for its data needs. Of the front-end web app's 4 pages (Product Information, Related Products, Q&A, and Ratings/Reviews), I took Q&A and built an API service for it from scratch. My API service is interchangable on the front-end with the previous external API.

## Tech Stack
<p align="left"> <a href="https://aws.amazon.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> </p>

## Special Feature - Custom Caching
https://user-images.githubusercontent.com/37204126/223299851-b8932ae1-1843-49bd-9748-3f35f15e49c3.mp4

###### One of the optimizations I applied was creating a least recently used (LRU) cache data structure and inserting it within my server routes. It doubled the requests/seconds under load, from around 1200 to 2400.

## How to Use
Contact me if you'd like to try using it. It's deployed to AWS EC2, however, I turned the instance off to save costs. 

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
