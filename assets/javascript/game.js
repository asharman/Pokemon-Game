var game = {

    currentPlayer: "",
    currentEnemy: "",
    stage: 0,
    damageMultiplier: 1,
    enemiesDefeated: 0,

    squirtle: {
        power: 30,
        counterAttackPower: 5,
        health: 100,
        isPlayer: false,
        isEnemy: true,
        isDefeated: false,
    },
    charmander: {
        power: 5,
        counterAttackPower: 3,
        health: 65,
        isPlayer: false,
        isEnemy: true,
        isDefeated: false,
    },
    bulbasaur: {
        power: 4,
        counterAttackPower: 4,
        health: 85,
        isPlayer: false,
        isEnemy: true,
        isDefeated: false,
    },

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
        console.log(`check defeated has run ${character}`);

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


}

$(".character").on("click", function () {
    if (game.stage === 0) {
        game.currentPlayer = $(this).attr("value");
        game[game.currentPlayer].isPlayer = true;
        game[game.currentPlayer].isEnemy = false;
        game.stage = 1;
        console.log(`Player: ${game[game.currentPlayer].isPlayer}`);
        console.log(`Player: ${game[game.currentPlayer].isEnemy}`);


    } else if (game.stage === 1) {
        game.currentEnemy = $(this).attr("value");
        if (game[game.currentEnemy].isDefeated === false) {
            game[game.currentEnemy].isPlayer = false;
            game[game.currentEnemy].isEnemy = true;
            game.stage = 2;
        } else {
            alert("The enemy has no will to fight");
        }



    }
});

$(".attack").on("click", function () {
    if (game.stage === 2) {
        game.applyDamage(game[game.currentEnemy], game[game.currentPlayer]);
        game.checkDefeated(game[game.currentEnemy]);
        console.log(`Player attacks. Enemy Health.${game[game.currentEnemy].health}`);
        console.log(`Enemy is defeated: ${game[game.currentEnemy].isDefeated}`);

        game.applyDamage(game[game.currentPlayer], game[game.currentEnemy]);
        game.checkDefeated(game[game.currentPlayer]);
        console.log(`Enemy attacks. Player Health: ${game[game.currentPlayer].health}`);
        console.log(`Player is defeated: ${game[game.currentPlayer].isDefeated}`);

        game.damageMultiplier *= (Math.floor(Math.random() * (24) + 1)) / 100;
    }
})