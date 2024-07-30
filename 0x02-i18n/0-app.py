#!/usr/bin/env python3
''' 0-app.py file '''

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    ''' Render index template '''
    return render_template('0-index.html')


if __name__ == '__main__':
    ''' Running the the flask server '''
    app.run(debug=True)
