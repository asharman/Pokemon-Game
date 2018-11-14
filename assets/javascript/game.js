// Overall game object
var game = {
    // A string containing the current pokemon
    currentPlayer: "",
    currentEnemy: "",

    // Game stages used to determine whether you need to select your pokemon, select an enemy, or to attack.
    stage: 0,

    // Damage multiplier that increases as the player attacks
    damageMultiplier: 1,

    // Checks how many enemies you've defeated for the win condition
    enemiesDefeated: 0,

    // The current pokemon's index in the character's array. This is used to do calculations no matter which pokemon is in play.
    playerIndex: 0,
    enemyIndex: 0,

    // List of all the pokemon in the game with their stats
    charactersArray: [

        {
            name: "squirtle",
            id: 0,
            power: 3,
            counterAttackPower: 4,
            currentHealth: 100,
            maxHealth: 100,
            isPlayer: false,
            isEnemy: true,
            isDefeated: false,
        },
        {
            name: "charmander",
            id: 1,
            power: 6,
            counterAttackPower: 7,
            currentHealth: 60,
            maxHealth: 60,
            isPlayer: false,
            isEnemy: true,
            isDefeated: false,
        },
        {
            name: "bulbasaur",
            id: 2,
            power: 4,
            counterAttackPower: 5,
            currentHealth: 80,
            maxHealth: 80,
            isPlayer: false,
            isEnemy: true,
            isDefeated: false,
        },
    ],

    // Function that takes in a character to calculate how much damage they deal
    damageCalculation: function (character) {
        // If the character is the player use this formula
        if (character.isPlayer) {
            var damage = character.power * game.damageMultiplier * this.randomDamage();
            // Increase the damage multiplier
            this.damageMultiplier += (Math.floor(Math.random() * (35 - 5)) / 100);
            // Display how much damage was dealt
            this.textHTML(`${game.charactersArray[game.playerIndex].name.toUpperCase()} dealt ${Math.floor(damage)} damage!`)

        }
        // If the character is the enemy then use this formula
        if (character.isEnemy) {
            var damage = character.counterAttackPower * this.randomDamage();
            //Display how much damage was dealt
            this.textAppend(`${game.charactersArray[game.enemyIndex].name.toUpperCase()} dealt ${Math.floor(damage)} damage!`)

        }

        return damage;
    },

    // Generates a random number between .85 and 1 and multiplies it to the damage calculation
    randomDamage: function () {
        return (Math.floor(Math.random() * (100 - 85) + 85)) / 100;
    },

    // Function that takes in two characters and calculates how much damage the defender should receive based on the attackers power
    //Then updates their HP Bar
    applyDamage: function (defender, atacker) {
        //Check if the attacking Pokemon is still alive first
        if (atacker.isDefeated === false) {
            // Then apply the damage
            defender.currentHealth -= this.damageCalculation(atacker);
        }

        //Update both players healthbars
        let playerHP = `.${game.charactersArray[game.playerIndex].name}HP`;
        $(playerHP).each(function () {
            $(playerHP).attr("style", `width:${game.healthBar(game.playerIndex)}%`);

        });
        let enemyHP = `.${game.charactersArray[game.enemyIndex].name}HP`;
        $(enemyHP).each(function () {
            $(enemyHP).attr("style", `width:${game.healthBar(game.enemyIndex)}%`);
        });
    },

    // Check if any pokemon is defeated
    checkDefeated: function (character) {

        // If the player is the character, then you've lost
        if ((character.isPlayer) && (character.currentHealth <= 0)) {
            character.isDefeated = true;
            setTimeout(function () {
                alert("You've lost!");
                location.reload();
            }, 1000);
        }

        // If the character is the enemy then flag them as defeated and add 1 to enemies defeated count.
        if ((character.isEnemy) && (character.currentHealth < 0)) {
            character.isDefeated = true;
            this.textAppend(`${character.name.toUpperCase()} has fainted!`)
            this.enemiesDefeated++;
            // Rebuild the battle row and team row updating the newly defeated enemy and set the game stage back to 1 so that you can choose a new opponent
            game.setUpBattle();
            game.createTeams();
            game.stage = 1;

            // If you have defeated 2 enemies then you win
            if (game.enemiesDefeated === 2) {
                setTimeout(function () {
                    alert("You win!");
                    location.reload();
                }, 1000);

            }
        }


    },
    // Set up the top row to display the current teams
    createTeams: function () {

        // Create local variables to creat divs that hold the player's team and the enemy's team
        let teamColumn = $("<div></div>").attr({
            "class": "col-6 col-lg-4",
            "id": "teamColumn"
        });
        let enemyColumn = $("<div></div>").attr({
            "class": "col-6 col-lg-4 offset-lg-4",
            "id": "enemyTeamColumn"
        });

        // Empty the top row's contents
        $("#top-row").empty();

        // Add the divs that were created to the top row
        $("#top-row").append(teamColumn, enemyColumn);

        // Loop through the list of pokemon
        for (i in game.charactersArray) {
            // If the pokemon is on your team and is alive display it's colored portrait with appropriate class and value.
            if ((game.charactersArray[i].isPlayer) && (game.charactersArray[i].isDefeated === false)) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}/portrait.png'><div id='${game.charactersArray[i].name}HP' class='progress healthBar'><div id='${game.charactersArray[i].name}HP' class='progress-bar healthBarCurrent ${game.charactersArray[i].name}HP' style='width:${game.healthBar(i)}%'</div></div></div>`;
                $("#teamColumn").append(teamDiv);
                
            // If the pokemon is on your team and is defeated display it's grey portrait with appropriate class and value.
            } else if ((game.charactersArray[i].isPlayer) && (game.charactersArray[i].isDefeated === true)) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}/portraitgrey.png'><div id='${game.charactersArray[i].name}HP' class='progress healthBar'><div id='${game.charactersArray[i].name}HP' class='progress-bar healthBarCurrent ${game.charactersArray[i].name}HP' style='width:${game.healthBar(i)}%'</div></div></div>`;
                $("#teamColumn").append(teamDiv);

            // If the pokemon is on the enemy team and is alive display it's colored portrait with appropriate class and value.
            } else if ((game.charactersArray[i].isEnemy) && game.charactersArray[i].isDefeated === false) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}/portrait.png'><div id='${game.charactersArray[i].name}HP' class='progress healthBar'><div id='${game.charactersArray[i].name}HP' class='progress-bar healthBarCurrent ${game.charactersArray[i].name}HP' style='width:${game.healthBar(i)}%'</div></div></div>`;
                $("#enemyTeamColumn").append(teamDiv);
            
            // If the pokemon is on the enemy team and is defeated display it's grey portrait with appropriate class and value.
            } else if ((game.charactersArray[i].isEnemy) && game.charactersArray[i].isDefeated === true) {
                let teamDiv = `<div id='portrait'><img id=${game.charactersArray[i].name} value='${game.charactersArray[i].name}' class='portrait character' src='assets/images/${game.charactersArray[i].name}/portraitgrey.png'><div id='${game.charactersArray[i].name}HP' class='progress healthBar'><div id='${game.charactersArray[i].name}HP' class='progress-bar healthBarCurrent ${game.charactersArray[i].name}HP' style='width:${game.healthBar(i)}%'</div></div></div>`;
                $("#enemyTeamColumn").append(teamDiv);
            }
        }

    },

    // Set up the combat row and button
    setUpBattle: function () {
        // Only execute if your pokemon is selected and the enemy is selected
        if (game.stage === 2) {
            // Declare local variables to create divs that will house the pokemon's sprites
            let playerColumn = $("<div></div>").attr({
                "class": "col-md-3 col-6",
                "id": "playerColumn"
            });
            let currentEnemyColumn = $("<div></div>").attr({
                "class": "col-md-3 col-6",
                "id": "currentEnemyColumn"
            });
            let emptyColumn = $("<div></div>").attr("class", "col-md-3");

            // Empty any sprites in the combat row
            $("#combat-row").empty();

            // Add the divs to the combat row
            $("#combat-row").append(emptyColumn, playerColumn, currentEnemyColumn);

            // Add the player sprite to the player column
            $("#playerColumn").append(`<div id='battlesprite' value=${game.charactersArray[this.playerIndex].name} class="mx-auto battlesprite current-player"><img class='battlesprite' src='assets/images/${game.charactersArray[game.playerIndex].name}/playeridle.png'><div id='${game.charactersArray[this.playerIndex].name}HP' class='progress battleHealthBar'><div id='${game.charactersArray[this.playerIndex].name}HP' class='progress-bar healthBarCurrent ${game.charactersArray[this.playerIndex].name}HP' style='width:${game.healthBar(game.playerIndex)}%'</div></div></div>`)
            
            // If the enemy is not defeated then add the sprite to the enemy column
            if (game.charactersArray[game.enemyIndex].isDefeated === false) {
                $("#currentEnemyColumn").append(`<div id='battlesprite' value=${game.charactersArray[this.enemyIndex].name} class="mx-auto battlesprite current-enemy"><img class='battlesprite' src='assets/images/${game.charactersArray[game.enemyIndex].name}/enemyidle.png'><div id='${game.charactersArray[this.enemyIndex].name}HP' class='progress battleHealthBar'><div id='${game.charactersArray[this.enemyIndex].name}HP' class='progress-bar healthBarCurrent ${game.charactersArray[this.enemyIndex].name}HP' style='width:${game.healthBar(game.enemyIndex)}%'</div></div></div>`)
            }

            // Empty the button row
            $("#button-row").empty();

            // Add the attack button to the button row
            $("#button-row").append('<button type="button" id="attack" class="attack btn btn-danger mx-auto">Attack</button>');
        }
    },

    // Assign the clicked pokemon to the active pokemon index
    assignPlayer: function (x) {

        // If the player hasn't picked their pokemon the clicked pokemon is assigned to game.playerIndex
        if (game.stage === 0) {

            // Loop through the characters array looking for the Pokemon that was clicked and assign it to game.playerIndex
            for (i in this.charactersArray) {

                if (x === game.charactersArray[i].name) {
                    this.playerIndex = i;
                    game.charactersArray[game.playerIndex].isPlayer = true;
                    game.charactersArray[game.playerIndex].isEnemy = false;
                    break
                }
            }
        
        // If the player has been selected then the pokemon that is clicked is added to game.enemyIndex
        } else if (game.stage === 1) {

            // Loop through the characters array looking for the Pokemon that was clicked and assign it to game.enemyIndex
            for (i in this.charactersArray) {

                if ((x === game.charactersArray[i].name) && (game.charactersArray[i].isPlayer === false)) {
                    this.enemyIndex = i;
                    game.charactersArray[game.enemyIndex].isEnemy = true;
                    game.charactersArray[game.enemyIndex].isPlayer = false;
                    break
                
                // If the pokemon that was clicked is on your team then set game.enemyIndex = -1
                } else if ((x === game.charactersArray[i].name) && (game.charactersArray[i].isPlayer === true)) {
                    game.textHTML("This pokemon is on your team!");
                    this.enemyIndex = -1;
                }
            }
        }

    },

    // Returns the health percent of the pokemon to use in calculating the health bar
    healthBar: function (x) {
        let healthPercent = ((game.charactersArray[x].currentHealth / game.charactersArray[x].maxHealth) * 100);
        return healthPercent;
    },

    // Functions to rewrite or append a string to the text box.
    textHTML: function (string) {
        $("#inGameText").html(`<p>${string}</p>`);
    },

    textAppend: function (string) {
        $("#inGameText").append(`<p>${string}</p>`);
    },



};

$(document).ready(function () {
    // When a starter pokemon is clicked assign them to the player's team
    $("#top-row").on("click", ".character", function () {
        
        // Check if pokemon hasn't been selected yet
        if (game.stage === 0) {
            // Assign the clicked Pokemon's name to game.currentPlayer
            game.currentPlayer = $(this).attr("value");
            game.assignPlayer(game.currentPlayer);

            // Allow an enemy to be selected
            game.stage = 1;
            game.createTeams();

            //Change the background
            $(".container").css({
                "image-rendering": "pixelated",
                "background": "url(assets/images/background/labinterior.png)",
                "background-repeat": "no-repeat",
                "background-size": "cover",
                "height": "100%",
                "background-position": "center"
            });

            game.textHTML("Select your Oponent!");

        // Check if your Pokemon has been selected
        } else if (game.stage === 1) {
            // Assign the clicked Pokemon's name to game.currentEnemy
            game.currentEnemy = $(this).attr("value");
            game.assignPlayer(game.currentEnemy);
            // If the index of game.enemyIndex is not -1 after assignPlayer then you've clicked an appropriate Pokemon
            if (game.enemyIndex !== -1) {
                //Check if the enemy is not defeated then set up battle
                if (game.charactersArray[game.enemyIndex].isDefeated === false) {
                    game.stage = 2;
                    game.setUpBattle();
                    game.textHTML(`Go! ${game.charactersArray[game.playerIndex].name.toUpperCase()}!`);
                    game.textAppend(`Go! ${game.charactersArray[game.enemyIndex].name.toUpperCase()}!`);
                    game.textAppend("Click attack to battle!")

                } else {
                    game.textHTML("That Pokemon no longer has the will to battle!");
                }
            }
        }
    });

    //When attack button is clicked run the damage calculation for the player then run again for the opponent
    //This prevents the opponent from attacking if defeated from the player's attack
    $("#button-row").on("click", ".attack", function () {
        if (game.stage === 2) {
            game.applyDamage(game.charactersArray[game.enemyIndex], game.charactersArray[game.playerIndex]);
            game.checkDefeated(game.charactersArray[game.enemyIndex]);
            game.applyDamage(game.charactersArray[game.playerIndex], game.charactersArray[game.enemyIndex]);
            game.checkDefeated(game.charactersArray[game.playerIndex]);

        } else if (game.stage === 1) {
            game.textHTML("There's no opponent!")
        }
    })

});