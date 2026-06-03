import React from 'react';

export const Badge = ({ children, status }) => {
  let extraClass = '';
  if (status === 'Active' || status === 'Paid' || status === 'On Duty' || status === 'delivered' || status === 'done') {
    extraClass = 'badge-ready'; // custom ready styles or green
  } else if (status === 'Pending' || status === 'new' || status === 'preparing' || status === 'Partial') {
    extraClass = 'badge-preparing'; // custom preparing styles or yellow/orange
  } else if (status === 'Suspended' || status === 'Disabled' || status === 'Off Duty') {
    extraClass = 'badge-suspended'; // custom suspended/red styles
  }

  return (
    <span className={`badge-custom ${extraClass}`}>
      {children || status}
    </span>
  );
};
