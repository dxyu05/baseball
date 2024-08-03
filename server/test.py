# Find Clayton Kershaw's player id

from pybaseball import  playerid_lookup
from pybaseball import  statcast_pitcher
from pybaseball import statcast_batter
from pybaseball import batting_stats_range
import statsapi

clayton = playerid_lookup('kershaw', 'clayton')
shohei = playerid_lookup('ohtani', 'shohei')
#shoheiStats = statsapi.player_stats()

#print(batting_stats_range("2022-01-04", "2024-07-29"))
#print(shohei)
id = statsapi.lookup_player('bryce harper')[0]['id']
print(statsapi.lookup_player('bryce harper')[0]['id'])
stats = statsapi.player_stats(id, 'hitting', 'career')
print(stats) 
