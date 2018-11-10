var game = {

    currentPlayer : "",
    currentEnemy : "",
    stage: 0,

    squirtle: {
        power: 30,
        counterAttackPower: 50,
        health: 100,
        isPlayer: false,
        isEnemy: true,
        isDefeated: false,
    },
    charmander: {
        power: 50,
        counterAttackPower: 40,
        health: 65,
        isPlayer: false,
        isEnemy: true,
        isDefeated: false,
    },
    bulbasaur: {
        power: 40,
        counterAttackPower: 40,
        health: 85,
        isPlayer: false,
        isEnemy: true,
        isDefeated: false,
    },

    damageCalculation: function (character) {
        if (character.isPlayer) {
            var damage = character.power * 1 * this.randomDamage();
        } else if (character.isEnemy) {
            var damage = character.counterAttackPower * 1 * this.randomDamage();
        }

        return damage;
    },

    randomDamage: function () {
        return (Math.floor(Math.random() * (100 - 85) + 85)) / 100;
    },

    applyDamage: function (defender, atacker) {
        defender.health -= this.damageCalculation(atacker);
    },

    
}

$(".character").on("click", function(){
    if (game.stage === 0) {
        game.currentPlayer = $(this).attr("value");
        game[game.currentPlayer].isPlayer = true;
        game[game.currentPlayer].isEnemy = false;
        game.stage = 1;
        console.log(`Player: ${game[game.currentPlayer].isPlayer}`);
        console.log(`Player: ${game[game.currentPlayer].isEnemy}`);

        
    } else if (game.stage === 1) {
        game.currentEnemy = $(this).attr("value");
        game[game.currentEnemy].isPlayer = false;
        game[game.currentEnemy].isEnemy = true;
        game.stage = 2;
        console.log(`Player: ${game[game.currentEnemy].isPlayer}`);
        console.log(`Player: ${game[game.currentEnemy].isEnemy}`);
        
    }
});

$(".attack").on("click", function(){
    if (game.stage === 2) {
        game.applyDamage(eval(game.currentEnemy,game.currentPlayer));
        
    }
})