const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');

async function stageAndCommit() {
  const dir = process.cwd();
  console.log('1. Initializing Git repository in:', dir);
  await git.init({ fs, dir, defaultBranch: 'main' });

  // Ensure remote is set
  try {
    await git.addRemote({
      fs,
      dir,
      remote: 'origin',
      url: 'https://github.com/tutranz1124-source/donghoa.git',
      force: true
    });
  } catch (e) {
    // remote might already exist
  }

  console.log('2. Staging all files...');
  // List all files to add (respecting ignore)
  function getFiles(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relPath = path.relative(dir, fullPath).replace(/\\/g, '/');
      
      // Skip unwanted folders
      if (
        relPath.startsWith('.next') ||
        relPath.startsWith('node_modules') ||
        relPath.startsWith('.git') ||
        relPath.startsWith('.system_generated')
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        files = files.concat(getFiles(fullPath));
      } else {
        files.push(relPath);
      }
    }
    return files;
  }

  const allFiles = getFiles(dir);
  console.log(`- Staging ${allFiles.length} files...`);

  for (const file of allFiles) {
    await git.add({ fs, dir, filepath: file });
  }

  console.log('3. Committing changes...');
  const sha = await git.commit({
    fs,
    dir,
    message: 'feat: complete Dong Hoa Property real estate platform & CRM system',
    author: {
      name: 'tutranz1124',
      email: 'tutranz1124@gmail.com'
    }
  });

  console.log('✓ Git commit created successfully! SHA:', sha);
}

stageAndCommit().catch(console.error);
