import useDeleteMessage from '../../hooks/useDeleteMessage';
import useConversation from '../../zustand/useConversation';

const DeleteMessage = () => {
  const {deleteMessage} = useDeleteMessage();
  const {selectedMessage, setSelectedMessage} = useConversation();

  const handleDeleteMessage = async (e) => {
    e.preventDefault();
    await deleteMessage(selectedMessage._id);
    setSelectedMessage(null);
  };

  return (
    <div className="cursor-pointer">
      <p onClick={handleDeleteMessage}>Delete</p>
    </div>
  );
};

export default DeleteMessage;
