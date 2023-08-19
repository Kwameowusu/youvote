export const CheckIcon = ({...props }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width='1em'
        height='1em'
        viewBox="0 0 24 24"
        aria-labelledby="check mark icon"
        fill="none"
        {...props}
      >
        <path
          d="M5 13L9 17L19 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};