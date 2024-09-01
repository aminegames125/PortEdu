import React from "react";

const DefaultAvatar = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="rounded-full bg-gray-300"
  >
    <circle cx="12" cy="12" r="10" stroke="gray" strokeWidth="4" />
    <path
      d="M12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z"
      fill="gray"
    />
    <path
      d="M12 17C14.2091 17 16.2914 15.8111 17.7071 14.7071C17.4573 14.2315 17.1323 13.8026 16.7615 13.4422C16.3035 12.9368 15.6769 12.6326 15 12.6326H9C8.3231 12.6326 7.6965 12.9368 7.2385 13.4422C6.8677 13.8026 6.5427 14.2315 6.29289 14.7071C7.70857 15.8111 9.79086 17 12 17Z"
      fill="gray"
    />
  </svg>
);

export default DefaultAvatar;
