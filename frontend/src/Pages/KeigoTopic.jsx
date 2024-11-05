import { useParams } from "react-router-dom";
import Introduction from "./KeigoTopicPages/Introduction"
import Greeting from "./KeigoTopicPages/Greeting";
import Phonecall from "./KeigoTopicPages/Phonecall";


const KeigoTopic = () => {
  const { topic } = useParams();

  const renderContent = () => {
    switch(topic) {
      case "introduction":
        return <Introduction />;
      case "greeting":
        return <Greeting />;
      case "phonecall":
        return <Phonecall />;
      default:
        return <p>Topic not found</p>;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default KeigoTopic;
