// basketballSchoolNormalization.js
// Comprehensive school name normalization - maps all variations to canonical names
// Used across all components to deduplicate dropdowns and ensure consistent display

// Master mapping of all school name variations to canonical names
// The canonical name should match what's in the logo system
export const SCHOOL_NAME_MAP = {
  // ══════════════════════════════════════════════════════════════════════════
  // FLORIDA SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  'fiu': 'FIU',
  'florida international': 'FIU',
  'florida international university': 'FIU',
  
  'fau': 'FAU',
  'florida atlantic': 'FAU',
  'florida atlantic university': 'FAU',
  
  'fgcu': 'FGCU',
  'florida gulf coast': 'FGCU',
  'florida gulf coast university': 'FGCU',
  
  'ucf': 'UCF',
  'central florida': 'UCF',
  'university of central florida': 'UCF',
  
  'usf': 'USF',
  'south florida': 'USF',
  'university of south florida': 'USF',
  
  'florida': 'Florida',
  'university of florida': 'Florida',
  'uf': 'Florida',
  
  'florida state': 'Florida State',
  'florida state university': 'Florida State',
  'fsu': 'Florida State',
  'florida st': 'Florida State',
  'florida st.': 'Florida State',
  
  'miami': 'Miami',
  'miami (fl)': 'Miami',
  'miami (fla)': 'Miami',
  'miami (fla.)': 'Miami',
  'miami (florida)': 'Miami',
  'university of miami': 'Miami',
  
  'miami (oh)': 'Miami (OH)',
  'miami (ohio)': 'Miami (OH)',
  'miami ohio': 'Miami (OH)',
  'miami university': 'Miami (OH)',
  'miami redhawks': 'Miami (OH)',
  
  'famu': 'Florida A&M',
  'florida a&m': 'Florida A&M',
  'florida a&m university': 'Florida A&M',
  
  'bethune-cookman': 'Bethune-Cookman',
  'bethune cookman': 'Bethune-Cookman',
  
  'jacksonville': 'Jacksonville',
  'jacksonville university': 'Jacksonville',
  
  'north florida': 'North Florida',
  'unf': 'North Florida',
  
  'stetson': 'Stetson',
  'stetson university': 'Stetson',

  // ══════════════════════════════════════════════════════════════════════════
  // CONNECTICUT SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  'uconn': 'UConn',
  'connecticut': 'UConn',
  'conn': 'UConn',
  'university of connecticut': 'UConn',
  
  'central connecticut': 'Central Connecticut State',
  'central connecticut state': 'Central Connecticut State',
  'central connecticut state university': 'Central Connecticut State',
  'ccsu': 'Central Connecticut State',
  
  'eastern connecticut': 'Eastern Connecticut State',
  'eastern connecticut state': 'Eastern Connecticut State',
  
  'southern connecticut': 'Southern Connecticut State',
  'southern connecticut state': 'Southern Connecticut State',
  
  'western connecticut': 'Western Connecticut State',
  'western connecticut state': 'Western Connecticut State',
  
  // Connecticut College is DIFFERENT (NESCAC D3)
  'connecticut college': 'Connecticut College',

  // ══════════════════════════════════════════════════════════════════════════
  // TEXAS SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  'texas': 'Texas',
  'university of texas': 'Texas',
  'ut': 'Texas',
  'ut austin': 'Texas',
  
  'texas a&m': 'Texas A&M',
  'texas a & m': 'Texas A&M',
  'texas a&m university': 'Texas A&M',
  'tamu': 'Texas A&M',
  
  'texas tech': 'Texas Tech',
  'texas tech university': 'Texas Tech',
  'ttu': 'Texas Tech',
  
  'tcu': 'TCU',
  'texas christian': 'TCU',
  'texas christian university': 'TCU',
  
  'smu': 'SMU',
  'southern methodist': 'SMU',
  'southern methodist university': 'SMU',
  
  'baylor': 'Baylor',
  'baylor university': 'Baylor',
  
  'houston': 'Houston',
  'university of houston': 'Houston',
  
  'rice': 'Rice',
  'rice university': 'Rice',
  
  'utsa': 'UTSA',
  'texas-san antonio': 'UTSA',
  'ut san antonio': 'UTSA',
  'university of texas at san antonio': 'UTSA',
  
  'utep': 'UTEP',
  'texas-el paso': 'UTEP',
  'ut el paso': 'UTEP',
  'university of texas at el paso': 'UTEP',
  
  'uta': 'UT Arlington',
  'ut arlington': 'UT Arlington',
  'texas-arlington': 'UT Arlington',
  
  'utrgv': 'UTRGV',
  'texas rio grande valley': 'UTRGV',
  'ut rio grande valley': 'UTRGV',
  
  'north texas': 'North Texas',
  'unt': 'North Texas',
  'university of north texas': 'North Texas',
  
  'texas state': 'Texas State',
  'texas state university': 'Texas State',
  
  'texas southern': 'Texas Southern',
  'texas southern university': 'Texas Southern',
  
  'sam houston': 'Sam Houston',
  'sam houston state': 'Sam Houston',
  'shsu': 'Sam Houston',
  
  'stephen f. austin': 'Stephen F. Austin',
  'stephen f austin': 'Stephen F. Austin',
  'sfa': 'Stephen F. Austin',
  
  'lamar': 'Lamar',
  'lamar university': 'Lamar',
  
  'prairie view': 'Prairie View A&M',
  'prairie view a&m': 'Prairie View A&M',
  
  'texas a&m-corpus christi': 'Texas A&M-Corpus Christi',
  'texas a&m–corpus christi': 'Texas A&M-Corpus Christi',
  'texas a&m corpus christi': 'Texas A&M-Corpus Christi',
  'tamucc': 'Texas A&M-Corpus Christi',
  
  'texas a&m-commerce': 'Texas A&M-Commerce',
  'texas a&m commerce': 'Texas A&M-Commerce',
  
  'incarnate word': 'Incarnate Word',
  'uiw': 'Incarnate Word',

  // ══════════════════════════════════════════════════════════════════════════
  // CALIFORNIA / PAC-12 SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  'usc': 'USC',
  'southern california': 'USC',
  'university of southern california': 'USC',
  
  'ucla': 'UCLA',
  'uc los angeles': 'UCLA',
  
  'california': 'California',
  'cal': 'California',
  'uc berkeley': 'California',
  'berkeley': 'California',
  
  'stanford': 'Stanford',
  'stanford university': 'Stanford',
  
  'oregon': 'Oregon',
  'university of oregon': 'Oregon',
  
  'oregon state': 'Oregon State',
  'oregon state university': 'Oregon State',
  'oregon st': 'Oregon State',
  'oregon st.': 'Oregon State',
  
  'washington': 'Washington',
  'university of washington': 'Washington',
  'uw': 'Washington',
  
  'washington state': 'Washington State',
  'washington state university': 'Washington State',
  'wsu': 'Washington State',
  'wazzu': 'Washington State',
  'washington st': 'Washington State',
  'washington st.': 'Washington State',
  
  'arizona': 'Arizona',
  'university of arizona': 'Arizona',
  
  'arizona state': 'Arizona State',
  'arizona state university': 'Arizona State',
  'asu': 'Arizona State',
  'arizona st': 'Arizona State',
  'arizona st.': 'Arizona State',
  
  'colorado': 'Colorado',
  'university of colorado': 'Colorado',
  'cu': 'Colorado',
  
  'utah': 'Utah',
  'university of utah': 'Utah',
  
  // Other CA schools
  'san diego state': 'San Diego State',
  'sdsu': 'San Diego State',
  
  'fresno state': 'Fresno State',
  
  'san jose state': 'San Jose State',
  'sjsu': 'San Jose State',
  
  'unlv': 'UNLV',
  'nevada-las vegas': 'UNLV',
  'nevada las vegas': 'UNLV',
  
  'nevada': 'Nevada',
  'unr': 'Nevada',
  
  'long beach state': 'Long Beach State',
  'cal state long beach': 'Long Beach State',
  'csulb': 'Long Beach State',
  
  'cal state fullerton': 'Cal State Fullerton',
  'csuf': 'Cal State Fullerton',
  'fullerton': 'Cal State Fullerton',
  
  'cal state northridge': 'Cal State Northridge',
  'csun': 'Cal State Northridge',
  'northridge': 'Cal State Northridge',
  
  'cal poly': 'Cal Poly',
  'cal poly slo': 'Cal Poly',
  
  'uc davis': 'UC Davis',
  'uc santa barbara': 'UC Santa Barbara',
  'ucsb': 'UC Santa Barbara',
  'uc irvine': 'UC Irvine',
  'uc riverside': 'UC Riverside',
  'uc san diego': 'UC San Diego',
  'ucsd': 'UC San Diego',
  
  'san diego': 'San Diego',
  'university of san diego': 'San Diego',
  
  'san francisco': 'San Francisco',
  'university of san francisco': 'San Francisco',
  
  "saint mary's": "Saint Mary's",
  "st. mary's": "Saint Mary's",
  "saint mary's (ca)": "Saint Mary's",
  "saint mary's college": "Saint Mary's",
  
  'santa clara': 'Santa Clara',
  'santa clara university': 'Santa Clara',
  
  'pepperdine': 'Pepperdine',
  'pepperdine university': 'Pepperdine',
  
  'loyola marymount': 'Loyola Marymount',
  'lmu': 'Loyola Marymount',
  
  'pacific': 'Pacific',
  'university of the pacific': 'Pacific',
  
  'gonzaga': 'Gonzaga',
  'gonzaga university': 'Gonzaga',

  // ══════════════════════════════════════════════════════════════════════════
  // BIG TEN SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  'michigan': 'Michigan',
  'university of michigan': 'Michigan',
  
  'michigan state': 'Michigan State',
  'michigan state university': 'Michigan State',
  'msu': 'Michigan State',
  
  'ohio state': 'Ohio State',
  'the ohio state university': 'Ohio State',
  'ohio state university': 'Ohio State',
  'osu': 'Ohio State',
  'ohio st': 'Ohio State',
  'ohio st.': 'Ohio State',
  
  'penn state': 'Penn State',
  'pennsylvania state': 'Penn State',
  'pennsylvania state university': 'Penn State',
  'psu': 'Penn State',
  'penn st': 'Penn State',
  'penn st.': 'Penn State',
  
  'indiana': 'Indiana',
  'university of indiana': 'Indiana',
  'iu': 'Indiana',
  
  'purdue': 'Purdue',
  'purdue university': 'Purdue',
  
  'illinois': 'Illinois',
  'university of illinois': 'Illinois',
  
  'iowa': 'Iowa',
  'university of iowa': 'Iowa',
  
  'wisconsin': 'Wisconsin',
  'university of wisconsin': 'Wisconsin',
  
  'minnesota': 'Minnesota',
  'university of minnesota': 'Minnesota',
  
  'nebraska': 'Nebraska',
  'university of nebraska': 'Nebraska',
  
  'northwestern': 'Northwestern',
  'northwestern university': 'Northwestern',
  
  'maryland': 'Maryland',
  'university of maryland': 'Maryland',
  'umd': 'Maryland',
  
  'rutgers': 'Rutgers',
  'rutgers university': 'Rutgers',

  // ══════════════════════════════════════════════════════════════════════════
  // SEC SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  'alabama': 'Alabama',
  'university of alabama': 'Alabama',
  
  'auburn': 'Auburn',
  'auburn university': 'Auburn',
  
  'lsu': 'LSU',
  'louisiana state': 'LSU',
  'louisiana state university': 'LSU',
  
  'ole miss': 'Ole Miss',
  'mississippi': 'Ole Miss',
  'university of mississippi': 'Ole Miss',
  
  'mississippi state': 'Mississippi State',
  'mississippi state university': 'Mississippi State',
  'miss state': 'Mississippi State',
  'mississippi st': 'Mississippi State',
  'mississippi st.': 'Mississippi State',
  
  'arkansas': 'Arkansas',
  'university of arkansas': 'Arkansas',
  
  'missouri': 'Missouri',
  'university of missouri': 'Missouri',
  'mizzou': 'Missouri',
  
  'tennessee': 'Tennessee',
  'university of tennessee': 'Tennessee',
  
  'vanderbilt': 'Vanderbilt',
  'vanderbilt university': 'Vanderbilt',
  
  'kentucky': 'Kentucky',
  'university of kentucky': 'Kentucky',
  'uk': 'Kentucky',
  
  'georgia': 'Georgia',
  'university of georgia': 'Georgia',
  'uga': 'Georgia',
  
  'south carolina': 'South Carolina',
  'university of south carolina': 'South Carolina',
  
  'texas a&m': 'Texas A&M',
  'oklahoma': 'Oklahoma',
  'university of oklahoma': 'Oklahoma',
  'ou': 'Oklahoma',

  // ══════════════════════════════════════════════════════════════════════════
  // ACC SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  'duke': 'Duke',
  'duke university': 'Duke',
  
  'north carolina': 'North Carolina',
  'unc': 'North Carolina',
  'university of north carolina': 'North Carolina',
  'carolina': 'North Carolina',
  
  'nc state': 'NC State',
  'north carolina state': 'NC State',
  'n.c. state': 'NC State',
  'ncsu': 'NC State',
  
  'wake forest': 'Wake Forest',
  'wake forest university': 'Wake Forest',
  'wake': 'Wake Forest',
  
  'virginia': 'Virginia',
  'university of virginia': 'Virginia',
  'uva': 'Virginia',
  
  'virginia tech': 'Virginia Tech',
  'virginia polytechnic': 'Virginia Tech',
  'vt': 'Virginia Tech',
  
  'clemson': 'Clemson',
  'clemson university': 'Clemson',
  
  'georgia tech': 'Georgia Tech',
  'georgia institute of technology': 'Georgia Tech',
  
  'florida state': 'Florida State',
  
  'louisville': 'Louisville',
  'university of louisville': 'Louisville',
  
  'syracuse': 'Syracuse',
  'syracuse university': 'Syracuse',
  
  'boston college': 'Boston College',
  'bc': 'Boston College',
  
  'pittsburgh': 'Pittsburgh',
  'pitt': 'Pittsburgh',
  'university of pittsburgh': 'Pittsburgh',
  
  'notre dame': 'Notre Dame',
  'university of notre dame': 'Notre Dame',
  
  'cal': 'California',
  'stanford': 'Stanford',
  'smu': 'SMU',

  // ══════════════════════════════════════════════════════════════════════════
  // BIG 12 SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  'kansas': 'Kansas',
  'university of kansas': 'Kansas',
  'ku': 'Kansas',
  
  'kansas state': 'Kansas State',
  'kansas state university': 'Kansas State',
  'k-state': 'Kansas State',
  'ksu': 'Kansas State',
  'kansas st': 'Kansas State',
  'kansas st.': 'Kansas State',
  
  'oklahoma state': 'Oklahoma State',
  'oklahoma state university': 'Oklahoma State',
  'okstate': 'Oklahoma State',
  'oklahoma st': 'Oklahoma State',
  'oklahoma st.': 'Oklahoma State',
  
  'iowa state': 'Iowa State',
  'iowa state university': 'Iowa State',
  'isu': 'Iowa State',
  'iowa st': 'Iowa State',
  'iowa st.': 'Iowa State',
  
  'west virginia': 'West Virginia',
  'west virginia university': 'West Virginia',
  'wvu': 'West Virginia',
  
  'cincinnati': 'Cincinnati',
  'university of cincinnati': 'Cincinnati',
  
  'byu': 'BYU',
  'brigham young': 'BYU',
  'brigham young university': 'BYU',
  
  'ucf': 'UCF',
  'houston': 'Houston',
  'tcu': 'TCU',
  'baylor': 'Baylor',
  'texas tech': 'Texas Tech',
  
  'colorado': 'Colorado',
  'arizona': 'Arizona',
  'arizona state': 'Arizona State',
  'utah': 'Utah',

  // ══════════════════════════════════════════════════════════════════════════
  // BIG EAST SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  'villanova': 'Villanova',
  'villanova university': 'Villanova',
  'nova': 'Villanova',
  
  'creighton': 'Creighton',
  'creighton university': 'Creighton',
  
  'marquette': 'Marquette',
  'marquette university': 'Marquette',
  
  'xavier': 'Xavier',
  'xavier university': 'Xavier',
  
  'butler': 'Butler',
  'butler university': 'Butler',
  
  'georgetown': 'Georgetown',
  'georgetown university': 'Georgetown',
  
  'providence': 'Providence',
  'providence college': 'Providence',
  
  'seton hall': 'Seton Hall',
  'seton hall university': 'Seton Hall',
  
  "st. john's": "St. John's",
  "saint john's": "St. John's",
  "st john's": "St. John's",
  
  'depaul': 'DePaul',
  'de paul': 'DePaul',
  'depaul university': 'DePaul',

  // ══════════════════════════════════════════════════════════════════════════
  // MID-MAJOR CONFERENCES
  // ══════════════════════════════════════════════════════════════════════════
  'vcu': 'VCU',
  'virginia commonwealth': 'VCU',
  'virginia commonwealth university': 'VCU',
  
  'dayton': 'Dayton',
  'university of dayton': 'Dayton',
  
  'saint louis': 'Saint Louis',
  'st. louis': 'Saint Louis',
  'slu': 'Saint Louis',
  
  'george mason': 'George Mason',
  'gmu': 'George Mason',
  
  'george washington': 'George Washington',
  'gw': 'George Washington',
  'gwu': 'George Washington',
  
  'richmond': 'Richmond',
  'university of richmond': 'Richmond',
  
  'davidson': 'Davidson',
  'davidson college': 'Davidson',
  
  'memphis': 'Memphis',
  'university of memphis': 'Memphis',
  
  'wichita state': 'Wichita State',
  
  'temple': 'Temple',
  'temple university': 'Temple',
  
  'umass': 'UMass',
  'massachusetts': 'UMass',
  'university of massachusetts': 'UMass',
  
  'rhode island': 'Rhode Island',
  'uri': 'Rhode Island',
  
  'la salle': 'La Salle',
  'lasalle': 'La Salle',
  
  "saint joseph's": "Saint Joseph's",
  "st. joseph's": "Saint Joseph's",
  "st joseph's": "Saint Joseph's",
  
  'fordham': 'Fordham',
  'fordham university': 'Fordham',
  
  'duquesne': 'Duquesne',
  'duquesne university': 'Duquesne',
  
  // Mountain West
  'boise state': 'Boise State',
  'colorado state': 'Colorado State',
  'csu': 'Colorado State',
  'colorado st': 'Colorado State',
  'colorado st.': 'Colorado State',
  
  'utah state': 'Utah State',
  'usu': 'Utah State',
  'utah st': 'Utah State',
  'utah st.': 'Utah State',
  
  'new mexico': 'New Mexico',
  'unm': 'New Mexico',
  
  'new mexico state': 'New Mexico State',
  'nmsu': 'New Mexico State',
  
  'wyoming': 'Wyoming',
  'university of wyoming': 'Wyoming',
  
  'air force': 'Air Force',
  'usafa': 'Air Force',

  // ══════════════════════════════════════════════════════════════════════════
  // OTHER COMMON SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  
  // Ivy League
  'harvard': 'Harvard',
  'harvard university': 'Harvard',
  'yale': 'Yale',
  'yale university': 'Yale',
  'princeton': 'Princeton',
  'princeton university': 'Princeton',
  'penn': 'Penn',
  'pennsylvania': 'Penn',
  'university of pennsylvania': 'Penn',
  'columbia': 'Columbia',
  'columbia university': 'Columbia',
  'brown': 'Brown',
  'brown university': 'Brown',
  'dartmouth': 'Dartmouth',
  'dartmouth college': 'Dartmouth',
  'cornell': 'Cornell',
  'cornell university': 'Cornell',
  
  // Service Academies
  'army': 'Army',
  'west point': 'Army',
  'army west point': 'Army',
  'navy': 'Navy',
  'naval academy': 'Navy',
  
  // Ohio schools
  'ohio': 'Ohio',
  'ohio university': 'Ohio',
  
  // MAC
  'toledo': 'Toledo',
  'university of toledo': 'Toledo',
  'bowling green': 'Bowling Green',
  'bgsu': 'Bowling Green',
  'kent state': 'Kent State',
  'kent': 'Kent State',
  'ball state': 'Ball State',
  'western michigan': 'Western Michigan',
  'wmu': 'Western Michigan',
  'eastern michigan': 'Eastern Michigan',
  'emu': 'Eastern Michigan',
  'central michigan': 'Central Michigan',
  'cmu': 'Central Michigan',
  'northern illinois': 'Northern Illinois',
  'niu': 'Northern Illinois',
  'akron': 'Akron',
  'university of akron': 'Akron',
  'buffalo': 'Buffalo',
  'ub': 'Buffalo',
  
  // Missouri Valley
  'missouri state': 'Missouri State',
  'southwest missouri state': 'Missouri State',
  'northern iowa': 'Northern Iowa',
  'uni': 'Northern Iowa',
  'drake': 'Drake',
  'drake university': 'Drake',
  'loyola chicago': 'Loyola Chicago',
  'loyola (chicago)': 'Loyola Chicago',
  'loyola-chicago': 'Loyola Chicago',
  'indiana state': 'Indiana State',
  'illinois state': 'Illinois State',
  'southern illinois': 'Southern Illinois',
  'siu': 'Southern Illinois',
  'bradley': 'Bradley',
  'evansville': 'Evansville',
  'valparaiso': 'Valparaiso',
  
  // Sun Belt
  'appalachian state': 'Appalachian State',
  'app state': 'Appalachian State',
  'coastal carolina': 'Coastal Carolina',
  'georgia state': 'Georgia State',
  'georgia southern': 'Georgia Southern',
  'troy': 'Troy',
  'troy university': 'Troy',
  'south alabama': 'South Alabama',
  'louisiana': 'Louisiana',
  'louisiana-lafayette': 'Louisiana',
  'ul lafayette': 'Louisiana',
  'louisiana-monroe': 'Louisiana-Monroe',
  'ulm': 'Louisiana-Monroe',
  'arkansas state': 'Arkansas State',
  'a-state': 'Arkansas State',
  'little rock': 'Little Rock',
  'arkansas-little rock': 'Little Rock',
  'ualr': 'Little Rock',
  'texas state': 'Texas State',
  
  // C-USA / AAC
  'marshall': 'Marshall',
  'marshall university': 'Marshall',
  'western kentucky': 'Western Kentucky',
  'wku': 'Western Kentucky',
  'middle tennessee': 'Middle Tennessee',
  'mtsu': 'Middle Tennessee',
  'east carolina': 'East Carolina',
  'ecu': 'East Carolina',
  'old dominion': 'Old Dominion',
  'odu': 'Old Dominion',
  'charlotte': 'Charlotte',
  'unc charlotte': 'Charlotte',
  'uab': 'UAB',
  'alabama-birmingham': 'UAB',
  'tulane': 'Tulane',
  'tulane university': 'Tulane',
  'tulsa': 'Tulsa',
  'university of tulsa': 'Tulsa',
  'smu': 'SMU',
  'memphis': 'Memphis',
  'navy': 'Navy',
  'army': 'Army',
  
  // A-10
  'umbc': 'UMBC',
  'maryland-baltimore county': 'UMBC',
  
  // UNC System
  'unc greensboro': 'UNC Greensboro',
  'uncg': 'UNC Greensboro',
  'unc wilmington': 'UNC Wilmington',
  'uncw': 'UNC Wilmington',
  'unc asheville': 'UNC Asheville',
  'unca': 'UNC Asheville',
  
  // Southern schools
  'james madison': 'James Madison',
  'jmu': 'James Madison',
  'william & mary': 'William & Mary',
  'william and mary': 'William & Mary',
  'w&m': 'William & Mary',
  
  // Tennessee system
  'east tennessee state': 'East Tennessee State',
  'etsu': 'East Tennessee State',
  'tennessee tech': 'Tennessee Tech',
  'ut martin': 'UT Martin',
  'tennessee-martin': 'UT Martin',
  'chattanooga': 'Chattanooga',
  'ut chattanooga': 'Chattanooga',
  
  // Kentucky
  'eastern kentucky': 'Eastern Kentucky',
  'eku': 'Eastern Kentucky',
  'western kentucky': 'Western Kentucky',
  'murray state': 'Murray State',
  'morehead state': 'Morehead State',
  'northern kentucky': 'Northern Kentucky',
  'nku': 'Northern Kentucky',
  
  // HBCU
  'howard': 'Howard',
  'howard university': 'Howard',
  'hampton': 'Hampton',
  'hampton university': 'Hampton',
  'norfolk state': 'Norfolk State',
  'morgan state': 'Morgan State',
  'north carolina a&t': 'North Carolina A&T',
  'nc a&t': 'North Carolina A&T',
  'grambling': 'Grambling State',
  'grambling state': 'Grambling State',
  'southern': 'Southern',
  'southern university': 'Southern',
  'jackson state': 'Jackson State',
  'alcorn state': 'Alcorn State',
  'alabama state': 'Alabama State',
  'alabama a&m': 'Alabama A&M',
  
  // Northeast
  'hofstra': 'Hofstra',
  'hofstra university': 'Hofstra',
  'stony brook': 'Stony Brook',
  'albany': 'Albany',
  'suny albany': 'Albany',
  'vermont': 'Vermont',
  'uvm': 'Vermont',
  'maine': 'Maine',
  'new hampshire': 'New Hampshire',
  'unh': 'New Hampshire',
  'hartford': 'Hartford',
  
  'iona': 'Iona',
  'iona university': 'Iona',
  'marist': 'Marist',
  'marist college': 'Marist',
  'siena': 'Siena',
  'siena college': 'Siena',
  'fairfield': 'Fairfield',
  'fairfield university': 'Fairfield',
  'quinnipiac': 'Quinnipiac',
  'sacred heart': 'Sacred Heart',
  
  // Horizon / other
  'wright state': 'Wright State',
  'cleveland state': 'Cleveland State',
  'youngstown state': 'Youngstown State',
  'detroit mercy': 'Detroit Mercy',
  'detroit': 'Detroit Mercy',
  'oakland': 'Oakland',
  'oakland university': 'Oakland',
  'milwaukee': 'Milwaukee',
  'uwm': 'Milwaukee',
  'green bay': 'Green Bay',
  'iupui': 'IUPUI',
  'purdue fort wayne': 'Purdue Fort Wayne',
  'ipfw': 'Purdue Fort Wayne',
  
  // WCC
  'byu': 'BYU',
  'gonzaga': 'Gonzaga',
  "saint mary's": "Saint Mary's",
  'san diego': 'San Diego',
  'san francisco': 'San Francisco',
  'santa clara': 'Santa Clara',
  'pepperdine': 'Pepperdine',
  'loyola marymount': 'Loyola Marymount',
  'pacific': 'Pacific',
  'portland': 'Portland',
  'university of portland': 'Portland',
  
  // Big Sky
  'montana': 'Montana',
  'university of montana': 'Montana',
  'montana state': 'Montana State',
  'idaho': 'Idaho',
  'university of idaho': 'Idaho',
  'idaho state': 'Idaho State',
  'weber state': 'Weber State',
  'northern arizona': 'Northern Arizona',
  'nau': 'Northern Arizona',
  'sacramento state': 'Sacramento State',
  'sac state': 'Sacramento State',
  'eastern washington': 'Eastern Washington',
  'ewu': 'Eastern Washington',
  'portland state': 'Portland State',
  
  // Summit
  'south dakota': 'South Dakota',
  'usd': 'South Dakota',
  'south dakota state': 'South Dakota State',
  'north dakota': 'North Dakota',
  'north dakota state': 'North Dakota State',
  'ndsu': 'North Dakota State',
  'oral roberts': 'Oral Roberts',
  'denver': 'Denver',
  'university of denver': 'Denver',
  'omaha': 'Omaha',
  'nebraska-omaha': 'Omaha',
  
  // Southland / WAC
  'abilene christian': 'Abilene Christian',
  'acu': 'Abilene Christian',
  'tarleton state': 'Tarleton State',
  'tarleton': 'Tarleton State',
  'grand canyon': 'Grand Canyon',
  'gcu': 'Grand Canyon',
  'seattle': 'Seattle',
  'seattle university': 'Seattle',
  'california baptist': 'California Baptist',
  'cal baptist': 'California Baptist',
  'cbu': 'California Baptist',
  
  // MEAC / SWAC
  'delaware state': 'Delaware State',
  'maryland-eastern shore': 'Maryland-Eastern Shore',
  'umes': 'Maryland-Eastern Shore',
  'coppin state': 'Coppin State',
  'south carolina state': 'South Carolina State',
  'north carolina central': 'North Carolina Central',
  'nccu': 'North Carolina Central',
  'bethune-cookman': 'Bethune-Cookman',
  
  // Patriot
  'colgate': 'Colgate',
  'colgate university': 'Colgate',
  'bucknell': 'Bucknell',
  'bucknell university': 'Bucknell',
  'lehigh': 'Lehigh',
  'lehigh university': 'Lehigh',
  'lafayette': 'Lafayette',
  'lafayette college': 'Lafayette',
  'holy cross': 'Holy Cross',
  'boston university': 'Boston University',
  'bu': 'Boston University',
  'american': 'American',
  'american university': 'American',
  
  // Southern
  'furman': 'Furman',
  'furman university': 'Furman',
  'wofford': 'Wofford',
  'wofford college': 'Wofford',
  'citadel': 'The Citadel',
  'the citadel': 'The Citadel',
  'samford': 'Samford',
  'samford university': 'Samford',
  'mercer': 'Mercer',
  'mercer university': 'Mercer',
  'vmi': 'VMI',
  'virginia military': 'VMI',
  
  // Colonial / CAA
  'drexel': 'Drexel',
  'drexel university': 'Drexel',
  'northeastern': 'Northeastern',
  'northeastern university': 'Northeastern',
  'delaware': 'Delaware',
  'university of delaware': 'Delaware',
  'towson': 'Towson',
  'towson university': 'Towson',
  'elon': 'Elon',
  'elon university': 'Elon',
  'william & mary': 'William & Mary',
  'charleston': 'Charleston',
  'college of charleston': 'Charleston',
  'uncw': 'UNC Wilmington',
  'hofstra': 'Hofstra',
  
  // ASUN / Atlantic Sun
  'liberty': 'Liberty',
  'liberty university': 'Liberty',
  'lipscomb': 'Lipscomb',
  'lipscomb university': 'Lipscomb',
  'bellarmine': 'Bellarmine',
  'kennesaw state': 'Kennesaw State',
  'jacksonville state': 'Jacksonville State',
  'north alabama': 'North Alabama',
  'una': 'North Alabama',
  'central arkansas': 'Central Arkansas',
  'uca': 'Central Arkansas',
  'belmont': 'Belmont',
  'belmont university': 'Belmont',
  'florida gulf coast': 'FGCU',
  'north florida': 'North Florida',
  'stetson': 'Stetson',
  
  // Big South
  'high point': 'High Point',
  'campbell': 'Campbell',
  'campbell university': 'Campbell',
  'gardner-webb': 'Gardner-Webb',
  'winthrop': 'Winthrop',
  'winthrop university': 'Winthrop',
  'radford': 'Radford',
  'radford university': 'Radford',
  'charleston southern': 'Charleston Southern',
  'longwood': 'Longwood',
  'longwood university': 'Longwood',
  'presbyterian': 'Presbyterian',
  'presbyterian college': 'Presbyterian',
  
  // America East
  'umbc': 'UMBC',
  'vermont': 'Vermont',
  'albany': 'Albany',
  'stony brook': 'Stony Brook',
  'binghamton': 'Binghamton',
  'binghamton university': 'Binghamton',
  'maine': 'Maine',
  'new hampshire': 'New Hampshire',
  'hartford': 'Hartford',
  'mass lowell': 'UMass Lowell',
  'umass lowell': 'UMass Lowell',
  'njit': 'NJIT',
  
  // Misc Loyola schools
  'loyola maryland': 'Loyola Maryland',
  'loyola (md)': 'Loyola Maryland',
  'loyola-maryland': 'Loyola Maryland',
  'loyola chicago': 'Loyola Chicago',
  'loyola (il)': 'Loyola Chicago',
  'loyola new orleans': 'Loyola New Orleans',
  'loyola (la)': 'Loyola New Orleans',
  
  // Professional/International (to filter out)
  'nba': null,
  'wnba': null,
  'g league': null,
  'overseas': null,
};

/**
 * Normalize a school name to its canonical form
 * Returns null for non-college entries (NBA, WNBA, etc.)
 */
export function normalizeSchoolName(name) {
  if (!name) return name;
  
  // Clean the name first
  let cleaned = name.trim();
  
  // Remove common suffixes/prefixes
  cleaned = cleaned
    .replace(/\s+University$/i, '')
    .replace(/^University\s+of\s+/i, '')
    .replace(/\s+College$/i, '')
    .replace(/\s+St\.?$/i, ' State');
  
  const lowerName = cleaned.toLowerCase().trim();
  
  // Check direct mapping
  if (SCHOOL_NAME_MAP.hasOwnProperty(lowerName)) {
    return SCHOOL_NAME_MAP[lowerName];
  }
  
  // Check original name too
  const lowerOriginal = name.toLowerCase().trim();
  if (SCHOOL_NAME_MAP.hasOwnProperty(lowerOriginal)) {
    return SCHOOL_NAME_MAP[lowerOriginal];
  }
  
  // Return cleaned version if not found
  return cleaned;
}

/**
 * Get deduplicated, sorted school list
 * Schools with logos appear first, then alphabetically
 */
export function getDeduplicatedSchools(schools, getLogoFn) {
  const normalized = new Map();
  
  schools.forEach(school => {
    if (!school) return;
    const canonical = normalizeSchoolName(school);
    if (canonical === null) return; // Filter out NBA/WNBA
    if (!normalized.has(canonical.toLowerCase())) {
      normalized.set(canonical.toLowerCase(), canonical);
    }
  });
  
  const uniqueSchools = Array.from(normalized.values());
  
  // Sort: schools with logos first, then alphabetically
  return uniqueSchools.sort((a, b) => {
    const aHasLogo = getLogoFn ? !!getLogoFn(a) : false;
    const bHasLogo = getLogoFn ? !!getLogoFn(b) : false;
    
    if (aHasLogo && !bHasLogo) return -1;
    if (!aHasLogo && bHasLogo) return 1;
    return a.localeCompare(b);
  });
}

export default { SCHOOL_NAME_MAP, normalizeSchoolName, getDeduplicatedSchools };
