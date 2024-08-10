import { useState } from 'react';

interface UseDateTimePickerReturn {
  time: Date;
  setTime: (time: Date) => void;
  handleChangeTime: (evt: any, selectedTime?: Date) => void;
}

export const useDateTimePicker = (): UseDateTimePickerReturn => {
  const [time, setTime] = useState<Date>(new Date());

  const handleChangeTime = (evt: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  return { time, setTime, handleChangeTime };
};

