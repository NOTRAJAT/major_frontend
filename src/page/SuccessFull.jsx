import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation(); // Hook to access the location object
  const { message } = location.state || {}; // Extract the message from state

  return (
    <div>
      <h1>{JSON.stringify(message, null, 2) || "Success!"}</h1>{" "}
      {/* Use the passed message or a default */}
      <p>Thank you for signing up.</p>
    </div>
  );
};

export default SuccessPage;
