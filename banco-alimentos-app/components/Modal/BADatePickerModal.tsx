import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DatePickerModalProps {
  isVisible: boolean;
  onConfirm: (date: Date) => void;
  onCancel: () => void; // Add type annotation for onCancel
}

function DatePickerModal({ isVisible, onConfirm, onCancel }: DatePickerModalProps) {
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode="date"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

export default DatePickerModal;
