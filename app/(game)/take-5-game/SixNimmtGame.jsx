const ROUND_END_SCORE_THRESHOLD = 66; // Game ends if any player reaches or exceeds 66
const CARDS_PER_PLAYER = 10;
const INITIAL_ROWS = 4;
const MAX_ROW_SIZE = 5;
const MAX_ROUNDS = 10; // Game also ends if we've played this many rounds

/**
 * createDeck: Returns an array of 104 cards, each with { value, bullheads }.
 */
function createDeck() {
  const deck = [];
  for (let i = 1; i <= 104; i++) {
    deck.push({
      value: i,
      bullheads: getBullheads(i),
    });
  }
  return deck;
}

/**
 * getBullheads: Calculates how many bullheads (penalty points) a card has.
 * - Base: 1
 * - +1 if divisible by 5
 * - +1 more if divisible by 10
 * - +4 if divisible by 11
 * - If 55 => total is 7
 */
function getBullheads(value) {
  let bullheads = 1;
  if (value % 5 === 0) bullheads += 1;
  if (value % 10 === 0) bullheads += 1;
  if (value % 11 === 0) bullheads += 4;
  if (value === 55) {
    bullheads = 7;
  }
  return bullheads;
}

/**
 * shuffle: Fisher-Yates shuffle.
 */
function shuffle(array) {
  let m = array.length;
  while (m > 0) {
    const i = Math.floor(Math.random() * m--);
    [array[m], array[i]] = [array[i], array[m]];
  }
  return array;
}

/**
 * setupRound:
 *  - Shuffles a deck
 *  - Deals 10 cards to each player
 *  - Places 4 initial cards (1 per row)
 *  - Resets each player's data for the round
 */
function setupRound(G, ctx) {
  const deck = createDeck();
  shuffle(deck);
  const numPlayers = ctx.numPlayers;

  // Update the existing players field with gameplay data.
  for (let i = 0; i < numPlayers; i++) {
    G.players[i] = {
      ...G.players[i],
      hand: deck.splice(0, CARDS_PER_PLAYER),
      chosenCard: null,
      penaltyPile: [],
      info: G.playersInfo[i], // carry over credentials
    };
  }

  // Initialize rows.
  const rows = [];
  for (let i = 0; i < INITIAL_ROWS; i++) {
    rows.push([deck.shift()]);
  }
  G.roundNumber += 1;
  G.rows = rows;
  G.turnCount = 0;
  G.deck = deck;
  G.phaseLog = [];
}


/**
 * setupGame: Called once when match is created.
 * Stores overall game data, but does not yet start the round.
 */
function setupGame(ctx) {
  const players = {};
  for (let i = 0; i < ctx.numPlayers; i++) {
    players[i] = { name: `Player ${i}`, hand: [], penaltyPile: [] };
  }

  const G = {
    players, // Required for the lobby UI
    roundNumber: 0,
    totalScores: {},
    playersInfo: {},
    started: false,
  };

  // Initialize playersInfo and totalScores (as in your current code)...
  for (let i = 0; i < ctx.numPlayers; i++) {
    const defaultCredentials = {
      userId: `player_${i}`,
      userName: `Player ${i}`,
      userProfilePic: 'https://petshop.ph/cdn/shop/collections/cat_icon_a73f59db-c524-4944-86e1-28291f2d4096.png?v=1680069118',
      rankScore: 0,
    };
    let cred = defaultCredentials;
    if (ctx.setupData && ctx.setupData[i]) {
      const data = ctx.setupData[i];
      cred = {
        userId: data.userId || defaultCredentials.userId,
        userName: data.userName || defaultCredentials.userName,
        userProfilePic: data.userProfilePic || defaultCredentials.userProfilePic,
        rankScore: data.rankScore || defaultCredentials.rankScore,
      };
    }
    G.totalScores[i] = 0;
    G.playersInfo[i] = cred;
  }
  return G;
}

/**
 * Move: startGame()
 *  - Only the host (playerID='0') can start.
 *  - Calls setupRound, transitions to 'choosing' phase.
 */
function startGame(state) {

  console.log(state);
  

  const { G, ctx } = state;

  console.log('G');
  
  console.log(G);
  
  console.log('ctx');
  console.log(ctx);
  
  if (ctx.playerID !== '0') return; // Only host starts the game.
  if (G.started) return; // Prevent multiple starts.
  G.started = true;
  setupRound(G, ctx);
  console.log("after setup and before choosing");
  
  ctx.events.setPhase('choosing');
  console.log("Current phase:", ctx.phase);
}


/**
 * Move: selectCard(cardValue)
 *  - In the 'choosing' phase, players pick a card from their hand
 */
function selectCard(G, ctx, cardValue) {
  const player = G.playersData[ctx.playerID];
  if (!player) return;
  const idx = player.hand.findIndex((c) => c.value === cardValue);
  if (idx < 0) return; // not found or invalid
  player.chosenCard = player.hand[idx];
}

/**
 * placeNextCard: Processes the next chosen card in ascending order
 *  - If can't place => forced row pick
 *  - If row has 5 => pick up row
 */
function placeNextCard(G, ctx) {
  if (G.placementIndex >= G.pendingPlacements.length) return;
  const { playerID, card } = G.pendingPlacements[G.placementIndex];

  // find the best row (closest smaller lastVal)
  let chosenRowIndex = -1;
  let maxVal = -Infinity;
  for (let r = 0; r < G.rows.length; r++) {
    const row = G.rows[r];
    const lastVal = row[row.length - 1].value;
    if (lastVal <= card.value && lastVal > maxVal) {
      maxVal = lastVal;
      chosenRowIndex = r;
    }
  }

  // if no valid row, force row selection
  if (chosenRowIndex === -1) {
    G.forcedRowChoice = { playerID, card };
    ctx.events.setActivePlayers({
      currentPlayer: 'idle',
      others: 'idle',
      value: { [playerID]: 'chooseRow' },
    });
    return;
  }

  // if row is full, pick it up
  if (G.rows[chosenRowIndex].length >= MAX_ROW_SIZE) {
    pickUpRow(G, playerID, chosenRowIndex);
    G.rows[chosenRowIndex] = [card];
  } else {
    G.rows[chosenRowIndex].push(card);
  }

  removeCardFromHand(G, playerID, card.value);

  G.placementIndex += 1;
  if (G.placementIndex < G.pendingPlacements.length) {
    placeNextCard(G, ctx);
  } else {
    ctx.events.endPhase();
  }
}

/**
 * Utility: removeCardFromHand
 */
function removeCardFromHand(G, playerID, cardValue) {
  const hand = G.playersData[playerID].hand;
  const idx = hand.findIndex((c) => c.value === cardValue);
  if (idx >= 0) hand.splice(idx, 1);
}

/**
 * Utility: pickUpRow => collect penalty cards in that row
 */
function pickUpRow(G, playerID, rowIndex) {
  const row = G.rows[rowIndex];
  G.playersData[playerID].penaltyPile.push(...row);
}

/**
 * Move: chooseRow(rowIndex)
 *  - Called if no valid row was found for placing the card
 */
function chooseRow(G, ctx, rowIndex) {
  if (!G.forcedRowChoice) return;
  const { playerID, card } = G.forcedRowChoice;
  if (ctx.playerID !== playerID) return; // forced player only

  pickUpRow(G, playerID, rowIndex);
  G.rows[rowIndex] = [card];
  removeCardFromHand(G, playerID, card.value);
  delete G.forcedRowChoice;

  ctx.events.setActivePlayers({ all: 'idle' });
  G.placementIndex += 1;
  if (G.placementIndex < G.pendingPlacements.length) {
    placeNextCard(G, ctx);
  } else {
    ctx.events.endPhase();
  }
}

/**
 * onChoosingPhaseEnd:
 *  - auto-select first card if a player didn't choose
 *  - gather chosen cards in ascending order => place in 'placing' phase
 */
function onChoosingPhaseEnd(G, ctx) {
  for (const pid in G.playersData) {
    const p = G.playersData[pid];
    if (!p.chosenCard && p.hand.length > 0) {
      p.chosenCard = p.hand[0];
    }
  }
  const chosen = [];
  for (const pid in G.playersData) {
    chosen.push({ playerID: pid, card: G.playersData[pid].chosenCard });
  }
  chosen.sort((a, b) => a.card.value - b.card.value);
  G.pendingPlacements = chosen;
  G.placementIndex = 0;

  ctx.events.endPhase();
}

/**
 * onPlacingPhaseEnd:
 *  - all chosen cards placed => increment turnCount
 *  - if we've played 10 turns => endRound
 *  - else => go back to 'choosing'
 */
function onPlacingPhaseEnd(G, ctx) {
  G.turnCount += 1;
  for (const pid in G.playersData) {
    G.playersData[pid].chosenCard = null;
  }
  if (G.turnCount >= CARDS_PER_PLAYER) {
    endRound(G, ctx);
  } else {
    ctx.events.setPhase('choosing');
  }
}

/**
 * endRound:
 *  - tally penalty points => add to totalScores
 *  - if threshold or maxRounds => endGame
 *  - else => new round => 'choosing' again
 */
function endRound(G, ctx) {
  for (const pid in G.playersData) {
    const penalty = G.playersData[pid].penaltyPile;
    const bullheads = penalty.reduce((sum, c) => sum + c.bullheads, 0);
    G.totalScores[pid] += bullheads;
  }

  let gameShouldEnd = false;
  // check threshold
  for (const pid in G.totalScores) {
    if (G.totalScores[pid] >= ROUND_END_SCORE_THRESHOLD) {
      gameShouldEnd = true;
      break;
    }
  }
  // check round limit
  if (G.roundNumber >= MAX_ROUNDS) {
    gameShouldEnd = true;
  }

  if (gameShouldEnd) {
    ctx.events.endGame();
  } else {
    setupRound(G, ctx);
    ctx.events.setPhase('choosing');
  }
}

/**
 * endIf: called each phase end => checks if game ended
 *  - if ended => returns final results
 */
function endIf(G, ctx) {
  let gameShouldEnd = false;

  // check threshold
  for (const pid in G.totalScores) {
    if (G.totalScores[pid] >= ROUND_END_SCORE_THRESHOLD) {
      gameShouldEnd = true;
      break;
    }
  }
  // check round limit
  if (G.roundNumber >= MAX_ROUNDS) {
    gameShouldEnd = true;
  }

  if (!gameShouldEnd) return undefined;

  // find the winner(s) => lowest totalScores
  let winners = [];
  let lowestScore = Infinity;
  for (const pid in G.totalScores) {
    const score = G.totalScores[pid];
    if (score < lowestScore) {
      lowestScore = score;
      winners = [pid];
    } else if (score === lowestScore) {
      winners.push(pid);
    }
  }

  return {
    winners: winners.map((pid) => ({
      playerID: pid,
      userId: G.playersInfo[pid].userId,
      userName: G.playersInfo[pid].userName,
      userProfilePic: G.playersInfo[pid].userProfilePic,
      finalScore: G.totalScores[pid],
    })),
    finalScores: { ...G.totalScores },
    gameEndedBy:
      G.roundNumber >= MAX_ROUNDS
        ? 'Max Rounds Reached'
        : 'Threshold Reached (66+ Points)',
  };
}

/**
 * The 6 Nimmt game definition.
 *  - Allows 2–10 players in a waiting lobby.
 *  - Host (player '0') starts the game with startGame().
 *  - Then normal 'choosing' + 'placing' phases until a round is done.
 *  - Ends if a player hits 66 points or 10 rounds pass => lowest score wins.
 */
export default {
  name: 'six-nimmt',
  setup: (ctx) => setupGame(ctx),
  phases: {
    waiting: {
      start: true,
      moves: { startGame },
      turn: { activePlayers: { all: 'idle' } },
    },
    choosing: {
      moves: { selectCard },
      endIf: (G, ctx) => {
        const allChosen = Object.values(G.playersData).every(p => p.chosenCard !== null);
        return allChosen || ctx.phaseTime >= 30;
      },
      onEnd: (G, ctx) => onChoosingPhaseEnd(G, ctx),
      turn: {
        activePlayers: { all: 'chooseCard' },
        moveLimit: 1,
        timer: { duration: 30 },
      },
    },
    placing: {
      moves: { chooseRow },
      onBegin: (G, ctx) => { placeNextCard(G, ctx); },
      onEnd: (G, ctx) => onPlacingPhaseEnd(G, ctx),
      turn: { activePlayers: { all: 'idle' } },
    },
  },
  endIf,
};
