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
    const projectsRes = await fetch('https://api.deepgram.com/v1/projects', {
      headers: { Authorization: `Token ${apiKey}` }
    });
    log.push(`projects:${projectsRes.status}`);

    if (projectsRes.ok) {
      const { projects } = await projectsRes.json();
      const projectId = projects?.[0]?.project_id;

      if (projectId) {
        const keyRes = await fetch(`https://api.deepgram.com/v1/projects/${projectId}/keys`, {
          method: 'POST',
          headers: {
            Authorization: `Token ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            comment: 'kosoku voice translator browser key',
            scopes: ['usage:write'],
            time_to_live_in_seconds: 60
          })
        });
        log.push(`temp-key:${keyRes.status}`);

        if (keyRes.ok) {
          const data = await keyRes.json();
          res.setHeader('Cache-Control', 'no-store');
          res.status(200).json({
            available: true,
            mode: 'deepgram-temp',
            key: data.key,
            expiresIn: 60,
            log
          });
          return;
        }
      }
    }

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      available: false,
      mode: 'browser',
      message: 'Deepgram temporary key creation failed. Browser speech recognition will be used.',
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
