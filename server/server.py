from flask import Flask, jsonify, request
from flask_cors import CORS
from pybaseball import  playerid_lookup
from pybaseball import batting_stats_range
from pybaseball import statcast_batter
from pybaseball import statcast_pitcher
import statsapi
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/player-stats/", methods = ['GET'])

def getStats():
    #TODO: basically, need to get playerid, and get career stats by 
    #finding their career start year and end year
    
    firstName = request.args['firstName']
    lastName = request.args['lastName']
    
    """
    player = playerid_lookup(lastName, firstName)
    id = player.loc[0].at["key_mlbam"]
    startYear = player.loc[0].at["mlb_played_first"]
    endYear = player.loc[0].at["mlb_played_last"]
    stats = batting_stats_range(str(int(startYear)) + "-01-01", str(int(endYear)) + "-01-1")
    json_data = stats.to_json(orient='records')
    #json_player = id.to_json(orient='records')
    shoheiStats = statcast_pitcher(str(int(startYear)) + "-01-01", str(int(endYear)) + "-01-1", id)
    json_shohei = shoheiStats.to_json(orient='records')
    """
    id = statsapi.lookup_player(firstName + ' ' +lastName)[0]['id']
    stats = statsapi.player_stats(id, 'hitting', 'career')
    
    return jsonify(stats), 200

if __name__ == "__main__":
    app.run(debug=True, port = 8080)