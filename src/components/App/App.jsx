import { useState, useEffect } from "react";
import "./App.css";
import Description from "../Description/Description.jsx";
import Feedback from "../Feedback/Feedback.jsx";
import Options from "../Options/Options.jsx";

export default function App() {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = window.localStorage.getItem("Data");
    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;
  const positiveFeedback = Math.round((clicks.good / totalFeedback) * 100);

  const reset = () => {
    return setClicks({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const updateFeedback = (feedbackType) => {
    setClicks({
      ...clicks,
      [feedbackType]: clicks[feedbackType] + 1,
    });
  };

  useEffect(() => {
    window.localStorage.setItem("Data", JSON.stringify(clicks));
  }, [clicks]);

  return (
    <>
      <Description />
      <Options
        total={totalFeedback}
        onGood={() => {
          updateFeedback("good");
        }}
        onBad={() => {
          updateFeedback("bad");
        }}
        onNeutral={() => {
          updateFeedback("neutral");
        }}
        onReset={reset}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={clicks.good}
          bad={clicks.bad}
          neutral={clicks.neutral}
          percent={positiveFeedback}
        />
      ) : (
        <p>No feedback yet</p>
      )}
    </>
  );
}
