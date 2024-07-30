#!/usr/bin/env python3

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index() -> str:
    """
    Handles the root route and renders the '0-index.html' template.
    
    Returns:
        str: Rendered HTML template as a string.
    """
    return render_template('0-index.html')

if __name__ == '__main__':
    app.run(debug=True)
