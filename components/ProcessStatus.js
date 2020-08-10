const getStatusIcon = (status) => {}

export default function ProcessStatus({ status }) {
  switch (status) {
    case "online":
      return <i className="icofont-check-circled"></i>
    case "stopping":
      return <i className="icofont-bubble-up"></i>
    case "stopped":
      return <i className="icofont-stop"></i>
    case "launching":
      return <i className="icofont-bubble-up"></i>
    case "errored":
      return <i className="icofont-bubble-up"></i>
    case "one-launch-status":
      return <i className="icofont-check-circled"></i>
    default:
      return <span>status</span>
  }
}
