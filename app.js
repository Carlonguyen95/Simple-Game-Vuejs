new Vue({
  el: '#app',
  data: {
    player: {
      racial: 'human',
      health: 100,
      alive: true,
    },
    mob: {
      racial: 'monster',
      health: 100,
      alive: true,
    },
    gameIsRunning: false,
    gameAnnounceTextList: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.player.health = this.mob.health = 100;
      this.gameAnnounceTextList = [];
    },
    startNewGame: function () {
      if (confirm('New game?')) {
        this.startGame();
      } else {
        this.gameIsRunning = false;
      }
    },

    attack: function () {
      // if(this.checkWin()){
      //   return;
      // }
      let damagePlayer;
      let damageMonster;
      this.player.health -= damagePlayer = this.generateDamage(this.player.racial);
      this.mob.health -= damageMonster = this.generateDamage(this.mob.racial);

      this.gameAnnounceTextList.push('Monster attacked for ' + damagePlayer);
      this.gameAnnounceTextList.push('You attacked for ' + damageMonster);
      this.checkWin();
    },
    attackSpecial: function () {
      
    },

    heal: function () {
      
    },
    
    giveUp: function () {
      this.gameIsRunning = false;
      this.player.health = this.mob.health = 100;
      this.gameAnnounceTextList = [];
    },
    
    generateDamage: function (racial) {
      let damageMax = 10;
      let damageMin = 3;
      let damage = 0;

      if (racial == 'human'){
        damageMax = 20;
        damage = Math.max(Math.floor(Math.random() * damageMax) + 1, damageMin);
      } else {
        damage = Math.max(Math.floor(Math.random() * damageMax) + 1, damageMin);
      }

      return damage;
    },

    checkWin: function () {
      if (this.player.health <= 0 || this.mob.health <= 0) {
        this.gameIsRunning = false;
        if (this.player.health <= 0 ? this.mob.alive = true : this.player.alive = false) {
          this.gameAnnounceTextList.push('You lost!');
          this.startNewGame();
          return true;
        } else {
          this.gameAnnounceTextList.push('You won the big battle!');
          this.startNewGame();
          return true;
        }
      }
      return false;
    }
  }
})