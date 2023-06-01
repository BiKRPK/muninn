const { spawn } = require('child_process');
// Define an array of commands or scripts to execute sequentially,
// along with their respective arguments


async function executeCommands() {
    for (let i = 0; i < 1500; i += 50) {
      const start = i;
      const end = i + 49;
      const child = spawn('node', ['scrappervids2.js', start.toString(), end.toString()]);
  
      // Wait for the command to finish executing
      await new Promise((resolve, reject) => {
        child.on('close', (code) => {
          if (code === 0) {
            console.log(`Command finished successfully: node scrappervids2.js ${start} ${end}`);
            resolve();
          } else {
            console.error(`Command failed with exit code ${code}: node scrappervids2.js ${start} ${end}`);
            reject();
          }
        });
      });
    }
  
    console.log('All commands executed successfully!');
  }
  
  executeCommands().catch((error) => {
    console.error('An error occurred:', error);
  });
  
  