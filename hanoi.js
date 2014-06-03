(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function () {
    this.currentTower = null;
    this.towers = [[3, 2, 1], [], []];
    this.render();
    this.setUpEvents();
  };

  Game.prototype.render = function(){

    for(var i = 0; i < this.towers.length; i++) {
      tower = this.towers[i];
      var towerName = "#tower" + i;
      var $tower = $(towerName);
      $tower.empty();
      for(var j = 0; j < tower.length; j++) {
        $block = $("<div class='block' ></div")
        var blockID = "block" + tower[j];
        $block.attr('id', blockID);
        $tower.prepend($block);
      }
    }
  }

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx)
   {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
  }

  Game.prototype.setTower = function(event) {
      var $tower = $(event.target);
      var towerName =  $tower.attr("id")

      if (towerName.substring(0,1) === "b") {
        $tower = $tower.parent();
        towerName = $tower.attr("id")
      }
      var towerID = towerName.substring(5, 6);
    if (this.currentTower === null) {
      this.currentTower = parseInt(towerID);
    }
    else {
      finishTower = parseInt(towerID);
      if (this.isValidMove(this.currentTower, finishTower)){
        this.move(this.currentTower, finishTower);
        this.render();
      }
      else{
        alert("Please make a valid move");
      }
        this.currentTower = null;
    }
    if(this.isWon())
    {
      alert("Congratulations!");
    }
  };

  Game.prototype.setUpEvents = function() {
    $('#frame').click('.tower', this.setTower.bind(this));
  };
})(this);