from wtforms import Form, StringField, SelectField, FloatField, SubmitField, HiddenField, DateTimeField
from wtforms.validators import InputRequired, Length
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
def edit_expense(project_id, user_id):
    form = EditExpense()
    if request.method == 'GET':
        return "Add new expense record"
     
    if request.method == 'POST':
        id_field    = form.id_field.data
        project_id  = project_id
        category_id = form.category_id.data
        name        = form.name.data
        description = form.description.data
        amount      = form.amount.data
        created_at  = form.created_at
        created_by  = user_id
        updated_at  = form.updated_at.data
        updated_by  = form.updated_by.data
        cursor = mysql.connection.cursor()
        cursor.execute(''' UPDATE info_table VALUES(%s,%s,%s,%s,%s,%f,%s,%s,%s,%s) WHERE id_field=%s''',(id_field,
            project_id, category_id, name, description, amount, datetime.strftime(created_at),
            created_by, datetime.strftime(updated_at), updated_by), id_field)
        mysql.connection.commit()
        cursor.close()
        return

@app.route('/remove_expense', methods = ['POST'])
def remove_expense(id_field):
    cursor = mysql.connection.cursor()
    cursor.execute(''' DELETE FROM info_table WHERE id_field=%s''',
        id_field)
    mysql.connection.commit()
    cursor.close()
    return f"Done!!"