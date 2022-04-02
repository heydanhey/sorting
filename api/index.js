exports.handler = async function http (req) {
  const fetch = require('node-fetch');
  const HTMLParser = require('node-html-parser');
  let data = [];
  let error = '';
  try {
    const response = await fetch(process.env.SCRAPE_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const site = await response.text();
    const root = HTMLParser.parse(site);
    const rows = root.querySelector(`img[title="${process.env.NBA_TEAM}"]`).closest('.Table__league-injuries').querySelectorAll('tr');
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
    return {
      statusCode: 500,
      body: JSON.stringify({
        error
      })
    }
  }

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'max-age=43200'
    },
    statusCode: 200,
    body: JSON.stringify({
      message: data
    })
  }
}
