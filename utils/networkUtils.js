/**
 * Get the server configuration for cloud deployment
 * @returns {object} Server configuration with host and port
 */
function getServerConfig() {
  // In production/cloud environments, use 0.0.0.0 to bind to all interfaces
  const host = '0.0.0.0';
  const port = process.env.PORT || 3001;
  
  // For cloud deployments, use the provided external URL or construct based on environment
  let baseUrl;
  if (process.env.NODE_ENV === 'production') {
    // For Render, the URL is typically https://your-app-name.onrender.com
    baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.SERVER_URL || `https://your-app.onrender.com`;
  } else {
    // For development, get the network IP for mobile connectivity
    const os = require('os');
    const networkInterfaces = os.networkInterfaces();
    let localIP = 'localhost';
    
    // Find the first non-internal IPv4 address
    for (const name of Object.keys(networkInterfaces)) {
      for (const net of networkInterfaces[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          localIP = net.address;
          break;
        }
      }
      if (localIP !== 'localhost') break;
    }
    
    baseUrl = `http://${localIP}:${port}`;
  }
  
  return {
    host,
    port: parseInt(port),
    url: baseUrl
  };
}

module.exports = {
  getServerConfig
};
