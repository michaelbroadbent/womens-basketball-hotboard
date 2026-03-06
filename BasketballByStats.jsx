import React, { useState, useMemo } from 'react';
import { TeamWithLogo, TeamLogo } from './basketballTeamLogos';

// ---------------------------------------------------------------------------
// Torvik uses its own team name conventions that differ from our coaches DB.
// This map normalises Torvik names → DB canonical names before any matching.
// ---------------------------------------------------------------------------
const TORVIK_TO_DB = {
  // Core aliases Torvik gets wrong vs DB
  "Connecticut": "UConn",
  "Mississippi": "Ole Miss",
  "Massachusetts": "UMass",
  "Southern Cal": "USC",
  "Florida Intl": "FIU",
  "Fla. International": "FIU",
  "Florida International": "FIU",
  "Tennessee Martin": "UT Martin",
  "UT-Martin": "UT Martin",
  "Texas Rio Grande Valley": "UTRGV",
  "TX Rio Grande Valley": "UTRGV",
  "UT-Rio Grande Valley": "UTRGV",
  "Nebraska Omaha": "Omaha",
  "LIU Brooklyn": "LIU",
  "Long Island": "LIU",
  "UMKC": "Kansas City",
  "Missouri KC": "Kansas City",
  // Miami disambiguation
  "Miami FL": "Miami (FL)",
  "Miami OH": "Miami (OH)",
  // Loyola disambiguation
  "Loyola MD": "Loyola (MD",
  "Loyola Maryland": "Loyola (MD",
  // Saint Mary's
  "Saint Mary's CA": "Saint Mary's",
  "St. Mary's CA": "Saint Mary's",
  "St. Mary's": "Saint Mary's",
  // College of Charleston
  "Col. of Charleston": "Charleston",
  "C. of Charleston": "Charleston",
  "College of Charleston": "Charleston",
  // SIUE
  "SIUE": "SIU Edwardsville",
  "SIU-Edwardsville": "SIU Edwardsville",
  "Sou. Illinois-Edwardsville": "SIU Edwardsville",
  // Abbreviation expansions
  "Abilene Chr.": "Abilene Christian",
  "Appalachian St.": "Appalachian State",
  "Arkansas St.": "Arkansas State",
  "Austin Peay St.": "Austin Peay",
  "Bethune Cookman": "Bethune-Cookman",
  "Bowling Green St.": "Bowling Green",
  "Cal St. Bakersfield": "Cal State Bakersfield",
  "Cal St. Fullerton": "Cal State Fullerton",
  "Cal St. Northridge": "Cal State Northridge",
  "CSUN": "Cal State Northridge",
  "CSU Bakersfield": "Cal State Bakersfield",
  "Cal Baptist": "California Baptist",
  "Central Conn. St.": "Central Connecticut",
  "Charleston So.": "Charleston Southern",
  "Coastal Car.": "Coastal Carolina",
  "Detroit": "Detroit Mercy",
  "E. Illinois": "Eastern Illinois",
  "E. Kentucky": "Eastern Kentucky",
  "E. Michigan": "Eastern Michigan",
  "E. Washington": "Eastern Washington",
  "East Tennessee St.": "East Tennessee State",
  "E. Tenn. St.": "East Tennessee State",
  "E. Tennessee St.": "East Tennessee State",
  "ETSU": "East Tennessee State",
  "Florida Gulf Coast": "Florida Gulf Coast",
  "FGCU": "Florida Gulf Coast",
  "Florida A&M": "Florida A&M",
  "FAMU": "Florida A&M",
  "Fla. Atlantic": "FAU",
  "Florida Atlantic": "FAU",
  "Fresno St.": "Fresno State",
  "Gardner Webb": "Gardner-Webb",
  "Georgia St.": "Georgia State",
  "Grambling": "Grambling State",
  "Grambling St.": "Grambling State",
  "UWGB": "Green Bay",
  "Houston Chr.": "Houston Christian",
  "Houston Baptist": "Houston Christian",
  "HBU": "Houston Christian",
  "Idaho St.": "Idaho State",
  "Illinois St.": "Illinois State",
  "IU Indy": "IU Indy",
  "IUPUI": "IU Indy",
  "Jackson St.": "Jackson State",
  "Jacksonville St.": "Jacksonville State",
  "JMU": "James Madison",
  "Kennesaw St.": "Kennesaw State",
  "Kent St.": "Kent State",
  "LaSalle": "La Salle",
  "La Salle": "La Salle",
  "Little Rock": "Little Rock",
  "Ark.-Little Rock": "Little Rock",
  "Long Beach St.": "Long Beach State",
  "Louisiana Monroe": "Louisiana Monroe",
  "ULM": "Louisiana Monroe",
  "La.-Monroe": "Louisiana Monroe",
  "Loyola Chicago": "Loyola Chicago",
  "Loyola-Chicago": "Loyola Chicago",
  "McNeese": "McNeese",
  "McNeese St.": "McNeese",
  "Middle Tennessee": "Middle Tennessee",
  "MTSU": "Middle Tennessee",
  "Morehead St.": "Morehead State",
  "Morgan St.": "Morgan State",
  "Mt. St. Mary's": "Mount St. Mary's",
  "N.C. Central": "NC Central",
  "North Carolina Central": "NC Central",
  "N.C. State": "NC State",
  "North Carolina St.": "NC State",
  "N. Illinois": "Northern Illinois",
  "N. Iowa": "Northern Iowa",
  "N. Kentucky": "Northern Kentucky",
  "Northern Ky.": "Northern Kentucky",
  "NKU": "Northern Kentucky",
  "North Dakota St.": "North Dakota State",
  "N. Dakota St.": "North Dakota State",
  "NDSU": "North Dakota State",
  "N. Alabama": "North Alabama",
  "N. Florida": "North Florida",
  "NW State": "Northwestern State",
  "Northwestern St.": "Northwestern State",
  "ODU": "Old Dominion",
  "Oral Roberts": "Oral Roberts",
  "ORU": "Oral Roberts",
  "Penn": "Pennsylvania",
  "Penn St.": "Penn State",
  "Pitt": "Pittsburgh",
  "UIW": "Incarnate Word",
  "Portland St.": "Portland State",
  "Prairie View": "Prairie View A&M",
  "PVAMU": "Prairie View A&M",
  "URI": "Rhode Island",
  "Sacramento St.": "Sacramento State",
  "Sac. State": "Sacramento State",
  "Sam Houston St.": "Sam Houston State",
  "SHSU": "Sam Houston State",
  "SE Missouri St.": "Southeast Missouri",
  "SE Missouri": "Southeast Missouri",
  "SEMO": "Southeast Missouri",
  "SE Louisiana": "Southeastern Louisiana",
  "SLU": "Saint Louis",
  "Sou. Illinois": "Southern Illinois",
  "Southern Ill.": "Southern Illinois",
  "SIU": "Southern Illinois",
  "Southern Miss.": "Southern Miss",
  "Southern U.": "Southern",
  "Southern University": "Southern",
  "Sou. Utah": "Southern Utah",
  "SUU": "Southern Utah",
  "S. Alabama": "South Alabama",
  "S. Carolina": "South Carolina",
  "SC State": "South Carolina State",
  "S. Carolina St.": "South Carolina State",
  "S. Dakota": "South Dakota",
  "S. Dakota St.": "South Dakota State",
  "S. Florida": "South Florida",
  "USF": "South Florida",
  "SFA": "Stephen F. Austin",
  "SF Austin": "Stephen F. Austin",
  "Tarleton": "Tarleton State",
  "Tarleton St.": "Tarleton State",
  "Tennessee St.": "Tennessee State",
  "Tennessee Tech": "Tennessee Tech",
  "Texas A&M-CC": "Texas A&M-Corpus Christi",
  "Texas A&M Corpus Chris": "Texas A&M-Corpus Christi",
  "Texas St.": "Texas State",
  "WKU": "Western Kentucky",
  "W&M": "William & Mary",
  "WCU": "Western Carolina",
  "Wright St.": "Wright State",
  "Youngstown St.": "Youngstown State",
};

// Clean Torvik team names - remove score info like "(H) 99 Mississippi St."
const cleanTorvikTeamName = (name) => {
  if (!name) return name;
  const cleaned = name.replace(/\(H\).*$/, '').trim();
  return cleaned.replace(/\s+St\.?$/i, ' State');
};

// Resolve a Torvik team name to the DB canonical name.
// First checks the explicit alias map, then falls back to light canonicalization.
const resolveTorvikName = (torvikName) => {
  if (!torvikName) return torvikName;
  const cleaned = cleanTorvikTeamName(torvikName);
  // Direct alias hit
  if (TORVIK_TO_DB[cleaned]) return TORVIK_TO_DB[cleaned];
  // Try case-insensitive alias hit
  const lower = cleaned.toLowerCase();
  const aliasKey = Object.keys(TORVIK_TO_DB).find(k => k.toLowerCase() === lower);
  if (aliasKey) return TORVIK_TO_DB[aliasKey];
  // Fall back: strip "University of" prefix so "University of Connecticut" → "Connecticut"
  // then alias-check again (handles edge cases)
  const stripped = cleaned
    .replace(/^University\s+of\s+/i, '')
    .replace(/\s+University$/i, '')
    .trim();
  if (TORVIK_TO_DB[stripped]) return TORVIK_TO_DB[stripped];
  return cleaned;
};

// Clean role/parenthetical info from school names stored in coaching_career
const cleanSchoolName = (school) => {
  if (!school) return school;
  const stateAbbrevs = /\((AL|AK|AZ|AR|CA|CO|CT|DE|FL|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|Pa\.|Ohio|Maryland|Minnesota|Illinois|West Virginia|Pennsylvania)\)$/i;
  if (stateAbbrevs.test(school)) return school.trim();
  return school
    .replace(/\s*\(GA\)\s*$/gi, '')
    .replace(/\s*\([^)]*(?:asst|assistant|DBO|AHC|VHC|VC|DPD|RC|GM|AGM|coord|ops|operations|manager|admin|volunteer|student|grad|graduate|special|women|men|youth|shooting|vid|development|EXOS|Korisliga|China|NBA|League)[^)]*\)\s*$/gi, '')
    .trim() || school;
};

const canonicalizeSchoolName = (name) => {
  if (!name) return name;
  return cleanSchoolName(name.trim())
    .replace(/^University\s+of\s+/i, '')
    .replace(/\s+University$/i, '')
    .replace(/\s+St\.?$/i, ' State');
};

// Match a DB school name against a resolved (DB-canonical) team name.
const schoolsMatch = (dbSchool, resolvedTeam) => {
  if (!dbSchool || !resolvedTeam) return false;
  const n1 = canonicalizeSchoolName(dbSchool).toLowerCase().trim();
  const n2 = canonicalizeSchoolName(resolvedTeam).toLowerCase().trim();
  if (n1 === n2) return true;
  const norm1 = n1.replace(/\s+st\.?$/i, ' state');
  const norm2 = n2.replace(/\s+st\.?$/i, ' state');
  if (norm1 === norm2) return true;
  // NO partial/substring matching — "Michigan" must NOT match "Michigan State"
  return false;
};

export default function BasketballByStats({ coachesData, torvikData, onCoachClick }) {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [sortColumn, setSortColumn] = useState('rank');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statView, setStatView] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [confFilter, setConfFilter] = useState('');
  const [expandedTeam, setExpandedTeam] = useState(null);

  const availableYears = useMemo(() => {
    if (!torvikData?.data) return [];
    return Object.keys(torvikData.data).sort((a, b) => b - a);
  }, [torvikData]);

  const yearData = useMemo(() => {
    if (!torvikData?.data?.[selectedYear]) return [];
    const teams = torvikData.data[selectedYear].teams || [];
    return teams.map(t => ({
      ...t,
      team: resolveTorvikName(t.team),  // resolve to DB canonical name
      originalTeam: t.team              // keep raw Torvik name for debugging
    }));
  }, [torvikData, selectedYear]);

  const conferences = useMemo(() => {
    const confs = new Set();
    yearData.forEach(t => t.conference && confs.add(t.conference));
    return Array.from(confs).sort();
  }, [yearData]);

  const filteredData = useMemo(() => {
    let data = yearData;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(t => t.team?.toLowerCase().includes(term));
    }
    if (confFilter) {
      data = data.filter(t => t.conference === confFilter);
    }
    return data;
  }, [yearData, searchTerm, confFilter]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];
      if (typeof aVal === 'string') aVal = parseFloat(aVal) || aVal;
      if (typeof bVal === 'string') bVal = parseFloat(bVal) || bVal;
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Returns [{ coach, jobPosition }] for all coaches at teamName during year.
  // teamName is already DB-canonical (resolved by resolveTorvikName in yearData).
  const getTeamCoaches = (teamName, year) => {
    const results = [];
    for (const coach of coachesData) {
      if (!coach.coaching_career) continue;
      for (const job of coach.coaching_career) {
        if (!schoolsMatch(job.school, teamName)) continue;
        const s = job.years?.start;
        const e = job.years?.end ?? 2026;
        if (s && year > s && year <= e) {
          results.push({ coach, jobPosition: job.position });
          break; // count each coach once per team
        }
      }
    }
    return results;
  };

  // Find head coach from getTeamCoaches results — uses the career job position,
  // not currentPosition, so it works correctly for historical years too.
  const findHeadCoach = (teamCoaches) => {
    return teamCoaches.find(({ jobPosition, coach }) => {
      const pos = (jobPosition || coach.currentPosition || '').toLowerCase();
      return pos.includes('head coach') && !pos.includes('associate') && !pos.includes('asst');
    });
  };

  const getRankColor = (rank) => {
    if (rank <= 10) return '#4ade80';
    if (rank <= 25) return '#22d3ee';
    if (rank <= 50) return '#60a5fa';
    if (rank <= 100) return '#a78bfa';
    if (rank <= 150) return '#fbbf24';
    if (rank <= 200) return '#fb923c';
    return '#f87171';
  };

  const columns = {
    basic: [
      { key: 'rank', label: 'Rank', format: v => v },
      { key: 'record', label: 'Record', format: v => v },
      { key: 'adj_oe', label: 'AdjOE', format: v => v?.toFixed(1) },
      { key: 'adj_de', label: 'AdjDE', format: v => v?.toFixed(1) },
      { key: 'barthag', label: 'BARTHAG', format: v => v?.toFixed(4) },
      { key: 'wab', label: 'WAB', format: v => v?.toFixed(1) },
    ],
    offense: [
      { key: 'rank', label: 'Rank', format: v => v },
      { key: 'adj_oe', label: 'AdjOE', format: v => v?.toFixed(1) },
      { key: 'efg_pct', label: 'eFG%', format: v => (v*100)?.toFixed(1) + '%' },
      { key: 'tor', label: 'TO%', format: v => v?.toFixed(1) },
      { key: 'orb', label: 'ORB%', format: v => v?.toFixed(1) },
      { key: 'ftr', label: 'FTR', format: v => v?.toFixed(1) },
    ],
    defense: [
      { key: 'rank', label: 'Rank', format: v => v },
      { key: 'adj_de', label: 'AdjDE', format: v => v?.toFixed(1) },
      { key: 'efgd_pct', label: 'eFG%D', format: v => (v*100)?.toFixed(1) + '%' },
      { key: 'tord', label: 'TO%D', format: v => v?.toFixed(1) },
      { key: 'drb', label: 'DRB%', format: v => v?.toFixed(1) },
      { key: 'ftrd', label: 'FTRD', format: v => v?.toFixed(1) },
    ]
  };

  const currentColumns = columns[statView];

  return (
    <div>
      {/* Controls */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '0.9rem'
          }}
        >
          {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
        </select>

        <select
          value={confFilter}
          onChange={(e) => setConfFilter(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '0.9rem'
          }}
        >
          <option value="">All Conferences</option>
          {conferences.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '0.9rem',
            flex: 1,
            minWidth: '150px'
          }}
        />

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['basic', 'offense', 'defense'].map(view => (
            <button
              key={view}
              onClick={() => setStatView(view)}
              style={{
                padding: '0.5rem 1rem',
                background: statView === view ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.05)',
                border: statView === view ? '1px solid rgba(167,139,250,0.5)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: statView === view ? '#a78bfa' : '#8892b0',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Team</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#8892b0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Conf</th>
              {currentColumns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    padding: '0.75rem',
                    textAlign: 'right',
                    color: sortColumn === col.key ? '#a78bfa' : '#8892b0',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer'
                  }}
                >
                  {col.label} {sortColumn === col.key && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((team, idx) => {
              const isExpanded = expandedTeam === team.team;
              // getTeamCoaches now returns [{ coach, jobPosition }]
              const teamCoaches = isExpanded ? getTeamCoaches(team.team, parseInt(selectedYear)) : [];
              const hcEntry    = isExpanded ? findHeadCoach(teamCoaches) : null;
              const hc         = hcEntry?.coach ?? null;
              const others     = teamCoaches.filter(e => e.coach !== hc).slice(0, 4);

              return (
                <React.Fragment key={idx}>
                  <tr
                    onClick={() => setExpandedTeam(isExpanded ? null : team.team)}
                    style={{
                      cursor: 'pointer',
                      background: isExpanded ? 'rgba(167,139,250,0.1)' : 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = isExpanded ? 'rgba(167,139,250,0.1)' : 'transparent'}
                  >
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <TeamWithLogo team={team.team} size={20} nameStyle={{ color: '#fff', fontWeight: 600 }} />
                    </td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#8892b0' }}>
                      {team.conference}
                    </td>
                    {currentColumns.map(col => (
                      <td
                        key={col.key}
                        style={{
                          padding: '0.75rem',
                          textAlign: 'right',
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                          color: col.key === 'rank' ? getRankColor(team.rank) : '#ccd6f6',
                          fontWeight: col.key === 'rank' ? 700 : 400,
                          fontFamily: 'monospace'
                        }}
                      >
                        {col.format(team[col.key])}
                      </td>
                    ))}
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={currentColumns.length + 2} style={{ padding: '1rem', background: 'rgba(167,139,250,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                          {hc && (
                            <div
                              onClick={(e) => { e.stopPropagation(); onCoachClick(hc); }}
                              style={{
                                padding: '0.75rem 1rem',
                                background: 'rgba(255,107,53,0.1)',
                                border: '1px solid rgba(255,107,53,0.3)',
                                borderRadius: '8px',
                                cursor: 'pointer'
                              }}
                            >
                              <div style={{ fontSize: '0.7rem', color: '#ff6b35', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Head Coach</div>
                              <div style={{ fontWeight: 600, color: '#fff' }}>{hc.name}</div>
                            </div>
                          )}
                          {others.map(({ coach: c, jobPosition }, i) => (
                            <div
                              key={i}
                              onClick={(e) => { e.stopPropagation(); onCoachClick(c); }}
                              style={{
                                padding: '0.75rem 1rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                cursor: 'pointer'
                              }}
                            >
                              {/* Use the job's position for the year shown, fall back to currentPosition */}
                              <div style={{ fontSize: '0.7rem', color: '#8892b0', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                {jobPosition || c.currentPosition}
                              </div>
                              <div style={{ fontWeight: 600, color: '#ccd6f6' }}>{c.name}</div>
                            </div>
                          ))}
                          {teamCoaches.length === 0 && (
                            <div style={{ color: '#8892b0' }}>No coaches found in database</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
