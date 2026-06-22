module.exports = async (_req, res) => {
  const apiKey = process.env.DEEPGRAM_API_KEY;

  if (!apiKey) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      available: false,
      mode: 'browser',
      message: 'DEEPGRAM_API_KEY is not set. Browser speech recognition will be used.'
    });
    return;
  }

  const log = [];

  try {
    const grantRes = await fetch('https://api.deepgram.com/v1/auth/grant', {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ttl_seconds: 300 })
    });
    log.push(`auth-grant:${grantRes.status}`);

    if (grantRes.ok) {
      const data = await grantRes.json();
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json({
        available: true,
        mode: 'deepgram-jwt',
        key: data.access_token,
        expiresIn: data.expires_in,
        log
      });
      return;
    }

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      available: false,
      mode: 'browser',
      message: 'Deepgram temporary token creation failed. Browser speech recognition will be used.',
      log
    });
  } catch (error) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      available: false,
      mode: 'browser',
      message: error.message,
      log
    });
  }
};
