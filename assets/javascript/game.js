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
            id: "#squirtle",
            power: 3,
            counterAttackPower: 5,
            health: 100,
            maxHealth: 100,
            isPlayer: false,
            isEnemy: true,
            isDefeated: false,
        },
        {
            name: "charmander",
            id: "#charmander",
            power: 5,
            counterAttackPower: 3,
            health: 65,
            maxHealth: 65,
            isPlayer: false,
            isEnemy: true,
            isDefeated: false,
        },
        {
            name: "bulbasaur",
            id: "#bulbasaur",
            power: 4,
            counterAttackPower: 4,
            health: 85,
            maxHealth: 85,
            isPlayer: false,
            isEnemy: true,
            isDefeated: false,
        },
    ],

    damageCalculation: function (character) {
        if (character.isPlayer) {
            var damage = character.power * game.damageMultiplier * this.randomDamage();
            this.damageMultiplier += (Math.floor(Math.random() * (35 - 5)) / 100);
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

        let playerHP = `.${game.charactersArray[game.playerIndex].name}HP`;
        $(playerHP).each(function () {
            // alert("Updating player HP");
            $(playerHP).attr("value", game.charactersArray[game.playerIndex].health);

        });
        let enemyHP = `.${game.charactersArray[game.enemyIndex].name}HP`;
        $(enemyHP).each(function () {
            // alert("Updating enemy HP");
            $(enemyHP).attr("value", game.charactersArray[game.enemyIndex].health);
        });
    },

    checkDefeated: function (character) {
        console.log(`check defeated has run ${character.name}`);

        if ((character.isPlayer) && (character.health <= 0)) {
            character.isDefeated = true;
            alert("You've lost!");
            location.reload();
        }

        if ((character.isEnemy) && (character.health < 0)) {
            character.isDefeated = true;
            this.enemiesDefeated++;
            game.setUpBattle();
            game.createTeams();
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
            "id": "enemyTeamColumn"
        });

        $("#top-row").empty();
        $("#top-row").append(teamColumn, emptyColumn, enemyColumn);
        for (i in game.charactersArray) {
            if ((game.charactersArray[i].isPlayer) && (game.charactersArray[i].isDefeated === false)) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}portrait.png'><progress id='${game.charactersArray[i].name}HP' class='healthBar ${game.charactersArray[i].name}HP' value='${game.charactersArray[i].health}' max='${game.charactersArray[i].maxHealth}'</progress></div>`;
                $("#teamColumn").append(teamDiv);
            } else if ((game.charactersArray[i].isPlayer) && (game.charactersArray[i].isDefeated === true)) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}portraitgrey.png'><progress id='${game.charactersArray[i].name}HP' class='healthBar ${game.charactersArray[i].name}HP' value='${game.charactersArray[i].health}' max='${game.charactersArray[i].maxHealth}'</progress></div>`;
                $("#teamColumn").append(teamDiv);
            } else if ((game.charactersArray[i].isEnemy) && game.charactersArray[i].isDefeated === false) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}portrait.png'><progress id='${game.charactersArray[i].name}HP' class='healthBar ${game.charactersArray[i].name}HP' value='${game.charactersArray[i].health}' max='${game.charactersArray[i].maxHealth}'</progress></div>`;
                $("#enemyTeamColumn").append(teamDiv);
            } else if ((game.charactersArray[i].isEnemy) && game.charactersArray[i].isDefeated === true) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}portraitgrey.png'><progress id='${game.charactersArray[i].name}HP' class='healthBar ${game.charactersArray[i].name}HP' value='${game.charactersArray[i].health}' max='${game.charactersArray[i].maxHealth}'</progress></div>`;
                $("#enemyTeamColumn").append(teamDiv);
            }
        }

    },

    setUpBattle: function () {
        if (game.stage === 2) {
            let playerColumn = $("<div></div>").attr({
                "class": "col-3",
                "id": "playerColumn"
            });
            let currentEnemyColumn = $("<div></div>").attr({
                "class": "col-3",
                "id": "currentEnemyColumn"
            });
            let emptyColumn = $("<div></div>").attr("class", "col-3");
            $("#combat-row").empty();
            $("#combat-row").append(emptyColumn, playerColumn, currentEnemyColumn);
            $("#playerColumn").append(`<div id='battlesprite' value=${game.charactersArray[this.playerIndex].name} class="mx-auto battlesprite current-player"><img class='battlesprite' src='assets/images/${game.charactersArray[game.playerIndex].name}playeridle.png'><progress id='${game.charactersArray[this.playerIndex].name}HP' class='healthBar ${game.charactersArray[this.playerIndex].name}HP' value='${game.charactersArray[this.playerIndex].health}' max='${game.charactersArray[this.playerIndex].maxHealth}'</progress></div>`)
            if (game.charactersArray[game.enemyIndex].isDefeated === false) {
                $("#currentEnemyColumn").append(`<div id='battlesprite' value=${game.charactersArray[this.enemyIndex].name} class="mx-auto battlesprite current-enemy"><img class='battlesprite' src='assets/images/${game.charactersArray[game.enemyIndex].name}enemyidle.png'><progress id='${game.charactersArray[this.enemyIndex].name}HP' class='healthBar ${game.charactersArray[this.enemyIndex].name}HP' value='${game.charactersArray[this.enemyIndex].health}' max='${game.charactersArray[this.enemyIndex].maxHealth}'</progress></div>`)
            }
            $("#button-row").empty();
            $("#button-row").append('<button type="button" id="attack" class="attack btn btn-danger mx-auto">Attack</button>');
        }
    },

    assignPlayer: function (x) {
        if (game.stage === 0) {
            for (i in this.charactersArray) {

                if (x === game.charactersArray[i].name) {
                    this.playerIndex = i;
                    game.charactersArray[game.playerIndex].isPlayer = true;
                    game.charactersArray[game.playerIndex].isEnemy = false;
                    break
                }
            }
        } else if (game.stage === 1) {
            for (i in this.charactersArray) {

                if ((x === game.charactersArray[i].name) && (game.charactersArray[i].isPlayer === false)) {
                    this.enemyIndex = i;
                    game.charactersArray[game.enemyIndex].isEnemy = true;
                    game.charactersArray[game.enemyIndex].isPlayer = false;
                    break
                } else if ((x === game.charactersArray[i].name) && (game.charactersArray[i].isPlayer === true)) {
                    alert("This pokemon is on your team!");
                    this.enemyIndex = -1;
                }
            }
        }

    },




};

$(document).ready(function () {
    $("#top-row").on("click", ".character", function () {
        if (game.stage === 0) {
            game.currentPlayer = $(this).attr("value");
            game.assignPlayer(game.currentPlayer);
            game.stage = 1;
            console.log(`${game.charactersArray[game.playerIndex].name} is the current player`);
            console.log(`${game.stage} Current game stage`);


            game.createTeams();
            $(".container").css({ "image-rendering": "pixelated", "background": "url(assets/images/labinterior.png)", "background-repeat": "no-repeat", "background-size": "cover", "height": "100%" });

        } else if (game.stage === 1) {
            game.currentEnemy = $(this).attr("value");
            console.log(`${game.currentEnemy}`);

            game.assignPlayer(game.currentEnemy);
            if (game.enemyIndex !== -1) {
                if (game.charactersArray[game.enemyIndex].isDefeated === false) {
                    game.stage = 2;
                    game.setUpBattle();

                } else {
                    alert("The enemy has no will to fight");
                }
            }
        }
    });

    $("#button-row").on("click", ".attack", function () {
        if (game.stage === 2) {
            game.applyDamage(game.charactersArray[game.enemyIndex], game.charactersArray[game.playerIndex]);
            game.checkDefeated(game.charactersArray[game.enemyIndex]);
            console.log(`Player attacks. Enemy Health.${game.charactersArray[game.enemyIndex].health}`);
            console.log(`Enemy is defeated: ${game.charactersArray[game.enemyIndex].isDefeated}`);

            game.applyDamage(game.charactersArray[game.playerIndex], game.charactersArray[game.enemyIndex]);
            game.checkDefeated(game.charactersArray[game.playerIndex]);

        } else if (game.stage === 1) {
            alert("There's no opponent!")
        }
    })

});