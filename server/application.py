from flask import Flask, jsonify, request
from flask_cors import CORS
from pybaseball import  playerid_lookup
from pybaseball import batting_stats_range
from pybaseball import statcast_batter
from pybaseball import statcast_pitcher
import statsapi
import pandas as pd
import re

application = Flask(__name__)
CORS(application)

@application.route("/player-stats/", methods = ['GET'])

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
    
    if stats:
        stats = stats.strip()

        
        stats_list = stats.split('\n')
        
        '''
        count = 0
        for stat in stats_list:
            print(stat, ' line ', count)
            count = count + 1
        '''
        # Extracting the stats and mapping them to a dictionary
        #
        
        player_stats = {
            "name": (stats_list[0]),
            "gamesPlayed": int(stats_list[3].split(': ')[1]),
            "groundOuts": int(stats_list[4].split(': ')[1]),
            "airOuts": int(stats_list[5].split(': ')[1]),
            "runs": int(stats_list[6].split(': ')[1]),
            "doubles": int(stats_list[7].split(': ')[1]),
            "triples": int(stats_list[8].split(': ')[1]),
            "homeRuns": int(stats_list[9].split(': ')[1]),
            "strikeOuts": int(stats_list[10].split(': ')[1]),
            "baseOnBalls": int(stats_list[11].split(': ')[1]),
            "intentionalWalks": int(stats_list[12].split(': ')[1]),
            "hits": int(stats_list[13].split(': ')[1]),
            "hitByPitch": int(stats_list[14].split(': ')[1]),
            "avg": float(stats_list[15].split(': ')[1]),
            "atBats": int(stats_list[16].split(': ')[1]),
            "obp": float(stats_list[17].split(': ')[1]),
            "slg": float(stats_list[18].split(': ')[1]),
            "ops": float(stats_list[19].split(': ')[1]),
            "caughtStealing": int(stats_list[20].split(': ')[1]),
            "stolenBases": int(stats_list[21].split(': ')[1]),
            "stolenBasePercentage": float(stats_list[22].split(': ')[1]),
            "groundIntoDoublePlay": int(stats_list[23].split(': ')[1]),
            "numberOfPitches": int(stats_list[24].split(': ')[1]),
            "plateAppearances": int(stats_list[25].split(': ')[1]),
            "totalBases": int(stats_list[26].split(': ')[1]),
            "rbi": int(stats_list[27].split(': ')[1]),
            "leftOnBase": int(stats_list[28].split(': ')[1]),
            "sacBunts": int(stats_list[29].split(': ')[1]),
            "sacFlies": int(stats_list[30].split(': ')[1]),
            "babip": float(stats_list[31].split(': ')[1]),
            "groundOutsToAirouts": float(stats_list[32].split(': ')[1]),
            "catchersInterference": int(stats_list[33].split(': ')[1]),
            "atBatsPerHomeRun": float(stats_list[34].split(': ')[1]),
        }

        response = (jsonify(player_stats))
    
        # Add no-cache headers
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate, public, max-age = 0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        

        return response, 200
    else:
        return jsonify({"error": "Player not found"}), 404


def escape_quotes(text):
    # Replace unescaped double quotes with escaped double quotes
    return re.sub(r'(?<!\\)"', r'\\"', text)

def check_and_escape_quotes(text):
    # Check if the text contains unescaped quotes
    if re.search(r'(?<!\\)"', text):
        # Escape unescaped double quotes
        return escape_quotes(text)
    else:
        return text

# Example usage


if __name__ == "__main__":
    application.run(host='0.0.0.0', port = 10000)