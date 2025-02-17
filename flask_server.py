from flask import Flask, jsonify, render_template, request
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS
import os
import urllib.parse

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load MongoDB connection details from environment variables
# username = urllib.parse.quote_plus('dongTS')
# password = urllib.parse.quote_plus('TS123@')
# uri = "mongodb+srv://{}:{}@dongts.hx7yxbh.mongodb.net/?retryWrites=true&w=majority&appName=DongTS".format(username, password)
#cmd: "mongodb+srv://dongTS.hx7yxbh.mongodb.net/" --apiVersion 1 --username dongTS
client = MongoClient('localhost', 27017, username = "test", password = "123")

db = client.TS_database
todos_collection = db.todos
print("database")

@app.route('/')
def index():
    return "Hello TS!"

@app.route('/data')
def get_data():
    # search_term = request.args.get('search', '').lower()
    # print("search_term: ", search_term)
    # if type(search_term) is str:
    #     todos = todos_collection({"license_plate": '80B-33333'})
    # else:
    #     todos = todos_collection.find()

    todos = todos_collection.find()
    data = []
    for todo in todos:
        if '_id' in todo:
            todo['_id'] = str(todo['_id'])
        data.append(todo)
    print("todo: ", todo)
    # data = [todos]
    # print("data: ", data)
    return jsonify(data)

@app.route('/search')
def search_data():
    search_term = request.args.get('search', '').lower()
    print("search_term backend: ", search_term)
    # if search_term:
    #     todos = todos_collection({"license_plate": '80B-33333'})
    # else:
    #     todos = todos_collection.find()
    todos = todos_collection.find({"license_plate": '80B-33333'})
    data = []
    for todo in todos:
        if '_id' in todo:
            todo['_id'] = str(todo['_id'])
        data.append(todo)
    print("todo: ", todo)
    # data = [todos]
    # print("data: ", data)
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True, port=5555)
