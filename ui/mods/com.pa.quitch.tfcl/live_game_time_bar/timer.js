var adjustChronoCamTimeLoaded;

function adjustChronoCamTime() {
  if (adjustChronoCamTimeLoaded) {
    return;
  }

  adjustChronoCamTimeLoaded = true;

  try {
    var simStartToLandingTimeDifference = 0.0;

    handlers.gameStarted = function () {
      _.delay(function () {
        simStartToLandingTimeDifference = model.endOfTimeInSeconds();
      }, 5000);
    };

    model.currentTimeString = ko.computed(function () {
      return UberUtility.createTimeString(
        model.currentTimeInSeconds() - simStartToLandingTimeDifference
      );
    });

    model.endOfTimeString = ko.computed(function () {
      return UberUtility.createTimeString(
        model.endOfTimeInSeconds() - simStartToLandingTimeDifference
      );
    });
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
adjustChronoCamTime();
