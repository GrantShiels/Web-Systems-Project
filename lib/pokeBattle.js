class battle {

    constructor(player1, player2) {

        this._players = [player1, player2];
        this._turns = [null, null];

        this._sendToPlayers("Pokemon Battle Starting");

        this._players.forEach((player, idx) => {
            player.on("turn", (turn) => {
                this._onTurn(idx, turn)
            })
        })
    }

    _sendToOnePlayer(playerIndex, msg) {
        this._players[playerIndex].emit("message", msg);
    }

    _sendToPlayers(msg) {
        this._players.forEach((player) => {
            player.emit("messahe", msg);
        });
    }

    _onTurn(playerIndex, turn) {
        this._turns[playerIndex] = turn;
        this._sendToOnePlayer(playerIndex, `You chose ${turn}`);
    }
}



module.exports = battle;