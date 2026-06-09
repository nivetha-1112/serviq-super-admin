import React from 'react';

export const Badge = ({ children, status }) => {
  let extraClass = '';
  const normalizedStatus = (status || '').toLowerCase();

  if (
    normalizedStatus === 'active' ||
    normalizedStatus === 'paid' ||
    normalizedStatus === 'on duty' ||
    normalizedStatus === 'delivered' ||
    normalizedStatus === 'done' ||
    normalizedStatus === 'ready'
  ) {
    extraClass = 'badge-ready'; // custom ready styles or green
  } else if (
    normalizedStatus === 'pending' ||
    normalizedStatus === 'new' ||
    normalizedStatus === 'preparing' ||
    normalizedStatus === 'partial'
  ) {
    extraClass = 'badge-preparing'; // custom preparing styles or yellow/orange
  } else if (
    normalizedStatus === 'suspended' ||
    normalizedStatus === 'disabled' ||
    normalizedStatus === 'off duty' ||
    normalizedStatus === 'inactive'
  ) {
    extraClass = 'badge-suspended'; // custom suspended/red styles
  }

  return (
    <span className={`badge-custom ${extraClass}`}>
      {children || status}
    </span>
  );
};

