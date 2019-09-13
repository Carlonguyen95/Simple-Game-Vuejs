new Vue({
  el: '#app',
  data: {
    initialHealth: 100,
    gameIsRunning: false,
    gameAnnounceTextList: [],

    player: {
      racial: 'human',
      health: this.initialHealth,
      alive: true,
      special: true
    },
    mob: {
      racial: 'monster',
      health: this.initialHealth,
      alive: true,
      special: false
    }
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.player.health = this.mob.health = this.initialHealth;
      this.gameAnnounceTextList = [];
    },
    startNewGame: function () {
      if (confirm('Start a new game?')) {
        this.startGame();
      } else {
        this.gameIsRunning = false;
      }
    },

    attack: function () {
      this.monsterAttack();
      this.playerAttack();
      this.checkWin();
    },
    attackSpecial: function () {
      this.monsterAttack();
      this.playerAttack(true);
      this.checkWin();
    },
    monsterAttack: function () {
      let damage;
      this.player.health -= damage = this.generateDamage(this.mob.racial);
      if(this.player.health < 0){
        this.player.health = 0;
      }
      this.gameAnnounceUpdate("", "", damage);
    },
    playerAttack: function (special) {
      let damage;
      if(special){
        this.mob.health -= damage = this.generateDamage(this.mob.racial, this.player.special);
      }else{
        this.mob.health -= damage = this.generateDamage(this.mob.racial);
      }
      if(this.mob.health < 0){
        this.mob.health = 0;
      }
      this.gameAnnounceUpdate("", damage, "");
    },
    heal: function () {
      let heal;
      heal = Math.max(Math.floor(Math.random() * 40) + 1, 20);
      this.player.health += heal;
      if(this.player.health >= 100){
        this.player.health = 100;
      }
      this.gameAnnounceUpdate(heal, "", "");
      this.monsterAttack();
      this.checkWin();
    },
    
    giveUp: function () {
      this.gameIsRunning = false;
      this.gameAnnounceTextList = [];
    },

    generateDamage: function (racial, special) {
      let damageMax = 10;
      let damageMin = 3;
      let damage = 0;

      if (racial === 'monster') {
        damageMax = 25;
        damageMin = 10;
        return damage = Math.max(Math.floor(Math.random() * damageMax) + 1, damageMin);
      } else {
        return damage = Math.max(Math.floor(Math.random() * damageMax) + 1, damageMin);
      }

      if (special) {
        damageMax = 30;
        return damage = Math.max(Math.floor(Math.random() * damageMax) + 1, 20);
      }

      return damage;
    },

    checkWin: function () {
      if (this.player.health <= 0) {
        this.gameIsRunning = false;
        this.player.alive = false;
        this.gameAnnounceTextList.unshift('You have been defeated!');
        // this.startNewGame();
      }
      if (this.mob.health <= 0) {
        this.mob.alive = false;
        this.gameIsRunning = false;
        this.gameAnnounceTextList.unshift('You won the battle!');
        // this.startNewGame();
      }
    },
    gameAnnounceUpdate: function (heal, playerAttack, monsterAttack) {
      if(heal.length != 0){
        this.gameAnnounceTextList.unshift({
          heal: true,
          text: 'You healed for ' + heal + ' health!'
        });
      }
      if(playerAttack.length != 0){
        this.gameAnnounceTextList.unshift({
            isPlayer: true,
            text: 'You hit for ' + playerAttack + ' damage!'
        });
      }
      if(monsterAttack.length != 0){
        this.gameAnnounceTextList.unshift({
          isPlayer: false,
          text: 'Monster attacked for ' + monsterAttack + ' damage!'
        });
      }
    }
  }
})