new Vue({
  el: '#app',
  data: {
    player: {
      racial: 'human',
      health: 100,
    },
    mob: {
      racial: 'monster',
      health: 100,
    },
    gameIsRunning: false
  },
  methods: {
    startNewGame: function () {
      this.gameIsRunning = true;
      this.player.health = this.mob.health = 100;
    },
    
    attack: function () {
      if (this.player.health || this.mob.health == 0) {

      }
      this.player.health -= this.generateRandomDamage(this.player.racial);
      this.mob.health -= this.generateRandomDamage(this.mob.racial);
    },
    attackSpecial: function () {
      
    },

    heal: function () {
      
    },
    
    giveUp: function () {
      this.gameIsRunning = false;
      this.player.health = this.mob.health = 100;
    },
    
    generateRandomDamage: function (racial) {
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
    }
  }
})