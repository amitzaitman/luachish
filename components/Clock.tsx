import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="text-[4em] leading-none font-mono font-bold text-stone-800 tracking-wider">
      {time.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false })}
    </div>
  );
};

export default Clock;