import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import network from '../services/network';
import ChallengeCard from '../components/ChallengeCard';


const ApplyDialog = ({ open, onClose, onSubmit }) => {
  const [solutionRepository, setSolutionRepository] = useState('');
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          value={solutionRepository}
          onChange={({ target: { value } }) => setSolutionRepository(value)}
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSubmit(solutionRepository)} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function HomePage() {
  const [challenges, setChallenges] = useState([]);
  const [challengeToApply, setChallengeToApply] = useState();
  const [expandedChallenge, setExpandedChallenge] = useState();
  useEffect(() => {
    (async () => {
      const { data: challengesFromServer } = await network.get('/api/v1/challenges')
      setChallenges(challengesFromServer);
    })();
  }, []);

  const applyToServer = async (challengeId, solutionRepository) => {

    await network.post(`/api/v1/challenges/${challengeId}/apply`, {
      solutionRepository
    })
  }

  const onApply = (challengeId) => {
    setChallengeToApply(challengeId)
  }

  return (
    <div style={{ padding: 30 }}>
      <div>Caption</div>
      {challenges.map(challenge => (
        <ChallengeCard
          key={challenge.id}
          challengeId={challenge.id}
          expanded={expandedChallenge === challenge.id}
          setExpanded={() => setExpandedChallenge(currentExpanded => {
            return currentExpanded === challenge.id ? false : challenge.id
          })}
          createdAt={challenge.createdAt}
          name={challenge.name}
          description={challenge.description}
          onApply={() => onApply(challenge.id)}
        />
      ))}
      <ApplyDialog
        open={!!challengeToApply}
        onSubmit={(solutionRepository) => {
          applyToServer(challengeToApply, solutionRepository);
          setChallengeToApply(false)
          setExpandedChallenge(challengeToApply);
        }}
        onClose={() => setChallengeToApply(false)}
      />
    </div>
  )
}