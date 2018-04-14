from flask import Flask
from flask import render_template
import requests
import json
import csv
import time
app=Flask(__name__)

i = 1
sum = 0.00

@app.route('/')
def home():
	return render_template('index1.html',title='Pollution')


@app.route('/vehicles')
def hello_world():
	r=requests.get('https://api.thingspeak.com/channels/414360/fields/1.json?api_key=VRK1AH4TKL60MARF&results=2')
	data = r.json()
	data = data["feeds"][1]["field1"]
	return render_template('index.html', title='Pollution', user=data)



if  __name__=='__main__':
	app.run()
