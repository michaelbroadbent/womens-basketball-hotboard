import React, { useState, useMemo, useEffect, useRef } from 'react';
import BasketballByStats from './BasketballByStats';
import BasketballStaffHistory from './BasketballStaffHistory';
import BasketballSchoolRoster from './BasketballSchoolRoster';
import { TeamWithLogo, TeamLogo, getTeamLogoUrl } from './basketballTeamLogos';

// ═══════════════════════════════════════════════════════════════════════════
// SCHOOL NAME CANONICALIZATION
// ═══════════════════════════════════════════════════════════════════════════

const SCHOOL_CANONICAL_MAP = {
  // Power conferences
  "university of alabama": "Alabama",
  "alabama crimson tide": "Alabama",
  "university of kentucky": "Kentucky",
  "kentucky wildcats": "Kentucky",
  "duke university": "Duke",
  "duke blue devils": "Duke",
  "university of north carolina": "North Carolina",
  "north carolina tar heels": "North Carolina",
  "unc": "North Carolina",
  "university of kansas": "Kansas",
  "kansas jayhawks": "Kansas",
  "university of connecticut": "UConn",
  "connecticut huskies": "UConn",
  "connecticut": "UConn",
  "uconn": "UConn",
  "gonzaga university": "Gonzaga",
  "gonzaga bulldogs": "Gonzaga",
  "university of michigan": "Michigan",
  "michigan wolverines": "Michigan",
  "michigan state university": "Michigan State",
  "michigan state spartans": "Michigan State",
  "villanova university": "Villanova",
  "villanova wildcats": "Villanova",
  "university of arizona": "Arizona",
  "arizona wildcats": "Arizona",
  "purdue university": "Purdue",
  "purdue boilermakers": "Purdue",
  "university of houston": "Houston",
  "houston cougars": "Houston",
  "auburn university": "Auburn",
  "auburn tigers": "Auburn",
  "university of tennessee": "Tennessee",
  "tennessee volunteers": "Tennessee",
  "baylor university": "Baylor",
  "baylor bears": "Baylor",
  "university of texas": "Texas",
  "texas longhorns": "Texas",
  "university of florida": "Florida",
  "florida gators": "Florida",
  "indiana university": "Indiana",
  "indiana hoosiers": "Indiana",
  "university of louisville": "Louisville",
  "louisville cardinals": "Louisville",
  "louisiana state university": "LSU",
  "lsu tigers": "LSU",
  "lsu": "LSU",
  "university of arkansas": "Arkansas",
  "arkansas razorbacks": "Arkansas",
  "university of virginia": "Virginia",
  "virginia cavaliers": "Virginia",
  "iowa state university": "Iowa State",
  "iowa state cyclones": "Iowa State",
  "iowa st.": "Iowa State",
  "iowa st": "Iowa State",
  "university of iowa": "Iowa",
  "iowa hawkeyes": "Iowa",
  "ohio state university": "Ohio State",
  "the ohio state university": "Ohio State",
  "ohio state buckeyes": "Ohio State",
  "ohio st.": "Ohio State",
  "ohio st": "Ohio State",
  "university of wisconsin": "Wisconsin",
  "wisconsin badgers": "Wisconsin",
  "university of illinois": "Illinois",
  "illinois fighting illini": "Illinois",
  "university of maryland": "Maryland",
  "maryland terrapins": "Maryland",
  "rutgers university": "Rutgers",
  "rutgers scarlet knights": "Rutgers",
  "penn state university": "Penn State",
  "pennsylvania state university": "Penn State",
  "penn st.": "Penn State",
  "penn st": "Penn State",
  "northwestern university": "Northwestern",
  "northwestern wildcats": "Northwestern",
  "university of minnesota": "Minnesota",
  "minnesota golden gophers": "Minnesota",
  "university of nebraska": "Nebraska",
  "nebraska cornhuskers": "Nebraska",
  "ucla": "UCLA",
  "university of california, los angeles": "UCLA",
  "usc": "USC",
  "university of southern california": "USC",
  "southern california": "USC",
  "stanford university": "Stanford",
  "stanford cardinal": "Stanford",
  "university of oregon": "Oregon",
  "oregon ducks": "Oregon",
  "university of washington": "Washington",
  "washington huskies": "Washington",
  "university of colorado": "Colorado",
  "colorado buffaloes": "Colorado",
  "arizona state university": "Arizona State",
  "arizona state sun devils": "Arizona State",
  "arizona st.": "Arizona State",
  "arizona st": "Arizona State",
  "university of utah": "Utah",
  "utah utes": "Utah",
  "brigham young university": "BYU",
  "byu cougars": "BYU",
  "byu": "BYU",
  "texas tech university": "Texas Tech",
  "texas tech red raiders": "Texas Tech",
  "oklahoma state university": "Oklahoma State",
  "oklahoma state cowboys": "Oklahoma State",
  "oklahoma st.": "Oklahoma State",
  "oklahoma st": "Oklahoma State",
  "university of oklahoma": "Oklahoma",
  "oklahoma sooners": "Oklahoma",
  "tcu": "TCU",
  "texas christian university": "TCU",
  "kansas state university": "Kansas State",
  "kansas state wildcats": "Kansas State",
  "kansas st.": "Kansas State",
  "kansas st": "Kansas State",
  "west virginia university": "West Virginia",
  "west virginia mountaineers": "West Virginia",
  "university of cincinnati": "Cincinnati",
  "cincinnati bearcats": "Cincinnati",
  "university of central florida": "UCF",
  "ucf knights": "UCF",
  "ucf": "UCF",
  "university of miami": "Miami (FL)",
  "miami hurricanes": "Miami (FL)",
  "miami": "Miami (FL)",
  "miami (fl)": "Miami (FL)",
  "miami (fla.)": "Miami (FL)",
  "miami (florida)": "Miami (FL)",
  "miami university": "Miami (OH)",
  "miami redhawks": "Miami (OH)",
  "miami (oh)": "Miami (OH)",
  "miami (ohio)": "Miami (OH)",
  "florida state university": "Florida State",
  "florida state seminoles": "Florida State",
  "florida st.": "Florida State",
  "florida st": "Florida State",
  "clemson university": "Clemson",
  "clemson tigers": "Clemson",
  "georgia tech": "Georgia Tech",
  "georgia institute of technology": "Georgia Tech",
  "university of georgia": "Georgia",
  "georgia bulldogs": "Georgia",
  "university of south carolina": "South Carolina",
  "south carolina gamecocks": "South Carolina",
  "vanderbilt university": "Vanderbilt",
  "vanderbilt commodores": "Vanderbilt",
  "university of mississippi": "Ole Miss",
  "mississippi": "Ole Miss",
  "ole miss rebels": "Ole Miss",
  "mississippi state university": "Mississippi State",
  "mississippi state bulldogs": "Mississippi State",
  "mississippi st.": "Mississippi State",
  "mississippi st": "Mississippi State",
  "texas a&m university": "Texas A&M",
  "texas a&m aggies": "Texas A&M",
  "university of missouri": "Missouri",
  "missouri tigers": "Missouri",
  "nc state": "NC State",
  "north carolina state": "NC State",
  "north carolina state university": "NC State",
  "n.c. state": "NC State",
  "university of pittsburgh": "Pittsburgh",
  "pitt": "Pittsburgh",
  "pitt panthers": "Pittsburgh",
  "syracuse university": "Syracuse",
  "syracuse orange": "Syracuse",
  "boston college": "Boston College",
  "boston college eagles": "Boston College",
  "wake forest university": "Wake Forest",
  "wake forest demon deacons": "Wake Forest",
  "virginia tech": "Virginia Tech",
  "virginia polytechnic institute": "Virginia Tech",
  "notre dame": "Notre Dame",
  "university of notre dame": "Notre Dame",
  "notre dame fighting irish": "Notre Dame",
  "smu": "SMU",
  "southern methodist university": "SMU",
  "university of memphis": "Memphis",
  "memphis tigers": "Memphis",
  "creighton university": "Creighton",
  "creighton bluejays": "Creighton",
  "marquette university": "Marquette",
  "marquette golden eagles": "Marquette",
  "xavier university": "Xavier",
  "xavier musketeers": "Xavier",
  "seton hall university": "Seton Hall",
  "seton hall pirates": "Seton Hall",
  "providence college": "Providence",
  "providence friars": "Providence",
  "butler university": "Butler",
  "butler bulldogs": "Butler",
  "depaul university": "DePaul",
  "depaul blue demons": "DePaul",
  "georgetown university": "Georgetown",
  "georgetown hoyas": "Georgetown",
  // Saint schools (St. at beginning = Saint)
  "st. john's university": "St. John's",
  "st. john's red storm": "St. John's",
  "st. john's": "St. John's",
  "saint john's": "St. John's",
  "saint mary's": "Saint Mary's",
  "st. mary's": "Saint Mary's",
  "saint mary's college": "Saint Mary's",
  "saint mary's college of california": "Saint Mary's",
  "st. mary's college": "Saint Mary's",
  "saint louis university": "Saint Louis",
  "saint louis billikens": "Saint Louis",
  "st. louis": "Saint Louis",
  "st. louis university": "Saint Louis",
  "saint joseph's": "Saint Joseph's",
  "st. joseph's": "Saint Joseph's",
  "saint joseph's university": "Saint Joseph's",
  "saint peter's": "Saint Peter's",
  "st. peter's": "Saint Peter's",
  "saint bonaventure": "St. Bonaventure",
  "st. bonaventure": "St. Bonaventure",
  "saint francis": "Saint Francis",
  "st. francis": "Saint Francis",
  // Schools with State in name
  "san diego state": "San Diego State",
  "san diego state university": "San Diego State",
  "san diego state aztecs": "San Diego State",
  "sdsu": "San Diego State",
  "fresno state": "Fresno State",
  "fresno state university": "Fresno State",
  "boise state": "Boise State", 
  "boise state university": "Boise State",
  "utah state": "Utah State",
  "utah state university": "Utah State",
  "utah st.": "Utah State",
  "colorado state": "Colorado State",
  "colorado state university": "Colorado State",
  "colorado st.": "Colorado State",
  "washington state": "Washington State",
  "washington state university": "Washington State",
  "washington st.": "Washington State",
  "oregon state": "Oregon State",
  "oregon state university": "Oregon State",
  "oregon st.": "Oregon State",
  "murray state": "Murray State",
  "murray state university": "Murray State",
  "kent state": "Kent State",
  "kent state university": "Kent State",
  "ball state": "Ball State",
  "ball state university": "Ball State",
  "appalachian state": "Appalachian State",
  "appalachian state university": "Appalachian State",
  // Other common variations
  "dayton": "Dayton",
  "university of dayton": "Dayton",
  "dayton flyers": "Dayton",
  "san francisco": "San Francisco",
  "university of san francisco": "San Francisco",
  "usf": "San Francisco",
  "loyola marymount": "Loyola Marymount",
  "loyola marymount university": "Loyola Marymount",
  "lmu": "Loyola Marymount",
  "loyola chicago": "Loyola Chicago",
  "loyola university chicago": "Loyola Chicago",
  "loyola (illinois)": "Loyola Chicago",
  "loyola illinois": "Loyola Chicago",
  "loyola-chicago": "Loyola Chicago",
  "loyola maryland": "Loyola Maryland",
  "loyola university maryland": "Loyola Maryland",
  "loyola (maryland)": "Loyola Maryland",
  "loyola (md)": "Loyola Maryland",
  "loyola md": "Loyola Maryland",
  "loyola-maryland": "Loyola Maryland",
  "loyola": "Loyola Chicago",  // Plain "Loyola" defaults to Chicago (main basketball program)
  "loyola new orleans": "Loyola New Orleans",
  "loyola university new orleans": "Loyola New Orleans",
  "santa clara": "Santa Clara",
  "santa clara university": "Santa Clara",
  "pepperdine": "Pepperdine",
  "pepperdine university": "Pepperdine",
  "pacific": "Pacific",
  "university of the pacific": "Pacific",
  "san jose state": "San Jose State",
  "san jose state university": "San Jose State",
  "unlv": "UNLV",
  "university of nevada, las vegas": "UNLV",
  "nevada": "Nevada",
  "university of nevada": "Nevada",
  "new mexico": "New Mexico",
  "university of new mexico": "New Mexico",
  "new mexico state": "New Mexico State",
  "new mexico state university": "New Mexico State",
  // Historically Black Colleges
  "grambling state": "Grambling State",
  "grambling state university": "Grambling State",
  "morgan state": "Morgan State",
  "morgan state university": "Morgan State",
  "norfolk state": "Norfolk State",
  "norfolk state university": "Norfolk State",
  "howard": "Howard",
  "howard university": "Howard",
  "hampton": "Hampton",
  "hampton university": "Hampton",
  // Mid-majors
  "vcu": "VCU",
  "virginia commonwealth": "VCU",
  "virginia commonwealth university": "VCU",
  "george mason": "George Mason",
  "george mason university": "George Mason",
  "george washington": "George Washington",
  "george washington university": "George Washington",
  "gw": "George Washington",
  "american": "American",
  "american university": "American",
  "navy": "Navy",
  "naval academy": "Navy",
  "united states naval academy": "Navy",
  "army": "Army",
  "united states military academy": "Army",
  "air force": "Air Force",
  "united states air force academy": "Air Force",
  // Rutgers variations
  "rutgers": "Rutgers",
  "rutgers university": "Rutgers",
  "rutgers university-new brunswick": "Rutgers",
  "rutgers university–new brunswick": "Rutgers",
  "rutgers-newark": "Rutgers-Newark",
  "rutgers university-newark": "Rutgers-Newark",
  "rutgers university–newark": "Rutgers-Newark",
};

// Caches for performance
const canonicalCache = new Map();
const schoolMatchCache = new Map();

// Clean up concatenated school names (e.g., "ArizonaStateUNLV" -> "Arizona State")
const cleanConcatenatedName = (name) => {
  if (!name) return name;
  // Common patterns where schools got concatenated
  const knownConcats = [
    /([A-Za-z]+State)([A-Z][a-z]+)/, // "ArizonaStateUNLV"
    /([A-Za-z]+)([A-Z][a-z]+State)/, // Something before a State school
    /([A-Za-z]+College)([A-Z][a-z]+)/, // "SomeCollegeOther"
    /([A-Za-z]+University)([A-Z][a-z]+)/, // "SomeUniversityOther"
  ];
  for (const pattern of knownConcats) {
    if (pattern.test(name)) {
      return name.replace(pattern, '$1');
    }
  }
  return name;
};

// Clean position/role info from school names
// Removes: (asst.), (GA), (DBO), (AHC), (dir. of ops.), etc.
// Keeps: State identifiers like (OH), (FL), (PA), (TX) for schools like "Miami (OH)"
const cleanSchoolName = (school) => {
  if (!school) return school;
  
  // State abbreviations to KEEP (these distinguish schools like "Miami (OH)" vs "Miami (FL)")
  // Note: GA is both Georgia and Graduate Assistant - we only keep it for state context
  const stateAbbrevs = /\((AL|AK|AZ|AR|CA|CO|CT|DE|FL|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|Pa\.|Ohio|Maryland|Minnesota|Illinois|West Virginia|Pennsylvania)\)$/i;
  
  // If it ends with a state abbreviation, keep it
  if (stateAbbrevs.test(school)) {
    return school.trim();
  }
  
  // Remove position/role parentheticals at the end
  // Include GA explicitly since it's commonly Graduate Assistant
  let cleaned = school
    .replace(/\s*\(GA\)\s*$/gi, '')  // Graduate Assistant specifically
    .replace(/\s*\([^)]*(?:asst|assistant|DBO|AHC|VHC|VC|DPD|RC|GM|AGM|coord|ops|operations|manager|admin|volunteer|student|grad|graduate|special|women|men|youth|shooting|vid|development|EXOS|Korisliga|China|NBA|League)[^)]*\)\s*$/gi, '')
    .trim();
  
  return cleaned || school;
};

// Check if a position is a HEAD COACH (not Associate or Assistant Head Coach)
const isHeadCoachPosition = (position) => {
  if (!position) return false;
  const lower = position.toLowerCase().trim();
  
  // Must contain "head coach"
  if (!lower.includes('head coach')) return false;
  
  // Exclude positions that are NOT head coach
  // Associate Head Coach, Assistant Head Coach, etc.
  if (/\b(associate|assistant|asst\.?|assoc\.?)\b.*head\s*coach/i.test(lower)) {
    return false;
  }
  
  // Also exclude "Head Assistant Coach" or similar
  if (/head\s+(assistant|associate)/i.test(lower)) {
    return false;
  }
  
  return true;
};

const canonicalizeSchoolName = (name) => {
  if (!name) return name;
  if (canonicalCache.has(name)) return canonicalCache.get(name);
  
  // Clean position info first, then concatenated names
  let normalized = cleanSchoolName(name.trim());
  normalized = cleanConcatenatedName(normalized);
  const lower = normalized.toLowerCase();
  
  // Direct mapping lookup
  if (SCHOOL_CANONICAL_MAP[lower]) {
    const result = SCHOOL_CANONICAL_MAP[lower];
    canonicalCache.set(name, result);
    return result;
  }
  
  // Handle "St." at beginning (means "Saint") vs at end or middle (could be "State")
  // Schools starting with "St." = Saint (e.g., "St. John's", "St. Mary's")
  // Schools ending with "St." = State (e.g., "Mississippi St.")
  
  let result = normalized;
  
  // Normalize State abbreviations at END of name
  result = result.replace(/\s+St\.?$/i, ' State');
  
  // Keep "St." at beginning (means Saint)
  // Normalize "Saint" to "St." at beginning for consistency
  result = result.replace(/^Saint\s+/i, "St. ");
  
  // Remove common suffixes
  result = result
    .replace(/\s+State\s+University$/i, ' State')
    .replace(/^University\s+of\s+(?!.*\s+at\s+)/i, '')
    .replace(/\s+University$/i, '')
    .replace(/\s+College$/i, '')
    .trim();
  
  canonicalCache.set(name, result);
  return result;
};

// Normalize school name for display - returns canonical name that matches logos
const normalizeSchoolForDisplay = (name) => {
  if (!name) return name;
  
  // First apply canonicalization
  const canonical = canonicalizeSchoolName(name);
  
  // Additional display-specific mappings to use abbreviations/common names
  const displayMap = {
    'south florida': 'USF',
    'university of south florida': 'USF',
    'central florida': 'UCF', 
    'university of central florida': 'UCF',
    'southern california': 'USC',
    'university of southern california': 'USC',
    'connecticut': 'UConn',
    'university of connecticut': 'UConn',
    'virginia commonwealth': 'VCU',
    'virginia commonwealth university': 'VCU',
    'brigham young': 'BYU',
    'brigham young university': 'BYU',
    'louisiana state': 'LSU',
    'louisiana state university': 'LSU',
    'southern methodist': 'SMU',
    'southern methodist university': 'SMU',
    'texas christian': 'TCU',
    'texas christian university': 'TCU',
    'florida gulf coast': 'FGCU',
    'florida atlantic': 'FAU',
    'florida international': 'FIU',
    'texas-san antonio': 'UTSA',
    'ut san antonio': 'UTSA',
    'texas-el paso': 'UTEP',
    'ut el paso': 'UTEP',
    'texas-arlington': 'UT Arlington',
    'massachusetts': 'UMass',
    'university of massachusetts': 'UMass',
    'maryland-baltimore county': 'UMBC',
    'pittsburgh': 'Pitt',
    'university of pittsburgh': 'Pitt',
    'mississippi': 'Ole Miss',
    'university of mississippi': 'Ole Miss',
    'north carolina state': 'NC State',
    'louisiana-lafayette': 'Louisiana',
    'university of louisiana': 'Louisiana',
    'louisiana-monroe': 'ULM',
    'unc wilmington': 'UNCW',
    'unc greensboro': 'UNCG',
    'unc asheville': 'UNCA',
    'unc charlotte': 'Charlotte',
  };
  
  const lower = canonical.toLowerCase();
  if (displayMap[lower]) {
    return displayMap[lower];
  }
  
  return canonical;
};

const normalizeForMatch = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim()
    // Handle "St." at end (means State)
    .replace(/\s+st\.?$/i, ' state')
    // Keep "St." at beginning intact for now
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
};

const schoolsMatch = (school1, school2) => {
  if (!school1 || !school2) return false;
  
  const cacheKey = school1 < school2 ? `${school1}|||${school2}` : `${school2}|||${school1}`;
  if (schoolMatchCache.has(cacheKey)) return schoolMatchCache.get(cacheKey);
  
  const c1 = canonicalizeSchoolName(school1);
  const c2 = canonicalizeSchoolName(school2);
  
  // Exact match after canonicalization
  if (c1.toLowerCase() === c2.toLowerCase()) {
    schoolMatchCache.set(cacheKey, true);
    return true;
  }
  
  // Normalized match (handles State abbreviations)
  const n1 = normalizeForMatch(c1);
  const n2 = normalizeForMatch(c2);
  if (n1 === n2) {
    schoolMatchCache.set(cacheKey, true);
    return true;
  }
  
  // Check with hyphen variations removed
  // "Birmingham-Southern" should match "Birmingham Southern"
  const v1 = normalizeSchoolVariation(c1).toLowerCase();
  const v2 = normalizeSchoolVariation(c2).toLowerCase();
  if (v1 === v2) {
    schoolMatchCache.set(cacheKey, true);
    return true;
  }
  
  schoolMatchCache.set(cacheKey, false);
  return false;
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

const formatYearRange = (start, end, rawYears = null) => {
  // Check raw_years first for "present"
  if (rawYears) {
    const rawLower = rawYears.toLowerCase();
    if (rawLower.includes('present')) {
      return start ? `${start}–present` : rawYears;
    }
    // Check if raw_years ends with just a dash (e.g., "2018–")
    if (/[–\-]\s*$/.test(rawYears) && start) {
      return `${start}–present`;
    }
  }
  
  // If no end year, show as present
  if (start && (end === null || end === undefined)) {
    return `${start}–present`;
  }
  
  // If end year is current year or later, show as present
  const currentYear = new Date().getFullYear();
  if (start && end && end >= currentYear) {
    return `${start}–present`;
  }
  
  // Normal range formatting
  if (start == null && end == null) return null;
  if (start == null) return `–${end}`;
  if (end == null) return `${start}–present`;
  if (start === end) return `${start}`;
  return `${start}–${end}`;
};

const calculateAge = (birthdate) => {
  if (!birthdate) return null;
  const birthDate = new Date(birthdate);
  if (isNaN(birthDate.getTime())) return null;
  
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const formatBirthdate = (birthdate) => {
  if (!birthdate) return null;
  const date = new Date(birthdate);
  if (isNaN(date.getTime())) return birthdate;
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const getCoachAge = (coach) => {
  if (!coach) return null;
  
  try {
    // Basketball data uses birthDate (capital D)
    const birthDate = coach.birthDate || coach.birthdate;
    if (birthDate) {
      const age = calculateAge(birthDate);
      if (age && age > 0 && age < 120) return { age, isEstimate: false };
    }
  } catch (e) {
    console.warn('Error calculating age for coach:', coach?.name, e);
  }
  
  return null;
};

// Split concatenated school names and clean degree info
// Handles: "School(BA)OtherSchool(M.Ed, '99)", "SchoolASchoolB", "Delgado CCSoutheastern Louisiana"
const splitConcatenatedSchools = (name) => {
  if (!name || typeof name !== 'string') return [];
  
  let tempName = name.trim();
  
  // Step 0: Pre-clean common bad patterns
  // Remove leading/trailing commas
  tempName = tempName.replace(/^,\s*/, '').replace(/,\s*$/, '').trim();
  
  // Remove ", B.S.", ", B.A.", ", M.S.", etc. at end
  tempName = tempName.replace(/,\s*B\.?[A-Z]?\.?\s*$/gi, '');
  tempName = tempName.replace(/,\s*M\.?[A-Z]?\.?\s*$/gi, '');
  tempName = tempName.replace(/,\s*Ph\.?D\.?\s*$/gi, '');
  tempName = tempName.replace(/,\s*J\.?D\.?\s*$/gi, '');
  tempName = tempName.replace(/,\s*Ed\.?D\.?\s*$/gi, '');
  
  // Remove ", Spain", ", Germany", etc. (foreign countries)
  tempName = tempName.replace(/,\s*(Spain|Germany|France|Italy|Australia|Canada|England|UK|Greece|Serbia|Croatia|Lithuania|Slovenia|Brazil|Argentina|Mexico|Japan|China|Korea|Philippines|Nigeria|Senegal|Congo|Cameroon|Belgium|Netherlands|Israel|Turkey|Poland|Russia|Ukraine|Czech Republic|Hungary|Austria|Switzerland|Sweden|Norway|Denmark|Finland|Portugal|Ireland|Scotland|Wales|New Zealand|South Africa|Egypt|Morocco|Tunisia|Algeria|Kenya|Ghana|Angola|Mozambique|Zimbabwe|Tanzania|Uganda|Ethiopia|Rwanda|Ivory Coast|Mali|Burkina Faso|Guinea|Dominican Republic|Puerto Rico|Cuba|Jamaica|Haiti|Trinidad|Bahamas|Venezuela|Colombia|Peru|Chile|Ecuador|Bolivia|Paraguay|Uruguay|Panama|Costa Rica|Guatemala|Honduras|El Salvador|Nicaragua)\s*$/gi, '');
  
  // Remove location parentheticals like (Cheyenne, Wyoming) but keep state-only ones like (OH)
  tempName = tempName.replace(/\([^)]*,\s*[A-Za-z]+\)/g, '');
  
  // Step 0.5: Handle known uppercase acronyms followed by another school
  // UCLALoyola -> UCLA|||Loyola, UNLVUtah -> UNLV|||Utah, etc.
  const acronyms = ['UCLA', 'UNLV', 'UMBC', 'UNCW', 'UNCG', 'UTEP', 'UTSA', 'UCONN', 'UConn', 'UMASS', 'UMass', 'SMU', 'TCU', 'BYU', 'LSU', 'USC', 'UCF', 'USF', 'VCU', 'FIU', 'FAU', 'FGCU', 'UAB', 'UNC', 'MIT', 'NYU', 'LIU', 'FDU', 'NIU', 'SIU', 'WKU', 'EKU', 'NKU', 'IUPUI', 'IPFW', 'SIUE', 'NJIT'];
  for (const acronym of acronyms) {
    // Split if followed by uppercase letter (start of new school name)
    const regex = new RegExp(`(${acronym})([A-Z][a-z])`, 'g');
    tempName = tempName.replace(regex, '$1|||$2');
  }
  
  // Step 1: Identify and preserve simple state parentheticals (including full state names)
  const statePatterns = /\((AL|AK|AZ|AR|CA|CO|CT|DE|FL|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|Pa\.|Ohio|West Virginia|Pennsylvania|Illinois|Maryland|Minnesota|California|Texas|Florida|New York|Virginia|Indiana|Georgia|North Carolina|South Carolina|Tennessee|Kentucky|Alabama|Mississippi|Louisiana|Arkansas|Oklahoma|Kansas|Nebraska|Colorado|New Mexico|Arizona|Nevada|Utah|Wyoming|Montana|Idaho|Oregon|Washington|Maine|Vermont|New Hampshire|Massachusetts|Connecticut|Rhode Island|New Jersey|Delaware)\)/gi;
  const stateMatches = [];
  tempName = tempName.replace(statePatterns, (match) => {
    stateMatches.push(match);
    return `__STATE${stateMatches.length - 1}__`;
  });
  
  // Step 2: Remove year ranges in parentheses like (1988-1991, 1992-1993) or (1994-1995)
  tempName = tempName.replace(/\(\d{4}[–\-]\d{4}(?:\s*,\s*\d{4}[–\-]\d{4})*\)/g, '');
  
  // Step 3: Replace degree parentheticals with delimiter
  tempName = tempName
    .replace(/\([^)]*(?:B\.?A|B\.?S|M\.?A|M\.?S|M\.?Ed|Ph\.?D|Ed\.?D|J\.?D|A\.?A|D\.?Min)[^)]*\)/gi, '|||')
    .replace(/\([^)]*['']?\d{2,4}[^)]*\)/g, '|||')
    .replace(/\([A-Z]{2,4}\)/g, '|||')
    .trim();
  
  // Restore state parentheticals
  stateMatches.forEach((state, i) => {
    tempName = tempName.replace(`__STATE${i}__`, state);
  });
  
  // Step 4: Add split points at word boundaries
  tempName = tempName.replace(/(\bCC)([A-Z][a-z])/g, '$1|||$2');
  tempName = tempName.replace(/(University|College|State|Institute|Academy|School|Tech)([A-Z])/g, '$1|||$2');
  
  // Handle lowercase to uppercase transitions
  const prefixPattern = /(?:Mc|Mac|De|La|Le|Van|Von|Du|Di|Da|O')$/i;
  
  let result = '';
  for (let i = 0; i < tempName.length; i++) {
    const char = tempName[i];
    const prevChar = i > 0 ? tempName[i - 1] : '';
    
    if (i > 0 && /[a-z]/.test(prevChar) && /[A-Z]/.test(char)) {
      const lastPart = result.slice(-3);
      if (prefixPattern.test(lastPart)) {
        result += char;
      } else {
        result += '|||' + char;
      }
    } else {
      result += char;
    }
  }
  
  // Step 5: Split and clean up
  let parts = result
    .split('|||')
    .map(s => s.trim())
    .filter(s => s.length > 1)
    // Filter out entries that are just punctuation
    .filter(s => !/^[,.\s]+$/.test(s))
    // Filter out entries that look like degree abbreviations
    .filter(s => !/^[A-Z]\.?[A-Z]?\.?S?\.?$/i.test(s))
    // Filter out entries starting with comma
    .map(s => s.replace(/^,\s*/, '').trim())
    .filter(s => s.length > 1);
  
  return parts;
};

// Normalize school name variations for matching
// "Birmingham-Southern" should match "Birmingham Southern"
const normalizeSchoolVariation = (name) => {
  if (!name) return '';
  return name
    .trim()
    .replace(/[–—]/g, '-')      // Normalize dashes
    .replace(/\s*-\s*/g, ' ')   // Replace hyphens with spaces
    .replace(/\s+/g, ' ')       // Normalize whitespace
    .toLowerCase()
    .trim();
};

// Clean and split alma mater data
const cleanAlmaMater = (almaMater) => {
  if (!almaMater) return [];
  
  let schools = [];
  
  if (typeof almaMater === 'string') {
    schools = splitConcatenatedSchools(almaMater);
  } else if (Array.isArray(almaMater)) {
    almaMater.forEach(am => {
      if (typeof am === 'string') {
        schools.push(...splitConcatenatedSchools(am));
      }
    });
  }
  
  // Canonicalize each school and deduplicate by normalized form
  const seen = new Map();
  const result = [];
  
  schools.forEach(s => {
    const canonical = canonicalizeSchoolName(s);
    if (canonical && canonical.length > 1) {
      const normalized = normalizeSchoolVariation(canonical);
      if (!seen.has(normalized)) {
        seen.set(normalized, canonical);
        result.push(canonical);
      }
    }
  });
  
  return result;
};

const formatAlmaMater = (almaMater) => {
  const cleaned = cleanAlmaMater(almaMater);
  if (cleaned.length === 0) return null;
  return cleaned.join(', ');
};

// Check if a job is current (ends in current year, has no end year, or has "present" in raw_years)
const isCurrentJob = (job) => {
  if (!job) return false;
  
  // Check raw_years first - most reliable
  if (job.raw_years) {
    const rawLower = job.raw_years.toLowerCase();
    if (rawLower.includes('present')) return true;
    // Check if raw_years ends with just a dash (e.g., "2018–" or "2017-")
    if (/[–\-]\s*$/.test(job.raw_years)) return true;
  }
  
  // If there's no end year specified, it's current
  if (job.years?.start && (job.years?.end === null || job.years?.end === undefined)) {
    return true;
  }
  
  // If end year is current year or later
  const currentYear = new Date().getFullYear();
  if (job.years?.end && job.years.end >= currentYear) return true;
  
  return false;
};

// Sort coaching career by year (current first, then most recent)
const sortCareerByYear = (career, currentTeam = null) => {
  if (!career || !Array.isArray(career)) return [];
  return [...career].sort((a, b) => {
    // Current positions always come first
    const aIsCurrent = isCurrentJob(a);
    const bIsCurrent = isCurrentJob(b);
    
    if (aIsCurrent && !bIsCurrent) return -1;
    if (!aIsCurrent && bIsCurrent) return 1;
    
    // If both current or both not current, sort by start year descending (most recent first)
    const aStartYear = a.years?.start || 0;
    const bStartYear = b.years?.start || 0;
    if (aStartYear !== bStartYear) return bStartYear - aStartYear;
    
    // If same start year, sort by end year descending
    const aEndYear = a.years?.end || 9999; // Current jobs get high value
    const bEndYear = b.years?.end || 9999;
    return bEndYear - aEndYear;
  });
};

// Format overall record (handles both string, array of objects, and single object formats)
const formatOverallRecord = (record) => {
  if (!record) return null;
  if (typeof record === 'string') return record;
  if (typeof record === 'number') return String(record);
  
  // Handle single object with wins/losses
  if (typeof record === 'object' && !Array.isArray(record)) {
    if (record.wins !== undefined && record.losses !== undefined) {
      const pct = record.pct ? ` (.${Math.round(record.pct * 1000)})` : '';
      const ctx = record.context ? ` (${record.context})` : '';
      return `${record.wins}–${record.losses}${pct}${ctx}`;
    }
    // Unknown object structure - return null to avoid React error
    return null;
  }
  
  // Handle array of records
  if (Array.isArray(record)) {
    const formatted = record.map(r => {
      if (typeof r === 'string') return r;
      if (typeof r === 'number') return String(r);
      if (r && typeof r === 'object' && r.wins !== undefined && r.losses !== undefined) {
        const pct = r.pct ? ` (.${Math.round(r.pct * 1000)})` : '';
        const ctx = r.context ? ` (${r.context})` : '';
        return `${r.wins}–${r.losses}${pct}${ctx}`;
      }
      return null; // Skip unknown structures
    }).filter(Boolean);
    return formatted.length > 0 ? formatted.join(', ') : null;
  }
  
  return null;
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function WomensBasketballHotboard() {
  // Data state
  const [coachesData, setCoachesData] = useState([]);
  const [torvikData, setTorvikData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // UI state
  const [searchMode, setSearchMode] = useState('school');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedAlmaMater, setSelectedAlmaMater] = useState('');
  const [selectedStates, setSelectedStates] = useState([]);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const stateDropdownRef = useRef(null);
  const [searchedCoach, setSearchedCoach] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [viewMode, setViewMode] = useState('overlaps');
  const [modalTab, setModalTab] = useState('career');
  const [coachingTree, setCoachingTree] = useState(null);
  const [statsView, setStatsView] = useState('offense'); // 'offense' or 'defense'
  const [secondarySchool, setSecondarySchool] = useState('');
  const [secondarySearchTerm, setSecondarySearchTerm] = useState('');
  
  // Connection data
  const [currentStaff, setCurrentStaff] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedStaffMember, setSelectedStaffMember] = useState(null);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const coachesRes = await fetch('/data/coaches_womens_basketball.json');
        if (!coachesRes.ok) throw new Error('Failed to load coaches data');
        const coaches = await coachesRes.json();
        setCoachesData(coaches);
        
        const torvikRes = await fetch('/data/torvik_ncaaw_trank_2021_2026.json');
        if (!torvikRes.ok) throw new Error('Failed to load Torvik data');
        const torvik = await torvikRes.json();
        setTorvikData(torvik);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Close state dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(e.target)) {
        setStateDropdownOpen(false);
      }
    };
    if (stateDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [stateDropdownOpen]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get all unique current teams
  const allCurrentTeams = useMemo(() => {
    const teams = new Set();
    coachesData.forEach(coach => {
      if (coach.currentTeam) {
        teams.add(canonicalizeSchoolName(coach.currentTeam));
      }
    });
    return Array.from(teams).sort();
  }, [coachesData]);

  // Get all unique alma maters (with proper splitting of concatenated names)
  const allAlmaMaters = useMemo(() => {
    const amsMap = new Map(); // Use map for deduplication by canonical name
    coachesData.forEach(coach => {
      const am = coach.almaMater || coach.alma_mater;
      if (am) {
        // Use cleanAlmaMater to properly split concatenated names
        const cleaned = cleanAlmaMater(am);
        cleaned.forEach(a => {
          if (a && a.length > 1) {
            // Get canonical name for deduplication
            const canonical = canonicalizeSchoolName(a);
            // Only add if we haven't seen this canonical name yet
            if (!amsMap.has(canonical.toLowerCase())) {
              amsMap.set(canonical.toLowerCase(), canonical);
            }
          }
        });
      }
    });
    return Array.from(amsMap.values()).sort();
  }, [coachesData]);

  // US State abbreviations and full names mapping
  const US_STATES = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
    'District of Columbia': 'DC', 'D.C.': 'DC'
  };
  
  // Extract state from birthPlace
  const extractState = (birthPlace) => {
    if (!birthPlace) return null;
    const parts = birthPlace.split(',').map(p => p.trim());
    for (let i = parts.length - 1; i >= 0; i--) {
      const part = parts[i];
      if (part === 'U.S.' || part === 'USA' || part === 'United States' || part === 'U.S.A.') continue;
      // Check if it's a state name
      if (US_STATES[part]) return part;
      // Check if it's a two-letter abbreviation
      if (part.length === 2 && part === part.toUpperCase()) {
        const stateName = Object.entries(US_STATES).find(([name, abbr]) => abbr === part);
        if (stateName) return stateName[0];
      }
    }
    return null;
  };

  // US State regions
  const STATE_REGIONS = {
    'Northeast': ['Connecticut', 'Maine', 'Massachusetts', 'New Hampshire', 'Rhode Island', 'Vermont'],
    'Mid-Atlantic': ['Delaware', 'District of Columbia', 'Maryland', 'New Jersey', 'New York', 'Pennsylvania'],
    'Southeast': ['Alabama', 'Arkansas', 'Florida', 'Georgia', 'Kentucky', 'Louisiana', 'Mississippi', 'North Carolina', 'South Carolina', 'Tennessee', 'Virginia', 'West Virginia'],
    'Midwest': ['Illinois', 'Indiana', 'Iowa', 'Kansas', 'Michigan', 'Minnesota', 'Missouri', 'Nebraska', 'North Dakota', 'Ohio', 'South Dakota', 'Wisconsin'],
    'Southwest': ['Arizona', 'New Mexico', 'Oklahoma', 'Texas'],
    'Mountain': ['Colorado', 'Idaho', 'Montana', 'Nevada', 'Utah', 'Wyoming'],
    'West Coast': ['Alaska', 'California', 'Hawaii', 'Oregon', 'Washington'],
  };

  // Get all unique states with coach counts
  const stateStats = useMemo(() => {
    const stats = {};
    coachesData.forEach(coach => {
      const state = extractState(coach.birthPlace);
      if (state) {
        if (!stats[state]) stats[state] = { count: 0, coaches: [] };
        stats[state].count++;
        stats[state].coaches.push(coach);
      }
    });
    return Object.entries(stats)
      .map(([state, data]) => ({ state, ...data }))
      .sort((a, b) => a.state.localeCompare(b.state));
  }, [coachesData]);

  // Group states by region
  const statesByRegion = useMemo(() => {
    const stateSet = new Set(stateStats.map(s => s.state));
    const regions = [];
    
    Object.entries(STATE_REGIONS).forEach(([region, states]) => {
      const regionStates = states.filter(s => stateSet.has(s)).sort();
      if (regionStates.length > 0) {
        regions.push({ region, states: regionStates });
      }
    });
    
    return regions;
  }, [stateStats]);

  // Get coaches filtered by selected states
  const coachesByState = useMemo(() => {
    if (selectedStates.length === 0) return [];
    const stateSet = new Set(selectedStates);
    return coachesData.filter(coach => {
      const state = extractState(coach.birthPlace);
      return state && stateSet.has(state);
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [coachesData, selectedStates]);

  // Filter schools based on search
  const filteredSchools = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return allCurrentTeams.filter(s => s.toLowerCase().includes(term)).slice(0, 50);
  }, [allCurrentTeams, searchTerm]);

  // Filter alma maters based on search
  const filteredAlmaMaters = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return allAlmaMaters.filter(s => s.toLowerCase().includes(term)).slice(0, 50);
  }, [allAlmaMaters, searchTerm]);

  // Filter coaches based on search
  const filteredCoaches = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    const term = searchTerm.toLowerCase();
    return coachesData
      .filter(c => 
        c.name?.toLowerCase().includes(term) ||
        c.currentTeam?.toLowerCase().includes(term) ||
        c.currentPosition?.toLowerCase().includes(term)
      )
      .slice(0, 50);
  }, [coachesData, searchTerm]);

  // Get coaches by alma mater
  const almaMaterCoaches = useMemo(() => {
    if (!selectedAlmaMater) return [];
    const selectedCanonical = canonicalizeSchoolName(selectedAlmaMater).toLowerCase();
    
    return coachesData.filter(coach => {
      const am = coach.almaMater || coach.alma_mater;
      if (!am) return false;
      // Use cleanAlmaMater to properly split concatenated names
      const cleanedSchools = cleanAlmaMater(am);
      return cleanedSchools.some(a => {
        const canonical = canonicalizeSchoolName(a).toLowerCase();
        return canonical === selectedCanonical;
      });
    });
  }, [coachesData, selectedAlmaMater]);

  // Calculate connections when school is selected
  useEffect(() => {
    if (!selectedSchool || !coachesData.length) {
      setCurrentStaff([]);
      setConnections([]);
      return;
    }

    setCalculating(true);

    const staff = coachesData.filter(coach => 
      schoolsMatch(coach.currentTeam, selectedSchool)
    );
    setCurrentStaff(staff);

    const allConnections = [];
    const staffNames = new Set(staff.map(s => s.name));
    
    // Part 1: Find connections where current staff worked ELSEWHERE and overlapped with other coaches
    staff.forEach(currentCoach => {
      if (!currentCoach.coaching_career) return;
      
      currentCoach.coaching_career.forEach(currentJob => {
        if (schoolsMatch(currentJob.school, selectedSchool)) return;
        if (!currentJob.years?.start || !currentJob.years?.end) return;
        
        coachesData.forEach(otherCoach => {
          if (otherCoach.name === currentCoach.name) return;
          if (!otherCoach.coaching_career) return;
          
          otherCoach.coaching_career.forEach(otherJob => {
            if (!schoolsMatch(otherJob.school, currentJob.school)) return;
            if (!otherJob.years?.start || !otherJob.years?.end) return;
            
            const overlapStart = Math.max(currentJob.years.start, otherJob.years.start);
            const overlapEnd = Math.min(currentJob.years.end, otherJob.years.end);
            
            if (overlapStart <= overlapEnd) {
              allConnections.push({
                currentCoach: {
                  name: currentCoach.name,
                  currentPosition: currentCoach.currentPosition,
                  position: currentJob.position,
                  years: currentJob.years,
                  rawYears: currentJob.raw_years
                },
                otherCoach: {
                  name: otherCoach.name,
                  currentTeam: otherCoach.currentTeam,
                  currentPosition: otherCoach.currentPosition,
                  position: otherJob.position,
                  years: otherJob.years,
                  rawYears: otherJob.raw_years,
                  _ref: otherCoach
                },
                connectionSchool: currentJob.school,
                overlapStart,
                overlapEnd,
                overlapYears: overlapEnd - overlapStart + 1
              });
            }
          });
        });
      });
    });
    
    // Part 2: Find connections AT the selected school - where other coaches worked here with current staff
    staff.forEach(currentCoach => {
      if (!currentCoach.coaching_career) return;
      
      // Find current coach's stints at the selected school
      const currentSchoolStints = currentCoach.coaching_career.filter(job => 
        schoolsMatch(job.school, selectedSchool) && job.years?.start && job.years?.end
      );
      
      if (currentSchoolStints.length === 0) return;
      
      // Find other coaches (NOT on current staff) who also worked at this school
      coachesData.forEach(otherCoach => {
        if (otherCoach.name === currentCoach.name) return;
        if (staffNames.has(otherCoach.name)) return; // Skip current staff members
        if (!otherCoach.coaching_career) return;
        
        otherCoach.coaching_career.forEach(otherJob => {
          if (!schoolsMatch(otherJob.school, selectedSchool)) return;
          if (!otherJob.years?.start || !otherJob.years?.end) return;
          
          // Check overlap with any of the current coach's stints at this school
          currentSchoolStints.forEach(currentJob => {
            const overlapStart = Math.max(currentJob.years.start, otherJob.years.start);
            const overlapEnd = Math.min(currentJob.years.end, otherJob.years.end);
            
            if (overlapStart <= overlapEnd) {
              allConnections.push({
                currentCoach: {
                  name: currentCoach.name,
                  currentPosition: currentCoach.currentPosition,
                  position: currentJob.position,
                  years: currentJob.years,
                  rawYears: currentJob.raw_years
                },
                otherCoach: {
                  name: otherCoach.name,
                  currentTeam: otherCoach.currentTeam,
                  currentPosition: otherCoach.currentPosition,
                  position: otherJob.position,
                  years: otherJob.years,
                  rawYears: otherJob.raw_years,
                  _ref: otherCoach
                },
                connectionSchool: selectedSchool,
                overlapStart,
                overlapEnd,
                overlapYears: overlapEnd - overlapStart + 1
              });
            }
          });
        });
      });
    });

    setConnections(allConnections);
    setCalculating(false);
  }, [selectedSchool, coachesData]);

  // Get all connected teams for secondary filter dropdown
  const connectedTeams = useMemo(() => {
    const teams = new Set();
    connections.forEach(conn => {
      if (conn.otherCoach.currentTeam && conn.otherCoach.currentTeam !== selectedSchool) {
        teams.add(conn.otherCoach.currentTeam);
      }
    });
    return teams;
  }, [connections, selectedSchool]);

  // List of connected teams for dropdown
  const connectedTeamsList = useMemo(() => {
    return Array.from(connectedTeams).sort();
  }, [connectedTeams]);

  // Filter secondary schools based on search
  const filteredSecondarySchools = useMemo(() => {
    if (!secondarySearchTerm) return [];
    const term = secondarySearchTerm.toLowerCase();
    return connectedTeamsList.filter(team => 
      team.toLowerCase().includes(term)
    );
  }, [connectedTeamsList, secondarySearchTerm]);

  // Filtered connections (by staff member and/or secondary school)
  const filteredConnections = useMemo(() => {
    let filtered = connections;
    
    if (selectedStaffMember) {
      filtered = filtered.filter(c => c.currentCoach.name === selectedStaffMember.name);
    }
    
    if (secondarySchool) {
      filtered = filtered.filter(c => 
        schoolsMatch(c.otherCoach.currentTeam, secondarySchool)
      );
    }
    
    return filtered;
  }, [connections, selectedStaffMember, secondarySchool]);

  // Unique other coaches (for stats display)
  const uniqueOtherCoaches = useMemo(() => {
    const coaches = new Set();
    connections.forEach(conn => {
      coaches.add(conn.otherCoach.name);
    });
    return coaches;
  }, [connections]);

  const filteredUniqueOtherCoaches = useMemo(() => {
    const coaches = new Set();
    filteredConnections.forEach(conn => {
      coaches.add(conn.otherCoach.name);
    });
    return coaches;
  }, [filteredConnections]);

  // Group connections by pair
  const groupedConnections = useMemo(() => {
    const grouped = {};
    filteredConnections.forEach(conn => {
      const key = `${conn.currentCoach.name}|||${conn.otherCoach.name}`;
      if (!grouped[key]) {
        grouped[key] = {
          currentCoach: conn.currentCoach,
          otherCoach: conn.otherCoach,
          overlaps: []
        };
      }
      grouped[key].overlaps.push({
        connectionSchool: conn.connectionSchool,
        overlapStart: conn.overlapStart,
        overlapEnd: conn.overlapEnd,
        overlapYears: conn.overlapYears,
        currentPosition: conn.currentCoach.position,
        currentYears: conn.currentCoach.years,
        currentRawYears: conn.currentCoach.rawYears,
        otherPosition: conn.otherCoach.position,
        otherYears: conn.otherCoach.years,
        otherRawYears: conn.otherCoach.rawYears
      });
    });
    
    return Object.values(grouped).map(group => {
      // Step 1: Deduplicate overlaps by school+years
      const seen = new Set();
      const uniqueOverlaps = [];
      group.overlaps.forEach(o => {
        const key = `${o.connectionSchool}|${o.overlapStart}|${o.overlapEnd}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueOverlaps.push({...o});
        }
      });
      
      // Step 2: Sort by school then year for consolidation
      uniqueOverlaps.sort((a, b) => {
        const schoolCmp = a.connectionSchool.localeCompare(b.connectionSchool);
        if (schoolCmp !== 0) return schoolCmp;
        return a.overlapStart - b.overlapStart;
      });
      
      // Step 3: Consolidate consecutive stints at same school
      const consolidated = [];
      uniqueOverlaps.forEach(o => {
        const last = consolidated[consolidated.length - 1];
        if (last && last.connectionSchool === o.connectionSchool && o.overlapStart <= last.overlapEnd + 1) {
          // Extend the last entry to cover this stint too
          last.overlapEnd = Math.max(last.overlapEnd, o.overlapEnd);
          last.overlapYears = last.overlapEnd - last.overlapStart + 1;
        } else {
          consolidated.push({...o});
        }
      });
      
      // Step 4: Sort by year for display
      consolidated.sort((a, b) => a.overlapStart - b.overlapStart);
      
      return {
        ...group,
        overlaps: consolidated,
        totalYears: consolidated.reduce((sum, o) => sum + o.overlapYears, 0)
      };
    }).sort((a, b) => b.totalYears - a.totalYears);
  }, [filteredConnections]);

  // Group connections by staff member
  const connectionsByCoach = useMemo(() => {
    const grouped = {};
    filteredConnections.forEach(conn => {
      if (!grouped[conn.currentCoach.name]) {
        grouped[conn.currentCoach.name] = {
          coach: conn.currentCoach,
          connectionsByOtherCoach: {}
        };
      }
      
      const otherName = conn.otherCoach.name;
      if (!grouped[conn.currentCoach.name].connectionsByOtherCoach[otherName]) {
        grouped[conn.currentCoach.name].connectionsByOtherCoach[otherName] = {
          otherCoach: conn.otherCoach,
          overlaps: []
        };
      }
      grouped[conn.currentCoach.name].connectionsByOtherCoach[otherName].overlaps.push({
        connectionSchool: conn.connectionSchool,
        overlapStart: conn.overlapStart,
        overlapEnd: conn.overlapEnd,
        overlapYears: conn.overlapYears
      });
    });
    
    // Helper function to dedupe and consolidate overlaps
    const consolidateOverlaps = (overlaps) => {
      // Step 1: Deduplicate by school+years
      const seen = new Set();
      const unique = [];
      overlaps.forEach(o => {
        const key = `${o.connectionSchool}|${o.overlapStart}|${o.overlapEnd}`;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push({...o});
        }
      });
      
      // Step 2: Sort by school then year
      unique.sort((a, b) => {
        const schoolCmp = a.connectionSchool.localeCompare(b.connectionSchool);
        if (schoolCmp !== 0) return schoolCmp;
        return a.overlapStart - b.overlapStart;
      });
      
      // Step 3: Consolidate consecutive stints at same school
      const consolidated = [];
      unique.forEach(o => {
        const last = consolidated[consolidated.length - 1];
        if (last && last.connectionSchool === o.connectionSchool && o.overlapStart <= last.overlapEnd + 1) {
          last.overlapEnd = Math.max(last.overlapEnd, o.overlapEnd);
          last.overlapYears = last.overlapEnd - last.overlapStart + 1;
        } else {
          consolidated.push({...o});
        }
      });
      
      // Step 4: Sort by year for display
      return consolidated.sort((a, b) => a.overlapStart - b.overlapStart);
    };
    
    return Object.values(grouped).map(group => ({
      coach: group.coach,
      otherCoaches: Object.values(group.connectionsByOtherCoach).map(oc => {
        const consolidated = consolidateOverlaps(oc.overlaps);
        return {
          ...oc,
          overlaps: consolidated
        };
      }).sort((a, b) => {
        const aTotal = a.overlaps.reduce((sum, o) => sum + o.overlapYears, 0);
        const bTotal = b.overlaps.reduce((sum, o) => sum + o.overlapYears, 0);
        return bTotal - aTotal;
      })
    })).sort((a, b) => b.otherCoaches.length - a.otherCoaches.length);
  }, [filteredConnections]);

  // Handle mode change
  const handleSearchModeChange = (mode) => {
    setSearchMode(mode);
    setSearchTerm('');
    setSelectedSchool('');
    setSelectedAlmaMater('');
    setSelectedStates([]);
    setStateDropdownOpen(false);
    setSearchedCoach(null);
    setSelectedStaffMember(null);
    setSecondarySchool('');
    setSecondarySearchTerm('');
  };

  // Handle coach click
  const handleCoachClick = (coach) => {
    const fullCoach = coachesData.find(c => c.name === coach.name) || coach;
    setSelectedCoach(fullCoach);
    setModalTab('career');
    // Build coaching tree
    const tree = buildCoachingTree(fullCoach, coachesData);
    setCoachingTree(tree);
  };

  // Build coaching tree for a selected coach
  const buildCoachingTree = (coach, allCoachesData) => {
    if (!coach || !allCoachesData.length) return null;
    
    const tree = {
      coach: coach,
      workedUnder: [], // Head coaches they worked under
      mentored: [] // Coaches they mentored who are now HCs
    };
    
    const fullCoachData = allCoachesData.find(c => c.name === coach.name) || coach;
    
    // For each job in their career, find the head coach at that school/team
    fullCoachData.coaching_career?.forEach(job => {
      const wasHeadCoach = isHeadCoachPosition(job.position);
      
      if (!wasHeadCoach) {
        // Find head coaches at this school during this time
        allCoachesData.forEach(otherCoach => {
          if (otherCoach.name === fullCoachData.name) return;
          
          otherCoach.coaching_career?.forEach(otherJob => {
            const isHeadCoach = isHeadCoachPosition(otherJob.position);
            if (!isHeadCoach) return;
            
            // Check if same school
            if (!schoolsMatch(job.school, otherJob.school)) return;
            
            // Check year overlap
            const jobStart = job.years?.start || 0;
            const jobEnd = job.years?.end || 2026;
            const otherStart = otherJob.years?.start || 0;
            const otherEnd = otherJob.years?.end || 2026;
            
            if (jobStart && otherStart) {
              const overlapStart = Math.max(jobStart, otherStart);
              const overlapEnd = Math.min(jobEnd, otherEnd);
              
              if (overlapStart <= overlapEnd) {
                // Check if already added this coach
                const existing = tree.workedUnder.find(
                  w => w.coach.name === otherCoach.name
                );
                if (existing) {
                  existing.stints.push({
                    school: job.school,
                    years: { start: overlapStart, end: overlapEnd },
                    myPosition: job.position
                  });
                } else {
                  tree.workedUnder.push({
                    coach: otherCoach,
                    stints: [{
                      school: job.school,
                      years: { start: overlapStart, end: overlapEnd },
                      myPosition: job.position
                    }]
                  });
                }
              }
            }
          });
        });
      } else {
        // They were a head coach - find assistants who are now HCs
        allCoachesData.forEach(otherCoach => {
          if (otherCoach.name === fullCoachData.name) return;
          
          // Only consider coaches who are CURRENTLY active head coaches
          if (!isHeadCoachPosition(otherCoach.currentPosition)) return;
          if (!otherCoach.currentTeam) return; // Skip former coaches
          
          let workedTogetherStints = [];
          
          otherCoach.coaching_career?.forEach(otherJob => {
            // Check if they worked at the same school while selected coach was HC
            if (schoolsMatch(job.school, otherJob.school)) {
              const jobStart = job.years?.start || 0;
              const jobEnd = job.years?.end || 2026;
              const otherStart = otherJob.years?.start || 0;
              const otherEnd = otherJob.years?.end || 2026;
              
              if (jobStart && otherStart) {
                const overlapStart = Math.max(jobStart, otherStart);
                const overlapEnd = Math.min(jobEnd, otherEnd);
                
                if (overlapStart <= overlapEnd) {
                  // They worked together, and the other coach wasn't also HC at that time
                  const otherWasHC = isHeadCoachPosition(otherJob.position);
                  if (!otherWasHC) {
                    workedTogetherStints.push({
                      school: job.school,
                      position: otherJob.position,
                      years: { start: overlapStart, end: overlapEnd }
                    });
                  }
                }
              }
            }
          });
          
          // If they worked together under this coach, add them
          if (workedTogetherStints.length > 0) {
            const existing = tree.mentored.find(m => m.coach.name === otherCoach.name);
            if (existing) {
              workedTogetherStints.forEach(stint => {
                const alreadyHas = existing.stints.find(s => 
                  s.school === stint.school && s.years.start === stint.years.start
                );
                if (!alreadyHas) existing.stints.push(stint);
              });
            } else {
              tree.mentored.push({
                coach: otherCoach,
                stints: workedTogetherStints,
                currentHCJob: {
                  school: otherCoach.currentTeam,
                  position: otherCoach.currentPosition
                }
              });
            }
          }
        });
      }
    });
    
    // Sort workedUnder by earliest stint year
    tree.workedUnder.sort((a, b) => {
      const aYear = Math.min(...a.stints.map(s => s.years.start));
      const bYear = Math.min(...b.stints.map(s => s.years.start));
      return aYear - bYear;
    });
    
    // Sort mentored by when they started working together
    tree.mentored.sort((a, b) => {
      const aYear = Math.min(...a.stints.map(s => s.years.start));
      const bYear = Math.min(...b.stints.map(s => s.years.start));
      return aYear - bYear;
    });
    
    // Filter workedUnder to only currently active HCs
    tree.workedUnder = tree.workedUnder.filter(w => 
      isHeadCoachPosition(w.coach.currentPosition) && w.coach.currentTeam
    );
    
    return tree;
  };
  
  // Get stats for a coach's tenures
  const getCoachStats = (coach) => {
    if (!coach || !torvikData?.data) return [];
    
    const stats = [];
    const career = coach.coaching_career || [];
    
    // Get stats for ALL coaching stints (not just HC)
    career.forEach(stint => {
      const startYear = stint.years?.start;
      const endYear = stint.years?.end || 2026;
      
      if (!startYear) return;
      
      // T-Rank year = when season ENDS (March)
      // Career startYear = when coach STARTED (fall)
      // So if coach started fall 2016, first T-Rank year is 2017 (2016-17 season)
      const firstTorvikYear = startYear + 1;
      const lastTorvikYear = endYear;
      
      for (let year = Math.max(firstTorvikYear, 2021); year <= Math.min(lastTorvikYear, 2026); year++) {
        const yearData = torvikData.data[year.toString()];
        if (!yearData?.teams) continue;
        
        // Find the team in this year's data
        const teamData = yearData.teams.find(t => 
          schoolsMatch(t.team, stint.school)
        );
        
        if (teamData) {
          // Check if we already have this year (could be at same school in different role)
          const existing = stats.find(s => s.year === year && schoolsMatch(s.school, stint.school));
          if (!existing) {
            stats.push({
              year,
              school: stint.school,
              position: stint.position,
              isHC: isHeadCoachPosition(stint.position),
              ...teamData
            });
          }
        }
      }
    });
    
    return stats.sort((a, b) => b.year - a.year);
  };

  const closeModal = () => {
    setSelectedCoach(null);
    setModalTab('career');
    setCoachingTree(null);
  };

  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: "'JetBrains Mono', monospace"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏀</div>
          <div>Loading coaches data...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: "'JetBrains Mono', monospace"
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
          <div style={{ marginBottom: '1rem' }}>Error loading data: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      color: '#e0e0e0',
      padding: '1rem'
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        padding: '2rem 1rem 1.5rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏀</div>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #e040fb 0%, #7c4dff 50%, #536dfe 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '0.5rem'
        }}>
          Women's Basketball Hotboard
        </h1>
        <p style={{
          color: '#8892b0',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          Mapping Coaching Trees & Connections
        </p>
      </header>

      {/* Main Controls */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 2rem',
        padding: '0 1rem'
      }}>
        {/* Search Mode Toggle */}
        <div style={{
          display: isMobile ? 'flex' : 'grid',
          gridTemplateColumns: isMobile ? undefined : 'repeat(4, 1fr)',
          overflowX: isMobile ? 'auto' : undefined,
          gap: '0.4rem',
          marginBottom: '0.75rem',
          paddingBottom: isMobile ? '0.5rem' : undefined,
          WebkitOverflowScrolling: 'touch'
        }}>
          {[
            { id: 'school', label: 'By School', emoji: '🏀', color: '255,107,53', tooltip: 'Select a school to see coaching connections.' },
            { id: 'almaMater', label: 'By Alma Mater', emoji: '🎓', color: '96,165,250', tooltip: 'Find coaches who played at a specific school.' },
            { id: 'coach', label: 'By Coach', emoji: '👤', color: '74,222,128', tooltip: 'Look up any coach directly.' },
            { id: 'stats', label: 'By Stats', emoji: '📊', color: '167,139,250', tooltip: 'Browse T-Rank team stats.' },
            { id: 'staffHistory', label: 'Staff History', emoji: '📋', color: '251,191,36', tooltip: 'View year-by-year staff breakdown.' },
            { id: 'schoolHistory', label: 'School History', emoji: '🏫', color: '232,121,249', tooltip: 'See all coaches at a school.' },
            { id: 'region', label: 'By Region', emoji: '📍', color: '236,72,153', tooltip: 'Find coaches by home state.' },
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => handleSearchModeChange(mode.id)}
              title={mode.tooltip}
              style={{
                padding: isMobile ? '0.6rem 0.75rem' : '0.55rem 0.5rem',
                background: searchMode === mode.id ? `rgba(${mode.color},0.3)` : 'rgba(255,255,255,0.05)',
                border: searchMode === mode.id ? `1px solid rgba(${mode.color},0.5)` : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: searchMode === mode.id ? `rgb(${mode.color})` : '#8892b0',
                cursor: 'pointer',
                fontSize: isMobile ? '0.65rem' : '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                flexShrink: 0
              }}
            >
              {mode.emoji} {isMobile ? mode.label.replace('By ', '') : mode.label}
            </button>
          ))}
        </div>

        {/* Section Description */}
        <p style={{
          color: '#8892b0',
          fontSize: isMobile ? '0.75rem' : '0.8rem',
          lineHeight: 1.6,
          margin: '0 0 1rem 0',
          padding: '0.6rem 0.8rem',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '6px',
          borderLeft: (() => {
            const colors = { school: '255,107,53', almaMater: '96,165,250', coach: '74,222,128', stats: '167,139,250', staffHistory: '251,191,36', schoolHistory: '232,121,249' };
            return `3px solid rgba(${colors[searchMode] || '255,255,255'},0.4)`;
          })()
        }}>
          {searchMode === 'school' && 'Select a school to discover coaching connections. See which coaches on the current staff have overlapping career histories — where they worked together, for how long, and what positions they held.'}
          {searchMode === 'almaMater' && 'Find all current coaches in the database who played at a specific school as student-athletes. See where former players have gone on to coach.'}
          {searchMode === 'coach' && 'Look up any coach directly by name. View their full career history, current position, bio details, and T-Rank performance at each stop.'}
          {searchMode === 'stats' && 'Browse team T-Rank stats with sortable rankings. Click into any school to see who the head coach is and how the numbers have trended.'}
          {searchMode === 'staffHistory' && 'View the full year-by-year coaching staff breakdown for any school. See who was on staff each season and how the coaching staff evolved.'}
          {searchMode === 'schoolHistory' && 'Search for any school to see every coach in the database who has ever coached there. Current staff appear first, followed by former coaches.'}
          {searchMode === 'region' && 'Filter coaches by their home state. Select one or more states to see all current coaches from those regions.'}
        </p>

        {/* View Toggle for school mode */}
        {searchMode === 'school' && (
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            background: 'rgba(255,255,255,0.03)',
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid rgba(255,107,53,0.2)',
            marginBottom: '0.75rem'
          }}>
            {[{id: 'overlaps', label: 'All Connections'}, {id: 'timeline', label: 'By Coach'}].map(mode => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                style={{
                  padding: '0.6rem 1rem',
                  background: viewMode === mode.id ? 'rgba(255,107,53,0.3)' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  color: viewMode === mode.id ? '#ff6b35' : '#8892b0',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s ease',
                  flex: 1,
                  textAlign: 'center'
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>
        )}

        {/* Search Input */}
        {searchMode !== 'stats' && searchMode !== 'staffHistory' && searchMode !== 'schoolHistory' && (
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#8892b0',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}>
              {searchMode === 'school' ? 'Select a School' : searchMode === 'almaMater' ? 'Select an Alma Mater' : 'Search for a Coach'}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchMode === 'school' ? "Type to search schools..." : searchMode === 'almaMater' ? "Type to search alma maters..." : "Type coach name, team, or position..."}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${searchMode === 'school' ? 'rgba(255,107,53,0.2)' : searchMode === 'almaMater' ? 'rgba(96,165,250,0.2)' : 'rgba(74,222,128,0.2)'}`,
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              
              {/* Dropdowns */}
              {searchMode === 'school' && searchTerm && filteredSchools.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#1a1a2e',
                  border: '1px solid rgba(255,107,53,0.3)',
                  borderRadius: '8px',
                  marginTop: '4px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 100
                }}>
                  {filteredSchools.map(school => (
                    <div
                      key={school}
                      onClick={() => {
                        setSelectedSchool(school);
                        setSearchTerm('');
                        setSecondarySchool('');
                        setSecondarySearchTerm('');
                      }}
                      style={{
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <TeamLogo team={school} size={24} />
                      <span style={{ color: '#fff' }}>{school}</span>
                    </div>
                  ))}
                </div>
              )}

              {searchMode === 'almaMater' && searchTerm && filteredAlmaMaters.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#1a1a2e',
                  border: '1px solid rgba(96,165,250,0.3)',
                  borderRadius: '8px',
                  marginTop: '4px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 100
                }}>
                  {filteredAlmaMaters.map(am => (
                    <div
                      key={am}
                      onClick={() => {
                        setSelectedAlmaMater(am);
                        setSearchTerm('');
                      }}
                      style={{
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(96,165,250,0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <TeamLogo team={am} size={24} />
                      <span style={{ color: '#fff' }}>{am}</span>
                    </div>
                  ))}
                </div>
              )}

              {searchMode === 'coach' && searchTerm && filteredCoaches.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#1a1a2e',
                  border: '1px solid rgba(74,222,128,0.3)',
                  borderRadius: '8px',
                  marginTop: '4px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 100
                }}>
                  {filteredCoaches.map((coach, idx) => (
                    <div
                      key={`coach-${idx}-${coach.name}`}
                      onClick={() => {
                        setSearchedCoach(coach);
                        setSearchTerm('');
                      }}
                      style={{
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(74,222,128,0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <TeamLogo team={coach.currentTeam} size={24} />
                      <div>
                        <div style={{ color: '#fff', fontWeight: 600 }}>{coach.name}</div>
                        <div style={{ color: '#8892b0', fontSize: '0.8rem' }}>
                          {coach.currentPosition} @ {coach.currentTeam}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected School Badge */}
      {selectedSchool && (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(247,197,159,0.1))',
            padding: '0.75rem 1.25rem',
            borderRadius: '100px',
            border: '1px solid rgba(255,107,53,0.4)'
          }}>
            <TeamLogo team={selectedSchool} size={28} />
            <span style={{ fontWeight: 700, color: '#f7c59f' }}>{selectedSchool}</span>
            <button
              onClick={() => {
                setSelectedSchool('');
                setSelectedStaffMember(null);
                setSecondarySchool('');
                setSecondarySearchTerm('');
              }}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                color: '#888',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>
          
          {/* Secondary School Filter - only show in All Connections view */}
          {viewMode === 'overlaps' && connectedTeamsList.length > 0 && (
            <>
              <span style={{ color: '#8892b0', fontSize: '1.25rem' }}>→</span>
              {secondarySchool ? (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, rgba(96,165,250,0.2), rgba(96,165,250,0.1))',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '100px',
                  border: '1px solid rgba(96,165,250,0.4)'
                }}>
                  <TeamLogo team={secondarySchool} size={28} />
                  <span style={{ fontWeight: 700, color: '#60a5fa' }}>{secondarySchool}</span>
                  <button
                    onClick={() => {
                      setSecondarySchool('');
                      setSecondarySearchTerm('');
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      color: '#888',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={secondarySearchTerm}
                    onChange={(e) => setSecondarySearchTerm(e.target.value)}
                    placeholder="Filter by connected school..."
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(96,165,250,0.3)',
                      borderRadius: '100px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none',
                      width: '220px',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.6)'}
                    onBlur={(e) => {
                      setTimeout(() => {
                        e.target.style.borderColor = 'rgba(96,165,250,0.3)';
                      }, 200);
                    }}
                  />
                  {secondarySearchTerm && filteredSecondarySchools.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      background: '#1a1a2e',
                      border: '1px solid rgba(96,165,250,0.3)',
                      borderRadius: '8px',
                      marginTop: '4px',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      zIndex: 100
                    }}>
                      {filteredSecondarySchools.slice(0, 10).map(school => (
                        <div
                          key={school}
                          onClick={() => {
                            setSecondarySchool(school);
                            setSecondarySearchTerm('');
                          }}
                          style={{
                            padding: '0.5rem 0.75rem',
                            cursor: 'pointer',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'rgba(96,165,250,0.1)'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                          <TeamLogo team={school} size={16} />
                          {school}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          
          {/* Stats line */}
          <div style={{ color: '#8892b0', fontSize: '0.9rem' }}>
            <span style={{ color: '#ff6b35', fontWeight: 700 }}>{selectedStaffMember ? '1' : currentStaff.length}</span> current staff · 
            <span style={{ color: '#ff6b35', fontWeight: 700 }}> {secondarySchool || selectedStaffMember ? filteredUniqueOtherCoaches.size : uniqueOtherCoaches.size}</span> coaches connected ·
            <span style={{ color: '#ff6b35', fontWeight: 700 }}> {secondarySchool ? '1' : connectedTeams.size}</span> other programs
          </div>
        </div>
      )}

      {/* Alma Mater Results */}
      {selectedAlmaMater && (
        <div style={{ maxWidth: '900px', margin: '0 auto 2rem', padding: '0 1rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'linear-gradient(135deg, rgba(96,165,250,0.2), rgba(96,165,250,0.1))',
            padding: '0.75rem 1.25rem',
            borderRadius: '100px',
            border: '1px solid rgba(96,165,250,0.4)',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🎓</span>
            <TeamLogo team={selectedAlmaMater} size={24} />
            <span style={{ fontWeight: 700, color: '#60a5fa' }}>{selectedAlmaMater}</span>
            <button
              onClick={() => setSelectedAlmaMater('')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                color: '#888',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '160px' : '280px'}, 1fr))`,
            gap: isMobile ? '0.5rem' : '1rem'
          }}>
            {almaMaterCoaches.map((coach, idx) => (
              <div
                key={idx}
                onClick={() => handleCoachClick(coach)}
                style={{
                  background: 'rgba(96,165,250,0.05)',
                  border: '1px solid rgba(96,165,250,0.2)',
                  borderRadius: '10px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(96,165,250,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(96,165,250,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(96,165,250,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(96,165,250,0.2)';
                }}
              >
                <div style={{ fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>
                  {coach.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontSize: '0.9rem' }}>
                  <TeamLogo team={coach.currentTeam} size={18} />
                  {coach.currentPosition} @ {coach.currentTeam}
                </div>
              </div>
            ))}
          </div>
          
          {almaMaterCoaches.length === 0 && (
            <div style={{ textAlign: 'center', color: '#8892b0', padding: '2rem' }}>
              No coaches found who played at {selectedAlmaMater}
            </div>
          )}
        </div>
      )}

      {/* Searched Coach Card */}
      {searchedCoach && (
        <div style={{ maxWidth: '900px', margin: '0 auto 2rem', padding: '0 1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(134,239,172,0.1))',
              padding: '0.75rem 1.25rem',
              borderRadius: '100px',
              border: '1px solid rgba(74,222,128,0.4)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>👤</span>
              <span style={{ fontWeight: 700, color: '#86efac' }}>{searchedCoach.name}</span>
              <button
                onClick={() => setSearchedCoach(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  color: '#888',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(74,222,128,0.05)',
            border: '1px solid rgba(74,222,128,0.2)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '600px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700, 
                  color: '#fff',
                  marginBottom: '0.25rem'
                }}>
                  {searchedCoach.name}
                  {(() => {
                    const ageInfo = getCoachAge(searchedCoach);
                    return ageInfo && (
                      <span style={{ fontSize: '1rem', fontWeight: 400, color: '#8892b0', marginLeft: '0.75rem' }}>
                        (Age {ageInfo.age})
                      </span>
                    );
                  })()}
                </h2>
                <div style={{ color: '#4ade80', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {searchedCoach.currentPosition} @ <TeamWithLogo team={searchedCoach.currentTeam} size={22} nameStyle={{ color: '#4ade80' }} />
                </div>
              </div>
              <button
                onClick={() => handleCoachClick(searchedCoach)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(74,222,128,0.2)',
                  border: '1px solid rgba(74,222,128,0.4)',
                  borderRadius: '8px',
                  color: '#4ade80',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                View Full Profile →
              </button>
            </div>
            
            {/* Bio */}
            {(() => {
              const birthPlace = searchedCoach.birthPlace || searchedCoach.birthplace;
              const almaMater = searchedCoach.almaMater || searchedCoach.alma_mater;
              const hasBio = birthPlace || almaMater || searchedCoach.birthDate;
              
              return hasBio && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {searchedCoach.birthDate && (
                    <div style={{ fontSize: '0.9rem' }}>
                      <span style={{ color: '#8892b0' }}>🎂 Born: </span>
                      <span style={{ color: '#ccd6f6' }}>{formatBirthdate(searchedCoach.birthDate)}</span>
                    </div>
                  )}
                  {birthPlace && (
                    <div style={{ fontSize: '0.9rem' }}>
                      <span style={{ color: '#8892b0' }}>📍 From: </span>
                      <span style={{ color: '#ccd6f6' }}>{birthPlace}</span>
                    </div>
                  )}
                  {almaMater && (
                    <div style={{ fontSize: '0.9rem' }}>
                      <span style={{ color: '#8892b0' }}>🎓 Played at: </span>
                      <span style={{ color: '#ccd6f6' }}>{formatAlmaMater(almaMater)}</span>
                    </div>
                  )}
                </div>
              );
            })()}
            
            {/* Recent Career */}
            <div>
              <h3 style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#8892b0',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Recent Career
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {sortCareerByYear(searchedCoach.coaching_career, searchedCoach.currentTeam)?.slice(0, 5).map((job, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr',
                      gap: '1rem',
                      padding: '0.5rem 0.75rem',
                      background: isHeadCoachPosition(job.position)
                        ? 'rgba(74,222,128,0.1)' 
                        : 'rgba(255,255,255,0.03)',
                      borderRadius: '6px',
                      borderLeft: isHeadCoachPosition(job.position)
                        ? '3px solid #4ade80'
                        : '3px solid transparent'
                    }}
                  >
                    <div style={{ color: '#8892b0', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                      {formatYearRange(job.years?.start, job.years?.end, job.raw_years) || '—'}
                    </div>
                    <div>
                      <span style={{ color: '#f7c59f', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <TeamLogo team={normalizeSchoolForDisplay(job.school)} size={16} />{normalizeSchoolForDisplay(job.school)}
                      </span>
                      <span style={{ color: '#8892b0' }}> — {job.position}</span>
                    </div>
                  </div>
                ))}
              </div>
              {searchedCoach.coaching_career?.length > 5 && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#8892b0', textAlign: 'center' }}>
                  + {searchedCoach.coaching_career.length - 5} more positions
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* By Stats View */}
      {searchMode === 'stats' && (
        <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', padding: '0 1rem' }}>
          <BasketballByStats 
            coachesData={coachesData}
            torvikData={torvikData}
            onCoachClick={handleCoachClick}
          />
        </div>
      )}

      {/* Staff History Mode */}
      {searchMode === 'staffHistory' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto 2rem', padding: '0 1rem' }}>
          <BasketballStaffHistory
            coachesData={coachesData}
            onSelectCoach={handleCoachClick}
          />
        </div>
      )}

      {/* School History Mode */}
      {searchMode === 'schoolHistory' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto 2rem', padding: '0 1rem' }}>
          <BasketballSchoolRoster
            coachesData={coachesData}
            onSelectCoach={handleCoachClick}
          />
        </div>
      )}

      {/* Region Mode UI */}
      {searchMode === 'region' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto 2rem', padding: '0 1rem' }}>
          {/* State Multi-Select Dropdown */}
          <div ref={stateDropdownRef} style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <div style={{ marginBottom: '0.5rem', color: '#8892b0', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Select States
            </div>
            <div
              onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
              style={{
                padding: '0.75rem 1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(236,72,153,0.3)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '48px'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedStates.length === 0 ? (
                  <span style={{ color: '#8892b0' }}>Click to select states...</span>
                ) : (
                  selectedStates.map(state => (
                    <span
                      key={state}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStates(prev => prev.filter(s => s !== state));
                      }}
                      style={{
                        background: 'rgba(236,72,153,0.3)',
                        border: '1px solid rgba(236,72,153,0.5)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        cursor: 'pointer'
                      }}
                    >
                      {state} <span style={{ opacity: 0.7 }}>×</span>
                    </span>
                  ))
                )}
              </div>
              <span style={{ color: '#8892b0', transform: stateDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
            </div>
            
            {stateDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#1a1a2e',
                border: '1px solid rgba(236,72,153,0.3)',
                borderRadius: '8px',
                marginTop: '4px',
                maxHeight: '300px',
                overflowY: 'auto',
                zIndex: 100,
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
              }}>
                <div style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setSelectedStates(stateStats.map(s => s.state))}
                    style={{ background: 'none', border: 'none', color: '#ec4899', cursor: 'pointer', fontSize: '0.75rem' }}
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => setSelectedStates([])}
                    style={{ background: 'none', border: 'none', color: '#8892b0', cursor: 'pointer', fontSize: '0.75rem' }}
                  >
                    Clear All
                  </button>
                </div>
                {statesByRegion.map(({ region, states }) => (
                  <div key={region}>
                    <div style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#ec4899',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      {region}
                    </div>
                    {states.map(state => (
                      <div
                        key={state}
                        onClick={() => {
                          setSelectedStates(prev => 
                            prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
                          );
                        }}
                        style={{
                          padding: '0.5rem 1rem 0.5rem 1.5rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          background: selectedStates.includes(state) ? 'rgba(236,72,153,0.15)' : 'transparent',
                          borderBottom: '1px solid rgba(255,255,255,0.03)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = selectedStates.includes(state) ? 'rgba(236,72,153,0.2)' : 'rgba(255,255,255,0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = selectedStates.includes(state) ? 'rgba(236,72,153,0.15)' : 'transparent'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            width: '16px',
                            height: '16px',
                            border: `2px solid ${selectedStates.includes(state) ? '#ec4899' : '#8892b0'}`,
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: selectedStates.includes(state) ? '#ec4899' : 'transparent',
                            color: '#fff',
                            fontSize: '0.65rem'
                          }}>
                            {selectedStates.includes(state) && '✓'}
                          </span>
                          <span style={{ color: '#fff', fontSize: '0.9rem' }}>{state}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Results */}
          {selectedStates.length > 0 && (
            <div>
              <div style={{ marginBottom: '1rem', color: '#ec4899', fontSize: '0.9rem', fontWeight: 600 }}>
                Showing coaches from {selectedStates.length} state{selectedStates.length !== 1 ? 's' : ''}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '160px' : '300px'}, 1fr))`,
                gap: isMobile ? '0.5rem' : '0.75rem'
              }}>
                {coachesByState.map(coach => (
                  <div
                    key={coach.name}
                    onClick={() => handleCoachClick(coach)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(236,72,153,0.15)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(236,72,153,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  >
                    <TeamLogo team={coach.currentTeam} size={28} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{coach.name}</div>
                      <div style={{ color: '#8892b0', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {coach.currentPosition} @ {coach.currentTeam}
                      </div>
                    </div>
                    <div style={{ color: '#ec4899', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                      📍 {extractState(coach.birthPlace)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Empty state */}
          {selectedStates.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#8892b0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
              <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Select states to find coaches</div>
              <div style={{ fontSize: '0.85rem' }}>
                {stateStats.length} states represented
              </div>
            </div>
          )}
        </div>
      )}

      {/* Current Staff Pills */}
      {selectedSchool && currentStaff.length > 0 && !calculating && (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 1.5rem',
          padding: '1rem 1.5rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,107,53,0.15)',
          borderRadius: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.75rem'
          }}>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#8892b0',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: 0
            }}>
              Current Staff
            </h3>
            {selectedStaffMember && (
              <button
                onClick={() => setSelectedStaffMember(null)}
                style={{
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(255,107,53,0.2)',
                  border: '1px solid rgba(255,107,53,0.4)',
                  borderRadius: '100px',
                  color: '#ff6b35',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Show All Staff
              </button>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {currentStaff.map((coach, idx) => {
              const isSelected = selectedStaffMember?.name === coach.name;
              const connectionCount = connections.filter(c => c.currentCoach.name === coach.name).length;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedStaffMember(isSelected ? null : coach)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: isSelected ? 'rgba(255,107,53,0.3)' : 'rgba(255,255,255,0.05)',
                    border: isSelected ? '1px solid rgba(255,107,53,0.6)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: isSelected ? '#ff6b35' : '#ccd6f6',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{coach.name}</span>
                  <span style={{ fontSize: '0.7rem', color: '#8892b0' }}>{coach.currentPosition}</span>
                  {connectionCount > 0 && (
                    <span style={{
                      background: isSelected ? 'rgba(255,107,53,0.5)' : 'rgba(255,107,53,0.2)',
                      color: isSelected ? '#fff' : '#ff6b35',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '100px',
                      fontSize: '0.65rem',
                      fontWeight: 700
                    }}>
                      {connectionCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {calculating && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
          gap: '1.5rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255,107,53,0.2)',
            borderTop: '4px solid #ff6b35',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <div style={{ color: '#8892b0', fontSize: '1rem' }}>Finding coaching connections...</div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Connection Results */}
      {selectedSchool && !calculating && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {viewMode === 'overlaps' ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {groupedConnections.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#8892b0' }}>
                  No external coaching connections found for {selectedSchool} staff
                </div>
              ) : (
                groupedConnections.map((group, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,107,53,0.15)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto 1fr',
                      gap: '1.5rem',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <TeamLogo team={selectedSchool} size={14} />{selectedSchool} Staff
                      </div>
                      <div 
                        style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem', cursor: 'pointer' }}
                        onClick={() => {
                          const fullCoach = coachesData.find(c => c.name === group.currentCoach.name);
                          if (fullCoach) handleCoachClick(fullCoach);
                        }}
                      >
                        {group.currentCoach.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#f7c59f' }}>{group.currentCoach.currentPosition}</div>
                    </div>
                    
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #ff6b35, #f7c59f)',
                        borderRadius: '50%',
                        width: '64px',
                        height: '64px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.5rem',
                        boxShadow: '0 0 30px rgba(255,107,53,0.3)'
                      }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f0f23' }}>{group.totalYears}</div>
                        <div style={{ fontSize: '0.6rem', color: '#0f0f23', fontWeight: 600, textTransform: 'uppercase' }}>
                          {group.totalYears === 1 ? 'year' : 'years'}
                        </div>
                      </div>
                      {group.overlaps.map((o, oIdx) => (
                        <div key={oIdx}>
                          <div style={{ fontSize: '0.75rem', color: '#f7c59f', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <TeamLogo team={normalizeSchoolForDisplay(o.connectionSchool)} size={14} />
                            {normalizeSchoolForDisplay(o.connectionSchool)}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#8892b0' }}>{formatYearRange(o.overlapStart, o.overlapEnd)}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}>
                        {group.otherCoach.currentTeam && <TeamLogo team={group.otherCoach.currentTeam} size={14} />}
                        {group.otherCoach.currentTeam || 'External'}
                      </div>
                      <div 
                        style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem', cursor: 'pointer' }}
                        onClick={() => {
                          if (group.otherCoach._ref) handleCoachClick(group.otherCoach._ref);
                        }}
                      >
                        {group.otherCoach.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#60a5fa' }}>{group.otherCoach.currentPosition}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {connectionsByCoach.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#8892b0' }}>
                  No external coaching connections found for {selectedSchool} staff
                </div>
              ) : (
                connectionsByCoach.map((staffGroup, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,107,53,0.15)',
                      borderRadius: '12px',
                      padding: '1.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer' }}
                      onClick={() => {
                        const fullCoach = coachesData.find(c => c.name === staffGroup.coach.name);
                        if (fullCoach) handleCoachClick(fullCoach);
                      }}
                    >
                      <TeamLogo team={selectedSchool} size={28} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>{staffGroup.coach.name}</div>
                        <div style={{ color: '#f7c59f', fontSize: '0.85rem' }}>{staffGroup.coach.currentPosition}</div>
                      </div>
                      <div style={{
                        marginLeft: 'auto',
                        background: 'rgba(255,107,53,0.2)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '100px',
                        color: '#ff6b35',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {staffGroup.otherCoaches.length} connection{staffGroup.otherCoaches.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '160px' : '280px'}, 1fr))`, gap: isMobile ? '0.5rem' : '0.75rem' }}>
                      {staffGroup.otherCoaches.map((oc, ocIdx) => (
                        <div
                          key={ocIdx}
                          onClick={() => {
                            if (oc.otherCoach._ref) handleCoachClick(oc.otherCoach._ref);
                          }}
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <TeamLogo team={oc.otherCoach.currentTeam} size={20} />
                            <div>
                              <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{oc.otherCoach.name}</div>
                              <div style={{ color: '#8892b0', fontSize: '0.75rem' }}>{oc.otherCoach.currentPosition} @ {oc.otherCoach.currentTeam}</div>
                            </div>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#f7c59f' }}>
                            {oc.overlaps.map((o, i) => (
                              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                                <TeamLogo team={normalizeSchoolForDisplay(o.connectionSchool)} size={12} />
                                {normalizeSchoolForDisplay(o.connectionSchool)} ({formatYearRange(o.overlapStart, o.overlapEnd)})
                                {i < oc.overlaps.length - 1 && ', '}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!selectedSchool && !selectedAlmaMater && !searchedCoach && !calculating && searchMode !== 'stats' && searchMode !== 'staffHistory' && searchMode !== 'schoolHistory' && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem', filter: 'grayscale(0.3)' }}>🏟️</div>
          <h2 style={{ fontSize: '1.5rem', color: '#f7c59f', marginBottom: '1rem', fontWeight: 700 }}>Start Exploring</h2>
          <p style={{ color: '#8892b0', lineHeight: 1.6, marginBottom: '2rem' }}>
            Use the search bar above to get started. Select a mode to switch between different ways to explore 
            the coaching database — from career overlaps and staff histories to stats and coaching trees.
          </p>
        </div>
      )}

      {/* Coach Modal */}
      {selectedCoach && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: isMobile ? '0.5rem' : '2rem',
            overflow: 'auto'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: isMobile ? '12px' : '16px',
              border: '1px solid rgba(255,107,53,0.3)',
              maxWidth: '900px',
              width: '100%',
              maxHeight: isMobile ? '95vh' : '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: isMobile ? '1rem' : '1.5rem 2rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              position: 'sticky',
              top: 0,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              zIndex: 10
            }}>
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  color: '#fff',
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
              <h2 style={{ fontSize: isMobile ? '1.25rem' : '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem', paddingRight: '2.5rem' }}>
                {selectedCoach.name}
                {(() => {
                  const ageInfo = getCoachAge(selectedCoach);
                  return ageInfo && (
                    <span style={{ fontSize: '1rem', fontWeight: 400, color: '#8892b0', marginLeft: '0.75rem' }}>
                      (Age {ageInfo.age})
                    </span>
                  );
                })()}
              </h2>
              <div style={{ color: '#ff6b35', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <TeamLogo team={selectedCoach.currentTeam} size={22} />
                {selectedCoach.currentPosition} @ {selectedCoach.currentTeam}
              </div>
              
              {/* Bio Info */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '0.75rem',
                fontSize: '0.85rem'
              }}>
                {selectedCoach.birthDate && (
                  <div>
                    <span style={{ color: '#8892b0' }}>🎂 </span>
                    <span style={{ color: '#ccd6f6' }}>{formatBirthdate(selectedCoach.birthDate)}</span>
                  </div>
                )}
                {(selectedCoach.birthPlace || selectedCoach.birthplace) && (
                  <div>
                    <span style={{ color: '#8892b0' }}>📍 </span>
                    <span style={{ color: '#ccd6f6' }}>{selectedCoach.birthPlace || selectedCoach.birthplace}</span>
                  </div>
                )}
                {(selectedCoach.almaMater || selectedCoach.alma_mater) && (
                  <div>
                    <span style={{ color: '#8892b0' }}>🎓 </span>
                    <span style={{ color: '#ccd6f6' }}>{formatAlmaMater(selectedCoach.almaMater || selectedCoach.alma_mater)}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Modal Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0 2rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <button
                onClick={() => setModalTab('career')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: modalTab === 'career' ? '2px solid #ff6b35' : '2px solid transparent',
                  color: modalTab === 'career' ? '#ff6b35' : '#8892b0',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                📋 Career
              </button>
              <button
                onClick={() => setModalTab('tree')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: modalTab === 'tree' ? '2px solid #4ade80' : '2px solid transparent',
                  color: modalTab === 'tree' ? '#4ade80' : '#8892b0',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                🌳 Tree
              </button>
              <button
                onClick={() => setModalTab('stats')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: modalTab === 'stats' ? '2px solid #60a5fa' : '2px solid transparent',
                  color: modalTab === 'stats' ? '#60a5fa' : '#8892b0',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                📊 Stats
              </button>
            </div>

            <div style={{ padding: '1.5rem 2rem' }}>
              {/* Career Tab */}
              {modalTab === 'career' && (
                <div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#ff6b35',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    📋 Coaching History
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {sortCareerByYear(selectedCoach.coaching_career, selectedCoach.currentTeam)?.map((job, idx) => {
                      const isHC = isHeadCoachPosition(job.position);
                      return (
                        <div
                          key={idx}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '100px 1fr',
                            gap: '1rem',
                            padding: '0.75rem 1rem',
                            background: isHC ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            borderLeft: isHC ? '3px solid #ff6b35' : '3px solid transparent'
                          }}
                        >
                          <div style={{ color: '#8892b0', fontSize: '0.85rem', fontWeight: 600 }}>
                            {formatYearRange(job.years?.start, job.years?.end, job.raw_years) || '—'}
                          </div>
                          <div>
                            <div style={{ color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <TeamLogo team={normalizeSchoolForDisplay(job.school)} size={18} />
                              {normalizeSchoolForDisplay(job.school)}
                            </div>
                            <div style={{ color: '#8892b0', fontSize: '0.85rem' }}>
                              {job.position}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {selectedCoach.url && (
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                      <a
                        href={selectedCoach.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#8892b0', fontSize: '0.85rem', textDecoration: 'none' }}
                      >
                        View on Wikipedia →
                      </a>
                    </div>
                  )}
                </div>
              )}
              
              {/* Tree Tab */}
              {modalTab === 'tree' && coachingTree && (
                <>
                  {/* Worked Under Section */}
                  {coachingTree.workedUnder.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: '#60a5fa',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Active Head Coaches Worked Under ({coachingTree.workedUnder.length})
                      </h3>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1rem'
                      }}>
                        {coachingTree.workedUnder.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              background: 'rgba(96,165,250,0.1)',
                              borderRadius: '8px',
                              padding: '1rem',
                              border: '1px solid rgba(96,165,250,0.2)',
                              cursor: 'pointer'
                            }}
                            onClick={() => handleCoachClick(item.coach)}
                          >
                            <div style={{ fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>
                              {item.coach.name}
                            </div>
                            <div style={{ color: '#4ade80', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              Now: Head coach @ <TeamLogo team={item.coach.currentTeam} size={14} /> {item.coach.currentTeam}
                            </div>
                            {item.stints.map((stint, sIdx) => (
                              <div key={sIdx} style={{
                                fontSize: '0.8rem',
                                color: '#8892b0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                marginTop: '0.25rem'
                              }}>
                                <TeamLogo team={stint.school} size={12} />
                                {stint.school} ({stint.years.start}-{stint.years.end})
                                <span style={{ color: '#666' }}>• Their role: {stint.myPosition}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Mentored Section */}
                  {coachingTree.mentored.length > 0 && (
                    <div>
                      <h3 style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: '#4ade80',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Active HC Tree ({coachingTree.mentored.length})
                      </h3>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1rem'
                      }}>
                        {coachingTree.mentored.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              background: 'rgba(74,222,128,0.1)',
                              borderRadius: '8px',
                              padding: '1rem',
                              border: '1px solid rgba(74,222,128,0.2)',
                              cursor: 'pointer'
                            }}
                            onClick={() => handleCoachClick(item.coach)}
                          >
                            <div style={{ fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>
                              {item.coach.name}
                            </div>
                            <div style={{ color: '#4ade80', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              Now: Head coach @ <TeamLogo team={item.coach.currentTeam} size={14} /> {item.coach.currentTeam}
                            </div>
                            {item.stints.map((stint, sIdx) => (
                              <div key={sIdx} style={{
                                fontSize: '0.8rem',
                                color: '#8892b0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                marginTop: '0.25rem'
                              }}>
                                <TeamLogo team={stint.school} size={12} />
                                {stint.school} ({stint.years.start}-{stint.years.end})
                                <span style={{ color: '#666' }}>• Their role: {stint.position}</span>
                              </div>
                            ))}
                            </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {coachingTree.workedUnder.length === 0 && coachingTree.mentored.length === 0 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '3rem',
                      color: '#8892b0'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.5 }}>🌳</div>
                      <p>No active coaching tree connections found.</p>
                      <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                        This coach may not have worked under or mentored any currently active head coaches.
                      </p>
                    </div>
                  )}
                </>
              )}
              
              {modalTab === 'tree' && !coachingTree && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#8892b0' }}>
                  Loading coaching tree...
                </div>
              )}
              
              {/* Stats Tab */}
              {modalTab === 'stats' && (
                <div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#60a5fa',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    📊 Performance Stats
                  </h3>
                  <p style={{ color: '#8892b0', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Team performance during coaching tenures. Data from barttorvik.com (2021-2026).
                  </p>
                  
                  {(() => {
                    const coachStats = getCoachStats(selectedCoach);
                    
                    if (coachStats.length === 0) {
                      return (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#8892b0' }}>
                          No T-Rank stats available for this coach's tenures (2021-2026).
                        </div>
                      );
                    }
                    
                    const getRankColor = (rank, total = 364) => {
                      if (!rank) return '#555';
                      const pct = rank / total;
                      if (pct <= 0.1) return '#4ade80';  // Top 10%
                      if (pct <= 0.25) return '#a3e635'; // Top 25%
                      if (pct <= 0.5) return '#fbbf24';  // Top 50%
                      if (pct <= 0.75) return '#fb923c'; // Top 75%
                      return '#f87171';  // Bottom 25%
                    };
                    
                    const formatStat = (val, decimals = 1) => {
                      if (val === undefined || val === null) return '—';
                      return typeof val === 'number' ? val.toFixed(decimals) : val;
                    };
                    
                    return (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          fontSize: '0.8rem',
                          minWidth: '900px'
                        }}>
                          <thead>
                            <tr style={{ background: 'rgba(96,165,250,0.15)' }}>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'left', color: '#8892b0', fontWeight: 600, position: 'sticky', left: 0, background: '#1a1f35', zIndex: 1 }}>Year</th>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'left', color: '#8892b0', fontWeight: 600 }}>School</th>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'left', color: '#8892b0', fontWeight: 600 }}>Role</th>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center', color: '#8892b0', fontWeight: 600 }}>Rank</th>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center', color: '#8892b0', fontWeight: 600 }}>Record</th>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center', color: '#8892b0', fontWeight: 600 }}>AdjOE</th>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center', color: '#8892b0', fontWeight: 600 }}>AdjDE</th>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center', color: '#8892b0', fontWeight: 600 }}>Tempo</th>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center', color: '#8892b0', fontWeight: 600 }}>eFG%</th>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center', color: '#8892b0', fontWeight: 600 }}>TO%</th>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center', color: '#8892b0', fontWeight: 600 }}>ORB%</th>
                              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center', color: '#8892b0', fontWeight: 600 }}>FTR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {coachStats.map((stat, idx) => (
                              <tr 
                                key={idx}
                                style={{ 
                                  background: stat.isHC 
                                    ? 'rgba(255,107,53,0.1)' 
                                    : (idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'),
                                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                                  borderLeft: stat.isHC ? '3px solid #ff6b35' : '3px solid transparent'
                                }}
                              >
                                <td style={{ padding: '0.5rem', color: '#fbbf24', fontWeight: 600, position: 'sticky', left: 0, background: stat.isHC ? 'rgba(30,34,53,0.95)' : (idx % 2 === 0 ? '#1e2235' : '#1a1f35'), zIndex: 1 }}>
                                  {stat.year}
                                </td>
                                <td style={{ padding: '0.5rem', color: '#fff' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <TeamLogo team={stat.school} size={16} />
                                    {normalizeSchoolForDisplay(stat.school)}
                                  </div>
                                </td>
                                <td style={{ padding: '0.5rem' }}>
                                  <span style={{
                                    padding: '0.15rem 0.4rem',
                                    borderRadius: '3px',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    background: stat.isHC ? 'rgba(255,107,53,0.3)' : 'rgba(136,146,176,0.2)',
                                    color: stat.isHC ? '#ff6b35' : '#8892b0'
                                  }}>
                                    {stat.isHC ? 'HC' : 'ASST'}
                                  </span>
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'center', color: getRankColor(stat.rank), fontWeight: 600 }}>
                                  #{stat.rank}
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'center', color: '#ccd6f6' }}>
                                  {stat.record}
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'center', color: '#ccd6f6' }}>
                                  {formatStat(stat.adj_oe)}
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'center', color: '#ccd6f6' }}>
                                  {formatStat(stat.adj_de)}
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'center', color: '#ccd6f6' }}>
                                  {formatStat(stat.adj_tempo)}
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'center', color: '#ccd6f6' }}>
                                  {formatStat(stat.efg_pct)}
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'center', color: '#ccd6f6' }}>
                                  {formatStat(stat.tor)}
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'center', color: '#ccd6f6' }}>
                                  {formatStat(stat.orb)}
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'center', color: '#ccd6f6' }}>
                                  {formatStat(stat.ftr)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        marginTop: '4rem',
        padding: '2rem 1rem',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <p style={{ color: '#8892b0', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
          Women's Basketball Coaching Hotboard • T-Rank data from barttorvik.com • {coachesData.length.toLocaleString()} coaches
        </p>
      </footer>
    </div>
  );
}
