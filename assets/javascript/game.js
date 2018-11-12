var game = {

    currentPlayer: "",
    currentEnemy: "",
    stage: 0,
    damageMultiplier: 1,
    enemiesDefeated: 0,
    playerIndex: 0,
    enemyIndex: 0,

    charactersArray: [

        {
            name: "squirtle",
            power: 30,
            counterAttackPower: 5,
            health: 100,
            isPlayer: false,
            isEnemy: true,
            isDefeated: false,
        },
        {
            name: "charmander",
            power: 5,
            counterAttackPower: 3,
            health: 65,
            isPlayer: false,
            isEnemy: true,
            isDefeated: false,
        },
        {
            name: "bulbasaur",
            power: 4,
            counterAttackPower: 4,
            health: 85,
            isPlayer: false,
            isEnemy: true,
            isDefeated: false,
        },
    ],

    damageCalculation: function (character) {
        if (character.isPlayer) {
            var damage = character.power * 1 * this.randomDamage();
            this.damageMultiplier += (Math.floor(Math.random() * (35 - 5)))
            console.log(`Player deals ${damage} damage`);

        }

        if (character.isEnemy) {
            var damage = character.counterAttackPower * this.randomDamage();
            console.log(`Enemy deals ${damage} damage`);

        }

        return damage;
    },

    randomDamage: function () {
        return (Math.floor(Math.random() * (100 - 85) + 85)) / 100;
    },

    applyDamage: function (defender, atacker) {
        if (atacker.isDefeated === false) {
            defender.health -= this.damageCalculation(atacker);
        }
    },

    checkDefeated: function (character) {
        console.log(`check defeated has run ${character.name}`);

        if ((character.isPlayer) && (character.health <= 0)) {
            character.isDefeated = true;
            alert("You've lost!");
        }

        if ((character.isEnemy) && (character.health < 0)) {
            character.isDefeated = true;
            this.enemiesDefeated++;
            game.stage = 1;

            if (game.enemiesDefeated === 2) {
                alert("You win!");
                location.reload();
            }
        }


    },

    createTeams: function () {
        let teamColumn = $("<div></div>").attr({
            "class": "col-3",
            "id": "teamColumn"
        });
        let emptyColumn = $("<div></div>").attr("class", "col-6");
        let enemyColumn = $("<div></div>").attr({
            "class": "col-3",
            "id": "enemyColumn"
        });
        $("#top-row").empty();
        $("#top-row").append(teamColumn, emptyColumn, enemyColumn);
        $("")

    },

    assignPlayer: function (character) {
        if (game.stage === 0) {
            for (i in this.charactersArray) {

                if (character === game.charactersArray[i].name) {
                    this.playerIndex = i;
                    game.charactersArray[game.playerIndex].isPlayer = true;
                    game.charactersArray[game.playerIndex].isEnemy = false;
                    break
                }
            }
        } else if (game.stage === 1) {
            for (i in this.charactersArray) {

                if (character === game.charactersArray[i].name) {
                    this.enemyIndex = i;
                    break
                }
            }


        }


    }
}

$(".character").on("click", function () {
    if (game.stage === 0) {
        game.currentPlayer = $(this).attr("value");
        game.assignPlayer(game.currentPlayer);
        game.stage = 1;
        console.log(`${game.charactersArray[game.playerIndex].name} is the current player`);
        
        // game.createTeams();

    } else if (game.stage === 1) {
        game.currentEnemy = $(this).attr("value");
        game.assignPlayer(game.currentEnemy);
        if (game.charactersArray[game.enemyIndex].isDefeated === false) {
            game.charactersArray[game.enemyIndex].isPlayer = false;
            game.charactersArray[game.enemyIndex].isEnemy = true;
            game.stage = 2;
        } else {
            alert("The enemy has no will to fight");
        }



    }
});

$(".attack").on("click", function () {
    if (game.stage === 2) {
        game.applyDamage(game.charactersArray[game.enemyIndex], game.charactersArray[game.playerIndex]);
        game.checkDefeated(game.charactersArray[game.enemyIndex]);
        console.log(`Player attacks. Enemy Health.${game.charactersArray[game.enemyIndex].health}`);
        console.log(`Enemy is defeated: ${game.charactersArray[game.enemyIndex].isDefeated}`);

        game.applyDamage(game.charactersArray[game.playerIndex], game.charactersArray[game.enemyIndex]);
        game.checkDefeated(game.charactersArray[game.playerIndex]);
        console.log(`Enemy attacks. Player Health: ${game.charactersArray[game.playerIndex].health}`);
        console.log(`Player is defeated: ${game.charactersArray[game.playerIndex].isDefeated}`);

        game.damageMultiplier *= (Math.floor(Math.random() * (24) + 1)) / 100;
    }
})