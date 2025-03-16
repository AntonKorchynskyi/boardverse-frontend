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
        // Example: Initialize players’ hands, deal cards, set up rows.
        console.log('start');
        
      },
      selectCard: (G, ctx, cardValue) => {
        // Example: Remove card from hand, mark it as selected.
        console.log('selectCard');
        
      },
      chooseRow: (G, ctx, rowIndex) => {
        // Example: Handle row selection and assign penalty cards.
        console.log('chooseRow');
        
      },
    },
    // Additional turn and phase logic goes here.
  };
  