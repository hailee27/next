import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

interface TimeLeftType {
  hours: number;
  minutes: number;
  seconds: number;
}

interface PropsType {
  timeEnd: string;
  onSubmit: () => void;
}

const TimeLeft = ({ timeEnd, onSubmit }: PropsType) => {
  const { push } = useRouter();

  const calculateTimeLeft = () => {
    const difference = -dayjs().diff(timeEnd, 'seconds');
    if (!difference) {
      push('/student/assignment');
    }

    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      const hours = Math.floor(difference / 60 / 60);
      const minutes = Math.floor((difference / 60) % 60);
      const seconds = Math.floor(difference % 60);

      timeLeft = {
        hours,
        minutes,
        seconds,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeftType>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCheckTime, setIsCheckTime] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeEnd) {
        setTimeLeft(calculateTimeLeft());
        setIsCheckTime(true);
      }
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [timeEnd]);

  useEffect(() => {
    if (
      isCheckTime &&
      Number(timeLeft?.hours) === 0 &&
      Number(timeLeft?.minutes) === 0 &&
      Number(timeLeft?.seconds) === 0
    ) {
      onSubmit();
    }
  }, [isCheckTime, timeLeft]);

  return (
    <div>
      <h2 className="font-bold uppercase mb-2">Time remaining</h2>
      <div className="font-semibold">
        {timeLeft.hours || 0} : {timeLeft.minutes || 0} : {timeLeft.seconds || 0}
      </div>
    </div>
  );
};

export default TimeLeft;
