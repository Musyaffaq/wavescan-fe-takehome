import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const scanningModes = [
  { value: "GANTRY", label: "Gantry" },
  { value: "CRAWLER", label: "Crawler" },
  { value: "AUTO", label: "Auto" },
  { value: "MANUAL", label: "Manual" },
  { value: "ARM", label: "Arm" },
];

function MainForm() {
  const navigate = useNavigate();
  const [frequencyError, setFrequencyError] = useState("");

  const [formData, setFormData] = useState({
    projectName: "",
    scanningMode: "GANTRY",
    scanDimensionsX: 0,
    scanDimensionsY: 0,
    scannerFrequency: 0.0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFrequency = () => {
    let isValid = true;
    if (!formData["scannerFrequency"].includes(".")) {
      setFrequencyError("The Scanner Frequency should have 1 decimal point");
      isValid = false;
    } else {
      setFrequencyError("");
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if the frequency has a decimal point or not
    if (!validateFrequency()) {
      return;
    }

    // if no errors, then convert the data provided to the necessary data type
    setFormData({
      projectName: formData["projectName"],
      scanningMode: formData["scanningMode"],
      scanDimensionsX: Number(formData["scanDimensionsX"]),
      scanDimensionsY: Number(formData["scanDimensionsY"]),
      scannerFrequency: Number(formData["scannerFrequency"]),
    });

    // then submit the form
    try {
      let submittingForm = {
        projectName: formData["projectName"],
        scanningMode: formData["scanningMode"],
        scanDimensionsX: Number(formData["scanDimensionsX"]),
        scanDimensionsY: Number(formData["scanDimensionsY"]),
        scannerFrequency: Number(formData["scannerFrequency"]),
      };
      const response = await fetch(
        "https://wavescan-internship.saurabhmudgal.repl.co/submitForm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submittingForm),
        }
      );

      if (response.ok) {
        // handle success
        navigate("/validated");
      } else {
        // handle error
        console.error("Scan submission failed.");
        throw new Error("Scan submission failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };
  return (
    <form onSubmit={handleSubmit} method="POST" style={{ textAlign: "center" }}>
      <TextField
        style={{ width: "100%", marginTop: "1em", marginBottom: "1em" }}
        required
        name="projectName"
        label="Project Name"
        InputProps={{ inputProps: { minLength: 4 } }}
        onChange={handleChange}
      ></TextField>
      <TextField
        style={{ width: "100%", marginTop: "1em", marginBottom: "1em" }}
        required
        select
        defaultValue="Gantry"
        SelectProps={{
          native: true,
        }}
        onChange={handleChange}
        name="scanningMode"
        label="Scanning Mode"
      >
        {scanningModes.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      <TextField
        style={{
          width: "100%",
          marginTop: "1em",
          marginBottom: "1em",
        }}
        required
        name="scanDimensionsX"
        label="Scanning Dimensions X (cm)"
        type="number"
        inputMode="number"
        InputProps={{ inputProps: { min: 1 } }}
        onChange={handleChange}
      ></TextField>
      <TextField
        style={{
          width: "100%",
          marginTop: "1em",
          marginBottom: "1em",
        }}
        required
        name="scanDimensionsY"
        label="Scanning Dimensions Y (cm)"
        id="outlined-number"
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
        onChange={handleChange}
      ></TextField>
      <TextField
        style={{ width: "100%", marginTop: "1em", marginBottom: "1em" }}
        required
        name="scannerFrequency"
        label="Scanner Frequency"
        id="outlined-number"
        type="number"
        InputProps={{
          inputProps: { step: 0.1, min: 1 },
        }}
        onChange={handleChange}
      ></TextField>
      {frequencyError.length !== 0 ? (
        <>
          {frequencyError}
          <br />
        </>
      ) : null}
      <Button type="submit" variant="contained" style={{ marginTop: "1em" }}>
        Scan
      </Button>
    </form>
  );
}

export default MainForm;
