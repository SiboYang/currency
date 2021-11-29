import React from "react";
import { useState, useEffect } from "react";
import { Result } from "antd";

const ResultPage = (props) => {
  const { result, mode } = props;
  const [successTitle, setSuccessTitle] = useState("");
  const [successSubtitle, setSuccessSubtitle] = useState("");
  const [failTitle, setFailTitle] = useState("");
  const [failSubtitle, setFailSubtitle] = useState("");

  useEffect(() => {
    if (mode === "sub") {
      setSuccessTitle("Please check your mailbox for the verification email");
      setSuccessSubtitle(
        "Thank you for your supporting"
      );
      setFailTitle("Failed to subscribe :_(");
      setFailSubtitle("Please try again!");
    } else {
      setSuccessTitle("Successfully unsubscribed");
      setSuccessSubtitle(
        "Please check your mailbox for the comfirmation email!"
      );
      setFailTitle("Failed to unsubscribe :_(");
      setFailSubtitle("Please try again!");
    }
  }, [mode]);

  return (
    <div>
      {result === "success" ? (
        <Result
          status={result}
          title={successTitle}
          subTitle={successSubtitle}
        />
      ) : (
        <Result status={result} title={failTitle} subTitle={failSubtitle} />
      )}
    </div>
  );
};

export default ResultPage;
