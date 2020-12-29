const triggerEventsRouter = require('express').Router();
const webhookSendEvents = require('../../../helpers/webhookSendEvents');
const { webhookUrlEventTriggerValidation } = require('../../../helpers/validator');
// github api for update status about submission
triggerEventsRouter.post('/start-challenge/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Joi validation
    const { error } = webhookUrlEventTriggerValidation(req.body);
    if (error) {
      console.error(error.message);
      return res.status(400).json({ success: false, message: error.message });
    }
    const { challengeName } = req.body;
    const eventToSend = {
      eventName: 'Started Challenge',
      userId: req.user.userId,
      userName: req.user.userName,
      challengeName,
      challengeId: id,
    };
    webhookSendEvents(eventToSend);
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = triggerEventsRouter;
