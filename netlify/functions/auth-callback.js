const fetch = require('node-fetch');

exports.handler = async (event) => {
  const code = event.queryStringParameters.code;
  
  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No code provided' })
    };
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'OAuth not configured' })
    };
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }

    const accessToken = tokenData.access_token;

    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    const userData = await userResponse.json();

    // Redirect back to app with token and username
    const redirectUrl = `${process.env.URL}/log-oauth-complete.html?token=${accessToken}&username=${userData.login}`;
    
    return {
      statusCode: 302,
      headers: {
        Location: redirectUrl
      }
    };

  } catch (error) {
    console.error('OAuth error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
