// Integration tests. Start the server first, then: BASE_URL=http://localhost:3000 npm test
const test = require('node:test');
const assert = require('node:assert');
const BASE = process.env.BASE_URL || 'http://localhost:3000';
const post = (p, body, token) => fetch(BASE + p, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', ...(token && { Authorization: 'Bearer ' + token }) },
  body: JSON.stringify(body),
});
let token, uhid;

test('health check', async () => {
  assert.equal((await fetch(BASE + '/healthz')).status, 200);
});
test('login rejects bad credentials', async () => {
  assert.equal((await post('/api/login', { username: 'harsh', password: 'wrong' })).status, 401);
});
test('login succeeds for seeded doctor', async () => {
  const r = await post('/api/login', { username: 'harsh', password: 'pass123' });
  assert.equal(r.status, 200);
  token = (await r.json()).token;
  assert.ok(token);
});
test('register patient (random Aadhar)', async () => {
  const aadhar = String(Math.floor(1e11 + Math.random() * 9e11));
  const r = await post('/api/patients/register', { name: 'Test Patient', aadhar });
  assert.equal(r.status, 201);
  uhid = (await r.json()).uhid;
  assert.match(uhid, /^\d{4}$/);
});
test('records require a token', async () => {
  assert.equal((await fetch(BASE + '/api/records/' + uhid)).status, 401);
});
test('add and fetch a record', async () => {
  assert.equal((await post('/api/records', { uhid, diagnosis: 'Test dx' }, token)).status, 201);
  const r = await fetch(BASE + '/api/records/' + uhid, { headers: { Authorization: 'Bearer ' + token } });
  const data = await r.json();
  assert.equal(data.records[0].diagnosis, 'Test dx');
});
