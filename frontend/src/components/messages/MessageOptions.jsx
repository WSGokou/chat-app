import useConversation from '../../zustand/useConversation';
import DeleteMessage from './DeleteMessage';
import EditMessage from './EditMessage';

const MessageOptions = () => {
  const {setSelectedMessage} = useConversation();

  return (
    <div className="absolute bg-white rounded-xl p-2 z-50">
      <DeleteMessage />
      <EditMessage />
      <p
        className="cursor-pointer"
        onClick={() => setSelectedMessage(null)}
      >
        Cancel
      </p>
    </div>
  );
};

export default MessageOptions;
