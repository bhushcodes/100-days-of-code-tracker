exports.handler = async (event) => {
  // Get GitHub OAuth App credentials from environment variables
  const clientId = process.env.GITHUB_CLIENT_ID;
  
  if (!clientId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GitHub OAuth not configured' })
    };
  }

  // GitHub OAuth URL
  const scope = 'repo';
  const redirectUri = `${process.env.URL}/.netlify/functions/auth-callback`;
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  // Redirect to GitHub
  return {
    statusCode: 302,
    headers: {
      Location: githubAuthUrl
    }
  };
};
