import React, { useState, useMemo } from 'react';
import { TeamWithLogo, TeamLogo } from './basketballTeamLogos';

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

// Clean Torvik team names - remove score info like "(H) 99 Mississippi St."
const cleanTorvikTeamName = (name) => {
  if (!name) return name;
  // Remove everything from "(H)" onwards
  const cleaned = name.replace(/\(H\).*$/, '').trim();
  // Also normalize "St." at end to "State"
  return cleaned.replace(/\s+St\.?$/i, ' State');
};

const canonicalizeSchoolName = (name) => {
  if (!name) return name;
  // Clean position info first
  let cleaned = cleanSchoolName(name.trim());
  return cleaned
    .replace(/^University\s+of\s+/i, '')
    .replace(/\s+University$/i, '')
    .replace(/\s+St\.?$/i, ' State');
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
    // Clean team names
    return teams.map(t => ({
      ...t,
      team: cleanTorvikTeamName(t.team),
      originalTeam: t.team // Keep original for debugging
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

  const getTeamCoaches = (teamName, year) => {
    return coachesData.filter(coach => {
      if (!coach.coaching_career) return false;
      return coach.coaching_career.some(job => {
        if (!schoolsMatch(job.school, teamName)) return false;
        const s = job.years?.start, e = job.years?.end || 2026;
        return s && year >= s && year <= e;
      });
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
              const coaches = isExpanded ? getTeamCoaches(team.team, parseInt(selectedYear)) : [];
              const hc = coaches.find(c => c.currentPosition?.toLowerCase().includes('head coach'));
              
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
                          {coaches.filter(c => c !== hc).slice(0, 4).map((c, i) => (
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
                              <div style={{ fontSize: '0.7rem', color: '#8892b0', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{c.currentPosition}</div>
                              <div style={{ fontWeight: 600, color: '#ccd6f6' }}>{c.name}</div>
                            </div>
                          ))}
                          {coaches.length === 0 && <div style={{ color: '#8892b0' }}>No coaches found in database</div>}
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
