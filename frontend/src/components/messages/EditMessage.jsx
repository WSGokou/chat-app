import useConversation from '../../zustand/useConversation';

const EditMessage = () => {
  const {selectedMessage, setSelectedMessage} = useConversation();

  const handleEditMessage = () => {
    setSelectedMessage({...selectedMessage, edit: true});
  };

  return (
    <div
      className="cursor-pointer"
      onClick={handleEditMessage}
    >
      <p>Edit</p>
    </div>
  );
};

export default EditMessage;
