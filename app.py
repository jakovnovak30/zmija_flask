import json
from flask import Flask, render_template, request

app = Flask(__name__)
ime = "Anonymous"

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/zmija', methods = ['POST'])
def zmija():    
    if request.method == 'POST':
        r = request.form['text']
        global ime
        ime = r
        return render_template('zmija.html', username=ime)  

@app.route('/rezultati', methods = ['POST'])
def rezultati():
    if request.method == 'POST':
        r = request.form['reza']
        return render_template('rezultati.html', username=ime, rezultat=int(r))

if __name__=='__main__':
    app.run(debug=False)
