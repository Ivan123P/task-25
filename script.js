$(document).ready(function() {
  const gameBody       = $('#game-body');
  const gameBodyWidth  = $('#game-body').width();
  const gameBodyHeight = $('#game-body').height();

  const bullet       = $('#bullet');
  const bulletWidth  = $('#bullet').width();
  const bulletHeight = $('#bullet').height();
  const bulletStartY = $('#bullet').position().top;
  const bulletStartX = $('#bullet').position().left;

  const platform      = $('#platform');
  const platformWidth = platform.width();

  let bulletLeftPosition;
  let bulletTopPosition;
  let platformLeftPosition;

  let velocityY = -3;
  let velocityX = -3;
  let intervals = [];
  const intervalTime = 30;

  $('#start-game').on('click', function() {
    startGame();
  });

  $(document).keydown(function(e){
    e.preventDefault;

    platformLeftPosition = platform.position().left;
    
    if(e.keyCode === 37) {
      if( platformLeftPosition <= 0 ) {
        platform.css('left', 0);
      } else {
        platform.css('left', platformLeftPosition -= 8);
      }
    }
    if(e.keyCode === 39) {
      if( platformLeftPosition + platformWidth >= gameBodyWidth ) {
        platform.css('left', gameBodyWidth - platformWidth);
      } else {
        platform.css('left', platformLeftPosition += 8);
      }
    }
  });

  function startGame() {
    bullet.css('top', bulletStartY);
    bullet.css('left', bulletStartX);

    $.each(intervals, function() {
      clearInterval(this);
    });

    if(velocityY > 0) {
      velocityY = -velocityY;
    }
    if(velocityX > 0) {
      velocityX = -velocityX;
    }

    let timerId = setInterval(() => {
      if( bullet.position().top < gameBodyHeight ) {
        setPosition();
      }
    }, intervalTime);
    intervals.push(timerId);
  };

  function setPosition() {
    bulletLeftPosition = bullet.position().left;
    bulletTopPosition  = bullet.position().top;

    bullet.css('top', bulletTopPosition += velocityY);
    bullet.css('left', bulletLeftPosition += velocityX);
    // Reverse when hit left border
    if( bulletLeftPosition < 0 ) {
      velocityX = -velocityX;
    }
    // Reverse when hit top border
    if( bulletTopPosition < 0 ) {
      velocityY = -velocityY;
    }
    // Reverse when hit right border
    if( bulletLeftPosition > gameBodyWidth - bulletWidth ) {
      velocityX = -velocityX;
    }
    // Reverse when hit platform
    if( bulletTopPosition > gameBodyHeight - bulletHeight ) {
      if( bulletLeftPosition + bulletWidth >= platformLeftPosition && bulletLeftPosition <= platformLeftPosition + platformWidth ) {
        velocityY = -velocityY;
      }
    }
    // Reverse on top && left corner
    if( bulletLeftPosition === 0 && bulletTopPosition === 0 ) {
      velocityX = -velocityX;
      velocityY = -velocityY;
    }
    // Reverse on top && right corner
    if( bulletLeftPosition === gameBodyWidth - bulletWidth && bulletTopPosition === 0 ) {
      velocityX = -velocityX;
      velocityY = -velocityY;
    }
    // Reverse on right && bottom corner
    if( bulletLeftPosition === gameBodyWidth - bulletWidth && bulletTopPosition === gameBodyHeight - bulletHeight) {
      velocityX = -velocityX;
      velocityY = -velocityY;
    }
    // Reverse on left && bottom corner
    if( bulletLeftPosition === 0 && bulletTopPosition === gameBodyHeight - bulletHeight) {
      velocityX = -velocityX;
      velocityY = -velocityY;
    }
  };
});