import {FaPen} from 'react-icons/fa6';
import useConversation from '../../zustand/useConversation';

const EditMessage = () => {
  const {selectedMessage, setSelectedMessage} = useConversation();

  const handleEditMessage = () => {
    setSelectedMessage({...selectedMessage, edit: true});
  };

  return (
    <div
      className="cursor-pointer w-5 h-5"
      onClick={handleEditMessage}
    >
      <FaPen className="w-full h-full" />
    </div>
  );
};

export default EditMessage;
