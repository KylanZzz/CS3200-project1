All the submission files are in projectSubmissionFiles folder

A. The requirements document as a PDF.
business-proposal.pdf

B. UML Class Diagram as an embedded JPG/PNG.
UML.pdf

C. ERD as an embedded JPG/PNG and URL to its LucidChart diagram.
ERD.pdf
Lucid charts link: https://lucid.app/lucidchart/bd1c0f0c-5d73-414a-b51a-57d4aa528a9d/edit?viewport_loc=-2033%2C-154%2C2050%2C1110%2C0_0&invitationId=inv_4ebee1a2-4c8f-4b4a-88ad-5d4204f99dde

D. Definition of relational schema with proof that it is in BCNF.
relationalSchema.pdf

E. SQL file (text file) with the table definitions and creation SQL statements that can be executed with SQLite3
table_creation.sql

F. SQL files for each one of the queries created on point 7, with clear documentation of what they achieve and examples of their outputs.
queries.sql

G. run the project in the terminal using
$node server.js

Application description:
This application is the registration page for users. Users fill out information such as their name, email, phone
number, etc. They can then check off any skills they own, as well as their proficiency in them. Afterward,
they can click the submit button which will register them as a user along with all their skills in the database.

The skills can be toggled on or off, but the user MUST select their proficiency. The list of skills and proficiency
levels is queried from the database, not hardcoded in the frontend. I only had three skills added for demonstration
purposes.