// ============================================================================
// COMPREHENSIVE SCHOOL NORMALIZATION
// Single source of truth for school name canonicalization
// ============================================================================

// Schools that should NOT get a D1 logo (they're different schools with similar names)
// These will return null from logo lookup to prevent wrong logo display
export const LOGO_BLOCKLIST = new Set([
  // D3/D2/NAIA/JuCo schools that share names with D1 schools
  'connecticut college',        // D3 NESCAC, NOT UConn
  'georgetown college',         // D2 in Kentucky, NOT Georgetown (Big East)
  'rhode island college',       // D3, NOT URI (A-10)
  'southern illinois college',  // Community college, NOT SIU
  'notre dame college',         // D2 in Ohio, NOT Notre Dame
  'washington college',         // D3 in Maryland, NOT UW
  'colorado college',           // D3, NOT Colorado
  'howard college',             // JuCo in Texas, NOT Howard University
  'temple college',             // JuCo in Texas, NOT Temple
  'jacksonville college',       // JuCo, NOT Jacksonville University
  'columbia college',           // Various D2/D3 schools, NOT Columbia (Ivy)
  'texas college',              // NAIA, NOT Texas
  
  // Schools with wrong logo assignments - need separate logos or none
  'savannah state',             // Different from Sam Houston
  'savannah state university',
  'winston-salem state',        // Different from Wichita State
  'winston-salem state university',
  'winston salem state',
  'texas a&m-commerce',         // Different from TCU
  'texas a&m–commerce',
  'east texas a&m',             // Same as Texas A&M-Commerce, different from TCU
  'umass lowell',               // Different from Louisiana-Monroe
  'mass lowell',
  'queens',                     // Queens University of Charlotte, different from Utah Tech
  'queens university',
  
  // Other Connecticut schools (not UConn)
  'central connecticut',
  'central connecticut state', 
  'eastern connecticut',
  'eastern connecticut state',
  'southern connecticut',
  'southern connecticut state',
  'western connecticut',
  'western connecticut state',
]);

// Comprehensive school name normalization map
// Maps variations to canonical D1 names
// Only includes legitimately same schools (not different schools with similar names)
export const SCHOOL_NORMALIZATION_MAP = {
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
  
  'florida state': 'Florida State',
  'florida state university': 'Florida State',
  'fsu': 'Florida State',
  'florida st.': 'Florida State',
  'florida st': 'Florida State',
  
  // ══════════════════════════════════════════════════════════════════════════
  // PURDUE FORT WAYNE (formerly IPFW)
  // ══════════════════════════════════════════════════════════════════════════
  'purdue fort wayne': 'Purdue Fort Wayne',
  'fort wayne': 'Purdue Fort Wayne',
  'ipfw': 'Purdue Fort Wayne',
  'ipfw/fort wayne/purdue fort wayne': 'Purdue Fort Wayne',
  
  // ══════════════════════════════════════════════════════════════════════════
  // HOUSTON CHRISTIAN (formerly Houston Baptist)
  // ══════════════════════════════════════════════════════════════════════════
  'houston christian': 'Houston Christian',
  'houston christian university': 'Houston Christian',
  'houston baptist': 'Houston Christian',
  'houston baptist university': 'Houston Christian',
  'houston baptist/houston christian': 'Houston Christian',
  
  // ══════════════════════════════════════════════════════════════════════════
  // CONNECTICUT - Only UConn variations, NOT other CT schools
  // ══════════════════════════════════════════════════════════════════════════
  'uconn': 'UConn',
  'connecticut': 'UConn',
  'university of connecticut': 'UConn',
  'conn': 'UConn',
  
  // ══════════════════════════════════════════════════════════════════════════
  // LOYOLA CHICAGO
  // ══════════════════════════════════════════════════════════════════════════
  'loyola chicago': 'Loyola Chicago',
  'loyola': 'Loyola Chicago',
  'loyola university chicago': 'Loyola Chicago',
  'loyola-chicago': 'Loyola Chicago',
  
  // ══════════════════════════════════════════════════════════════════════════
  // UIC (Illinois-Chicago)
  // ══════════════════════════════════════════════════════════════════════════
  'uic': 'UIC',
  'illinois-chicago': 'UIC',
  'university of illinois chicago': 'UIC',
  'university of illinois-chicago': 'UIC',
  
  // ══════════════════════════════════════════════════════════════════════════
  // NC STATE
  // ══════════════════════════════════════════════════════════════════════════
  'nc state': 'NC State',
  'n.c. state': 'NC State',
  'north carolina state': 'NC State',
  'north carolina state university': 'NC State',
  'ncsu': 'NC State',
  
  // ══════════════════════════════════════════════════════════════════════════
  // LOUISIANA-MONROE (NOT UMass Lowell!)
  // ══════════════════════════════════════════════════════════════════════════
  'louisiana-monroe': 'Louisiana-Monroe',
  'ulm': 'Louisiana-Monroe',
  'university of louisiana monroe': 'Louisiana-Monroe',
  'university of louisiana at monroe': 'Louisiana-Monroe',
  'ul monroe': 'Louisiana-Monroe',
  
  // ══════════════════════════════════════════════════════════════════════════
  // SAM HOUSTON (NOT Savannah State!)
  // ══════════════════════════════════════════════════════════════════════════
  'sam houston': 'Sam Houston',
  'sam houston state': 'Sam Houston',
  'sam houston state university': 'Sam Houston',
  'shsu': 'Sam Houston',
  
  // ══════════════════════════════════════════════════════════════════════════
  // WICHITA STATE (NOT Winston-Salem State!)
  // ══════════════════════════════════════════════════════════════════════════
  'wichita state': 'Wichita State',
  'wichita state university': 'Wichita State',
  
  // ══════════════════════════════════════════════════════════════════════════
  // TCU (NOT Texas A&M-Commerce!)
  // ══════════════════════════════════════════════════════════════════════════
  'tcu': 'TCU',
  'texas christian': 'TCU',
  'texas christian university': 'TCU',
  
  // ══════════════════════════════════════════════════════════════════════════
  // OTHER COMMON SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  
  // Texas
  'texas': 'Texas',
  'university of texas': 'Texas',
  'the university of texas': 'Texas',
  
  // LSU
  'lsu': 'LSU',
  'louisiana state': 'LSU',
  'louisiana state university': 'LSU',
  
  // USC
  'usc': 'USC',
  'southern california': 'USC',
  'university of southern california': 'USC',
  
  // UCLA
  'ucla': 'UCLA',
  'uc los angeles': 'UCLA',
  
  // UMass
  'umass': 'UMass',
  'massachusetts': 'UMass',
  'university of massachusetts': 'UMass',
  
  // UMKC
  'umkc': 'UMKC',
  'kansas city': 'UMKC',
  'missouri-kansas city': 'UMKC',
  
  // UTRGV
  'utrgv': 'UTRGV',
  'ut rio grande valley': 'UTRGV',
  'texas rio grande valley': 'UTRGV',
  
  // UTEP
  'utep': 'UTEP',
  'ut el paso': 'UTEP',
  'texas-el paso': 'UTEP',
  
  // UTSA
  'utsa': 'UTSA',
  'ut san antonio': 'UTSA',
  'texas-san antonio': 'UTSA',
  
  // BYU
  'byu': 'BYU',
  'brigham young': 'BYU',
  'brigham young university': 'BYU',
  
  // SMU
  'smu': 'SMU',
  'southern methodist': 'SMU',
  'southern methodist university': 'SMU',
  
  // VCU
  'vcu': 'VCU',
  'virginia commonwealth': 'VCU',
  'virginia commonwealth university': 'VCU',
  
  // UNLV
  'unlv': 'UNLV',
  'nevada-las vegas': 'UNLV',
  'nevada las vegas': 'UNLV',
  
  // Ole Miss
  'ole miss': 'Ole Miss',
  'mississippi': 'Ole Miss',
  'university of mississippi': 'Ole Miss',
  
  // Pitt
  'pitt': 'Pittsburgh',
  'pittsburgh': 'Pittsburgh',
  'university of pittsburgh': 'Pittsburgh',
  
  // Penn
  'penn': 'Penn',
  'pennsylvania': 'Penn',
  'university of pennsylvania': 'Penn',
  
  // Ohio State
  'ohio state': 'Ohio State',
  'ohio state university': 'Ohio State',
  'the ohio state university': 'Ohio State',
  'osu': 'Ohio State',
  
  // Penn State
  'penn state': 'Penn State',
  'penn st': 'Penn State',
  'penn st.': 'Penn State',
  'pennsylvania state': 'Penn State',
  'pennsylvania state university': 'Penn State',
  
  // Michigan State
  'michigan state': 'Michigan State',
  'michigan state university': 'Michigan State',
  'msu': 'Michigan State',
  
  // Iowa State
  'iowa state': 'Iowa State',
  'iowa state university': 'Iowa State',
  'iowa st': 'Iowa State',
  'iowa st.': 'Iowa State',
  
  // Kansas State
  'kansas state': 'Kansas State',
  'kansas state university': 'Kansas State',
  'k-state': 'Kansas State',
  'kansas st': 'Kansas State',
  'kansas st.': 'Kansas State',
  
  // Oklahoma State
  'oklahoma state': 'Oklahoma State',
  'oklahoma state university': 'Oklahoma State',
  'okstate': 'Oklahoma State',
  'oklahoma st': 'Oklahoma State',
  'oklahoma st.': 'Oklahoma State',
  
  // Mississippi State
  'mississippi state': 'Mississippi State',
  'mississippi state university': 'Mississippi State',
  'miss state': 'Mississippi State',
  'mississippi st': 'Mississippi State',
  'mississippi st.': 'Mississippi State',
  
  // Oregon State
  'oregon state': 'Oregon State',
  'oregon state university': 'Oregon State',
  'oregon st': 'Oregon State',
  'oregon st.': 'Oregon State',
  
  // Washington State
  'washington state': 'Washington State',
  'washington state university': 'Washington State',
  'wsu': 'Washington State',
  'wazzu': 'Washington State',
  'washington st': 'Washington State',
  'washington st.': 'Washington State',
  
  // Arizona State
  'arizona state': 'Arizona State',
  'arizona state university': 'Arizona State',
  'asu': 'Arizona State',
  'arizona st': 'Arizona State',
  'arizona st.': 'Arizona State',
  
  // Colorado State
  'colorado state': 'Colorado State',
  'colorado state university': 'Colorado State',
  'colorado st': 'Colorado State',
  'colorado st.': 'Colorado State',
  
  // Utah State
  'utah state': 'Utah State',
  'utah state university': 'Utah State',
  'utah st': 'Utah State',
  'utah st.': 'Utah State',
  
  // Boise State
  'boise state': 'Boise State',
  'boise state university': 'Boise State',
  'boise st': 'Boise State',
  'boise st.': 'Boise State',
  
  // Fresno State
  'fresno state': 'Fresno State',
  'fresno state university': 'Fresno State',
  'fresno st': 'Fresno State',
  'fresno st.': 'Fresno State',
  
  // San Diego State
  'san diego state': 'San Diego State',
  'sdsu': 'San Diego State',
  'san diego st': 'San Diego State',
  'san diego st.': 'San Diego State',
  
  // San Jose State
  'san jose state': 'San Jose State',
  'sjsu': 'San Jose State',
  'san josé state university': 'San Jose State',
  
  // Cal State schools
  'cal state northridge': 'Cal State Northridge',
  'csun': 'Cal State Northridge',
  'cal state fullerton': 'Cal State Fullerton',
  'csuf': 'Cal State Fullerton',
  'fullerton': 'Cal State Fullerton',
  'long beach state': 'Long Beach State',
  'cal state long beach': 'Long Beach State',
  'csulb': 'Long Beach State',
  
  // ETSU
  'etsu': 'East Tennessee State',
  'east tennessee state': 'East Tennessee State',
  'east tennessee state university': 'East Tennessee State',
  
  // Stephen F. Austin
  'sfa': 'Stephen F. Austin',
  'stephen f. austin': 'Stephen F. Austin',
  'stephen f austin': 'Stephen F. Austin',
  
  // LIU
  'liu': 'LIU',
  'long island': 'LIU',
  'long island university': 'LIU',
  
  // Little Rock
  'little rock': 'Little Rock',
  'arkansas-little rock': 'Little Rock',
  'ualr': 'Little Rock',
  
  // Omaha
  'omaha': 'Omaha',
  'nebraska-omaha': 'Omaha',
  'university of nebraska-omaha': 'Omaha',
  
  // Milwaukee
  'milwaukee': 'Milwaukee',
  'uw-milwaukee': 'Milwaukee',
  'university of wisconsin-milwaukee': 'Milwaukee',
  
  // Buffalo
  'buffalo': 'Buffalo',
  'university at buffalo': 'Buffalo',
  'university of buffalo': 'Buffalo',
  
  // Albany
  'albany': 'Albany',
  'university at albany': 'Albany',
  'university of albany': 'Albany',
  
  // Maryland-Eastern Shore
  'umes': 'Maryland-Eastern Shore',
  'maryland eastern shore': 'Maryland-Eastern Shore',
  'maryland-eastern shore': 'Maryland-Eastern Shore',
  'university of maryland eastern shore': 'Maryland-Eastern Shore',
  
  // UNC Greensboro
  'uncg': 'UNC Greensboro',
  'unc greensboro': 'UNC Greensboro',
  
  // UT Martin
  'ut martin': 'UT Martin',
  'tennessee-martin': 'UT Martin',
  'university of tennessee at martin': 'UT Martin',
  
  // USC Upstate
  'usc upstate': 'USC Upstate',
  'university of south carolina upstate': 'USC Upstate',
  
  // SIU Edwardsville
  'siue': 'SIU Edwardsville',
  'siu edwardsville': 'SIU Edwardsville',
  'southern illinois edwardsville': 'SIU Edwardsville',
  
  // Cal
  'cal': 'California',
  'california': 'California',
  'uc berkeley': 'California',
  
  // Common university suffixes
  'detroit mercy': 'Detroit Mercy',
  'detroit': 'Detroit Mercy',
  
  'tarleton state': 'Tarleton State',
  'tarleton': 'Tarleton State',
  'tarleton state university': 'Tarleton State',
  
  'nicholls': 'Nicholls',
  'nicholls state': 'Nicholls',
  'nicholls state university': 'Nicholls',
  
  'mcneese': 'McNeese',
  'mcneese state': 'McNeese',
  'mcneese state university': 'McNeese',
  
  'mississippi valley state': 'Mississippi Valley State',
  'mississippi valley st.': 'Mississippi Valley State',
  'mississippi valley state university': 'Mississippi Valley State',
  
  // IU Indy (formerly IUPUI)
  'iupui': 'IU Indy',
  'iu indy': 'IU Indy',
  
  // Marist
  'marist': 'Marist',
  'marist college': 'Marist',
  'marist university': 'Marist',
  
  // St. Thomas
  'st. thomas': 'St. Thomas',
  'st thomas': 'St. Thomas',
  'university of st. thomas': 'St. Thomas',
  
  // Mercyhurst
  'mercyhurst': 'Mercyhurst',
  'mercyhurst college': 'Mercyhurst',
  'mercyhurst university': 'Mercyhurst',
};

/**
 * Normalize a school name to its canonical form
 * @param {string} name - The school name to normalize
 * @returns {string} - The canonical school name
 */
export function normalizeSchoolName(name) {
  if (!name) return name;
  
  const lower = name.toLowerCase().trim();
  
  // Check direct mapping first
  if (SCHOOL_NORMALIZATION_MAP[lower]) {
    return SCHOOL_NORMALIZATION_MAP[lower];
  }
  
  // Clean up common patterns
  let cleaned = name.trim()
    .replace(/\s+University$/i, '')
    .replace(/^University\s+of\s+/i, '')
    .replace(/\s+College$/i, '')
    .replace(/\s+St\.?$/i, ' State');
  
  const cleanedLower = cleaned.toLowerCase();
  
  // Check mapping again after cleaning
  if (SCHOOL_NORMALIZATION_MAP[cleanedLower]) {
    return SCHOOL_NORMALIZATION_MAP[cleanedLower];
  }
  
  // Return cleaned version with proper capitalization
  return cleaned;
}

/**
 * Check if a school should be blocked from getting a logo
 * (because it's a different school from the D1 school with same name)
 * @param {string} name - The school name to check
 * @returns {boolean} - True if this school should NOT get a logo
 */
export function shouldBlockLogo(name) {
  if (!name) return false;
  return LOGO_BLOCKLIST.has(name.toLowerCase().trim());
}

/**
 * Get deduplicated, sorted school list
 * @param {string[]} schools - Array of school names
 * @param {function} getLogoFn - Function to check if school has logo
 * @returns {string[]} - Sorted, deduplicated array
 */
export function getDeduplicatedSchools(schools, getLogoFn) {
  const normalized = new Map();
  
  schools.forEach(school => {
    if (!school) return;
    const canonical = normalizeSchoolName(school);
    if (!canonical) return;
    const key = canonical.toLowerCase();
    if (!normalized.has(key)) {
      normalized.set(key, canonical);
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

export default {
  SCHOOL_NORMALIZATION_MAP,
  LOGO_BLOCKLIST,
  normalizeSchoolName,
  shouldBlockLogo,
  getDeduplicatedSchools,
};
