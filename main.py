#import pymysql
from flask import Flask, json, request
from flask import jsonify
from flask_restful import Resource, Api
from flaskext.mysql import MySQL
from contextlib import closing

app = Flask(__name__)

# Create api instance
api = Api(app)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Login@2020'
app.config['MYSQL_DATABASE_DB'] = 'project_expenses'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

# Create MySQL
mysql = MySQL()

# Initialize app
mysql.init_app(app)

#Create an instance of Flask RESTful API
api = Api(app)

class Projects(Resource):
    def get(self, user_id):
        try:
            with closing(mysql.connect()) as conn:
                with closing(conn.cursor()) as cursor:
                    conn = mysql.connect()
                    cursor = conn.cursor()
                    cursor.execute("""select * FROM project where user_id=%s""", user_id)
                    rows = cursor.fetchall()
                    return jsonify(rows)
        except Exception as e:
            return json.dumps({'error':str(e)})

#API resource routes
api.add_resource(Projects, '/projects/<int:user_id>', endpoint='projects')

if __name__ == "__main__":
    app.run(debug=True)


