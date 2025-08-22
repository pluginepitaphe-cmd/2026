const { spawn } = require('child_process');
const path = require('path');

const PORT = process.env.PORT || 8001;

console.log('Starting backend server on port:', PORT);

// Start the Python FastAPI server
const pythonProcess = spawn('python', ['server.py'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: PORT
  }
});

pythonProcess.on('error', (error) => {
  console.error('Failed to start Python process:', error);
  process.exit(1);
});

pythonProcess.on('close', (code) => {
  console.log(`Python process exited with code ${code}`);
  process.exit(code);
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  pythonProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  pythonProcess.kill('SIGINT');
});