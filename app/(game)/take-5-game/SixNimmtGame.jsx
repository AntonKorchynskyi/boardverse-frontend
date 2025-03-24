// components/SixNimmtGame.jsx
export default {
  name: "six-nimmt",
  setup: (ctx, setupData) => {
    const players = {};
    for (let i = 0; i < ctx.numPlayers; i++) {
      players[i] = { hand: [], penaltyPile: [] };
    }
    return {
      rows: [[], [], [], []],
      players,
    };
  },
  moves: {
    startGame: (G, ctx) => {
      // Initialize players’ hands, deal cards, and set up rows.
      console.log('startGame move called');
    },
    selectCard: (G, ctx, cardValue) => {
      // Remove card from hand, mark it as selected.
      console.log('selectCard move called with', cardValue);
    },
    chooseRow: (G, ctx, rowIndex) => {
      // Handle row selection and assign penalty cards.
      console.log('chooseRow move called with row index', rowIndex);
    },
  },
  // Add additional turn and phase logic as needed.
};
