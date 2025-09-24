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

        # Build a key -> value map from the stats lines (e.g., "avg: .208")
        line_map = {}
        for line in stats_list:
            if ': ' in line:
                key, value = line.split(': ', 1)
                line_map[key.strip()] = value.strip()

        def parse_int(value):
            try:
                if value is None or value == '' or value == '--':
                    return 0
                value = value.replace(',', '')
                if value.startswith('.'):
                    value = '0' + value
                # Some integer-like values might appear as decimals like "12.0"
                return int(float(value))
            except Exception:
                return 0

        def parse_float(value):
            try:
                if value is None or value == '' or value == '--':
                    return 0.0
                value = value.replace(',', '')
                if value.startswith('.'):
                    value = '0' + value
                return float(value)
            except Exception:
                return 0.0

        player_stats = {
            "name": stats_list[0] if stats_list else "",
            "gamesPlayed": parse_int(line_map.get('gamesPlayed')),
            "groundOuts": parse_int(line_map.get('groundOuts')),
            "airOuts": parse_int(line_map.get('airOuts')),
            "runs": parse_int(line_map.get('runs')),
            "doubles": parse_int(line_map.get('doubles')),
            "triples": parse_int(line_map.get('triples')),
            "homeRuns": parse_int(line_map.get('homeRuns')),
            "strikeOuts": parse_int(line_map.get('strikeOuts')),
            "baseOnBalls": parse_int(line_map.get('baseOnBalls')),
            "intentionalWalks": parse_int(line_map.get('intentionalWalks')),
            "hits": parse_int(line_map.get('hits')),
            "hitByPitch": parse_int(line_map.get('hitByPitch')),
            "avg": parse_float(line_map.get('avg')),
            "atBats": parse_int(line_map.get('atBats')),
            "obp": parse_float(line_map.get('obp')),
            "slg": parse_float(line_map.get('slg')),
            "ops": parse_float(line_map.get('ops')),
            "caughtStealing": parse_int(line_map.get('caughtStealing')),
            "stolenBases": parse_int(line_map.get('stolenBases')),
            "stolenBasePercentage": parse_float(line_map.get('stolenBasePercentage')),
            "groundIntoDoublePlay": parse_int(line_map.get('groundIntoDoublePlay')),
            "numberOfPitches": parse_int(line_map.get('numberOfPitches')),
            "plateAppearances": parse_int(line_map.get('plateAppearances')),
            "totalBases": parse_int(line_map.get('totalBases')),
            "rbi": parse_int(line_map.get('rbi')),
            "leftOnBase": parse_int(line_map.get('leftOnBase')),
            "sacBunts": parse_int(line_map.get('sacBunts')),
            "sacFlies": parse_int(line_map.get('sacFlies')),
            "babip": parse_float(line_map.get('babip')),
            "groundOutsToAirouts": parse_float(line_map.get('groundOutsToAirouts')),
            "catchersInterference": parse_int(line_map.get('catchersInterference')),
            "atBatsPerHomeRun": parse_float(line_map.get('atBatsPerHomeRun')),
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