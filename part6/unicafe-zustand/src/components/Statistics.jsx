import { useFeedback } from "../store/FeedbackStore"

const Statistics = () => {
  const { good, neutral, bad } = useFeedback()
  const all = good + neutral + bad
  const average = ((good - bad) / Math.max(all, 1)).toFixed(2)
  const positive = (good / Math.max(all, 1) * 100).toFixed(2)
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive}%</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
