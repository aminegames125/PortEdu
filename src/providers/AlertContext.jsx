import React, { createContext, useState, useContext } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  
  const showAlert = (message, severity = "error") => {
    
    const validSeverities = ["error", "success", "warning", "info"];
    if (!validSeverities.includes(severity)) {
      console.warn(`Invalid severity: ${severity}. Defaulting to 'error'.`);
      severity = "error";
    }

    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 3000); 
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Snackbar open={Boolean(alert)} autoHideDuration={5000}>
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      "useAlert must be used within an AlertProvider. Ensure that your component tree is wrapped with <AlertProvider>.",
    );
  }
  return context;
};
