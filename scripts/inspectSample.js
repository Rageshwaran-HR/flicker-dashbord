const fs = require('fs');
const path = require('path');

function parseTimestampField(v) {
  if (!v) return null;
  if (typeof v === 'string') return new Date(v);
  if (v && typeof v === 'object') {
    if (v.value && typeof v.value === 'string') return new Date(v.value);
    if (v.__type === 'timestamp' && v.value) return new Date(v.value);
    if (v.__type === 'serverTimestamp') return new Date();
    if (Object.keys(v).length === 0) return new Date();
  }
  return null;
}

function tabForTournament(start, end, status) {
  const now = Date.now();
  if (status === 'Ongoing') return 'ongoing';
  if (start && end) {
    if (now >= start.getTime() && now <= end.getTime()) return 'ongoing';
    if (start.getTime() > now) return 'future';
    return 'past';
  }
  if (status === 'Upcoming') return 'future';
  if (status === 'Completed') return 'past';
  return 'ongoing';
}

(async function main() {
  const file = path.join(__dirname, '..', 'public', 'data', 'firestore.sample.json');
  const raw = fs.readFileSync(file, 'utf8');
  const json = JSON.parse(raw);
  const tournaments = json.tournaments || {};

  const out = Object.keys(tournaments).map((id) => {
    const t = tournaments[id];
    const start = parseTimestampField(t.startDate);
    const end = parseTimestampField(t.endDate);
    const startTs = start ? start.getTime() : null;
    const endTs = end ? end.getTime() : null;
    const tab = tabForTournament(start, end, t.status);
    return {
      id,
      name: t.name,
      status: t.status,
      start: start ? start.toISOString() : null,
      end: end ? end.toISOString() : null,
      startTs,
      endTs,
      tab,
    };
  });

  console.log(JSON.stringify(out, null, 2));
})();
