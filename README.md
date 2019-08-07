# Course-Rating-API
REST API used to view information about courses and their reviews and users. Uses Express along with MongoDB for the database and Mongoose for object models.

Before using, ensure you have MongoDB installed.

To set up the API:
1. Download files, open a terminal, and navigate to its directory
2. Run: npm install

Run the following commands in the terminal:
1. mongoimport --db course-api --collection courses --type=json --jsonArray --file courses.json
2. mongoimport --db course-api --collection users --type=json --jsonArray --file users.json
3. mongoimport --db course-api --collection reviews --type=json --jsonArray --file reviews.json

To start the API:
1. In a separate terminal, run: mongod
2. In the original terminal, run: npm start

To test the API:
1. Open Postman
2. Click 'Import' at top left corner
3. Select 'Choose Files' and browse to directory of project files
4. Select the file: CourseAPI.postman_collection.json
