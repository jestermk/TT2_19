from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField, SubmitField
from api import db
from datetime import datetime


class AddExpense(FlaskForm):
    id_field = HiddenField()
    project_id = #take from form origin
    category_id = SelectField('Choose category', [InputRequired()], 
        choices = [('production', 'Production'), ('operating', 'Operating'), 
        ('financial', 'Financial'), ('vendor', 'Vendor'), ('manpower', 'Manpower'),
        ('software, Software'), ('hardware, Hardware')])
    name = StringField('Expense name', [InputRequired(),
        Regexp(r'^[A-Za-z\s\-\'\/]+$', message="Invalid name"), Length(max=50, 
        message="Name too long"])
    description = StringField('Expense name', [InputRequired(),
        Regexp(r'^[A-Za-z\s\-\'\/]+$', message="Invalid description"), Length(max=50, 
        message="Description too long"])
    amount = FloatField('Expended amount', [ InputRequired() ])
    created_at = datetime.utcnow
    created_by = #take from user
    updated_at = datetime.utcnow
    updated_by = #take from user
    send = SubmitField('send')
