import Statistic from "./Statistic";

function Statistics({ stats }) {
  return (
    <>
      <h1> Statistics </h1>
      {stats.all > 0 && (
        <table>
          <tbody>
            <tr>
              <td>
                <Statistic text="Good" value={stats.good} />
              </td>
            </tr>
            <tr>
              <td>
                <Statistic text="Neutral" value={stats.neutral} />
              </td>
            </tr>
            <tr>
              <td>
                <Statistic text="Bad" value={stats.bad} />
              </td>
            </tr>
            <tr>
              <td>
                <Statistic text="All" value={stats.all} />
              </td>
            </tr>
            <tr>
              <td>
                <Statistic text="Avg" value={stats.avg} />
              </td>
            </tr>
            <tr>
              <td>
                <Statistic text="Positive" value={stats.positive} />
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {stats.all === 0 && <p>No feedback given.</p>}
    </>
  );
}
export default Statistics;
