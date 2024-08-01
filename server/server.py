from flask import Flask, jsonify, request
from flask_cors import CORS
from pybaseball import  playerid_lookup
from pybaseball import batting_stats_range
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/player-stats", methods = ['GET'])

def getStats():
    #TODO: basically, need to get playerid, and get career stats by 
    #finding their career start year and end year
    
    #firstName = request.args['firstName']
    #lastName = request.args['lastName']
    
    #id = playerid_lookup(lastName, firstName)
    stats = batting_stats_range("2022-01-04", "2024-07-29")
    json_data = stats.to_json(orient='records')
    
    return json_data, 200

if __name__ == "__main__":
    app.run(debug=True, port = 8080)