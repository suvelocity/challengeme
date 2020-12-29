const webhookRouter = require('express').Router();
const { Submission, User, Challenge } = require('../../../models');
const webhookSendEvents = require('../../../helpers/webhookSendEvents');
const { webhookUrlGithubResponseValidation } = require('../../../helpers/validator');

// github api for update status about submission
webhookRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Joi validation
    const { error } = webhookUrlGithubResponseValidation(req.body);
    if (error) {
      console.error(error.message);
      return res.status(400).json({ success: false, message: error.message });
    }
    const { success } = req.body;
    const submission = await Submission.findByPk(id, {
      include: [{
        model: User,
        attributes: ['userName', 'id'],
      }, {
        model: Challenge,
        attributes: ['name', 'id'],
      }],
    });
    const updatedSubmission = await submission.update({ state: success ? 'SUCCESS' : 'FAIL' });
    const eventToSend = {
      eventName: 'Submitted Challenge',
      userId: updatedSubmission.userId,
      userName: updatedSubmission.User.userName,
      challengeName: updatedSubmission.Challenge.name,
      submissionState: updatedSubmission.state,
      challengeId: submission.Challenge.id,
    };
    webhookSendEvents(eventToSend);
    return res.json(submission);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Cannot process request' });
  }
});

module.exports = webhookRouter;
