#!/usr/bin/env python3
"""This function is used to render 1-app.py which is config for languages"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)


class Config:
    """ Configuration class for the application """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def index():
    """This route returns the index.html template"""
    return render_template('1-index.html')


if __name__ == '__main__':
    """Start the flask app"""
    app.run()
