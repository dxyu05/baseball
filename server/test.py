# Find Clayton Kershaw's player id

from pybaseball import  playerid_lookup
from pybaseball import  statcast_pitcher
from pybaseball import statcast_batter
from pybaseball import batting_stats_range

clayton = playerid_lookup('kershaw', 'clayton')
shohei = playerid_lookup('oh', 'sho')

print(batting_stats_range("2022-01-04", "2024-07-29"))
