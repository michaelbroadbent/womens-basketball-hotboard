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

export default function BasketballSchoolRoster({ coachesData, onSelectCoach }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

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

  const schoolCoaches = useMemo(() => {
    if (!selectedSchool) return [];
    
    const coaches = [];
    coachesData.forEach(coach => {
      const stints = coach.coaching_career?.filter(job => schoolsMatch(job.school, selectedSchool)) || [];
      if (stints.length > 0) {
        const isCurrent = schoolsMatch(coach.currentTeam, selectedSchool);
        const mostRecent = stints.reduce((max, s) => {
          const end = s.years?.end || 9999;
          return end > (max.years?.end || 0) ? s : max;
        }, stints[0]);
        
        coaches.push({
          coach,
          stints,
          isCurrent,
          mostRecentYear: mostRecent.years?.end || mostRecent.years?.start || 0,
          isHC: stints.some(s => s.position?.toLowerCase().includes('head coach'))
        });
      }
    });
    
    return coaches;
  }, [coachesData, selectedSchool]);

  const filteredCoaches = useMemo(() => {
    let filtered = schoolCoaches;
    
    if (positionFilter === 'hc') {
      filtered = filtered.filter(c => c.isHC);
    } else if (positionFilter === 'assistant') {
      filtered = filtered.filter(c => !c.isHC);
    }
    
    if (sortBy === 'recent') {
      filtered.sort((a, b) => {
        if (a.isCurrent && !b.isCurrent) return -1;
        if (!a.isCurrent && b.isCurrent) return 1;
        return b.mostRecentYear - a.mostRecentYear;
      });
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.coach.name.localeCompare(b.coach.name));
    } else if (sortBy === 'current') {
      filtered.sort((a, b) => {
        if (a.isCurrent && !b.isCurrent) return -1;
        if (!a.isCurrent && b.isCurrent) return 1;
        return 0;
      });
    }
    
    return filtered;
  }, [schoolCoaches, positionFilter, sortBy]);

  const formatYearRange = (start, end, raw) => {
    if (!start && !end) return '—';
    if (raw?.toLowerCase().includes('present')) return `${start}–present`;
    if (end >= new Date().getFullYear()) return `${start}–present`;
    if (start === end) return `${start}`;
    return `${start}–${end}`;
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
              border: '1px solid rgba(232,121,249,0.2)',
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
              border: '1px solid rgba(232,121,249,0.3)',
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
                  }}
                  style={{ padding: '0.75rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(232,121,249,0.1)'}
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
              background: 'linear-gradient(135deg, rgba(232,121,249,0.2), rgba(232,121,249,0.1))',
              padding: '0.75rem 1.25rem',
              borderRadius: '100px',
              border: '1px solid rgba(232,121,249,0.4)'
            }}>
              <TeamLogo team={selectedSchool} size={28} />
              <span style={{ fontWeight: 700, color: '#e879f9' }}>{selectedSchool}</span>
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
                    background: positionFilter === f ? 'rgba(232,121,249,0.2)' : 'rgba(255,255,255,0.05)',
                    border: positionFilter === f ? '1px solid rgba(232,121,249,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: positionFilter === f ? '#e879f9' : '#8892b0',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {f === 'all' ? 'All' : f === 'hc' ? 'HC' : 'Assistants'}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
              {[
                { id: 'recent', label: 'Most Recent' },
                { id: 'name', label: 'Name' },
                { id: 'current', label: 'Current First' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: sortBy === s.id ? 'rgba(232,121,249,0.2)' : 'rgba(255,255,255,0.05)',
                    border: sortBy === s.id ? '1px solid rgba(232,121,249,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: sortBy === s.id ? '#e879f9' : '#8892b0',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Coaches Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {filteredCoaches.map(({ coach, stints, isCurrent }, idx) => (
              <div
                key={idx}
                onClick={() => onSelectCoach(coach)}
                style={{
                  background: isCurrent ? 'rgba(74,222,128,0.05)' : 'rgba(255,255,255,0.02)',
                  border: isCurrent ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(232,121,249,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(232,121,249,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isCurrent ? 'rgba(74,222,128,0.05)' : 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = isCurrent ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{coach.name}</div>
                  {isCurrent && (
                    <span style={{
                      padding: '0.15rem 0.5rem',
                      background: 'rgba(74,222,128,0.2)',
                      color: '#4ade80',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      borderRadius: '100px',
                      textTransform: 'uppercase'
                    }}>Current</span>
                  )}
                </div>
                
                {coach.currentTeam && !isCurrent && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#8892b0', fontSize: '0.85rem' }}>
                    Now: <TeamWithLogo team={coach.currentTeam} size={16} nameStyle={{ color: '#60a5fa' }} />
                  </div>
                )}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {stints.map((stint, i) => (
                    <div key={i} style={{ fontSize: '0.8rem', color: '#ccd6f6' }}>
                      <span style={{ color: stint.position?.toLowerCase().includes('head coach') ? '#ff6b35' : '#8892b0' }}>
                        {stint.position}
                      </span>
                      <span style={{ color: '#8892b0' }}> ({formatYearRange(stint.years?.start, stint.years?.end, stint.raw_years)})</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredCoaches.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#8892b0' }}>
              No coaches found for {selectedSchool}
            </div>
          )}
        </>
      )}
    </div>
  );
}
