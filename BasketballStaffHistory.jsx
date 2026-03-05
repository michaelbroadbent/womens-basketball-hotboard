import React, { useState, useMemo } from 'react';
import { TeamWithLogo, TeamLogo, getTeamLogoUrl } from './basketballTeamLogos';

// Clean position/role info from school names
const cleanSchoolName = (school) => {
  if (!school) return school;
  
  // State abbreviations to KEEP (these distinguish schools like "Miami (OH)" vs "Miami (FL)")
  const stateAbbrevs = /\((AL|AK|AZ|AR|CA|CO|CT|DE|FL|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|Pa\.|Ohio|Maryland|Minnesota|Illinois|West Virginia|Pennsylvania)\)$/i;
  
  if (stateAbbrevs.test(school)) {
    return school.trim();
  }
  
  // Remove position/role parentheticals
  let cleaned = school
    .replace(/\s*\(GA\)\s*$/gi, '')  // Graduate Assistant specifically
    .replace(/\s*\([^)]*(?:asst|assistant|DBO|AHC|VHC|VC|DPD|RC|GM|AGM|coord|ops|operations|manager|admin|volunteer|student|grad|graduate|special|women|men|youth|shooting|vid|development|EXOS|Korisliga|China|NBA|League)[^)]*\)\s*$/gi, '')
    .trim();
  
  return cleaned || school;
};

// Clean concatenated school names
const cleanConcatenatedName = (name) => {
  if (!name) return name;
  // Pattern where schools got concatenated like "ArizonaStateUNLV"
  const match = name.match(/^([A-Za-z\s]+(?:State|University|College))([A-Z][a-z])/);
  if (match) return match[1];
  return name;
};

// Comprehensive school name mapping for normalization
const SCHOOL_NAME_MAP = {
  // Connecticut schools - IMPORTANT distinctions
  'connecticut': 'UConn',
  'conn': 'UConn',
  'university of connecticut': 'UConn',
  'uconn': 'UConn',
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
  // Connecticut College stays separate (NESCAC D3)
  'connecticut college': 'Connecticut College',
  
  // Florida schools
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
  'fsu': 'Florida State',
  
  // Purdue Fort Wayne (formerly IPFW)
  'purdue fort wayne': 'Purdue Fort Wayne',
  'fort wayne': 'Purdue Fort Wayne',
  'ipfw': 'Purdue Fort Wayne',
  'ipfw/fort wayne/purdue fort wayne': 'Purdue Fort Wayne',
  'indiana-purdue fort wayne': 'Purdue Fort Wayne',
  
  // California Baptist
  'california baptist': 'California Baptist',
  'california baptist university': 'California Baptist',
  'cal baptist': 'California Baptist',
  'cbu': 'California Baptist',
  
  // Fairleigh Dickinson
  'fairleigh dickinson': 'Fairleigh Dickinson',
  'fairleigh dickinson university': 'Fairleigh Dickinson',
  'fdu': 'Fairleigh Dickinson',
  
  // Other common variations
  'lsu': 'LSU',
  'louisiana state': 'LSU',
  'louisiana state university': 'LSU',
  'usc': 'USC',
  'southern california': 'USC',
  'ucla': 'UCLA',
  'byu': 'BYU',
  'brigham young': 'BYU',
  'tcu': 'TCU',
  'texas christian': 'TCU',
  'smu': 'SMU',
  'southern methodist': 'SMU',
  'vcu': 'VCU',
  'virginia commonwealth': 'VCU',
  'ole miss': 'Ole Miss',
  'mississippi': 'Ole Miss',
  'nc state': 'NC State',
  'north carolina state': 'NC State',
  'pitt': 'Pittsburgh',
  'pittsburgh': 'Pittsburgh',
  'umass': 'UMass',
  'massachusetts': 'UMass',
  'unlv': 'UNLV',
  'nevada-las vegas': 'UNLV',
  'utep': 'UTEP',
  'texas-el paso': 'UTEP',
  'utsa': 'UTSA',
  'texas-san antonio': 'UTSA',
  
  // Sam Houston (consolidated - dropped "State" in 2022)
  'sam houston': 'Sam Houston',
  'sam houston state': 'Sam Houston',
  'sam houston state university': 'Sam Houston',
  'shsu': 'Sam Houston',
  
  // Saint Mary's (California - WCC)
  "saint mary's": "Saint Mary's",
  "st. mary's": "Saint Mary's",
  "saint mary's college": "Saint Mary's",
  "saint mary's college of california": "Saint Mary's",
  "st. mary's college": "Saint Mary's",
  "st mary's": "Saint Mary's",
  
  // Marist (consolidated)
  'marist': 'Marist',
  'marist college': 'Marist',
  'marist university': 'Marist',
};

const canonicalizeSchoolName = (name) => {
  if (!name) return name;
  // Clean position info first
  let cleaned = cleanSchoolName(name.trim());
  cleaned = cleanConcatenatedName(cleaned);
  
  // Check direct mapping
  const lower = cleaned.toLowerCase();
  if (SCHOOL_NAME_MAP[lower]) {
    return SCHOOL_NAME_MAP[lower];
  }
  
  // Standard normalization
  cleaned = cleaned
    .replace(/^University\s+of\s+/i, '')
    .replace(/\s+University$/i, '')
    .replace(/\s+St\.?$/i, ' State');
  
  // Check mapping again after stripping
  const lowerCleaned = cleaned.toLowerCase();
  if (SCHOOL_NAME_MAP[lowerCleaned]) {
    return SCHOOL_NAME_MAP[lowerCleaned];
  }
  
  return cleaned;
};

const schoolsMatch = (s1, s2) => {
  if (!s1 || !s2) return false;
  const n1 = canonicalizeSchoolName(s1).toLowerCase().trim();
  const n2 = canonicalizeSchoolName(s2).toLowerCase().trim();
  
  // Exact match after canonicalization
  if (n1 === n2) return true;
  
  // Handle "St." at end meaning State
  const norm1 = n1.replace(/\s+st\.?$/i, ' state');
  const norm2 = n2.replace(/\s+st\.?$/i, ' state');
  if (norm1 === norm2) return true;
  
  // NO partial/substring matching - "Michigan" should NOT match "Michigan State"
  return false;
};

export default function BasketballStaffHistory({ coachesData, onSelectCoach }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [expandedYears, setExpandedYears] = useState({});
  const [positionFilter, setPositionFilter] = useState('all');

  const allSchools = useMemo(() => {
    const schools = new Set();
    coachesData.forEach(c => {
      c.coaching_career?.forEach(job => {
        if (job.school) schools.add(canonicalizeSchoolName(job.school));
      });
    });
    const schoolsArray = Array.from(schools);
    // Sort: schools with logos first, then alphabetically
    return schoolsArray.sort((a, b) => {
      const aHasLogo = !!getTeamLogoUrl(a);
      const bHasLogo = !!getTeamLogoUrl(b);
      if (aHasLogo && !bHasLogo) return -1;
      if (!aHasLogo && bHasLogo) return 1;
      return a.localeCompare(b);
    });
  }, [coachesData]);

  const filteredSchools = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return allSchools.filter(s => s.toLowerCase().includes(term)).slice(0, 30);
  }, [allSchools, searchTerm]);

  const staffByYear = useMemo(() => {
    if (!selectedSchool) return {};
    
    const byYear = {};
    coachesData.forEach(coach => {
      coach.coaching_career?.forEach(job => {
        if (!schoolsMatch(job.school, selectedSchool)) return;
        const start = job.years?.start;
        const end = job.years?.end || new Date().getFullYear();
        if (!start) return;
        
        // start year = fall of that year = beginning of (start)-(start+1) season
        // So a coach starting in 2023 first appears in the 2023-24 season
        // We use the END year of the season as the key (2024 for 2023-24)
        // end year = they were there through the (end-1)-(end) season
        for (let y = start + 1; y <= end; y++) {
          if (!byYear[y]) byYear[y] = [];
          byYear[y].push({
            name: coach.name,
            position: job.position,
            coach: coach
          });
        }
      });
    });
    
    // Sort by position
    Object.keys(byYear).forEach(y => {
      byYear[y].sort((a, b) => {
        const aHC = a.position?.toLowerCase().includes('head coach') ? 0 : 1;
        const bHC = b.position?.toLowerCase().includes('head coach') ? 0 : 1;
        return aHC - bHC;
      });
    });
    
    return byYear;
  }, [coachesData, selectedSchool]);

  // Format year as basketball season (e.g., 2024 -> "2023-24")
  const formatSeason = (endYear) => {
    const startYear = endYear - 1;
    const endYearShort = String(endYear).slice(-2);
    return `${startYear}-${endYearShort}`;
  };

  const years = useMemo(() => {
    return Object.keys(staffByYear).map(Number).sort((a, b) => b - a);
  }, [staffByYear]);

  const getPositionColor = (position) => {
    if (!position) return '#8892b0';
    const pos = position.toLowerCase();
    if (pos.includes('head coach')) return '#ff6b35';
    if (pos.includes('associate')) return '#fbbf24';
    return '#60a5fa';
  };

  const toggleYear = (year) => {
    setExpandedYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <div>
      {/* Search */}
      {!selectedSchool && (
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8892b0', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Select a School
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search schools..."
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(251,191,36,0.2)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
          {searchTerm && filteredSchools.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#1a1a2e',
              border: '1px solid rgba(251,191,36,0.3)',
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
                    setExpandedYears({ [years[0]]: true });
                  }}
                  style={{ padding: '0.75rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(251,191,36,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <TeamLogo team={school} size={24} />
                  <span style={{ color: '#fff' }}>{school}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected School */}
      {selectedSchool && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.1))',
              padding: '0.75rem 1.25rem',
              borderRadius: '100px',
              border: '1px solid rgba(251,191,36,0.4)'
            }}>
              <TeamLogo team={selectedSchool} size={28} />
              <span style={{ fontWeight: 700, color: '#fbbf24' }}>{selectedSchool}</span>
              <button
                onClick={() => setSelectedSchool('')}
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
              >×</button>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['all', 'hc', 'assistant'].map(f => (
                <button
                  key={f}
                  onClick={() => setPositionFilter(f)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: positionFilter === f ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)',
                    border: positionFilter === f ? '1px solid rgba(251,191,36,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: positionFilter === f ? '#fbbf24' : '#8892b0',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {f === 'all' ? 'All Staff' : f === 'hc' ? 'HC' : 'Assistants'}
                </button>
              ))}
            </div>
          </div>

          {/* Year List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {years.map(year => {
              const staff = staffByYear[year] || [];
              const filteredStaff = positionFilter === 'all' ? staff :
                positionFilter === 'hc' ? staff.filter(s => s.position?.toLowerCase().includes('head coach')) :
                staff.filter(s => !s.position?.toLowerCase().includes('head coach'));
              const isExpanded = expandedYears[year];
              const hc = staff.find(s => s.position?.toLowerCase().includes('head coach'));
              
              return (
                <div
                  key={year}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(251,191,36,0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    onClick={() => toggleYear(year)}
                    style={{
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      cursor: 'pointer',
                      background: isExpanded ? 'rgba(251,191,36,0.1)' : 'transparent'
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#fbbf24', fontFamily: 'monospace', fontSize: '1.1rem' }}>{formatSeason(year)}</span>
                    <span style={{ color: '#8892b0', fontSize: '0.85rem' }}>{staff.length} coaches</span>
                    {hc && <span style={{ color: '#ff6b35', fontSize: '0.85rem' }}>HC: {hc.name}</span>}
                    <span style={{ marginLeft: 'auto', color: '#8892b0' }}>{isExpanded ? '▼' : '▶'}</span>
                  </div>
                  
                  {isExpanded && (
                    <div style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      {filteredStaff.map((s, i) => (
                        <div
                          key={i}
                          onClick={() => onSelectCoach(s.coach)}
                          style={{
                            padding: '0.5rem 0.75rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            borderLeft: `3px solid ${getPositionColor(s.position)}`
                          }}
                        >
                          <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.85rem' }}>{s.name}</div>
                          <div style={{ color: getPositionColor(s.position), fontSize: '0.75rem' }}>{s.position}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {years.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#8892b0' }}>
              No staff history found for {selectedSchool}
            </div>
          )}
        </>
      )}
    </div>
  );
}
