var timeFromCommanderLandingLoaded;

function timeFromCommanderLanding() {
  if (timeFromCommanderLandingLoaded) {
    return;
  }

  timeFromCommanderLandingLoaded = true;

  try {
    var simStartToLandingTimeDifference = 0.0;

    handlers.gameStarted = function () {
      _.delay(function () {
        simStartToLandingTimeDifference = model.endOfTimeInSeconds();
      }, 5000);
    };

    handlers.time = function (payload) {
      if (payload.view !== 0) {
        return;
      }

      if (payload.server_rate) {
        model.serverRate(payload.server_rate);
      }

      model.endOfTimeInSeconds(
        payload.end_time - simStartToLandingTimeDifference
      );

      if (_.isUndefined(model.earliestEndOfTimeInSeconds())) {
        model.earliestEndOfTimeInSeconds(payload.end_time);
      }
    };
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
timeFromCommanderLanding();
