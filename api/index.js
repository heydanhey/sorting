const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');

module.exports = async function handler(req, res) {
  let data = [];
  let error = '';

  const allowedOrigins = [
    process.env.ALLOWED_ORIGIN,
    'http://localhost:3000',
    'http://localhost:3333'
  ];
  
  const referer = req.headers.referer || req.headers.origin;
  const isAllowed = allowedOrigins.some(origin => 
    referer && referer.startsWith(origin)
  );
  
  if (!isAllowed) {
    res.status(403).json({
      error: 'Forbidden - Request must come from authorized domain'
    });
    return;
  }

  try {
    const response = await fetch(process.env.SCRAPE_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const site = await response.text();
    const root = HTMLParser.parse(site);
    const teamImage = root.querySelector(`img[title="${process.env.NBA_TEAM}"]`);
    const teamTable = teamImage && teamImage.closest('.Table__league-injuries');
    const rows = teamTable && teamTable.querySelectorAll('tr');
    if (rows && rows.length > 0) {
      const [, ...injuries] = rows;
      data = injuries.map(injury => {
        const [name, pos, date, status] = injury.childNodes;
        return {
          name: name.rawText,
          position: pos.rawText,
          date: date.rawText,
          status: status.rawText
        }
      })
    }
  } catch (err) {
    error = err ? JSON.stringify(err) : 'Server error';
  }

  if (error) {
    res.status(500).json({
      error
    });
    return;
  }

  res.setHeader('content-type', 'application/json; charset=utf8');
  res.setHeader('cache-control', 'max-age=43200');
  res.status(200).json({
    message: data
  });
}
