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
            id: 0,
            power: 3,
            counterAttackPower: 5,
            currentHealth: 100,
            maxHealth: 100,
            // healthPercent: ((this.currentHealth)/(this.maxHealth) * 100),
            isPlayer: false,
            isEnemy: true,
            isDefeated: false,
        },
        {
            name: "charmander",
            id: 1,
            power: 5,
            counterAttackPower: 3,
            currentHealth: 65,
            maxHealth: 65,
            // healthPercent: ((this.currentHealth)/(this.maxHealth) * 100),
            isPlayer: false,
            isEnemy: true,
            isDefeated: false,
        },
        {
            name: "bulbasaur",
            id: 2,
            power: 4,
            counterAttackPower: 4,
            currentHealth: 85,
            maxHealth: 85,
            // healthPercent: ((this.currentHealth)/(this.maxHealth) * 100),
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
            defender.currentHealth -= this.damageCalculation(atacker);
        }

        console.log(`Player health: ${game.charactersArray[game.playerIndex].healthPercent}%`);
        console.log(`Player health: ${game.charactersArray[game.enemyIndex].healthPercent}%`);


        let playerHP = `.${game.charactersArray[game.playerIndex].name}HP`;
        let playerHealthPercent = ((game.charactersArray[game.playerIndex].currentHealth / game.charactersArray[game.playerIndex].maxHealth) * 100);
        $(playerHP).each(function () {
            // alert("Updating player HP");
            $(playerHP).attr("style", `width:${playerHealthPercent}%`);

        });
        let enemyHP = `.${game.charactersArray[game.enemyIndex].name}HP`;
        let enemyHealthPercent = ((game.charactersArray[game.enemyIndex].currentHealth / game.charactersArray[game.enemyIndex].maxHealth) * 100);
        $(enemyHP).each(function () {
            // alert("Updating enemy HP");
            $(enemyHP).attr("style", `width:${enemyHealthPercent}%`);
        });
    },

    checkDefeated: function (character) {
        console.log(`check defeated has run ${character.name}`);

        if ((character.isPlayer) && (character.currentHealth <= 0)) {
            character.isDefeated = true;
            alert("You've lost!");
            location.reload();
        }

        if ((character.isEnemy) && (character.currentHealth < 0)) {
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
            let healthPercent = ((game.charactersArray[i].currentHealth / game.charactersArray[i].maxHealth) * 100);
            if ((game.charactersArray[i].isPlayer) && (game.charactersArray[i].isDefeated === false)) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}/portrait.png'><div id='${game.charactersArray[i].name}HP' class='progress healthBar'><div id='${game.charactersArray[i].name}HP' class='progress-bar healthBarCurrent ${game.charactersArray[i].name}HP' style='width:${healthPercent}%'</div></div></div>`;
                $("#teamColumn").append(teamDiv);
            } else if ((game.charactersArray[i].isPlayer) && (game.charactersArray[i].isDefeated === true)) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}/portraitgrey.png'><div id='${game.charactersArray[i].name}HP' class='progress healthBar'><div id='${game.charactersArray[i].name}HP' class='progress-bar healthBarCurrent ${game.charactersArray[i].name}HP' style='width:${healthPercent}%'</div></div></div>`;
                $("#teamColumn").append(teamDiv);
            } else if ((game.charactersArray[i].isEnemy) && game.charactersArray[i].isDefeated === false) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}/portrait.png'><div id='${game.charactersArray[i].name}HP' class='progress healthBar'><div id='${game.charactersArray[i].name}HP' class='progress-bar healthBarCurrent ${game.charactersArray[i].name}HP' style='width:${healthPercent}%'</div></div></div>`;
                $("#enemyTeamColumn").append(teamDiv);
            } else if ((game.charactersArray[i].isEnemy) && game.charactersArray[i].isDefeated === true) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}/portraitgrey.png'><div id='${game.charactersArray[i].name}HP' class='progress healthBar'><div id='${game.charactersArray[i].name}HP' class='progress-bar healthBarCurrent ${game.charactersArray[i].name}HP' style='width:${healthPercent}%'</div></div></div>`;
                $("#enemyTeamColumn").append(teamDiv);
            }
        }

    },

    setUpBattle: function () {
        if (game.stage === 2) {
            let playerColumn = $("<div></div>").attr({
                "class": "col-md-3 col-6",
                "id": "playerColumn"
            });
            let currentEnemyColumn = $("<div></div>").attr({
                "class": "col-md-3 col-6",
                "id": "currentEnemyColumn"
            });
            let emptyColumn = $("<div></div>").attr("class", "col-md-3");
            let playerHealthPercent = ((game.charactersArray[game.playerIndex].currentHealth / game.charactersArray[game.playerIndex].maxHealth) * 100);
            let enemyHealthPercent = ((game.charactersArray[game.enemyIndex].currentHealth / game.charactersArray[game.enemyIndex].maxHealth) * 100);
            $("#combat-row").empty();
            $("#combat-row").append(emptyColumn, playerColumn, currentEnemyColumn);
            $("#playerColumn").append(`<div id='battlesprite' value=${game.charactersArray[this.playerIndex].name} class="mx-auto battlesprite current-player"><img class='battlesprite' src='assets/images/${game.charactersArray[game.playerIndex].name}/playeridle.png'><div id='${game.charactersArray[this.playerIndex].name}HP' class='progress battleHealthBar'><div id='${game.charactersArray[this.playerIndex].name}HP' class='progress-bar battleHealthBarCurrent ${game.charactersArray[this.playerIndex].name}HP' style='width:${playerHealthPercent}%'</div></div></div>`)
            if (game.charactersArray[game.enemyIndex].isDefeated === false) {
                $("#currentEnemyColumn").append(`<div id='battlesprite' value=${game.charactersArray[this.enemyIndex].name} class="mx-auto battlesprite current-enemy"><img class='battlesprite' src='assets/images/${game.charactersArray[game.enemyIndex].name}/enemyidle.png'><div id='${game.charactersArray[this.enemyIndex].name}HP' class='progress battleHealthBar'><div id='${game.charactersArray[this.enemyIndex].name}HP' class='progress-bar battleHealthBarCurrent ${game.charactersArray[this.enemyIndex].name}HP' style='width:${enemyHealthPercent}%'</div></div></div>`)
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
            $(".container").css({ "image-rendering": "pixelated", "background": "url(assets/images/background/labinterior.png)", "background-repeat": "no-repeat", "background-size": "cover", "height": "100%" });

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
            game.applyDamage(game.charactersArray[game.playerIndex], game.charactersArray[game.enemyIndex]);
            game.checkDefeated(game.charactersArray[game.playerIndex]);

        } else if (game.stage === 1) {
            alert("There's no opponent!")
        }
    })

});