type Logger = {
  log: (message: string, ...optionalParams: any) => void;
  error: (message: string, ...optionalParams: any) => void;
  warn: (message: string, ...optionalParams: any) => void;
};

const tk: Logger = {
  log: () => {},
  error: () => {},
  warn: () => {},
};

tk.log = (message: string, ...optionalParams: any) => {
  // if (process.env.NODE_ENV === "development") {
  console.log(message, ...optionalParams);
  // }
};

tk.error = (message: string, ...optionalParams: any) => {
  // if (process.env.NODE_ENV === "development") {
  console.error(message, ...optionalParams);
  // }
};

tk.warn = (message: string, ...optionalParams: any) => {
  // if (process.env.NODE_ENV === "development") {
  console.warn(message, ...optionalParams);
  // }
};

export default tk;
