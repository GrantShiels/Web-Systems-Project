class battle {

    constructor(player1, player2) {

        this._players = [player1, player2];
        this._turns = [null, null];

        this._sendToPlayers("Pokemon Battle Starting");

        this._players.forEach((player, idx) => {
            player.on("turn", (turn) => {
                this._onTurn(idx, turn);
            });
        });
    }

    _sendToOnePlayer(playerIndex, msg) {
        this._players[playerIndex].emit("message", msg);
    }

    _sendToPlayers(msg) {
        this._players.forEach((player) => {
            player.emit("message", msg);
        });
    }

    _onTurn(playerIndex, turn) {
        this._turns[playerIndex] = turn;
        this._sendToOnePlayer(playerIndex, `You chose ${turn}`);

        //check to see if the game is finished
        this._checkGameOver();
    }


    _checkGameOver() {
        const turns = this._turns;

        if (turns[0] && turns[1]) {
            this._sendToPlayers("Battle Over - " + turns.join(" VS "));
            this._getBattleResults();

            this._turns = [null, null];

            this._sendToPlayers("Next Round");
        }

    }

    //get the results of the pokemon battle
    _getBattleResults() {

        const p0 = this._decodeTurn(this._turns[0]);
        const p1 = this._decodeTurn(this._turns[1]);
        
        const distance = (p1 - p0 + 3) % 3;

        switch(distance) {
            case 0:
                //draw
                this._sendToPlayers("Draw! Try again");
                break;
            case 1:
                //p0 won the battle 
                this._sendWinMessage(this._players[0], this._players[1]);
                break;
            case 2:
                //p1 won the battle
                this._sendWinMessage(this._players[1], this._players[0]);
                break;
        }
    }

    _sendWinMessage(winner, loser) {
        winner.emit("message", "Congratualtions, you won!");
        loser.emit("message", "You lost, better luck next time!");
    }

    //code to work out who the winner is
    _decodeTurn(turn) {
        switch (turn) {
            case "Water":
                return 0;
            case "Fire":
                return 1;
            case "Grass":
                return 2;
            default:
                 throw new Error("Unknow error");


        }
        
    }
 }



module.exports = battle;