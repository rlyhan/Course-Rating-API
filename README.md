# Course-Rating-API
REST API used to view information about courses and their reviews and users. Uses Express along with MongoDB for the database and Mongoose for object models.

Before using, ensure you have MongoDB installed, and run the following commands:
mongoimport --db course-api --collection courses --type=json --jsonArray --file courses.json
mongoimport --db course-api --collection users --type=json --jsonArray --file users.json
mongoimport --db course-api --collection reviews --type=json --jsonArray --file reviews.json

To start the API:

1. Download files, open a terminal, and navigate to its directory
2. Run: npm install
3. In a separate terminal, run: mongod
4. In the original terminal, run: npm start

To test the API:

1. Open Postman
2. Click 'Import' at top left corner
3. Select 'Choose Files' and browse to directory of project files
4. Select the file: CourseAPI.postman_collection.json
