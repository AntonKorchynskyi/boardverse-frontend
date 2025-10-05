"use client";

import React, { useEffect } from "react";
import getUserProfile from "@/app/(default)/_actions/getUserProfile";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import getToken from "@/app/(default)/_actions/getToken";

export function TicTacToeBoard({ ctx, G, moves, playerID }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Force page refresh when the page loads first time,
  // and if playerID === "1" (joiner) and not already refreshed.
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Check URL for a refreshed flag using Next.js useSearchParams
    const hasRefreshed = searchParams.get("refreshed");
    const currentPlayerID = searchParams.get("playerID") || "0";

    // For the initial load, if no "refreshed" flag, add it and reload.
    if (!hasRefreshed) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("refreshed", "true");
      window.location.href =
        window.location.pathname + "?" + urlParams.toString();
    }
    // If the current player is a joiner ("1") and we haven't refreshed for them yet,
    // use a localStorage flag to prevent an infinite loop.
    else if (
      currentPlayerID === "1" &&
      !localStorage.getItem("player1Refreshed")
    ) {
      localStorage.setItem("player1Refreshed", "true");
      window.location.reload();
    }
  }, []);

  // Validate that the current player may make a move.
  const onClick = (id) => {
    if (ctx.currentPlayer !== playerID) {
      toast.info("It's not your turn!");
      return;
    }
    moves.clickCell(id);
  };

  // When the game is over, first update stats and user profile, then call the leave API and finally redirect.
  useEffect(() => {
    if (ctx.gameover) {
      // Added toast notifications for win, loss or draw.
      if (ctx.gameover.winner !== undefined) {
        if (ctx.gameover.winner === playerID) {
          toast.success("Congratulations, you win!");
        } else {
          toast.error("Sorry, you lost!");
        }
      } else {
        toast.info("It's a draw!");
      }

      const updateStats = async () => {
        try {
          // Build the stats update payload.
          let statsBody = {
            totalGamesPlayed: 1,
            rankScore: 100,
          };
          if (ctx.gameover.winner !== undefined) {
            // If the winner equals the current player's ID, update wins; otherwise, update losses.
            if (ctx.gameover.winner === playerID) {
              statsBody.totalWins = 1;
            } else {
              statsBody.totalLosses = 1;
            }
          }

          // Call the local API route to update stats.
          const res = await fetch("/api/updateStats", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(statsBody),
          });

          if (!res.ok) {
            const errorText = await res.text();
            toast.error("Failed to update stats: " + errorText);
          } else {
            console.log("Stats updated successfully");
          }
        } catch (err) {
          console.error("Error updating stats", err);
          toast.error("Error updating stats.");
        }
      };

      // New function to update user profile with rankScore and userLevel.
      const updateUserProfile = async () => {
        try {
          // Call the local API route for updating the user profile.
          const res = await fetch("/api/updateUserProfile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rankScore: 100, userLevel: 2 }),
            cache: "no-store",
          });
          if (!res.ok) {
            const errorText = await res.text();
            toast.error("Failed to update user profile: " + errorText);
          } else {
            console.log("User profile updated successfully");
          }
        } catch (err) {
          console.error("Error updating user profile", err);
          toast.error("Error updating user profile.");
        }
      };

      const leaveMatch = async () => {
        try {
          if (typeof window === "undefined") return;
          const matchID = searchParams.get("matchID");
          const playerIDFromUrl = searchParams.get("playerID");

          // Retrieve playerCredentials from URL query.
          const credsParam = searchParams.get("playerCredentials");
          let credentials = credsParam
            ? JSON.parse(decodeURIComponent(credsParam))
            : null;
          if (!credentials) {
            const profile = await getUserProfile();
            if (!profile) {
              console.warn("User profile not found; skipping leave call.");
              return;
            }
            credentials = {
              userId: profile.userId,
              userName: profile.userName,
            };
          }

          if (matchID && playerIDFromUrl) {
            console.log(
              `Leaving match ${matchID} for player ${playerIDFromUrl} with creds:`,
              credentials
            );
            const res = await fetch(
              `http://localhost:8001/games/tic-tac-toe/${matchID}/leave`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  playerID: playerIDFromUrl,
                  credentials,
                }),
              }
            );

            if (!res.ok) {
              console.error("Failed to leave match:", res.statusText);
            } else {
              console.log("Successfully left match");
            }
          } else {
            console.warn("Missing matchID or playerID; skipping leave call.");
          }
        } catch (error) {
          console.error("Error leaving match:", error);
        }
      };

      // Call updateStats, then updateUserProfile, then leaveMatch and redirect.
      updateStats()
        .then(() => updateUserProfile())
        .then(() => {
          leaveMatch();
          setTimeout(() => {
            router.push("/browse/tic-tac-toe");
          }, 3000);
        });
    }
  }, [ctx.gameover, playerID, router]);

  // If the game is over, show a placeholder (so old board values aren’t visible).
  if (ctx.gameover) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Game Over!</h2>
        {ctx.gameover.winner !== undefined ? (
          <p>Winner: {ctx.gameover.winner}</p>
        ) : (
          <p>Draw!</p>
        )}
        <p>Updating stats, profile and redirecting...</p>
      </div>
    );
  }

  // Increase cell size and center the board on the screen.
  const cellStyle = {
    border: "2px solid #555",
    width: "80px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    textAlign: "center",
  };

  const tbody = [];
  for (let i = 0; i < 3; i++) {
    const cells = [];
    for (let j = 0; j < 3; j++) {
      const id = 3 * i + j;
      cells.push(
        <td key={id}>
          {G.cells[id] ? (
            <div style={cellStyle}>{G.cells[id]}</div>
          ) : (
            <button style={cellStyle} onClick={() => onClick(id)} />
          )}
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  // Wrap the board in a container to center it.
  return (
    <div className="flex items-center justify-center h-screen">
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
    </div>
  );
}
