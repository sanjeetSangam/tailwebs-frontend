import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ModalProvider } from "./contexts/ModalContext.jsx";
import { StudentProvider } from "./contexts/StudentContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<StudentProvider>
				<ModalProvider>
					<App />
				</ModalProvider>
			</StudentProvider>
		</AuthProvider>
	</StrictMode>
);
