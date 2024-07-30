#!/usr/bin/env python3
"""This module contains app.py file that renders index template"""

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    """
    This function returns the index.html template
    """
    return render_template('0-index.html')


if __name__ == '__main__':
    """Starts the Flask web server"""
    app.run(debug=True)
