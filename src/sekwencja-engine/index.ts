import Tone from 'tone'
import startAudioContext from 'startaudiocontext'

const engage = () => {
  console.log('Sekwencja engaged!')

  startAudioContext(Tone.context)
    .then(() => console.log('AudioContext is ready!'))
}

export default {
  engage
}
