var timeFromCommanderLandingLoaded;

function monitorGameState() {
  if (timeFromCommanderLandingLoaded) {
    return;
  }

  try {
    _.defer(function () {
      var liveGameOptionsBarPanelId = 1;
      liveGameOptionsBarPanelId = _.find(api.panelsById, {
        src: "coui://ui/main/game/live_game/live_game_options_bar.html",
      }).id;

      var liveGameTimeBarPanelId = 1;
      liveGameTimeBarPanelId = _.find(api.panelsById, {
        src: "coui://ui/main/game/live_game/live_game_time_bar.html",
      }).id;

      model.serverMode.subscribe(function () {
        if (model.serverMode() === "playing") {
          api.Panel.message(liveGameOptionsBarPanelId, "gameStarted");
          api.Panel.message(liveGameTimeBarPanelId, "gameStarted");
        }
      });
    });
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
monitorGameState();
