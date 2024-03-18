import useDeleteMessage from '../../hooks/useDeleteMessage';
import useConversation from '../../zustand/useConversation';
import {FaTrash} from 'react-icons/fa6';

const DeleteMessage = () => {
  const {deleteMessage} = useDeleteMessage();
  const {selectedMessage, setSelectedMessage} = useConversation();

  const handleDeleteMessage = async (e) => {
    e.preventDefault();
    await deleteMessage(selectedMessage._id);
    setSelectedMessage(null);
  };

  return (
    <div
      className="cursor-pointer w-5 h-5"
      onClick={handleDeleteMessage}
    >
      <FaTrash className="w-full h-full" />
    </div>
  );
};

export default DeleteMessage;
