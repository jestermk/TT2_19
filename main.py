import pymysql
from flask import Flask, json, request
from flask import jsonify
from flask_restful import Resource, Api
from flaskext.mysql import MySQL
from contextlib import closing
from flask_cors import CORS 
import os 
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

# Create api instance
api = Api(app)
CORS(app)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = os.environ.get('PASSWORD')
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
                    cursor = conn.cursor(pymysql.cursors.DictCursor)
                    cursor.execute("""select * FROM project where user_id=%s""", user_id)
                    rows = cursor.fetchall()
                    
                    # Add count check
                    if (len(rows)> 0):
                        return jsonify(rows)
                    else:
                        return {"message":"No Data"}
        except Exception as e:
            return json.dumps({'error':str(e)})

#API resource routes
api.add_resource(Projects, '/projects/<int:user_id>', endpoint='projects')

if __name__ == "__main__":
    app.run(debug=True)


