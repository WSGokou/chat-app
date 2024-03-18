import useDeleteMessage from '../../hooks/useDeleteMessage';
import useConversation from '../../zustand/useConversation';

const DeleteMessage = () => {
  const {deleteMessage} = useDeleteMessage();
  const {selectedMessage} = useConversation();

  const handleDeleteMessage = (e) => {
    e.preventDefault();
    deleteMessage(selectedMessage._id);
  };

  return (
    <div className="cursor-pointer">
      <p onClick={handleDeleteMessage}>Delete</p>
    </div>
  );
};

export default DeleteMessage;
