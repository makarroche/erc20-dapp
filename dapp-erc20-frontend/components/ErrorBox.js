import Alert from "react-bootstrap/Alert";

function ErrorBox({ errorMessage }) {
  return (
    <Alert variant="danger">
      <Alert.Heading>Oops there was an error!</Alert.Heading>
      <hr />
      <p className="mb-0">{errorMessage}</p>
    </Alert>
  );
}

export default ErrorBox;
