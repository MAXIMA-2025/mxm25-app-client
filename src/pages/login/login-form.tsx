import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

const LoginFormPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center px-4"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <h1 className="text-4xl font-bold text-black mb-20">
        Are you maba 2025?
      </h1>

      <div className="flex flex-row gap-6 flex-wrap justify-center">
        {/* YES Button */}
        <Stack alignItems="center">
          <Button
            onClick={() => navigate("/login-sso")}
            type="button"
            fullWidth
            sx={{
              mt: 0,
              py: 1.0,
              px: 15,
              fontSize: "14px",
              background: "linear-gradient(to bottom, #B2203B, #5B0712)",
              color: "white",
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                background: "linear-gradient(to bottom, #A01C34, #4C0610)",
              },
            }}
          >
            YES
          </Button>

          <div
            style={{
              marginTop: "10px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              textAlign: "center",
              fontWeight: 600,
              color: "#000000",
            }}
          >
            IF YES, LOGIN SSO
          </div>
        </Stack>

        {/* NO Button */}
        <Stack alignItems="center">
          <Button
            onClick={() => navigate("/login-google")}
            type="button"
            fullWidth
            sx={{
              mt: 0,
              py: 1.0,
              px: 15,
              fontSize: "14px",
              background: "linear-gradient(to bottom, #B2203B, #5B0712)",
              color: "white",
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                background: "linear-gradient(to bottom, #A01C34, #4C0610)",
              },
            }}
          >
            NO
          </Button>

          <div
            style={{
              marginTop: "10px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              textAlign: "center",
              fontWeight: 600,
              color: "#000000",
            }}
          >
            NO, LOGIN OAUTH GOOGLE
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default LoginFormPage;
