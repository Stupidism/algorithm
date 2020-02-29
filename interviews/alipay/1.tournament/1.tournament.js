const fs = require('fs');
const path = require('path');

const validResults = ['win', 'draw', 'loss'];

const tally = (matches) => {
  const teams = {};

  const getTeam = (name) => {
    if (!teams[name]) {
      teams[name] = { 
        name,
        plays: 0,
        win: 0,
        draw: 0,
        loss: 0,
        points: 0,
      }
    }
    return teams[name];
  };

  matches.forEach(({ teamA, teamB, result }) => {
    const a = getTeam(teamA);
    const b = getTeam(teamB);

    a.plays += 1;
    b.plays += 1;

    switch(result) {
      case 'win': {
        a.win += 1;
        a.points += 3;
        b.loss += 1;
        break;
      }
      case 'draw': {
        a.draw += 1;
        a.points += 1;
        b.draw += 1;
        b.points += 1;
        break;
      }
      case 'loss': {
        b.win += 1;
        b.points += 3;
        a.loss += 1;
        break;
      }
      default:
    }
  })

  return Object.values(teams).sort((a, b) => b.points - a.points || (a.name > b.name ? 1 : -1));
}

const main = () => {
  const inputFilePath = path.resolve(__dirname, 'example.in');
  const outFilePath = path.resolve(__dirname, `example.out`);

  const lines = fs.readFileSync(inputFilePath).toString().split('\n');
  const matches = lines
    .map(line => line.split(';'))
    .filter(parts => parts.length === 3 && parts[0] !== parts[1] && validResults.includes(parts[2]))
    .map(([teamA, teamB, result]) => ({
      teamA,
      teamB,
      result
    }));

  // console.log('matches', matches);

  const teams = tally(matches);

  // console.log('teams', teams);

  const maxLengths = [4,2,1,1,1,1];

  const res = [['Team', 'MP', 'W', 'D', 'L', 'P']].concat(teams.map(
    ({ name, plays, win, draw, loss, points }) => {
      const parts = [name, plays, win, draw, loss, points].map(String);
      parts.forEach((part, index) => {
        maxLengths[index] = Math.max(maxLengths[index], part.length);
      })
      return parts;
    }
  ));
  // console.log('res', maxLengths, res);

  const formatLine = ([name, ...rest]) => [
      name.padEnd(maxLengths[0], ' '),
      ...rest.map((part, index) => part.padStart(maxLengths[index + 1], ' '))
    ].join(' | ');
  
  fs.writeFileSync(outFilePath, res.map(formatLine).join('\n'));
}

main();
