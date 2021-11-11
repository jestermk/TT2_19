from flask_wtf import FlaskForm
from wtforms import Form, StringField, SelectField, FloatField, SubmitField, HiddenField, DateTimeField
from wtforms.validators import InputRequired, Length
from api import db
from datetime import datetime


from flask import Flask,render_template, request
from flask_mysqldb import MySQL


app = Flask(__name__)
 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'project_expenses'
 
mysql = MySQL(app)
cursor = mysql.connection.cursor()

class AddExpense(Form):
    id_field = HiddenField()
    project_id = 0 #project instance
    category_id = SelectField('Choose category', [InputRequired()], 
        choices = [('production', 'Production'), ('operating', 'Operating'), 
        ('financial', 'Financial'), ('vendor', 'Vendor'), ('manpower', 'Manpower'),
        ('software, Software'), ('hardware, Hardware')])
    name = StringField('Expense name', [InputRequired(),
        Regexp(r'^[A-Za-z\s\-\'\/]+$', message="Invalid name"), Length(max=50, 
        message="Name too long")])
    description = StringField('Expense name', [InputRequired(),
        Regexp(r'^[A-Za-z\s\-\'\/]+$', message="Invalid description"), Length(max=50, 
        message="Description too long")])
    amount = FloatField('Expended amount', [ InputRequired() ])
    created_at = DateTimeField(datetime.utcnow)
    created_by = 0 #user instance
    updated_at = DateTimeField(datetime.utcnow)
    updated_by = 0 #user instance
    send = SubmitField('send')


@app.route('/login', methods = ['POST', 'GET'])
def add_expense():
    if request.method == 'GET':
        return "Add new expense record"
     
    if request.method == 'POST':
        name = request.form['name']
        age = request.form['discretion']
        age = request.form['armor']
        cursor = mysql.connection.cursor()
        cursor.execute(''' INSERT INTO info_table VALUES(%s,%s)''',(name,age))
        mysql.connection.commit()
        cursor.close()
        return f"Done!!"