import React, { useState, useEffect } from 'react';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from 'components/Statistics/Statistics';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [countPositiveFeedbackPercentage, setCountPositiveFeedbackPercentage] =
    useState(0);

  const onLeaveFeedback = e => {
    // const { name } = e.target;
    // this.setState(prevState => ({ [name]: prevState[name] + 1 }));

    switch (e.target.name) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      default:
        return;
    }
  };
  useEffect(() => {
    setTotal(good + neutral + bad);
    setCountPositiveFeedbackPercentage((good / (total || 1)) * 100);
  }, [bad, good, neutral]);

  // countTotalFeedback = () => {
  //   return Object.values(this.state).reduce((acc, value) => {
  //     acc += value;
  //     return acc;
  //   }, 0);
  // };
  // countPositiveFeedbackPercentage = () => {
  //   return Math.round((this.state.good / this.countTotalFeedback()) * 100) || 0;
  // };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'bad', 'neutral']}
          onLeaveFeedback={onLeaveFeedback}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
}
