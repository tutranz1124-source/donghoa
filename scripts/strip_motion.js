const fs = require('fs');

['CozyWarmSection.tsx', 'LuxuryClassicSection.tsx', 'HeritageRetroSection.tsx'].forEach(filename => {
  const filepath = 'components/sections/' + filename;
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(/<motion\.div[\s\S]*?>/g, (match) => {
    const classMatch = match.match(/className="([^"]*)"/);
    const styleMatch = match.match(/style=\{([^}]*)\}/);
    let res = '<div';
    if (classMatch) res += ' className="' + classMatch[1] + '"';
    if (styleMatch) res += ' style={' + styleMatch[1] + '}';
    res += '>';
    return res;
  });
  content = content.replace(/<\/motion\.div>/g, '</div>');
  fs.writeFileSync(filepath, content);
  console.log('Cleaned motion from', filename);
});
