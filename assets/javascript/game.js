var game = {
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
            var damage = character.power * multiplier * this.randomDamage();
        } else if (character.isEnemy) {
            var damage = character.counterAttackPower * multiplier * this.randomDamage();
        }

        return damage;
    },

    randomDamage: function () {
        return (Math.floor(Math.random() * (100 - 85) + 85)) / 100;
    },
}
