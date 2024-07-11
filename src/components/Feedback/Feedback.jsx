export default function Feedback({good, neutral, bad, percent}) {
  return(
  <>
    <p>Good:{good}</p>
    <p>Neutral:{neutral}</p>
    <p>Bad:{bad}</p>
    <p>Positiv:{percent}%</p>
  </>
  );
}
