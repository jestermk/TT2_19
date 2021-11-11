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

class EditExpense(Form):
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
    updated_at = DateTimeField(datetime.utcnow)
    updated_by = 0 #user instance
    send = SubmitField('send')


# result of edit - this function updates the record
@app.route('/edit_expense', methods=['POST'])
def edit_expense():
    id = request.form['id_field']
    # call up the record from the database
    expense = EditExpense.query.filter(EditExpense.id == id).first()
    # update all values
    expense.project_id  = request.form['project_id']
    expense.category_id = request.form['category_id']
    expense.name        = request.form['name']
    expense.description = request.form['description']
    expense.amount      = request.form['description']
    expense.updated_at  = DateTimeField(datetime.utcnow)
    expense.updated_by  = request.form['updated_by']

    form1 = EditExpense()
    if form1.validate_on_submit():
        # update database record
        db.session.commit()
        # create a message to send to the template
        message = f"The data for expense {expense.name} has been updated."

@app.route('/remove_expense', methods = ['POST'])
def remove_expense(id_field):
    cursor = mysql.connection.cursor()
    cursor.execute(''' DELETE FROM info_table WHERE id_field=%s''',
        id_field)
    mysql.connection.commit()
    cursor.close()
    return f"Done!!"