// components/Loader.tsx
import React from "react";

const Loader: React.FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "md" }) => {
  let spinnerSize = "w-6 h-6"; // Default size

  // Adjust size based on the "size" prop
  if (size === "sm") {
    spinnerSize = "w-4 h-4";
  } else if (size === "lg") {
    spinnerSize = "w-8 h-8";
  }

  return (
    <div className={`flex justify-center items-center ${spinnerSize} border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin`}>
      {/* Empty div will spin and create the spinner effect */}
    </div>
  );
};

export default Loader;
